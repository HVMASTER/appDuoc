import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent]
})
export class ViajesPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

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
