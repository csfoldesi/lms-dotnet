import { Injectable } from '@angular/core';
import { ApiResponse, Course } from '../shared/types';
import { Store } from './store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseStore extends Store<Course> {
  override fetchData(id: string): Observable<ApiResponse<Course>> {
    const url = `${import.meta.env.NG_APP_API_URL}/courses/${id}`;
    return this.http.get<ApiResponse<Course>>(url);
  }
}
