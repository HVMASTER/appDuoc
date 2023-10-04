import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderButtonsComponent } from "../../components/header-buttons/header-buttons.component";
import { HomeCardComponent } from "../../components/home-card/home-card.component";
import { HomeCardConductorComponent } from 'src/app/components/home-card-conductor/home-card-conductor.component';
import { HomeCarruselComponent } from "../../components/carrusel/carrusel.component";
import { CarruselItem } from "../../components/carrusel/carrusel.interface";
import { RegistroService } from '../auth/auth.service';

@Component({
    selector: 'app-home-conductor',
    templateUrl: './home-conductor.page.html',
    styleUrls: ['./home-conductor.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderButtonsComponent, HomeCardComponent, HomeCarruselComponent, HomeCardConductorComponent]
})
export class HomeConductorPage {

  imagenes: CarruselItem[] = []; 

  constructor(private registroService: RegistroService) {
    
    this.imagenes = [
      {
        url: 'assets/img/home-carrusel/rutas-carrusel-1.jpg',
        alt: 'Rutas',
      },
      {
        url: 'assets/img/home-carrusel/slide-carrusel-2.jpg',
        alt: 'Geolocalizacion',
      },
      {
        url: 'assets/img/home-carrusel/slide-carrusel-3.jpg',
        alt: 'Conductor',
      },
    ];
   }

  get usuarioLogueado() {
    return this.registroService.usuarioLogueado;
  }


}
