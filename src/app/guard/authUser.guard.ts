import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  tipoUsuario = localStorage.getItem('tipoUsuario');

  constructor(private router: Router,) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( this.tipoUsuario === 'usuario' ){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}

