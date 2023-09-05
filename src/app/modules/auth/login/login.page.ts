import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  // Variables para almacenar el correo y contraseña ingresados en el formulario
  correo = '';
  contrasena = '';

  // FormGroup para gestionar el formulario de inicio de sesión
  // FormBuilder defino las validaciones de mi formulario y le entrego funciones (Validators.required

  formularioLogin: FormGroup;

  // Constructor del componente: creo mi formlario del login y le entrego las reglas de validacion asociadas
  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router, private alertController: AlertController) {
    this.formularioLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  //Alerta al iniciar sesión
  async mostrarAlertaInicioSesion() {
    const alert = await this.alertController.create({
      header: 'Sesión Iniciada',
      message: '¡Bienvenido! Has iniciado sesión con éxito en tu cuenta.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para manejar el evento de inicio de sesión
  iniciarSesion() {
    if (this.formularioLogin.valid) {
      // Aquí realizo la lógica de autenticación con el servicio correspondiente
      const correo = this.formularioLogin.value.correo;
      const contrasena = this.formularioLogin.value.contrasena;

      if (this.registroService.validarCredenciales(correo, contrasena)) {
        // Inicio de sesión exitoso
        this.mostrarAlertaInicioSesion()
        this.router.navigate(['/home']);// Cambia 'home' por la ruta deseada después del inicio de sesión
        return;
      } else {
        alert('Credenciales inválidas');
      }
    } else {
      alert('Por favor, verifica que todos los campos estén llenos y sean válidos.');
    }
  }
  ngOnInit() {
  }

}

