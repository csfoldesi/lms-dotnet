import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { PlaybackSidebarComponent } from './ui/playback-sidebar.component';
import { CourseStore } from '../store/course-store';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { VideoPlayerComponent } from './ui/video-player.component';
import { UserButtonComponent } from '../auth/ui/user-button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lms-chapter-playback',
  imports: [
    PlaybackSidebarComponent,
    MatButtonModule,
    RouterModule,
    VideoPlayerComponent,
    UserButtonComponent,
    MatIconModule,
  ],
  template: `
    <div class="flex flex-1 min-h-screen min-w-screen">
      <aside class="w-64">
        <div className="p-6">
          <img alt="logo" src="images/logo.png" class="w-auto" />
          <lms-playback-sidebar
            [chapters]="course()?.chapters"
            [courseId]="courseId()!"
            [selectedChapterId]="chapterId()!"
            [isPurchased]="course()?.isPurchased"
          ></lms-playback-sidebar>
        </div>
      </aside>
      <div class="flex flex-col w-full">
        <header class="flex w-full h-[50px]">
          <div>
            <a routerLink="/search">
              <button mat-button class="m-1">
                <mat-icon>arrow_back</mat-icon>
                Exit Course
              </button>
            </a>
          </div>
          <div class="flex flex-1"></div>
          <lms-user-button />
        </header>
        <main class="flex w-full">
          <div class="flex flex-col max-w-4xl mx-auto w-full">
            <div class="p-4">
              <lms-video-player
                [url]="chapter()?.videoUrl"
                [contentType]="chapter()?.videoContentType"
                [isLocked]="isLocked()"
              />
              <div
                class="flex flex-col md:flex-row items-center justify-between p-4"
              >
                <h2 class="text-2xl font-semibold mb-2">
                  {{ chapter()?.title }}
                </h2>
                @if(course()?.isPurchased && chapter()?.isCompleted) {
                <button mat-flat-button>Not Completed</button>
                } @else if(course()?.isPurchased) {
                <button mat-flat-button>Mark as completed</button>
                } @else {
                <button mat-flat-button>Purchase</button>
                }
              </div>
              <div>{{ course()?.description }}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: ``,
})
export default class ChapterPlaybackComponent implements OnInit {
  private courseStore = inject(CourseStore);
  private route = inject(ActivatedRoute);
  params = toSignal(this.route.paramMap);

  courseId = computed(() => this.params()?.get('courseId'));
  chapterId = computed(() => this.params()?.get('chapterId'));

  course = computed(() => this.courseStore.data());
  chapter = computed(() =>
    this.course()?.chapters.find((c) => c.id === this.chapterId())
  );
  isLocked = computed(
    () => !this.chapter()?.isFree && !this.course()?.isPurchased
  );

  ngOnInit(): void {
    this.courseStore.load$.next(this.courseId()!);
  }
}
