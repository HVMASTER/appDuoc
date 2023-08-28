import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formularioLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      const correo = this.formularioLogin.value.correo;
      const contrasena = this.formularioLogin.value.contrasena;
      
    }
  }

  ngOnInit() {
  }

}
