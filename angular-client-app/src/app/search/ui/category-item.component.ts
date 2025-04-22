import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lms-category-item',
  imports: [MatButtonModule, MatIconModule],
  template: `
    @if(selected()) {
    <button mat-flat-button class="m-1">
      <mat-icon>{{ icon() }}</mat-icon>
      <span class="hidden md:inline">{{ label() }}</span>
    </button>
    } @else {
    <button mat-stroked-button class="m-1">
      <mat-icon>{{ icon() }}</mat-icon>
      <span class="hidden md:inline">{{ label() }}</span>
    </button>
    }
  `,
  styles: ``,
})
export class CategoryItemComponent {
  label = input<string>();
  icon = input<string>();
  selected = input<boolean>();
}
