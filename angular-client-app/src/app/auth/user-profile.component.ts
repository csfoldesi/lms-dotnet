import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'lms-user-profile',
  imports: [],
  template: `
    @if(user(); as user){
    <p>Logged in as {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>isTeacher: {{ isTeacher() }}</p>
    }
  `,
  styles: ``,
})
export default class UserProfileComponent {
  auth = inject(AuthService);
  user = toSignal(this.auth.user$);

  isTeacher = computed(() =>
    this.user()?.[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ]?.includes('Teacher')
  );

  constructor() {
    effect(() => {
      console.log('user', this.user());
    });
  }
}
