import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomeCardComponent  implements OnInit {

  message = '';

  @ViewChild(IonModal) modal!: IonModal;
  modalController: any;

  constructor(private registroService: RegistroService, private router: Router, modalController: ModalController, private alertController: AlertController) { }

  cancel() {
    this.modal.dismiss({ confirmed: true});
    console.log('cancel');
    this.router.navigate(['/home']);
  }

  confirm() {
    this.modal.dismiss({ confirmed: false});
    this.alertaModal();
    console.log('confirm');
  }

  async alertaModal(){
    const alert = await this.alertController.create({
      header: 'Viaje solicitado',
      message: '¡Genial! Has creado un viaje con exito.',
      buttons: ['OK']
    });

    await alert.present();
  }

  onWillDismiss(event: Event){
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm'){
      
    };
  }

  ngOnInit() {

  }

  functionFrom(){
    this.router.navigate(['/home']);
  }

  functionRutas(){
    this.router.navigate(['/rutas']);
  }

  registroConductor(){
    this.router.navigate(['/registro-conductor']);
  }

  abrirModal() {
    this.presentModal();
  }

  async presentModal() {

    const modal = await this.modalController.create({
      component: 'app-home-card',
      componentProps: {
        
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      // Se ejecutará si se confirma o cancela el modal, data contendrá la información que necesites
      console.log('Modal cerrado. Datos recibidos:', data);

      // Redireccionar a la página de inicio
      this.router.navigate(['/home']);
    }
  }
}
