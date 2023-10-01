import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';

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

  constructor(private registroService: RegistroService, private router: Router) { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    console.log('cancel');
    this.router.navigate(['/home']);
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
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

  functionFrom() {
    this.router.navigate(['/login']);
  }

}
