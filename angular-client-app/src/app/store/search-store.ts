import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CategoryStore } from './category-store';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { connect } from 'ngxtension/connect';
import { HttpClient } from '@angular/common/http';
import { CourseListStore } from './course-list.store';

type SearchData = {
  searchText: string;
  selectedCategoryIds: string[];
};

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  http = inject(HttpClient);

  categoryStore = inject(CategoryStore);
  courseListStore = inject(CourseListStore);

  public state = signal<SearchData>({
    searchText: '',
    selectedCategoryIds: [],
  });

  searchFormControl = new FormControl('');

  loadCategories$ = this.categoryStore.load$;

  categories = computed(() =>
    this.categoryStore.data()?.map((category) => ({
      ...category,
      isSelected: this.state().selectedCategoryIds.includes(category.id),
    }))
  );
  courses = computed(() => this.courseListStore.data());

  selectCategory(id: string) {
    this.state.update((prevState) => ({
      ...prevState,
      selectedCategoryIds: prevState.selectedCategoryIds?.includes(id)
        ? prevState.selectedCategoryIds.filter((c) => c !== id)
        : [...prevState.selectedCategoryIds, id],
    }));
  }

  private searchTextChaged$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    startWith('')
  );

  constructor() {
    effect(() => console.log('State:', this.state()));

    connect(this.state).with(
      this.searchTextChaged$,
      (prevState, searchText) => ({
        ...prevState,
        searchText: searchText!,
      })
    );

    effect(() => {
      const params = this.urlParams();
      this.courseListStore.load$.next(params);
    });
  }

  private urlParams = computed(() => {
    const searchParams = new URLSearchParams();
    if (this.state().searchText) {
      searchParams.append('title', this.state().searchText);
    }
    this.state().selectedCategoryIds.forEach((categoryId) => {
      searchParams.append('categories', categoryId);
    });
    return searchParams.toString();
  });
}
