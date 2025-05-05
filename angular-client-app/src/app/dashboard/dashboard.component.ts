import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar.component';
import { RouterModule } from '@angular/router';
import { UserButtonComponent } from '../auth/ui/user-button.component';

@Component({
  selector: 'lms-dashboard',
  imports: [SidebarComponent, RouterModule, UserButtonComponent],
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
          <div class="flex-1 flex"></div>
          <lms-user-button />
        </header>
        <main class="flex flex-1 w-full"><router-outlet /></main>
      </div>
    </div>
  `,
  styles: '',
})
export default class DashboardComponent {}
