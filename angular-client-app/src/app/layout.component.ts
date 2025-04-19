import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/sidebar.component';

@Component({
  selector: 'lms-layout',
  imports: [RouterModule, SidebarComponent],
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
        <header class="flex w-full">Header</header>
        <main class="flex flex-1 w-full"><router-outlet /></main>
      </div>
    </div>
  `,
  styles: ``,
})
export default class LayoutComponent {
  router = inject(Router);
}
