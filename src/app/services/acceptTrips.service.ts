import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitud, ObtenerSolicitud, DatosUsuarios, solicitudAlumno } from '../interfaces/solicitud.interface';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Conductor, DatosConductor } from '../interfaces/conductor.interface';


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

  getIdVehiculoUser(id: number): Observable<Conductor> {
    const headers = this.getHeaders();
    return this.http.get<Conductor>(`${URL}vehiculos?id_user=eq.${id}`, { headers })
      .pipe(
        map(data => { 
          return data;
        })
      );   
  }

  postDatosAcceptTrips(id_solicitud: number, id_user: number, id_vehiculo: number) {
    const headers = this.getHeaders();
    const datos = {
      id_solicitud: id_solicitud,
      id_user: id_user,
      id_vehiculo: id_vehiculo
      
    }
    return this.http.post(`${URL}accept_trips`, datos, { headers });
  }
 
  getSolicitudesAceptadasPorUsuario(id_user: number) {
    const headers = this.getHeaders();
    return this.http.get<ObtenerSolicitud[]>(`${URL}accept_trips?id_user=eq.${id_user}`, { headers });
  }

  getDatosConductor(id_vehiculo: number) {
    const headers = this.getHeaders();
    return this.http.get<DatosConductor[]>(`${URL}vehiculos?id_vehiculo=eq.${id_vehiculo}`, { headers });
  }

  getUsuariosPorSolicitud(id_solicitud: number) {
    const headers = this.getHeaders();
    return this.http.get<DatosUsuarios[]>(`${URL}accept_trips?id_solicitud=eq.${id_solicitud}`, { headers });
  }

  getDatosSolicitud(id_solicitud: number) {
    const headers = this.getHeaders();
    return this.http.get<solicitudAlumno[]>(`${URL}accept_trips?id_solicitud=eq.${id_solicitud}`, { headers });
  }





}
