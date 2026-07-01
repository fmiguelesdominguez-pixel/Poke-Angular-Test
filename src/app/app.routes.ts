import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./poke/pages/dashboard-page/dashboard-page.component'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./poke/pages/trending-page/trending-page.component'),
      },

      {
        path: 'search',
        loadComponent: () => import('./poke/pages/search-page/search-page.component'),
      },
      {
        path: 'trending-3',
        loadComponent: () => import('./poke/pages/trending-3-page/trending-3-page.component'),
      },
      {
        path: 'history/:query',
        loadComponent: () => import('./poke/pages/poke-history/poke-history.component'),
      },
      {
        path: 'pokemon/:id',
        loadComponent: () => import('./poke/pages/pokemon-detail-page/pokemon-detail-page.component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
