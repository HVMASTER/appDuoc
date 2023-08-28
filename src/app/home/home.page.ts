import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderButtonsComponent } from '../components/header-buttons/header-buttons.component';
import { HomeCarruselComponent } from '../components/carrusel/carrusel.component';
import { CarruselItem } from '../components/carrusel/carrusel.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderButtonsComponent, HomeCarruselComponent],
})
export class HomePage {

  imagenes: CarruselItem[] = []; 

  constructor() {

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

}
