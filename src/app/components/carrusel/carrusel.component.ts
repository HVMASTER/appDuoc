import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarruselItem } from './carrusel.interface';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
}) 

export class HomeCarruselComponent  implements OnInit {

  @Input()
  imagenes: CarruselItem[] = []; 

  @Input()
  titulo: string = '';

  constructor() {}

  ngOnInit() {
    
  }

}
