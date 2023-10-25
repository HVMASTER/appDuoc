import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { DataService } from 'src/app/services/data.service';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';
import { AcceptTripsService } from 'src/app/services/acceptTrips.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent]
})
export class SolicitudPage implements OnInit {

  origen: string = '';
  destino: string = '';
  estado: string = '';
  asientos: number = 0;

  solicitudesDisp: Solicitud[] = []; 
  

  constructor(private router: Router, private dataService: DataService, private acceptTripsService: AcceptTripsService) { 
    
  }

  // viajeDisp() {
  //   this.dataService.getSolicDisp().subscribe((data) => {
  //   if(data.estado === 'Disponible') {
  //     this.origen = data.origen;
  //     this.destino = data.destino;
  //     this.estado = data.estado;   
  //   }
  // });

  // }

  asientosDisponibles(id: Number) {
    let asientosDisponibles = 0;
    
    return asientosDisponibles;
    
  }

    
  cargarSolicitudes() {
    this.dataService.getSolicDisp().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        let asientosDisponibles = 0;
        this.getTotalFound(data[i].id_solicitud).subscribe((total) => {
          console.log('TOTAL: ',4 - total);
          asientosDisponibles = 4 - total
          const solicitud = {...data[i], asientosDisponibles};
          this.solicitudesDisp.push(solicitud);
        });
   
        console.log(this.solicitudesDisp);
        
      }
      
    });
  }

  getTotalFound(id: Number) {
    return this.acceptTripsService.getCountAccepTrips(id).pipe(
      map((data) => data.length)
    );
  }

  volverAlMenuPrincipal() {
    this.router.navigate(['/home']); // Redirecciona a la página correspondiente
  }
 
  ngOnInit() {
    this.cargarSolicitudes();
  }

  

}
