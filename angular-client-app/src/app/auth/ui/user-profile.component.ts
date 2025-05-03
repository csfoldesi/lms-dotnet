import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'lms-user-profile',
  imports: [],
  template: `
    @if(user(); as user){
    <p>Logged in as {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    }
  `,
  styles: ``,
})
export default class UserProfileComponent {
  auth = inject(AuthService);
  user = toSignal(this.auth.user$);
}
