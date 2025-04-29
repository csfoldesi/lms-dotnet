import { Component, input } from '@angular/core';

@Component({
  selector: 'lms-playback-sidebar',
  imports: [],
  template: `
    <p>playback-sidebar works!</p>
    <p>courseId: {{ courseId() }}</p>
  `,
  styles: ``,
})
export class PlaybackSidebarComponent {
  courseId = input<string | null | undefined>();
}
