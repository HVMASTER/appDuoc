import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { DataService } from 'src/app/services/data.service';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';

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

  solicitudesDisp: Solicitud[] = []; 

  constructor(private router: Router, private dataService: DataService) { 
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

  cargarSolicitudes() {
    this.dataService.getSolicDisp().subscribe((data) => {
      this.solicitudesDisp = data;
    });
  }



  volverAlMenuPrincipal() {
    this.router.navigate(['/home-conductor']); // Redirecciona a la página correspondiente
  }

  ngOnInit() {
    this.cargarSolicitudes();
    console.log(this.solicitudesDisp);
  }

}
