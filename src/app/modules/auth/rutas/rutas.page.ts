import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

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
  mostrarDetalles: boolean = false;

  constructor(private router: Router) { }

  functionLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
