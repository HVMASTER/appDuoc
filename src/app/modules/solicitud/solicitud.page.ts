import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ObtenerSolicitud } from 'src/app/interfaces/solicitud.interface';
import { AcceptTripsService } from 'src/app/services/acceptTrips.service';
import { DataService } from 'src/app/services/data.service';
import { forkJoin, map } from 'rxjs';
import { DatosConductor } from 'src/app/interfaces/conductor.interface';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent],
})
export class SolicitudPage implements OnInit {
  
  solicitudesDisp: ObtenerSolicitud[] = [];
  id_user = Number(localStorage.getItem('user-id'));
  datosConductor: DatosConductor[] = [];
  solicitudSeleccionada: ObtenerSolicitud | null = null;
  mostrarModal = false;
 


  constructor(private router: Router, private dataService: DataService, private acceptTripsService: AcceptTripsService, private alertController: AlertController) {

    
  }

  getTotalFound(id: number) {
    return this.acceptTripsService.getCountAccepTrips(id);
  }

  async alertaModalAccept(){
    const alert = await this.alertController.create({
      header: 'Solicitud aceptada',
      message: '¡Genial! Has aceptado una solicitud con exito.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async alertaModalError(){
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: 'Tu solicitud ya fue aceptada, espera a tu conductor en el punto de encuentro.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async aceptarSolicitud(id_solicitud: number, id_user: number, id_vehiculo: number) {
    this.acceptTripsService.getSolicitudesAceptadasPorUsuario(id_user).subscribe((solicitudesAceptadas) => {
      if (solicitudesAceptadas && solicitudesAceptadas.length > 0) {
        this.alertaModalError();
        console.log('El usuario ya tiene una solicitud aceptada.');
        this.obtDatosConductor(id_vehiculo);
      } else {
        this.acceptTripsService.postDatosAcceptTrips(id_solicitud, id_user, id_vehiculo).subscribe((data) => {
          this.alertaModalAccept();
          this.obtDatosConductor(id_vehiculo);
        });
        this.dataService.updateEstadoSolicitud(id_solicitud).subscribe((data) => {
          console.log(data);
        })
        console.log('ID_SOLICITUD: ', id_solicitud, 'ID_USUARIO: ', id_user, 'ID_VEHICULO: ', id_vehiculo);
      }
    });
    }

  async obtDatosConductor(id_vehiculo: number){
    await this.acceptTripsService.getDatosConductor(id_vehiculo).subscribe((datosConductor) => {
      this.datosConductor = datosConductor;
      console.log(this.datosConductor);
    });
    return this.datosConductor;
  }


  cargarSolicitudes() {
    this.dataService.obtSolicitudDisp().subscribe((data) => {
      for (const obtSolicitud of data) {
        // Calcula los asientos disponibles para cada solicitud y agrégalo al objeto
        this.calcularAsientosDisponibles(obtSolicitud).subscribe((asientos) => {
          obtSolicitud.asientos = asientos;
          this.solicitudesDisp.push(obtSolicitud);
        });
      }
    });
  }

  calcularAsientosDisponibles(solicitud: ObtenerSolicitud) {
    return this.getTotalFound(solicitud.id_solicitud).pipe(
      map((total) => {
        const asientosBase = 4;
        return asientosBase - total;
      })
    );
  }
  
  ngOnInit() {
    this.cargarSolicitudes();

    const observables = this.solicitudesDisp.map((solicitud) => {
      return this.calcularAsientosDisponibles(solicitud);
    });

    forkJoin(observables).subscribe((asientosDisponibles) => {
      for (let i = 0; i < asientosDisponibles.length; i++) {
        this.solicitudesDisp[i].asientos = asientosDisponibles[i];
      }
    }); 

  }

  seleccionarSolicitud(){
    this.solicitudSeleccionada = this.solicitudesDisp[0];
    this.obtDatosConductor(this.solicitudSeleccionada.id_vehiculo);
    this.mostrarModal = true;
  }

  cerrarModal(){
    this.mostrarModal = false;
  }


  volverAlMenuPrincipal() {
    this.router.navigate(['/home']);
  }
}

