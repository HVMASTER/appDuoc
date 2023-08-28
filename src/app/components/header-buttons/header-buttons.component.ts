import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
  standalone: true,
  imports: [IonicModule,],
})
export class HeaderButtonsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
