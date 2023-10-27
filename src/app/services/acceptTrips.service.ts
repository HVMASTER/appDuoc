import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitud, ObtenerSolicitud } from '../interfaces/solicitud.interface';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

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

  getCountAccepTrips(id: number): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<ObtenerSolicitud[]>(`${URL}accept_trips?id_solicitud=eq.${id}`, { headers })
      .pipe(
        map(data => { 
          return data.length
        })
      );
  }

  getIdVehiculoUser(id: number): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${URL}vehiculos?id_user=eq.${id}`, { headers })
      .pipe(
        map(data => { 
          return data;
        })
      );   
  }

 

}
