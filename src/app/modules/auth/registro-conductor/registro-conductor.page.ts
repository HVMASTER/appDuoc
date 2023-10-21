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
 
  tipoVehiculo = '';
  patente = '';
  modelo = '';
  marca = '';
  color = '';
  anio = 0;
  capacidad = 0;
  tipo = 'conductor';
  

  formRegistroConductor: FormGroup;

  constructor(private formBuilder: FormBuilder , private registroService: RegistroService, private router: Router) {

    this.formRegistroConductor = this.formBuilder.group({
      tipoVehiculo: ['', Validators.required],
      patente: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      color: ['', Validators.required],
      anio: ['', Validators.required],
      capacidad: ['', Validators.required],
    });   
   }

   registroConductor() {
      //console.log('datos de usuario1 ', this.conductores)

      if(this.formRegistroConductor.valid){

        if (this.conductores !== null && this.conductores.includes( this.formRegistroConductor.value.patente)) {
          alert('La patente ya existe');
          return;
        }
        this.tipoVehiculo = this.formRegistroConductor.value.tipoVehiculo;
        this.patente = this.formRegistroConductor.value.patente;
        this.modelo = this.formRegistroConductor.value.modelo;
        this.marca = this.formRegistroConductor.value.marca;
        this.color = this.formRegistroConductor.value.color;
        this.anio = this.formRegistroConductor.value.anio;
        this.capacidad = this.formRegistroConductor.value.capacidad;
        
        
        // this.registroService.registroConductor(this.tipoVehiculo, this.patente, this.modelo, this.marca, this.color, this.anio, this.capacidad, this.tipo);

        console.log('datos de usuario2 ', this.conductores)
        this.router.navigate(['/home-conductor']);
        
        localStorage.setItem('esConductor', 'true');
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
