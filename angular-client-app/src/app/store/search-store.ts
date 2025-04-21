import { effect, inject, Injectable, signal } from '@angular/core';
import { CategoryStore } from './category-store';

type SearchData = {
  search: string;
  selectedCategoryIds: string[] | undefined;
};

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  categoryStore = inject(CategoryStore);

  public state = signal<SearchData>({
    search: '',
    selectedCategoryIds: [],
  });

  categories = this.categoryStore.data;

  loadCategories$ = this.categoryStore.load$;

  selectCategory(id: string) {
    this.categoryStore.selectCategory(id);
    this.state.update((prevState) => ({
      ...prevState,
      selectedCategoryIds: this.categories()
        ?.filter((category) => category.isSelected)
        .map((category) => category.id),
    }));
  }

  constructor() {
    effect(() => console.log('State:', this.state()));
  }
}
