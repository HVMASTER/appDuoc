import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-card-conductor',
  templateUrl: './home-card-conductor.component.html',
  styleUrls: ['./home-card-conductor.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomeCardConductorComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  functionSolicitud(){
    this.router.navigate(['/crear-viaje']);
  }

  verSolicitud(){
    this.router.navigate(['/ver-solicitud']);
  }

}
