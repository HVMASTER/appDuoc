import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitud } from '../interfaces/solicitud.interface';
import { environment } from 'src/environments/environment';

  const URL = environment.apiurl;
  const KEY = environment.apikey; 

@Injectable({
  providedIn: 'root'
})
export class AcceptTripsService {

  constructor(private http: HttpClient) {  
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'apikey': KEY
    });
    return headers;
  }

  getCountAccepTrips(id: Number){
    const headers = this.getHeaders();
    const count = this.http.get<Solicitud[]>(`${URL}solicitudes?estado=eq.Disponible&id_solicitud=eq.${id}`, { headers });
    return count;
  }

 

}
