import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Registro } from 'src/app/interfaces/registro.interface';


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
  apellido = '';
  rut = '';
  correo = '';
  contrasena = '';
  direccion = '';
  comuna = '';
  ciudad = '';
  tipo_user = '';


  // FormGroup para gestionar el formulario del registro
  formRegistro: FormGroup;
  sesionStart = localStorage.getItem('sesionStart');

  // Constructor del componente: creo mi formlario del registro y le entrego las reglas de validacion asociadas
  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router, private alertController: AlertController) {
    this.formRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required],
      ciudad: ['', Validators.required],
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
    if (this.formRegistro.valid) {
      const userData = {
        nombre: this.formRegistro.value.nombre,
        apellido: this.formRegistro.value.apellido,
        rut: this.formRegistro.value.rut,
        correo: this.formRegistro.value.correo,
        contrasena: this.formRegistro.value.contrasena,
        direccion: this.formRegistro.value.direccion,
        comuna: this.formRegistro.value.comuna,
        ciudad: this.formRegistro.value.ciudad,
        tipo_user: 'usuario',
      };

      if (this.formRegistro.value.contrasena != this.formRegistro.value.confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
      }

      //asigna los valores del formulario a las variables
      this.registroService.postUser(userData).subscribe((Response: any) => {
        console.log(Response);       
        this.mostrarAlertaRegistro();
        this.router.navigate(['/login']);
      });
      
    } else {
      alert('Por favor, verifica que todos los campos estén llenos y sean válidos.');
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

}