import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class FooterComponent  implements OnInit {

  obtTipoUser = localStorage.getItem('user-tipo');

  constructor() { }

  ngOnInit() {}

  volverHome() {
    if (this.obtTipoUser === 'usuario') {
      window.location.href = '/home';
      return;
    }
    if (this.obtTipoUser === 'conductor') {
      window.location.href = '/home-conductor';
      return;
    }
  }

}
