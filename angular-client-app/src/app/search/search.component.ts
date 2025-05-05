import { Component, inject, OnInit } from '@angular/core';
import { CategoriesComponent } from './ui/categories.component';
import { SearchStore } from '../store/search-store';
import { CourseListComponent } from '../shared/course-list.component';
import { SidebarComponent } from '../shared/sidebar.component';
import { SearchInputComponent } from './ui/search-input.component';
import { UserButtonComponent } from '../auth/ui/user-button.component';

@Component({
  selector: 'lms-search',
  imports: [
    CategoriesComponent,
    CourseListComponent,
    SidebarComponent,
    SearchInputComponent,
    UserButtonComponent,
  ],
  template: `
    <div class="flex flex-1 min-h-screen min-w-screen">
      <aside class="w-64">
        <div className="p-6">
          <img alt="logo" src="images/logo.png" class="w-auto" />
          <lms-sidebar />
        </div>
      </aside>
      <div class="flex flex-col w-full">
        <header class="flex w-full h-[50px]">
          <lms-search-input
            [searchFormControl]="searchStore.searchFormControl"
          />
          <div class="flex-1 flex"></div>
          <lms-user-button />
        </header>
        <main class="flex flex-1 w-full">
          <div class="container mx-auto">
            <div>
              <lms-categories
                [categories]="categories()"
                (selectCategory)="searchStore.selectCategory($event)"
              />
            </div>
            <div>
              <lms-course-list [courses]="courses()" />
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: '',
})
export default class SearchComponent implements OnInit {
  searchStore = inject(SearchStore);
  categories = this.searchStore.categories;
  courses = this.searchStore.courses;

  ngOnInit(): void {
    this.searchStore.loadCategories$.next();
  }
}
