import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'lms-logout-button',
  imports: [],
  template: ` <button (click)="logout()">Log out</button> `,
  styles: ``,
})
export class LogoutButtonComponent {
  auth = inject(AuthService);
  document = inject(DOCUMENT);

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }
}
