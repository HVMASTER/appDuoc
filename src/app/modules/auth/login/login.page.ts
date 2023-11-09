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

  
  correo: string = '';
  contrasena: string = '';
  

  formularioLogin: FormGroup;
  sesionStart = localStorage.getItem('sesionStart');

  // Constructor del componente: creo mi formlario del login y le entrego las reglas de validacion asociadas
  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router, private alertController: AlertController) {

    this.formularioLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    }); 
 
     if( this.sesionStart ){
       this.router.navigate(['/home']); 
       return;     
     }
  }

  async mostrarAlertaInicioSesion() {
    const alert = await this.alertController.create({
      header: 'Sesión Iniciada',
      message: '¡Bienvenido! Has iniciado sesión con éxito en tu cuenta.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {

  }
  
  login(correo: string, contrasena: string) {
    if (!this.formularioLogin.valid) {
      alert('Credenciales inválidas');
      return;
    }

    this.registroService.login(correo).subscribe({
      next: (Response: any) => {
        if (Response.length !== 0 && Response[0].contrasena === contrasena) {        
            localStorage.setItem('user-name', Response[0].nombre);
            localStorage.setItem('user-tipo', Response[0].tipo_user);
            localStorage.setItem('user-apellido', Response[0].apellido);
            localStorage.setItem('user-id', Response[0].id_user);
            localStorage.setItem('sesionStart', 'true');

            this.registroService.getDriver(Response[0].id_user).subscribe({
              next: (Response: any) => {
                if (Response.length > 0) {
                  localStorage.setItem('vehiculo-id', Response[0].id_vehiculo);
                  this.router.navigate(['/home-conductor']);
                }
              },
              error: (error) => {
                console.log(error);
              }
            });
            if (Response[0].tipo_user === 'usuario') {
              this.mostrarAlertaInicioSesion();
              this.router.navigate(['/home']);
              return;
            } 
            if (Response[0].tipo_user === 'conductor') {
              this.router.navigate(['/home-conductor']);
              return;
            }         
        } else {
          alert('Credenciales inválidas');
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
  }
}




