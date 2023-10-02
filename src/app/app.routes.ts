import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadComponent: () => import('./modules/auth/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'recuperacion',
    loadComponent: () => import('./modules/auth/recuperacion/recuperacion.page').then( m => m.RecuperacionPage) 
  },
  {
    path: 'registro-conductor',
    loadComponent: () => import('./modules/auth/registro-conductor/registro-conductor.page').then( m => m.RegistroConductorPage)
  },
  {
    path: 'rutas',
    loadComponent: () => import('./modules/auth/rutas/rutas.page').then( m => m.RutasPage)
  },
  {
    path: 'viajes',
    loadComponent: () => import('./modules/auth/viajes/viajes.page').then( m => m.ViajesPage)
  },



];
