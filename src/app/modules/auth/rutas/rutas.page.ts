import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RutasPage implements OnInit {

  nombre: string = '';
  origen: string = '';
  destino: string = '';
  distancia: string = '';
  tiempoEstimado: string = '';
  costo: number = 0;
  mostrarDetalles: boolean = false;

  checkboxValue: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
