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
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  usuarios = localStorage.getItem('users');

  nombre = '';
  apellidos = '';
  rut = '';
  correo = '';
  contrasena = '';
  tipo = '';

  // FormGroup para gestionar el formulario del registro
  formularioRegistro: FormGroup;

  // Constructor del componente: creo mi formlario del registro y le entrego las reglas de validacion asociadas
  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router, private alertController: AlertController) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
    });
  }

  async mostrarAlertaRegistro() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: ' ¡Felicidades! Tu registro ha sido completado con éxito. Ahora puedes iniciar sesión con tu nueva cuenta.',
      buttons: ['OK']
    });

    await alert.present();
  }

  registrarse() {


    if (this.formularioRegistro.valid) {

      if (this.formularioRegistro.value.contrasena != this.formularioRegistro.value.confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (this.usuarios !== null && this.usuarios.includes(this.formularioRegistro.value.correo)) {
        alert('El correo ya existe');
        return;
      }



      this.nombre = this.formularioRegistro.value.nombre;
      this.apellidos = this.formularioRegistro.value.apellidos
      this.rut = this.formularioRegistro.value.rut;
      this.correo = this.formularioRegistro.value.correo;
      this.contrasena = this.formularioRegistro.value.contrasena;
      this.tipo = 'user';

      //solicita el registro y envia los datos
      this.registroService.registro(this.nombre, this.apellidos, this.rut, this.correo, this.contrasena, this.tipo);

      //console.log('datos de usuario2 ', this.usuarios)
      this.mostrarAlertaRegistro();
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, verifica que todos los campos estén llenos y sean válidos.');
    }
  }

  ngOnInit() {

  }

}