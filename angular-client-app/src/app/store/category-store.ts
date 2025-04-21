import { Injectable } from '@angular/core';
import { ApiResponse, Category } from '../shared/types';
import { Store } from './store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryStore extends Store<Category[]> {
  selectCategory(id: string): void {
    this.state.update((prevState) => ({
      ...prevState,
      data: prevState.data!.map((category) => ({
        ...category,
        isSelected:
          category.id === id ? !category.isSelected : category.isSelected,
      })),
    }));
  }

  override fetchData(): Observable<ApiResponse<Category[]>> {
    const url = import.meta.env.NG_APP_API_URL + '/categories';
    return this.http.get<ApiResponse<Category[]>>(url);
  }
}
