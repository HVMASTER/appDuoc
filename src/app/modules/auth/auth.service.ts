import { Injectable } from '@angular/core';
import { IAuth } from './auth.interface';

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

  //En resumen, este código en el constructor se encarga de inicializar el almacenamiento local con la lista de usuarios registrados en el momento en que se crea una instancia del servicio. Esto asegura que la información de los usuarios registrados esté disponible incluso después de que la página se recargue o cierre.
  constructor() { 
    localStorage.setItem('users', JSON.stringify(this.users)); //se crea la variable users en el localstorage y se le asigna el valor de la variable users
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

  //La función validarCredenciales toma el correo electrónico y la contraseña proporcionados, busca en la lista de usuarios (this.users) y verifica si existe un usuario con esas credenciales. Si existe un usuario, devuelve true, lo que indica que las credenciales son válidas. Si no existe un usuario, devuelve false, indicando que las credenciales son inválidas y el usuario no puede iniciar sesión.
  validarCredenciales(correo: string, contrasena: string): boolean {
    const usuarioEncontrado = this.users.find(user => user.correo === correo && user.contrasena === contrasena);
    return !!usuarioEncontrado;
  }

}
