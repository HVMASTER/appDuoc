import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';


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

  formularioRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
    });
  }

  registrarse() {
    
    //console.log('datos de usuario1 ', this.usuarios)
    
    if (this.formularioRegistro.valid) {

      if (this.formularioRegistro.value.contrasena != this.formularioRegistro.value.confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (this.usuarios !== null && this.usuarios.includes( this.formularioRegistro.value.correo)) {
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
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    
  }

}