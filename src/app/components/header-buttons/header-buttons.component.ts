import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RegistroService } from 'src/app/modules/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HeaderButtonsComponent  implements OnInit {

  nombre= '';
  apellidos= '';
  tipo= '';

  constructor(private registroService: RegistroService) {  }

  //Este es el método ngOnInit que se ejecutará cuando el componente se inicialice. Aquí se obtiene el usuario logueado desde el servicio y se asignan sus valores al nombre y apellidos del componente, si existe un usuario logueado.
  ngOnInit() {
    const usuarioLogueado = this.registroService.usuarioLogueado;
    const conductorLogueado = this.registroService.conductorLogueado;
    if (usuarioLogueado) {
      this.nombre = usuarioLogueado.nombre;
      this.apellidos = usuarioLogueado.apellidos
      if (conductorLogueado) {
        this.tipo = conductorLogueado.tipo;
      }
    }
  }
}