import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent]
})
export class SolicitudPage implements OnInit {

  constructor(private router: Router) { }

  volverAlMenuPrincipal() {
    this.router.navigate(['/home-conductor']); // Redirecciona a la página correspondiente
  }

  ngOnInit() {
  }

}
