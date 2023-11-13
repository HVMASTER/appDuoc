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
  solicitudSeleccionada: ObtenerSolicitud | null = null;
  mostrarModal = false;
  datosVehiculos: DatosConductor | null = null;
 

  constructor(private router: Router, private dataService: DataService, private acceptTripsService: AcceptTripsService, private alertController: AlertController) {
    
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

  async obtDatosConductor(id_vehiculo: number){
    await this.acceptTripsService.getDatosConductor(id_vehiculo).subscribe((datosConductor) => {
      this.datosVehiculos = datosConductor[0];
      console.log(this.datosVehiculos);
    });
    return this.datosVehiculos;
  }

  async aceptarSolicitud(id_solicitud: number, id_user: number, id_vehiculo: number) {
    this.acceptTripsService.getSolicitudesAceptadasPorUsuario(id_user).subscribe((solicitudesAceptadas) => {
      if (solicitudesAceptadas && solicitudesAceptadas.length > 0) {
        this.alertaModalError();
      } else {
        this.acceptTripsService.postDatosAcceptTrips(id_solicitud, id_user, id_vehiculo).subscribe((data) => {
          this.alertaModalAccept();
          setTimeout(() => {
          window.location.reload();
          }, 2000);
        });
        // this.dataService.updateEstadoSolicitud(id_solicitud).subscribe((data) => {
        //   console.log(data);
        // })
        console.log('ID_SOLICITUD: ', id_solicitud, 'ID_USUARIO: ', id_user, 'ID_VEHICULO: ', id_vehiculo);
      }
    });
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
    this.dataService.obtSolicitudDisp().subscribe((data) => {
      for (const obtSolicitud of data) {
        // Calcula los asientos disponibles para cada solicitud y lo agrega al objeto
        this.calcularAsientosDisponibles(obtSolicitud).subscribe((asientos) => {
          obtSolicitud.asientos = asientos;
          this.solicitudesDisp.push(obtSolicitud);
        });
      }
    });
  }

  //inicia cargando las solicitudes disponibles y calculando los asientos disponibles para cada una de ellas. Luego, actualiza las solicitudes en solicitudesDisp con esta información
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

  seleccionarSolicitud(solicitud : ObtenerSolicitud){
    this.solicitudSeleccionada = solicitud;
    this.obtDatosConductor(this.solicitudSeleccionada.id_vehiculo);
    this.cerrarModal();
    this.mostrarModal = true;
  }

  cerrarModal(){
    this.mostrarModal = false;
  }


  volverAlMenuPrincipal() {
    this.router.navigate(['/home']);
  }

}

