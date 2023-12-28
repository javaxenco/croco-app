import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'slots',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: '',
    redirectTo: 'slots',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
