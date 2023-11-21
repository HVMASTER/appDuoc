import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { DataService } from 'src/app/services/data.service';
import { AcceptTripsService } from 'src/app/services/acceptTrips.service';
import { GmapService } from '../../services/gmaps/gmap.service';
import { debounceTime, from } from 'rxjs';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent]
})
export class ViajesPage implements OnInit {

  origen: string = '';
  destino: string = '';
  id_vehiculo = Number(localStorage.getItem('vehiculo-id'));
  id_user = Number(localStorage.getItem('user-id'));
  origenMap: any;
  destinoMap: string = '';

  constructor(private router: Router, private alertController: AlertController, private dataService: DataService, private accepTrips: AcceptTripsService, private GmapService: GmapService) {

   }


  solicitarViaje(origen: string, destino: string) {
    if (origen === '' || destino === '') {
      alert('Por favor, ingrese todos los campos');
      return;
    }

    this.dataService.getSolicitudUser(this.id_user).subscribe({
      next: (solicitudes) => {
        const solicitudEspera = solicitudes.some(solicitud => solicitud.estado === 'Espera');

        if (solicitudEspera) {
          this.alertaModalError();
        } else {
          this.dataService.postSolicitud({
            origen: origen,
            destino: destino,
            estado: 'Disponible',
            id_vehiculo: this.id_vehiculo,
            id_user: Number(localStorage.getItem('user-id'))
          }).subscribe({
            next: (Response: any) => {
              this.alertaModal();
              this.router.navigate(['/home-conductor']);
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
      }
    });
  }

  async alertaModal() {
    const alert = await this.alertController.create({
      header: 'Viaje solicitado',
      message: '¡Genial! Has creado un viaje con exito.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaModalError() {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: 'Ya tienes una solicitud en espera. Termina tu viaje actual para crear uno nuevo.',
      buttons: ['OK']
    }); 

    await alert.present();
  }

  volverAlMenuPrincipal() {
    this.router.navigate(['/home-conductor']); // Redirecciona a la página correspondiente
  }

  // Función para buscar la dirección en el mapa
  searchAdress(event) {
    if (this.origen.length >= 5) {
      debounceTime(2000);// Espera 2 segundos para realizar la búsqueda
      this.GmapService.autoComplete(this.origen).then((result: any) => {
        this.origenMap = result;
        console.log('origen: ', this.origenMap);
      });
    }
  }

  // Función para seleccionar la dirección en el mapa
  selectItem(item) {
    this.origenMap = [];
    this.origen = item; 
  }

  ngOnInit() {

    
  }

}

