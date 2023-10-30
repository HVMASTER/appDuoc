import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud, ObtenerSolicitud, ObtenerId } from 'src/app/interfaces/solicitud.interface';
import { AcceptTripsService } from 'src/app/services/acceptTrips.service';
import { DataService } from 'src/app/services/data.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent],
})
export class SolicitudPage implements OnInit {
  
  solicitudesDisp: ObtenerSolicitud[] = [];
  obtenerId: ObtenerId[] = []; 

  id_user = Number(localStorage.getItem('user-id'));

  constructor(private router: Router, private dataService: DataService, private acceptTripsService: AcceptTripsService) {}

  getTotalFound(id: number) {
    return this.acceptTripsService.getCountAccepTrips(id);
  }

  aceptarSolicitud(id_solicitud: number, id_usuario: number, id_vehiculo: number) {
    this.dataService.updateEstadoSolicitud(id_solicitud).subscribe((data) => {
      console.log(data);
    })
    console.log(id_solicitud, id_usuario, id_vehiculo);
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
        const asientosBase = 4; // Cambia el número base si es diferente
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

  volverAlMenuPrincipal() {
    this.router.navigate(['/home']);
  }
}

