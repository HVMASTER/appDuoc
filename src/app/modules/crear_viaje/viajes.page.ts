import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private router: Router, private alertController: AlertController, private data: DataService) { }

  solicitarViaje(origen: string, destino: string){
    if (origen === '' || destino === '') {
      alert('Por favor, ingrese todos los campos');
      return;
    }

    this.data.postSolicitud({
      origen: origen,
      destino: destino,
      estado: 'Disponible',
      id_user: Number(localStorage.getItem('user-id'))
    }).subscribe({
      next: (Response: any) => {
        this.alertaModal();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  async alertaModal(){
    const alert = await this.alertController.create({
      header: 'Viaje solicitado',
      message: '¡Genial! Has creado un viaje con exito.',
      buttons: ['OK']
    });

    await alert.present();
  }

  volverAlMenuPrincipal() {
    this.router.navigate(['/home']); // Redirecciona a la página correspondiente
  }

  ngOnInit() {
  }

}
