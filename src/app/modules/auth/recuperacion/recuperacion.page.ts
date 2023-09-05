import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RecuperacionPage implements OnInit {

  correo = "";

  formularioRecuperacion: FormGroup;
  mostrarMensajeExito: boolean = false;

  constructor(private registroService: RegistroService, private formBuilder: FormBuilder, private router: Router, private alertController: AlertController) { 
    this.formularioRecuperacion = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  async mostrarAlertaInicioSesion() {
    const alert = await this.alertController.create({
      header: 'Correo Enviado',
      message: 'Su correo de recuperacion de contraseña a sido enviado exitosamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async recuperarContrasena() {
    try {
      await this.registroService.simularEnvioCorreoRecuperacion(this.correo);
      // Simulación de recuperación de contraseña exitosa
      this.mostrarMensajeExito = true;
      // Redirige al usuario al login
      this.mostrarAlertaInicioSesion()
      this.router.navigate(['/login']);
    } catch (error) {
      // Simulación de recuperación de contraseña fallida
      this.mostrarMensajeExito = false;
      alert('No se pudo encontrar una cuenta asociada a ese correo.');
    }
  }

  ngOnInit() {
  }

}
