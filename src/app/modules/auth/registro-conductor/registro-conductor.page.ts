import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

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
  tipo_user = '';
  

  formRegistroConductor: FormGroup;

  constructor(private formBuilder: FormBuilder , private registroService: RegistroService, private router: Router) {

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
          tipo_user: 'conductor',
        };


        if (this.conductores !== null && this.conductores.includes( this.formRegistroConductor.value.patente)) {
          alert('La patente ya existe');
          return;
        }
    
        this.registroService.postDriver(userConductor).subscribe((Response: any) => {
          console.log(Response);       
          //this.mostrarAlertaRegistro();
          this.router.navigate(['/home-conductor']);
        });
        // this.registroService.registroConductor(this.tipoVehiculo, this.patente, this.modelo, this.marca, this.color, this.anio, this.capacidad, this.tipo);

        // console.log('datos de usuario2 ', this.conductores)
        // this.router.navigate(['/home-conductor']);
        
        // localStorage.setItem('esConductor', 'true');
      }else{
        alert('Por favor, verifica que todos los campos estén llenos y sean válidos.');
      }

    }

    cancel() {
      this.router.navigate(['/home']);
    }
  
    confirm() {
      this.router.navigate(['/home']);
    }

  ngOnInit() {
    
  }

}
