import { Routes } from '@angular/router';
import { HomePage } from './modules/home/home.page';
import { HomeConductorPage } from './modules/home-conductor/home-conductor.page';

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
    path: 'solicitud',
    loadComponent: () => import('./modules/solicitud/solicitud.page').then( m => m.SolicitudPage)
  },
  {
    path: 'viajes',
    loadComponent: () => import('./modules/viajes/viajes.page').then( m => m.ViajesPage)
  },
  {
  path: 'registro-conductor/home',
  component: HomePage,
  },
  {
    path: 'rutas/home',
    component: HomePage,
  },
  {
    path: 'viajes/home',
    component: HomePage,
  },
  {
    path: 'solicitud/home',
    component: HomeConductorPage,
  }
];
