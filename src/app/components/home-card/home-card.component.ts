import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomeCardComponent  implements OnInit {

  constructor(private registroService: RegistroService, private router: Router) { }

  ngOnInit() {

  }

  functionRegistroConductor() {
    this.router.navigate(['/registro-conductor']);
  }

  functionRutas() {
    this.router.navigate(['/rutas']);
  }

  functionFrom() {
    this.router.navigate(['/login']);
  }

}
