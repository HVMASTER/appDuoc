import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroService } from '../auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AlertController, PickerController } from '@ionic/angular';
import { format, subYears } from 'date-fns';

@Component({
  selector: 'app-registro-conductor',
  templateUrl: './registro-conductor.page.html',
  styleUrls: ['./registro-conductor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, FooterComponent]
})
export class RegistroConductorPage implements OnInit {

  conductores = localStorage.getItem('conductor');
  // Genera un rango de años desde hace 30 años hasta el año actual
  anosFabricacion = Array.from({ length: 24 }, (_, index) => format(subYears(new Date(), index), 'yyyy'));
 
  tipo_vehiculo = '';
  patente = '';
  modelo = '';
  marca = '';
  color = '';
  anno_fabricacion = 0;
  telefono = 0;
  

  formRegistroConductor: FormGroup;

  constructor(private formBuilder: FormBuilder , private registroService: RegistroService, private router: Router, private alertController: AlertController, private pickerController: PickerController, private changeDetectorRef: ChangeDetectorRef) {

    this.formRegistroConductor = this.formBuilder.group({
      tipo_vehiculo: ['', Validators.required],
      patente: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      color: ['', Validators.required],
      anno_fabricacion: ['', Validators.required],
      telefono: ['', [Validators.required, this.telefonoValidator.bind(this)]],
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

    async abrirPickerTipo() {
      const picker = await this.pickerController.create({
        columns: [
          {
            name: 'tipo_vehiculo',
            options: [
              { text: 'Sedán', value: 'Sedán' },
              { text: 'Hatchback', value: 'Hatchback' },
              { text: 'SUV', value: 'SUV' },
              { text: 'Pick Up', value: 'Pick Up' },
              
            ],
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: (value) => {
              // Actualiza el valor del campo "tipo_vehiculo" en el formulario
              this.formRegistroConductor.patchValue({
                tipo_vehiculo: value.tipo_vehiculo.value,
              });
            },
          },
        ],
      });
      await picker.present();
    }  

    async abrirPickerMarca() {
      const picker = await this.pickerController.create({
        columns: [
          {
            name: 'marca',
            options: [
              { text: 'Audi', value: 'Audi' },
              { text: 'BMW', value: 'BMW' },
              { text: 'Chevrolet', value: 'Chevrolet' },
              { text: 'Citroën', value: 'Citroën' },
              { text: 'Dodge', value: 'Dodge' },
              { text: 'Fiat', value: 'Fiat' },
              { text: 'Ford', value: 'Ford' },
              { text: 'Honda', value: 'Honda' },
              { text: 'Hyundai', value: 'Hyundai' },
              { text: 'Jeep', value: 'Jeep' },
              { text: 'Kia', value: 'Kia' },
              { text: 'Mazda', value: 'Mazda' },
              { text: 'Mercedes Benz', value: 'Mercedes Benz' },
              { text: 'Mitsubishi', value: 'Mitsubishi' },
              { text: 'Nissan', value: 'Nissan' },
              { text: 'Peugeot', value: 'Peugeot' },
              { text: 'Renault', value: 'Renault' },
              { text: 'Subaru', value: 'Subaru' },
              { text: 'Suzuki', value: 'Suzuki' },
              { text: 'Toyota', value: 'Toyota' },
              { text: 'Volkswagen', value: 'Volkswagen' },
              { text: 'Volvo', value: 'Volvo' },
            ],
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: (value) => {
              // Actualiza el valor del campo "marca" en el formulario
              this.formRegistroConductor.patchValue({
                marca: value.marca.value,
              });
            },
          },
        ],
      });
      await picker.present();
    }

    async abrirPickerColor() {
      const picker = await this.pickerController.create({
        columns: [
          {
            name: 'color',
            options: [
              { text: 'Blanco', value: 'Blanco' },
              { text: 'Azul', value: 'Azul' },
              { text: 'Rojo', value: 'Rojo' },
              { text: 'Amarillo', value: 'Amarillo' },
              { text: 'Verde', value: 'Verde' },
              { text: 'Negro', value: 'Negro'},
              { text: 'Gris', value: 'Gris'},             
            ],
          },
        ],
        buttons:[
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: (value) => {
              // Actualiza el valor del campo "color" en el formulario
              this.formRegistroConductor.patchValue({
                color: value.color.value,
              });
            },
          },
        ],
      });
      await picker.present();
    }

    async abrirPickerAnno() {
      const picker = await this.pickerController.create({
        columns: [
          {
            name: 'anno_fabricacion',
            options: this.anosFabricacion.map((anno_fabricacion) => ({
              text: anno_fabricacion,
              value: anno_fabricacion,
            })),
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: (value) => {
              console.log(`Seleccionaste el año ${value.anno_fabricacion.value}`);
              // Actualiza el valor del campo "anno_fabricacion" en el formulario
              this.formRegistroConductor.patchValue({
                anno_fabricacion: value.anno_fabricacion.value,
              });
            },
          },
        ],
      });
  
      await picker.present();

      picker.onDidDismiss().then(async (data) => {
        const selectedAnno = data.data?.values?.anno_fabricacion.value;
  
        if (selectedAnno) {
          // Actualiza el valor del campo "anno_fabricacion" en el formulario
          this.formRegistroConductor.get('anno_fabricacion')?.setValue(selectedAnno);
          this.changeDetectorRef.detectChanges() // Forzar la detección de cambios
        }
      });
    }

    telefonoValidator(control: FormControl) {
      let telefono = control.value;
    
      // Agrega '+569' si no está presente
      if (telefono && !telefono.startsWith('+56')) {
        telefono = `+56${telefono}`;
      }
    
      // Validación de longitud total
      if (telefono && telefono.length !== 12) {
        return {
          telefonoInvalido: true,
        };
      }
    
      return null;
    }

    

    cancel() {
      this.router.navigate(['/home']);
    }

  ngOnInit() {
    
  }

}
