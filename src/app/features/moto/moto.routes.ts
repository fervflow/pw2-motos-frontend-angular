import { Routes } from '@angular/router';

export const MOTO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./moto-index/moto-index.component')
        .then(c => c.MotoIndexComponent),
    title: 'Motocicletas Index'
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./moto-form/moto-form.component')
        .then(c => c.MotoFormComponent),
    title: 'Crear Motocicleta'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./moto-form/moto-form.component')
        .then(c => c.MotoFormComponent),
    title: 'Editar Motocicleta'
  }
];