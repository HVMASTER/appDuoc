import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-solicitud-card',
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SolicitudCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
