import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'lms-login-button',
  imports: [],
  template: ` <button (click)="login()">Log in</button> `,
  styles: ``,
})
export class LoginButtonComponent {
  private auth = inject(AuthService);

  login() {
    this.auth.loginWithRedirect();
  }
}
