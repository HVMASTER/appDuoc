import { Injectable } from '@angular/core';
import { IAuth, IAuthConductor } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  users: IAuth[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellidos: 'Perez',
      rut: '12345678-9',
      correo: 'juan@gmail.com',
      contrasena: '12345',
      tipo: 'user',
    },
    {
      id: 2,
      nombre: 'Pedro',
      apellidos: 'Perez',
      rut: '12345678-9',
      correo: 'pedro@gmail.com',
      contrasena: '12345',
      tipo: 'user',
    },
    {
      id: 3,
      nombre: 'Maria',
      apellidos: 'Perez',
      rut: '12345678-9',
      correo: 'maria@gmail.com',
      contrasena: '12345',
      tipo: 'admin',
    },
    
  ];

  conductor: IAuthConductor[] = [
    {
      id: 1,
      tipoVehiculo: 'Automovil',
      patente: 'AB-CD-12',
      modelo: 'Yaris',
      marca: 'Toyota',
      color: 'Rojo',
      anio: 2016,
      capacidad: 4,
      idRuta: 10,
    },
    {
      id: 2,
      tipoVehiculo: 'Automovil',
      patente: 'AB-CD-12',
      modelo: '301',
      marca: 'Peugeot',
      color: 'negro',
      anio: 2018,
      capacidad: 4,
      idRuta: 20,
    },
  ];

  //Este es el nombre de la variable
  usuarioLogueado: IAuth | null = null; //Esto asigna el valor inicial a la variable. En este caso, la variable usuarioLogueado se inicializa con el valor null

  //En resumen, este código en el constructor se encarga de inicializar el almacenamiento local con la lista de usuarios registrados en el momento en que se crea una instancia del servicio. Esto asegura que la información de los usuarios registrados esté disponible incluso después de que la página se recargue o cierre.
  constructor() { 
    localStorage.setItem('users', JSON.stringify(this.users)); //se crea la variable users en el localstorage y se le asigna el valor de la variable users

    localStorage.setItem('conductor', JSON.stringify(this.conductor));
  }

  //En resumen, la función registro toma los detalles del nuevo usuario, crea un objeto de usuario con esos detalles, agrega ese objeto a la lista de usuarios registrados y actualiza el almacenamiento local con la lista actualizada de usuarios.
  //metodo para registro
  registro(nombre: string, apellidos: string, rut: string, correo: string, contrasena: string, tipo: string) {
    const id = this.users.length + 1;
    const newUser: IAuth = {
      id,
      nombre,
      apellidos,
      rut,
      correo,
      contrasena,
      tipo,
    };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  registroConductor(tipoVehiculo: string, patente: string, modelo: string, marca: string, color: string, anio: number, capacidad: number, idRuta: number) {
    const id = this.conductor.length + 1;
    const newConductor: IAuthConductor = {
      id,
      tipoVehiculo,
      patente,
      modelo,
      marca,
      color,
      anio,
      capacidad,
      idRuta,
    };
    this.conductor.push(newConductor);
    localStorage.setItem('conductor', JSON.stringify(this.conductor));
  }

  //La función validarCredenciales toma el correo electrónico y la contraseña proporcionados, busca en la lista de usuarios (this.users) y verifica si existe un usuario con esas credenciales. Si existe un usuario, devuelve true, lo que indica que las credenciales son válidas. Si no existe un usuario, devuelve false, indicando que las credenciales son inválidas y el usuario no puede iniciar sesión.
  validarCredenciales(correo: string, contrasena: string): boolean {
    const usuarioEncontrado = this.users.find(user => user.correo === correo && user.contrasena === contrasena);

    if (usuarioEncontrado) {
      this.usuarioLogueado = usuarioEncontrado; // Asigna el usuario logueado
      return true;
    }
    return false;
  }

  simularEnvioCorreoRecuperacion(correo: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Busca el correo en la lista de usuarios
        const usuarioEncontrado = this.users.find(users => users.correo === correo);

        if (usuarioEncontrado) {
          // Simulación de envío de correo exitoso
          resolve();
        } else {
          // No se encontró el correo en la lista de usuarios
          reject(new Error('Correo no encontrado en la lista de usuarios'));
        }
      }, 1000); // Simula un retraso de 1 segundo
    });
  }

}
