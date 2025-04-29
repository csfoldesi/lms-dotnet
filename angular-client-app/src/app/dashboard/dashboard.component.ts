import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lms-dashboard',
  imports: [SidebarComponent, RouterModule],
  template: `
    <div class="flex flex-1 min-h-screen min-w-screen">
      <aside class="w-64">
        <div className="p-6">
          <img alt="logo" src="images/logo.png" class="w-auto" />
          <lms-sidebar />
        </div>
      </aside>
      <div class="flex flex-col w-full">
        <header class="flex w-full h-[50px]">header</header>
        <main class="flex flex-1 w-full"><router-outlet /></main>
      </div>
    </div>
  `,
  styles: '',
})
export default class DashboardComponent {}
