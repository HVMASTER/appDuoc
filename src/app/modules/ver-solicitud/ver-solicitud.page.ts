import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ObtenerSolicitud, solicitudAlumno } from 'src/app/interfaces/solicitud.interface';
import { AcceptTripsService } from '../../services/acceptTrips.service';
import { RegistroService } from '../auth/auth.service';
import { VerSolicitudService } from '../../services/verSolicitud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.page.html',
  styleUrls: ['./ver-solicitud.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VerSolicitudPage implements OnInit {

  id_user = Number(localStorage.getItem('user-id'));
  solicitudAlumno: solicitudAlumno[] = [];
  solicitudConductor: ObtenerSolicitud[] = [];
  mostrarModal = false;



  constructor(private acceptTripsService: AcceptTripsService, private dataService: DataService, private registroService: RegistroService, private verSolicitudService: VerSolicitudService, private router: Router) { }


  async solicitudesAceptadas(id_solicitud: number) {
    return new Promise((resolve, reject) => {
      this.acceptTripsService.getDatosSolicitud(id_solicitud).subscribe(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async datosAlumnos(id_user: number) {
    return new Promise((resolve, reject) => {
      this.verSolicitudService.getDatosAlumnos(id_user).subscribe(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  obtSolicitudes() {
    this.dataService.getSolicitudUser(this.id_user).subscribe({
      next: async (solicitud) => {
        for (const obtSoliConductor of solicitud) {
          if(obtSoliConductor.estado === 'Aceptado' || obtSoliConductor.estado === 'Espera') {
          this.solicitudConductor.push({
            id_solicitud: obtSoliConductor.id_solicitud,
            id_user: obtSoliConductor.id_user,
            origen: obtSoliConductor.origen,
            destino: obtSoliConductor.destino,
            asientos: obtSoliConductor.asientos,
            estado: obtSoliConductor.estado,
            id_vehiculo: obtSoliConductor.id_vehiculo,
          });
          const datosAccept = await this.solicitudesAceptadas(obtSoliConductor.id_solicitud);

          for (const alumnos of datosAccept as any[]) {
            const datosAlumnos = await this.datosAlumnos(alumnos.id_user) as { nombre: string, apellido: string, tipo_user: string }[];
            console.log('DATOS ALUMNOS: ', datosAlumnos);
            this.solicitudAlumno.push({
              id_solicitud: alumnos.id_solicitud,
              id_user: alumnos.id_user,
              nombre: datosAlumnos[0].nombre,
              apellido: datosAlumnos[0].apellido,
              tipo_user: datosAlumnos[0].tipo_user,
            });
          }
          console.log('SOLICITUDES CONDUCTOR: ', solicitud);
          console.log('SOLICITUDES ACEPTADAS: ', datosAccept);
          }
        }
      }
    });
  }

  abrirModal(){
    this.mostrarModal = true;
  }

  cerrarModal(){
    this.mostrarModal = false;
  }

  volverAlMenuPrincipal() {
    this.router.navigate(['/home-conductor']);
  }
  


  
  ngOnInit() {
    this.obtSolicitudes()
  
  }
  
}
