import { Component, inject, OnInit } from '@angular/core';
import { CategoryStore } from '../store/category-store';
import { CourseStore } from '../store/course-store';
import { CourseListStore } from '../store/course-list.store';

@Component({
  selector: 'lms-search',
  imports: [],
  template: `
    <div class="container mx-auto">
      <h1>Categories</h1>
      @for(category of categories(); track category.id) {
      <p>{{ category.name }}</p>
      }
      <h1>Courses</h1>
      @for(course of courses(); track course.id) {
      <p>
        <a (click)="courseStore.load$.next(course.id)">{{ course.title }}</a>
      </p>
      }
      <div>
        <h2>Selected course</h2>
        @if(selectedCourse(); as course){
        <p>{{ course.title }}</p>
        }
      </div>
    </div>
  `,
  styles: '',
})
export default class SearchComponent implements OnInit {
  courseListStore = inject(CourseListStore);
  courses = this.courseListStore.data;

  categoryStore = inject(CategoryStore);
  categories = this.categoryStore.data;

  courseStore = inject(CourseStore);
  selectedCourse = this.courseStore.data;

  ngOnInit(): void {
    this.categoryStore.load$.next();
    this.courseListStore.load$.next();
  }
}
