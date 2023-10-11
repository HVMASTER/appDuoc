import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
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
    path: 'home-conductor',
    loadComponent: () => import('./modules/home-conductor/home-conductor.page').then( m => m.HomeConductorPage)
  },
  {
    path: 'rutas',
    loadComponent: () => import('./modules/rutas/rutas.page').then( m => m.RutasPage)
  },
  {
    path: 'viajes',
    loadComponent: () => import('./modules/solicitud/solicitud.page').then( m => m.SolicitudPage)
  },
  {
    path: 'prueba',
    loadComponent: () => import('./modules/prueba/prueba.page').then( m => m.PruebaPage)
  },




];
