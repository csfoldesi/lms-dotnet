import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lms-video-player',
  imports: [MatIconModule],
  template: `
    <div class="relative aspect-video">
      @if(isLocked()){
      <div
        class="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary"
      >
        <mat-icon class="h-8 w-8 icon-white">lock</mat-icon>
        <p class="text-sm text-white">This chapter is locked</p>
      </div>
      } @else if(url()) {
      <video #videoPlayer controls class="w-full">
        <source [src]="url()" [type]="contentType()" />
        <p>
          Your browser doesn't support HTML video. Here is a
          <a [href]="url()">link to the video</a>
          instead.
        </p>
      </video>
      }
    </div>
  `,
  styles: ``,
})
export class VideoPlayerComponent {
  url = input<string | undefined>('');
  contentType = input<string | undefined>('');
  isLocked = input<boolean>(false);

  videoPlayer = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');

  constructor() {
    effect(() => {
      const url = this.url();
      const videoEl = this.videoPlayer()?.nativeElement;
      if (url && videoEl && typeof videoEl.load === 'function') {
        videoEl.load();
      }
    });
  }
}
