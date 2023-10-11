import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HeaderButtonsComponent  implements OnInit {

  token = localStorage.getItem('token');
  username: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  role: string = '';


  validarData = false;


  constructor(private registroService: RegistroService, private router: Router, private _cdr: ChangeDetectorRef) {}   

  ngOnInit() {
    
    if( this.token !== null ){
      const decoded: any = jwt_decode(this.token);
      this.username = decoded['username'];
      this.name = decoded['name'];
      this.lastname = decoded['lastNameM'];
      this.email = decoded['email'];
      this.role = decoded['role'];
      this.validarData = true;
      this._cdr.detectChanges();  
    }else{
      this.router.navigate(['/login']);      
      return;
    }
  }

  logout() {
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-tipo');
    localStorage.removeItem('user-apellidos');
    localStorage.removeItem('sesionStart');
    this.router.navigate(['/login']);
    this._cdr.detectChanges();
  }


  loginView(){
    this.router.navigate(['/login']);
  }

  registroView(){
    this.router.navigate(['/registro']);
  }
}
