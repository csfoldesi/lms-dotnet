import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CategoryStore } from './category-store';
import { Subject } from 'rxjs';

type SearchData = {
  searchText: string;
  selectedCategoryIds: string[];
};

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  categoryStore = inject(CategoryStore);

  public state = signal<SearchData>({
    searchText: '',
    selectedCategoryIds: [],
  });

  categories = computed(() =>
    this.categoryStore.data()?.map((category) => ({
      ...category,
      isSelected: this.state().selectedCategoryIds.includes(category.id),
    }))
  );

  loadCategories$ = this.categoryStore.load$;
  searchTextChaged$ = new Subject<string | null>();

  selectCategory(id: string) {
    this.state.update((prevState) => ({
      ...prevState,
      selectedCategoryIds: prevState.selectedCategoryIds?.includes(id)
        ? prevState.selectedCategoryIds.filter((c) => c !== id)
        : [...prevState.selectedCategoryIds, id],
    }));
  }

  constructor() {
    effect(() => console.log('State:', this.state()));
  }
}
