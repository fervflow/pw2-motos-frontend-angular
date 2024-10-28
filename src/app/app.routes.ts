import { Routes } from '@angular/router';
import { MotoIndexComponent } from './features/moto/moto-index/moto-index.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { 
    path: 'motos',
    loadChildren: () => import('./features/moto/moto.routes').then(r => r.MOTO_ROUTES),
    title: 'Motocicletas',
  },
  {
    path: '',
    // component: MotoIndexComponent,
    redirectTo: 'motos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'motos',
  },
];
