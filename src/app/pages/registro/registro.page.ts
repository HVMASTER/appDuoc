import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
    });
  }

  registrarse() {
    if (this.formularioRegistro.valid) {
      const nombre = this.formularioRegistro.value.nombre;
      const apellidos = this.formularioRegistro.value.apellidos
      const correo = this.formularioRegistro.value.correo;
      const contrasena = this.formularioRegistro.value.contrasena;
      
    }
  }

  ngOnInit() {
  }

}