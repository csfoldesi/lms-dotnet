import { Component, input, output } from '@angular/core';
import { Category } from '../../shared/types';
import { CategoryItemComponent } from './category-item.component';

@Component({
  selector: 'lms-categories',
  imports: [CategoryItemComponent],
  template: `
    <div>
      @for(category of categories(); track category.id) {
      <a (click)="selectCategory.emit(category.id)">
        <lms-category-item
          [label]="category.name"
          [icon]="iconMap[category.name]"
          [selected]="category.isSelected"
        />
      </a>
      }
    </div>
  `,
  styles: ``,
})
export class CategoriesComponent {
  categories = input<Category[] & { isSelected: boolean }[]>();
  selectCategory = output<string>();

  iconMap: Record<Category['name'], string> = {
    Music: 'music_note',
    Photography: 'photo_camera',
    Fitness: 'directions_bike',
    Accounting: 'calculate',
    'Computer Science': 'devices',
    Filming: 'local_movies',
    Engineering: 'engineering',
  };
}
