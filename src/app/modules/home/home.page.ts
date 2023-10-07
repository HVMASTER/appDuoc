import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderButtonsComponent } from '../../components/header-buttons/header-buttons.component';
import { HomeCarruselComponent } from '../../components/carrusel/carrusel.component';
import { CarruselItem } from '../../components/carrusel/carrusel.interface';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from '../../components/home-card/home-card.component';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderButtonsComponent, HomeCarruselComponent, CommonModule, HomeCardComponent],
})
export class HomePage implements OnInit {

  sesionStart = localStorage.getItem('sesionStart');

  imagenes: CarruselItem[] = []; 

  constructor(private registroService: RegistroService, private router: Router, private _cdr: ChangeDetectorRef) {

    if( !this.sesionStart ){
      this.router.navigate(['/login']);      
    }

    this.imagenes = [
      {
        url: 'assets/img/home-carrusel/slide-carrusel-1.jpg',
        alt: 'descripcion',
      },
      {
        url: 'assets/img/home-carrusel/slide-carrusel-2.jpg',
        alt: 'descripcion',
      },
      {
        url: 'assets/img/home-carrusel/slide-carrusel-3.jpg',
        alt: 'descripcion',
      },
    ];
  }

  // get usuarioLogueado() {
  //   return this.registroService.usuarioLogueado;
  // }

  ngOnInit() {  
    this._cdr.detectChanges();
    
  }

}
