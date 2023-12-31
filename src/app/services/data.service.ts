import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObtenerSolicitud, Solicitud } from '../interfaces/solicitud.interface';
import { GuardarSolicitud } from '../interfaces/solicitud.interface';
import { environment } from 'src/environments/environment';
import { Coordinates } from '../interfaces/coordinates.interface';

  const URL = environment.apiurl;
  const KEY = environment.apikey; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  estado: string = 'Finalizado';

  constructor(private http: HttpClient) {  
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'apikey': KEY
    });
    return headers;
  }

  postSolicitud(solicitud: GuardarSolicitud) {
    const headers = this.getHeaders();
    return this.http.post(`${URL}solicitudes`, solicitud, { headers } );
  }


  getSolicDisp() {
    const headers = this.getHeaders();
    const solicitud = this.http.get<Solicitud[]>(`${URL}solicitudes?estado=eq.Disponible`, { headers });
    return solicitud;
  }

  updateEstadoSolicitud(id_solicitud: number): Observable<HttpErrorResponse | any>{
    const headers = this.getHeaders();
    return this.http.patch<any>(URL+'solicitudes?id_solicitud=eq.'+id_solicitud,{ estado: this.estado},{ headers , observe: 'response' });
  }

  obtSolicitudDisp(): Observable<ObtenerSolicitud[]> {
    const headers = this.getHeaders();
    const solicitud = this.http.get<ObtenerSolicitud[]>(`${URL}solicitudes?estado`, { headers });
    return solicitud;
  }
 
  getSolicitudUser(id_user: number) {
    const headers = this.getHeaders();
    const solicitud = this.http.get<ObtenerSolicitud[]>(`${URL}solicitudes?id_user=eq.${id_user}`, { headers });
    return solicitud;
  }

  getCoordenadas(id_user: number) {
    const headers = this.getHeaders();
    const coordenadas = this.http.get<Coordinates>(`${URL}solicitudes?id_user=eq.${id_user}`, { headers });
    return coordenadas;
  }

  // getSolicitudEspera(id_user: number) {
  //   const headers = this.getHeaders();
  //   const solicitud = this.http.get<ObtenerSolicitud[]>(`${URL}solicitudes?estado=eq.Espera&id_user=eq.${id_user}`, { headers });
  //   return solicitud;
  // }


}
