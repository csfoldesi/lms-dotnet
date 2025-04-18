import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lms-dashboard-sidebar',
  imports: [MatListModule, MatIconModule, RouterModule],
  template: `
    <mat-list role="list">
      <a routerLink="/">
        <mat-list-item role="listitem">
          <div class="cursor-pointer flex">
            <mat-icon matListItemIcon class="mr-2">dashboard</mat-icon>
            Dashboard
          </div>
        </mat-list-item>
      </a>
      <a routerLink="/search">
        <mat-list-item role="listitem">
          <div class="cursor-pointer flex">
            <mat-icon matListItemIcon class="mr-2">explore</mat-icon>
            Browse
          </div>
        </mat-list-item>
      </a>
    </mat-list>
  `,
  styles: ``,
})
export class DashboardSidebarComponent {}
