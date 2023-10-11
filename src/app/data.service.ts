import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Alumno{
  alumnoID: number;
  nombre: string;
  apellidos: string;
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

  url = 'https://sa-east-1.aws.data.mongodb-api.com/app/data-maeli/endpoint/data/v1';

  constructor(private http: HttpClient) {}

  header = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Request-Headers', '*')
    .set('api-key', 'aroYx3Sbi1J7vChjyR5X6odfAnh0xSzvyHlGIFVY8nMv3UWOxz010H8OIAAEstY0')
    .set('Accept', 'application/json')

  body = {
    "dataSource": "Cluster0",
    "database": "TeLlevoApp",
    "collection": "Alumnos",
  }

  
  getAlumnos():Observable<Alumno[]>{
    return this.http.post<Alumno[]>(this.url+"/action/find", this.body, {headers: this.header}).pipe(
      map(res => res as Alumno[])
    )
      
  }

}
