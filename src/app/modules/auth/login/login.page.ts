import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../auth.service'; 
import { Router } from '@angular/router';

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
  formularioLogin: FormGroup;
  
  formularioRecuperacion!: FormGroup; 
  
  mostrarRecuperacion = false;

  // Constructor del componente
  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.formularioLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  // Método para manejar el evento de inicio de sesión
  iniciarSesion() {
    if (this.formularioLogin.valid) {
      // Aquí podrías realizar la lógica de autenticación con el servicio correspondiente
      const correo = this.formularioLogin.value.correo;
      const contrasena = this.formularioLogin.value.contrasena;

      if (this.registroService.validarCredenciales(correo, contrasena)) {
        // Inicio de sesión exitoso
        this.router.navigate(['/home']); // Cambia 'inicio' por la ruta deseada después del inicio de sesión
      } else {
        alert('Credenciales inválidas');
      }
    }
  }

  mostrarFormularioRecuperacion() {
    this.mostrarRecuperacion = true;
  }

  cancelarRecuperacion() {
    this.mostrarRecuperacion = false;
  }

  enviarCorreoRecuperacion() {
    if (this.formularioRecuperacion.valid) {
      const correoRecuperacion = this.formularioRecuperacion.value.correoRecuperacion;

      // Aquí podrías implementar la lógica para enviar un correo de recuperación
      const contrasenaRecuperada = localStorage.getItem(correoRecuperacion);

      if (contrasenaRecuperada) {
        alert(`Tu contraseña es: ${contrasenaRecuperada}`);
        this.cancelarRecuperacion();
      } else {
        alert('No se encontró una contraseña asociada a ese correo.');
      }
    }
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
  }

}

