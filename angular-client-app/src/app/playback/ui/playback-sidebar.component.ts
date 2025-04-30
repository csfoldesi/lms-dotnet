import { Component, input } from '@angular/core';
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
              play_circle_outline
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
  chapters = input<Chapter[] | null>();
  courseId = input.required<string>();
  selectedChapterId = input.required<string>();
}
