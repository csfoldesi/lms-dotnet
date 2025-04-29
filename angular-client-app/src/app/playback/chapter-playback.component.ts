import { Component, Input } from '@angular/core';
import { PlaybackSidebarComponent } from './ui/playback-sidebar.component';

@Component({
  selector: 'lms-chapter-playback',
  imports: [PlaybackSidebarComponent],
  template: `
    <div class="flex flex-1 min-h-screen min-w-screen">
      <aside class="w-64">
        <div className="p-6">
          <img alt="logo" src="images/logo.png" class="w-auto" />
          <lms-playback-sidebar [courseId]="courseId" />
        </div>
      </aside>
      <div class="flex flex-col w-full">
        <header class="flex w-full h-[50px]">playback header</header>
        <main class="flex flex-1 w-full">
          <p>
            chapter-playback works!
            <br />
            courseId: {{ courseId }}
            <br />
            chapterId: {{ chapterId }}
          </p>
        </main>
      </div>
    </div>
  `,
  styles: ``,
})
export default class ChapterPlaybackComponent {
  @Input() courseId!: string;
  @Input() chapterId!: string;
}
