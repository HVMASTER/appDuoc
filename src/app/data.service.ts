import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Alumno{
  alumnoID: number;
  nombre: string;
  apellido: string;
  rut: string;
  correo: string;
  contrasena: string;
  tipo: string;
  direccion: {
    calle: string;
    comuna: string;
    ciudad: string;
    codigo_postal: string;
  }
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API = environment.api;

  constructor(private http: HttpClient) {}

  addAlumno(alumno: string):Observable<Alumno>{
    const body = { nombre: alumno };
    return this.http.post<Alumno>(this.API, body);
  }
  getAlumnos():Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.API);
  }
}
