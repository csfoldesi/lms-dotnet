import { computed, effect, inject, signal } from '@angular/core';
import { connect } from 'ngxtension/connect';
import {
  catchError,
  EMPTY,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { ApiResponse } from '../shared/types';
import { HttpClient } from '@angular/common/http';

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export abstract class Store<T> {
  http = inject(HttpClient);

  public state = signal<State<T>>({
    data: null,
    loading: false,
    error: null,
  });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  load$ = new Subject<string | void>();

  constructor() {
    effect(() => console.log('State:', this.state()));

    connect(this.state).with(
      this.load$.pipe(
        tap(() => this.setLoading(true)),
        switchMap((params) => this.fetchData(params)),
        catchError((err) => {
          this.setError(err.message);
          this.setLoading(false);
          return EMPTY;
        }),
        map((response) => response.data)
      ),
      (_, data) => ({
        data,
        loading: false,
        error: null,
      })
    );
  }

  setLoading(loading: boolean): void {
    this.state.update((prevState) => ({ ...prevState, data: null, loading }));
  }

  setError(error: string | null): void {
    this.state.update((prevState) => ({ ...prevState, error }));
  }

  abstract fetchData(params: string | void): Observable<ApiResponse<T>>;
}
