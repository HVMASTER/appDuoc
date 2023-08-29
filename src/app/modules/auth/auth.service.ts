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

  constructor() { 
    localStorage.setItem('users', JSON.stringify(this.users)); //se crea la variable users en el localstorage y se le asigna el valor de la variable users
  }

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

}
