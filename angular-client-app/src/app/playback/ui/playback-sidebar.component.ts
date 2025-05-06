import { Component, computed, input } from '@angular/core';
import { Chapter } from '../../shared/types';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lms-playback-sidebar',
  imports: [MatListModule, MatIconModule, RouterModule, NgClass],
  template: `
    <mat-list role="list">
      @for(chapter of chapters(); track chapter.id) {
      <a routerLink="/courses/{{ courseId() }}/chapters/{{ chapter.id }}">
        <mat-list-item
          role="listitem"
          class="m-2"
          [ngClass]="{
            'border-blue-800 border-r-4': chapter.id === selectedChapterId()
          }"
        >
          <div class="cursor-pointer flex">
            <mat-icon matListItemIcon class="mr-2">
              {{ icon(chapter) }}
            </mat-icon>
            {{ chapter.title }}
          </div>
        </mat-list-item>
      </a>
      }
    </mat-list>
  `,
  styles: ``,
})
export class PlaybackSidebarComponent {
  courseId = input.required<string>();
  chapters = input<Chapter[] | null>();
  selectedChapterId = input.required<string>();
  isPurchased = input<boolean | undefined>(false);

  icon(chapter: Chapter): string {
    if (!this.isPurchased() && !chapter.isFree) return 'lock_outline';
    else if (chapter.isCompleted) return 'check_circle_outline';
    return 'play_circle_outline';
  }
}
