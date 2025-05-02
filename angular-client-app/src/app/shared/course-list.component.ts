import { Component, input } from '@angular/core';
import { Course } from './types';
import { CourseCardComponent } from './course-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lms-course-list',
  imports: [CourseCardComponent, RouterModule],
  template: `
    <div
      class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4"
    >
      @for(course of courses(); track course.id) {
      <a
        routerLink="/courses/{{ course.id }}/chapters/{{
          course.chapters[0].id
        }}"
      >
        <lms-course-card
          [title]="course.title"
          [imageUrl]="course.imageUrl"
          [category]="course.category"
        />
      </a>
      }
    </div>
  `,
  styles: ``,
})
export class CourseListComponent {
  courses = input<Course[] | null>();
}
