import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/user.interface';
import { Conductor } from '../interfaces/conductor.interface';
import { Rutas } from '../interfaces/rutas.interface';
import { Solicitud } from '../interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  


  constructor(private http: HttpClient) {
    
  }

  

}
