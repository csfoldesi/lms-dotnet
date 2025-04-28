import { Injectable } from '@angular/core';
import { ApiResponse, Course } from '../shared/types';
import { Store } from './store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseListStore extends Store<Course[]> {
  override fetchData(params = ''): Observable<ApiResponse<Course[]>> {
    const url = `${import.meta.env.NG_APP_API_URL}/courses?${params}`;
    return this.http.get<ApiResponse<Course[]>>(url);
  }
}
