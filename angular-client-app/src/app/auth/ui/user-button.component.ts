import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';
import { initials } from '../../shared/utils';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lms-user-button',
  imports: [MatMenuModule, RouterModule, MatButtonModule],
  template: `
    @if(isAuthenticated()){
    <button class="rounded-button" [matMenuTriggerFor]="menu">
      <span>{{ userLabel() }}</span>
    </button>
    <mat-menu #menu="matMenu">
      <a routerLink="/profile"><button mat-menu-item>Profile</button></a>
      <button mat-menu-item (click)="logout()">Logout</button>
    </mat-menu>
    }@else {
    <button mat-stroked-button class="m-1" (click)="login()">
      <span>Login</span>
    </button>
    }
  `,
  styles: ``,
})
export class UserButtonComponent {
  auth = inject(AuthService);
  document = inject(DOCUMENT);

  user = toSignal(this.auth.user$);
  isAuthenticated = toSignal(this.auth.isAuthenticated$);

  userLabel = computed(() => initials(this.user()?.name));

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }
}
