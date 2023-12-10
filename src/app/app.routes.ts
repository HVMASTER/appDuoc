import { Routes } from '@angular/router';
import { HomePage } from './modules/home/home.page';
import { HomeConductorPage } from './modules/home-conductor/home-conductor.page';
import { AuthGuard } from './guard/authUser.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'presentation',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard],
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

    loadComponent: () => import('./modules/auth/registro-conductor/registro-conductor.page').then( m => m.RegistroConductorPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'home-conductor',
    loadComponent: () => import('./modules/home-conductor/home-conductor.page').then( m => m.HomeConductorPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'rutas',
    loadComponent: () => import('./modules/rutas/rutas.page').then( m => m.RutasPage)
  },
  {
    path: 'solicitud',
    loadComponent: () => import('./modules/solicitud/solicitud.page').then( m => m.SolicitudPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'crear-viaje',
    loadComponent: () => import('./modules/crear_viaje/viajes.page').then( m => m.ViajesPage),
    canActivate: [AuthGuard],
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
    },   {
    path: 'ver-solicitud',
    loadComponent: () => import('./modules/ver-solicitud/ver-solicitud.page').then( m => m.VerSolicitudPage)
  },
  {
    path: 'download-app',
    loadComponent: () => import('./modules/download-app/download-app.page').then( m => m.DownloadAppPage)
  },
  {
    path: 'presentation',
    loadComponent: () => import('./modules/presentation/presentation.page').then( m => m.PresentationPage)
  },



];
