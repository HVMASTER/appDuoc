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
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';
import { DatosConductor } from 'src/app/interfaces/conductor.interface';
import { GmapService } from 'src/app/services/gmaps/gmap.service';
import { MapComponent } from "../../components/map/map.component";



@Component({
    selector: 'app-solicitud',
    templateUrl: './solicitud.page.html',
    styleUrls: ['./solicitud.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, FooterComponent, MapComponent]
})
export class SolicitudPage implements OnInit {
  
  solicitudesDisp: ObtenerSolicitud[] = [];
  id_user = Number(localStorage.getItem('user-id')); 
  solicitudSeleccionada: ObtenerSolicitud | null = null;
  mostrarModal = false;
  mostrarModalMaps = false;
  datosVehiculos: DatosConductor | null = null;
  botonAceptar = true;
  loadingData = false;
 

  constructor(private router: Router, private dataService: DataService, private acceptTripsService: AcceptTripsService, private alertController: AlertController, private gmapService: GmapService) {
    
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
      message: 'Ya tienes una solicitud aceptada, espera a tu conductor en el punto de encuentro.',
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

  async aceptarSolicitud(id_solicitud: number, id_user: number, id_vehiculo: number, estado: string) {
    this.acceptTripsService.getSolicitudesAceptadasPorUsuario(id_user).subscribe((solicitudesAceptadas) => {
      if (solicitudesAceptadas && solicitudesAceptadas.length > 0) {
        this.alertaModalError();
      } else {
        this.acceptTripsService.postDatosAcceptTrips(id_solicitud, id_user, id_vehiculo, estado).subscribe((data) => {
          this.alertaModalAccept();
          this.solicitudAceptada();
        });
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
   
  cargarSolicitudes(): Observable<number[]> {
    return this.dataService.obtSolicitudDisp().pipe(
      switchMap((data) => {
        this.solicitudesDisp = data.map(obtSolicitud => ({
          ...obtSolicitud,
          aceptada: false, // Puedes establecer aquí el valor inicial de 'aceptada'
        }));

        const observables = this.solicitudesDisp.map(solicitud => this.calcularAsientosDisponibles(solicitud));
        return forkJoin(observables);
      })
    );
  }

  verificarSolicitudAceptada(id_user: number): Observable<void> {
    return this.acceptTripsService.getSolicitudesAceptadasPorUsuario(id_user).pipe(
      map((solicitudes: ObtenerSolicitud[]) => {
        solicitudes.forEach(solicitud => {
          const solicitudExistente = this.solicitudesDisp.find(s => s.id_solicitud === solicitud.id_solicitud);
          if (solicitudExistente) {
            solicitudExistente.aceptada = true;
          }
        });
      })
    );
  }

  ngOnInit() {
    this.loadingData = true;

    forkJoin([
      this.cargarSolicitudes(),
      this.verificarSolicitudAceptada(this.id_user),
    ]).pipe(
      switchMap(() => forkJoin(this.solicitudesDisp.map(solicitud => this.calcularAsientosDisponibles(solicitud))))
    )
    .subscribe(
      (asientosDisponibles) => {
        for (let i = 0; i < asientosDisponibles.length; i++) {
          this.solicitudesDisp[i].asientos = asientosDisponibles[i];
        }
        this.loadingData = false;
      },
      (error) => {
        console.error('Error al cargar los datos', error);
        this.loadingData = false;
      }
    );
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

  abrirModalMaps(){
    this.mostrarModalMaps = true;
  }

  cerrarModalMaps(){
    this.mostrarModalMaps = false;
  }

  volverAlMenuPrincipal() {
    this.router.navigate(['/home']);
  }

  solicitudAceptada() {
    this.acceptTripsService.getSolicitudesAceptadasPorUsuario(this.id_user).subscribe((solicitudesAceptadas) => {
      if (solicitudesAceptadas && solicitudesAceptadas.length > 0) {
        solicitudesAceptadas.forEach(solicitudAceptada => {
          const solicitud = this.solicitudesDisp.find(s => s.id_solicitud === solicitudAceptada.id_solicitud);
          if (solicitud) {
            solicitud.aceptada = true;
          }
        });
      } else {
        this.botonAceptar = true;
      }
    });     
  }





}

