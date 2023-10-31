import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ObtenerSolicitud } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.page.html',
  styleUrls: ['./ver-solicitud.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VerSolicitudPage implements OnInit {

  id_user = Number(localStorage.getItem('user-id'));
  solicitudAccept: ObtenerSolicitud | null = null;

  constructor(private dataService: DataService) { }

  async verSolicitud() {
    try {
      const solicitudes = await this.dataService.getSolicitudAceptada(this.id_user).toPromise();
      if (solicitudes && solicitudes.length > 0) {
        this.solicitudAccept = solicitudes[0];
        console.log(this.solicitudAccept);
      } else {
        console.error('No se encontró ninguna solicitud aceptada');
      }
    } catch (error) {
      console.error('Error al obtener la solicitud aceptada', error);
    }
  }

  ngOnInit() {
    this.verSolicitud();
  }

}
