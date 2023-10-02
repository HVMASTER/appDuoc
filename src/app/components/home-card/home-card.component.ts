import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private registroService: RegistroService, private router: Router, modalController: ModalController) { }

  cancel() {
    this.modal.dismiss({ confirmed: true});
    console.log('cancel');
    this.router.navigate(['/home']);
  }

  confirm() {
    this.modal.dismiss({ confirmed: false});
    console.log('confirm');
  }

  onWillDismiss(event: Event){
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm'){
      this.message = `hola, ${ev.detail.data}!`;
    };
  }

  ngOnInit() {

  }

  functionFrom(){
    this.router.navigate(['/home']);
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
        custom_id: this.registroService.modalPrueba()
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
