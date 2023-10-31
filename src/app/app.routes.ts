import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './modules/home/home.page';
import { HomeConductorPage } from './modules/home-conductor/home-conductor.page';
import { AuthGuard } from './guard/authUser.guard';
import { AuthGuardConductor } from './guard/auth-conductor.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
  }
  ,
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
    // canActivate: [AuthGuard],
    loadComponent: () => import('./modules/auth/registro-conductor/registro-conductor.page').then( m => m.RegistroConductorPage)
  },
  {
    path: 'home-conductor',
    // canActivate: [AuthGuardConductor],
    loadComponent: () => import('./modules/home-conductor/home-conductor.page').then( m => m.HomeConductorPage)
  },
  {
    path: 'rutas',
    loadComponent: () => import('./modules/rutas/rutas.page').then( m => m.RutasPage)
  },
  {
    path: 'solicitud',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./modules/solicitud/solicitud.page').then( m => m.SolicitudPage)
  },
  {
    path: 'crear-viaje',
    // canActivate: [AuthGuardConductor],
    loadComponent: () => import('./modules/crear_viaje/viajes.page').then( m => m.ViajesPage)
  },
  //Rutas del Footer
  {
    path: 'registro-conductor/home',
    component: HomePage,
    },
    {
      path: 'rutas/home',
      component: HomePage,
    },
    {
      path: 'solicitud/home',
      component: HomePage,
    },
    {
      path: 'crear-viaje/home',
      component: HomeConductorPage,
    }, 
];
