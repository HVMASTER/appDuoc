import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginData } from 'src/app/interfaces/login.interface';


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
            localStorage.setItem('sesionStart', 'true');
            if (Response[0].tipo_user === 'usuario') {
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


  // //Alerta al iniciar sesión
  // async mostrarAlertaInicioSesion() {
  //   const alert = await this.alertController.create({
  //     header: 'Sesión Iniciada',
  //     message: '¡Bienvenido! Has iniciado sesión con éxito en tu cuenta.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

  // // Método para manejar el evento de inicio de sesión
  // sesionStartView(){
  //     localStorage.setItem('user-name', this.registroService.nombreUsuario);
  //     localStorage.setItem('user-tipo', this.registroService.tipoUsuario);
  //     localStorage.setItem('user-apellidos', this.registroService.apellidosUsuario);
  //     localStorage.setItem('sesionStart', 'true');
  // }
  // iniciarSesion() {
  //   if (!this.formularioLogin.valid) {
  //     alert('Credenciales inválidas');
  //     return;
  //   }
  //     // Aquí realizo la lógica de autenticación con el servicio correspondiente
  //   const correo = this.formularioLogin.value.correo;
  //   const contrasena = this.formularioLogin.value.contrasena;

  //   if (!this.registroService.validarCredenciales(correo, contrasena)) {
  //     alert('Por favor, verifica que todos los campos estén llenos y sean válidos.');
  //     return;
  //   }
  //   if (this.registroService.tipoUsuario === 'user') {
  //     this.sesionStartView();
  //     this.router.navigate(['/home']);
  //     this.mostrarAlertaInicioSesion() 
  //     return;
  //   } 
  //   if (this.registroService.tipoUsuario === 'conductor') {
  //     this.sesionStartView();
  //     this.router.navigate(['/home-conductor']);
  //     this.mostrarAlertaInicioSesion() 
  //     return;
  //   }
  // }

}



  // iniciarSesion() {
  //   if (!this.formularioLogin.valid) {
  //     alert('Credenciales inválidas');
  //     return;
  //   }
  //     // Aquí realizo la lógica de autenticación con el servicio correspondiente
  //   const correo = this.formularioLogin.value.correo;
  //   const contrasena = this.formularioLogin.value.contrasena;
  //   const credenciales: LoginData = {email: correo, password: contrasena};
  //   this.subscription = this.apiLoginService.login(credenciales).subscribe({
  //     next: (Response: any) => {
  //       if  (Response && Response.token) {
  //         localStorage.setItem('token', Response.token);
  //         this.mostrarAlertaInicioSesion();
  //         this.router.navigate(['/home']);
  //       }
  //   },
  //     error: (error: any) => {
  //       if (error.status === 401) {
  //         alert('Credenciales inválidas');
  //       }
  //       if (error.status === 500) {
  //         alert('Error en el servidor');
  //       }
  //     }
  //   });
    
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




