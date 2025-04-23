import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/sidebar.component';
import { SearchInputComponent } from './search/ui/search-input.component';
import { SearchStore } from './store/search-store';

@Component({
  selector: 'lms-layout',
  imports: [RouterModule, SidebarComponent, SearchInputComponent],
  template: `
    <div class="flex flex-1 min-h-screen min-w-screen">
      <aside class="w-64">
        <div className="p-6">
          <img alt="logo" src="images/logo.png" class="w-auto" />
          @if(this.router.url === '/') {
          <lms-sidebar />
          } @else if(this.router.url === '/search') {
          <lms-sidebar />
          } @else if(this.router.url === '/teacher') {
          <p>teached sidebar</p>
          }
        </div>
      </aside>
      <div class="flex flex-col w-full">
        <header class="flex w-full h-[50px]">
          @if(this.router.url === '/search') {
          <lms-search-input
            [searchFormControl]="searchStore.searchFormControl"
          />
          }
        </header>
        <main class="flex flex-1 w-full"><router-outlet /></main>
      </div>
    </div>
  `,
  styles: ``,
})
export default class LayoutComponent {
  router = inject(Router);
  searchStore = inject(SearchStore);
}
