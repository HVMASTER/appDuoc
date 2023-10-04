import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-card-conductor',
  templateUrl: './home-card-conductor.component.html',
  styleUrls: ['./home-card-conductor.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomeCardConductorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
