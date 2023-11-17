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
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MapComponent } from 'src/app/components/map/map.component';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.page.html',
  styleUrls: ['./ver-solicitud.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent, MapComponent]
})
export class VerSolicitudPage implements OnInit {

  id_user = Number(localStorage.getItem('user-id'));
  solicitudAlumno: solicitudAlumno[] = [];
  solicitudConductor: ObtenerSolicitud[] = [];
  solicitudesDisp: ObtenerSolicitud[] = [];
  mostrarModal = false;
  tieneSolicitudesActivas: boolean = false;
  mostrarModalMaps = false;



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
          if (obtSoliConductor.estado === 'Aceptado' || obtSoliConductor.estado === 'Espera' || obtSoliConductor.estado === 'Disponible') {
            const datosAccept = await this.solicitudesAceptadas(obtSoliConductor.id_solicitud);
  
            for (const alumnos of datosAccept as ObtenerSolicitud[]) {
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
            this.calcularAsientosDisponibles(obtSoliConductor).subscribe((asientos) => {
              obtSoliConductor.asientos = asientos;
              this.solicitudConductor.push(obtSoliConductor);
            });
          }
        }
      }
    });
  }

  abrirModal(){
    this.mostrarModal = true;
  }

  abrirModalMaps(){
    this.mostrarModalMaps = true;
  }

  cerrarModal(){
    this.mostrarModal = false;
  }

  cerrarModalMaps(){
    this.mostrarModalMaps = false;
  }

  volverAlMenuPrincipal() {
    this.router.navigate(['/home-conductor']);
  }

  getTotalFound(id: number) {
    return this.acceptTripsService.getCountAccepTrips(id);
  }


  asientosDisponibles(id: Number) {
    let asientosDisponibles = 0;
    
    return asientosDisponibles;
    
  }

  calcularAsientosDisponibles(solicitud: ObtenerSolicitud) {
    return this.getTotalFound(solicitud.id_solicitud).pipe(
      map((total) => {
        const asientosBase = 4;
        return asientosBase - total;
      })
    );
  }

    
  cargarSolicitudes() {
    this.dataService.getSolicitudUser(this.id_user).subscribe((data) => {
      for (const obtSolicitud of data) {
        // Calcula los asientos disponibles para cada solicitud y lo agrega al objeto
        this.calcularAsientosDisponibles(obtSolicitud).subscribe((asientos) => {
          obtSolicitud.asientos = asientos;
          this.solicitudConductor.push(obtSolicitud);
        });
      }
    });
  }

  solicitudActiva(id_user: number) {
    this.dataService.getSolicitudUser(id_user).subscribe({
      next: (data) => {
        console.log('Solicitud activa: ', data);
        const numSolicitud = data.map((solicitud) => solicitud.id_solicitud);
        if (numSolicitud.length > 0) {
          this.tieneSolicitudesActivas = true;
        } else {
          this.tieneSolicitudesActivas = false;
        }
      }
    });
  }
  


  
  ngOnInit() {
    this.obtSolicitudes()
    console.log('Solicitudes conductor: ', this.solicitudConductor);
    
    this.solicitudActiva(this.id_user)

    // this.tieneSolicitudesActivas = this.solicitudConductor.some(
    //   (solicitud) => solicitud.id_solicitud !== null,
    // );
    // console.log('¿Tiene solicitudes activas?', this.tieneSolicitudesActivas);

    const observables = this.solicitudConductor.map((solicitud) => {
      return this.calcularAsientosDisponibles(solicitud);
    });

    forkJoin(observables).subscribe((asientosDisponibles) => {
      for (let i = 0; i < asientosDisponibles.length; i++) {
        this.solicitudesDisp[i].asientos = asientosDisponibles[i];
      }
    });
  
  }
  
}
