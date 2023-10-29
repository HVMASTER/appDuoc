import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-conductor',
  templateUrl: './registro-conductor.page.html',
  styleUrls: ['./registro-conductor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, FooterComponent]
})
export class RegistroConductorPage implements OnInit {

  conductores = localStorage.getItem('conductor');
 
  tipo_vehiculo = '';
  patente = '';
  modelo = '';
  marca = '';
  color = '';
  anno_fabricacion = 0;
  telefono = 0;
  

  formRegistroConductor: FormGroup;

  constructor(private formBuilder: FormBuilder , private registroService: RegistroService, private router: Router, private alertController: AlertController) {

    this.formRegistroConductor = this.formBuilder.group({
      tipo_vehiculo: ['', Validators.required],
      patente: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      color: ['', Validators.required],
      anno_fabricacion: ['', Validators.required],
      telefono: ['', Validators.required],
    });   
   }

    async mostrarAlertaRegistroConductor() {
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: '¡Felicidades! Te has registrado como conductor. ¡Bienvenido a nuestra comunidad!',
        buttons: ['OK']
      });

      await alert.present();
    }

   registroConductor() {
      //console.log('datos de usuario1 ', this.conductores)

      if(this.formRegistroConductor.valid){
        const userConductor = {
          tipo_vehiculo: this.formRegistroConductor.value.tipo_vehiculo,
          patente: this.formRegistroConductor.value.patente,
          modelo: this.formRegistroConductor.value.modelo,
          marca: this.formRegistroConductor.value.marca,
          color: this.formRegistroConductor.value.color,
          anno_fabricacion: this.formRegistroConductor.value.anno_fabricacion,
          telefono: this.formRegistroConductor.value.telefono,
          id_user: Number(localStorage.getItem('user-id'))
        };

        if (this.conductores !== null && this.conductores.includes( this.formRegistroConductor.value.patente)) {
          alert('La patente ya existe');
          return;
        }

        this.registroService.updateUserTipo(userConductor.id_user).subscribe((data) => {
          console.log(data);
        })
    
        this.registroService.postDriver(userConductor).subscribe((Response: any) => {
          console.log(Response);       
          this.mostrarAlertaRegistroConductor();
          this.router.navigate(['/home-conductor']);
        });

      }else{
        alert('Por favor, verifica que todos los campos estén llenos y sean válidos.');
      }

    }

    cancel() {
      this.router.navigate(['/home']);
    }

  ngOnInit() {
    
  }

}
