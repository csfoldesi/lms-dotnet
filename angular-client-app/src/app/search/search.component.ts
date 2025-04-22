import { Component, inject, OnInit } from '@angular/core';
import { CategoriesComponent } from './ui/categories.component';
import { SearchStore } from '../store/search-store';

@Component({
  selector: 'lms-search',
  imports: [CategoriesComponent],
  template: `
    <div class="container mx-auto">
      <lms-categories
        [categories]="categories()"
        (selectCategory)="searchStore.selectCategory($event)"
      />
    </div>
  `,
  styles: '',
})
export default class SearchComponent implements OnInit {
  searchStore = inject(SearchStore);
  categories = this.searchStore.categories;

  ngOnInit(): void {
    this.searchStore.loadCategories$.next();
  }
}
