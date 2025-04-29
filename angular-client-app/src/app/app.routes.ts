import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.component'),
  },
  {
    path: 'teacher',
    loadComponent: () => import('./teacher/teacher.component'),
  },
  {
    path: 'courses/:courseId/chapters/:chapterId',
    loadComponent: () => import('./playback/chapter-playback.component'),
  },
];
