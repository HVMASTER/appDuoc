import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { solicitudAlumno } from '../interfaces/solicitud.interface';


  const URL = environment.apiurl;
  const KEY = environment.apikey; 

@Injectable({
  providedIn: 'root'
})
export class VerSolicitudService {

  constructor(private http: HttpClient) {  
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'apikey': KEY
    });
    return headers;
  }

  getDatosAlumnos(id_user: number) {
    const headers = this.getHeaders();
    return this.http.get<solicitudAlumno[]>(`${URL}users?id_user=eq.${id_user}`, { headers });
  }
}