import { Injectable } from '@angular/core';
import { ApiResponse, Category } from '../shared/types';
import { Store } from './store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryStore extends Store<Category[]> {
  override fetchData(): Observable<ApiResponse<Category[]>> {
    const url = import.meta.env.NG_APP_API_URL + '/categories';
    return this.http.get<ApiResponse<Category[]>>(url);
  }
}
