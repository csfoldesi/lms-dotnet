import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'lms-course-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    MatProgressBarModule,
  ],
  template: `
    <div
      class="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full"
    >
      <div class="relative w-full aspect-video rounded-md overflow-hidden">
        <img class="object-cover" alt="{{ title() }}" src="{{ imageUrl() }}" />
      </div>
      <div class="flex flex-col pt-2">
        <div
          class="text-ld md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2"
        >
          {{ title() }}
        </div>
        <p class="text-xs text-muted-foreground">{{ category() }}</p>
        <div class="my-3 flex items-center gap-x-2 text-xs md:text-xs">
          <div class="flex items-center gap-x-1 text-slate-500">
            <mat-icon>library_books</mat-icon>
            <span> {{ chapters() }} chapters</span>
          </div>
        </div>
        <p class="text-md md:text-sm font-medium text-slate-700">
          {{ price() | currency : 'USD' : 'symbol' }}
        </p>
        <mat-progress-bar
          mode="determinate"
          [value]="progress()"
        ></mat-progress-bar>
      </div>
    </div>
  `,
  styles: ``,
})
export class CourseCardComponent {
  title = input.required<string>();
  imageUrl = input<string>();
  category = input<string>();
  chapters = input<number>();
  price = input<number>();
  progress = input<number>();
}
