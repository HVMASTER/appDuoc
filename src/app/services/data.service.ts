import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud.interface';
import { environment } from 'src/environments/environment';

  const URL = environment.apiurl;
  const KEY = environment.apikey; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {  
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'apikey': KEY
    });
    return headers;
  }

  postSolicitud(solicitud: Solicitud) {
    const headers = this.getHeaders();
    return this.http.post(`${URL}solicitudes`, solicitud, { headers } );
  }

}
