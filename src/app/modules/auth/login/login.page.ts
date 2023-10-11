import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiLoginService } from 'src/app/services/api-login.service';
import { LoginData } from 'src/app/interfaces/login.interface';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [RegistroService, ApiLoginService],
})
export class LoginPage {

  // Variables para almacenar el correo y contraseña ingresados en el formulario
  correo = '';
  contrasena = '';
  
  // FormGroup para gestionar el formulario de inicio de sesión
  // FormBuilder defino las validaciones de mi formulario y le entrego funciones (Validators.required

  formularioLogin: FormGroup;
  sesionStart = localStorage.getItem('sesionStart');
  private subscription: Subscription | undefined
  ;
  // Constructor del componente: creo mi formlario del login y le entrego las reglas de validacion asociadas
  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router, private alertController: AlertController, private apiLoginService: ApiLoginService) {

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

  iniciarSesion() {
    if (!this.formularioLogin.valid) {
      alert('Credenciales inválidas');
      return;
    }
      // Aquí realizo la lógica de autenticación con el servicio correspondiente
    const correo = this.formularioLogin.value.correo;
    const contrasena = this.formularioLogin.value.contrasena;
    const credenciales: LoginData = {email: correo, password: contrasena};
    this.subscription = this.apiLoginService.login(credenciales).subscribe({
      next: (Response: any) => {
        if  (Response && Response.token) {
          localStorage.setItem('token', Response.token);
          this.mostrarAlertaInicioSesion();
          this.router.navigate(['/home']);
        }
    },
      error: (error: any) => {
        if (error.status === 401) {
          alert('Credenciales inválidas');
        }
        if (error.status === 500) {
          alert('Error en el servidor');
        }
      }
    });
    
    // if (!this.registroService.validarCredenciales(correo, contrasena)) {
    //   alert('Por favor, verifica que todos los campos estén llenos y sean válidos.');
    //   return;
    // }
    // if (this.registroService.tipoUsuario === 'user') {
    //   this.sesionStartView();
    //   this.router.navigate(['/home']);
    //   this.mostrarAlertaInicioSesion() 
    //   return;
    // } 
    // if (this.registroService.tipoUsuario === 'conductor') {
    //   this.sesionStartView();
    //   this.router.navigate(['/home-conductor']);
    //   this.mostrarAlertaInicioSesion() 
    //   return;
    // }
  }

}

