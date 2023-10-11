import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HeaderButtonsComponent  implements OnInit {

  apellidos = localStorage.getItem('user-apellidos');
  user = localStorage.getItem('user-name');
  tipoUser = localStorage.getItem('user-tipo');


  validarData = false;


  constructor(private registroService: RegistroService, private router: Router, private _cdr: ChangeDetectorRef) {}   

  ngOnInit() {
    if (this.user) {
      this.validarData = true;
      this._cdr.detectChanges();   
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
