import { computed, inject, Injectable, signal } from '@angular/core';
import { Category } from '../types/category';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../types/api-response';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { connect } from 'ngxtension/connect';

type Data = {
  categories: Category[];
  loaded: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  private state = signal<Data>({
    categories: [],
    loaded: false,
  });

  categories = computed(() => {
    if (!this.state().loaded) {
      this.load$.next();
    }
    return this.state().categories;
  });

  load$ = new Subject<void>();

  private fetchCategories() {
    const apiUrl = import.meta.env.NG_APP_API_URL + '/categories';
    return this.http.get<ApiResponse<Category[]>>(apiUrl).pipe(
      catchError((err) => {
        return EMPTY;
      }),
      map((response) => response.data)
    );
  }

  constructor() {
    connect(this.state).with(
      this.load$.pipe(switchMap(() => this.fetchCategories())),
      (state, categories) => ({
        ...state,
        categories,
        loaded: true,
      })
    );
  }
}
