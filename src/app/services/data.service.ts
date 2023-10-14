import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/user.interface';
import { RequestBody } from '../interfaces/requestBody.interface';
import { Conductor } from '../interfaces/conductor.interface';
import { Rutas } from '../interfaces/rutas.interface';
import { Solicitud } from '../interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private baseUrl: string;


  constructor(private http: HttpClient) {
    this.baseUrl = 'https://sa-east-1.aws.data.mongodb-api.com/app/data-maeli/endpoint/data/v1';
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",         
      "api-key": "aroYx3Sbi1J7vChjyR5X6odfAnh0xSzvyHlGIFVY8nMv3UWOxz010H8OIAAEstY0",  
    });
    return headers;
  }

  public getBody(): any {
    return{
    "dataSource": "Cluster0",
    "database": "TeLlevoApp",
    "collection": "Alumnos",
    };
  }

  
  AlumnoGetMethod():Observable<Users[]>{

    const url = `${this.baseUrl}/action/find`;
    
    const body = this.getBody();

    const options = { 
      headers: this.getHeaders(), 
     }; 
    return this.http.post<Users[]>(url, body, options)
    
    };

  // AlumnoPostMethod(dataSource: string, database: string, collection: string):Observable<Users[]>{
  //   const headers = this.getHeaders();
  //   const body: RequestBody = {
  //     dataSource,
  //     database,
  //     collection,
  //   }
  //   const url = `${this.baseUrl}/action/insertOne`;
  //   const options = { headers: headers };
  //   return this.http.post<Users[]>(url, body, options)     
  // }

  // conductorGetMethod(dataSource: string, database: string, collection: string):Observable<Conductor[]>{
  //   const headers = this.getHeaders();
  //   const body: RequestBody = {
  //     dataSource,
  //     database,
  //     collection,
  //   }
  //   const url = `${this.baseUrl}/action/find`;
  //   const options = { headers: headers };
  //   return this.http.post<Conductor[]>(url, body, options)     
  // }

  // conductorPostMethod(dataSource: string, database: string, collection: string):Observable<Conductor[]>{
  //   const headers = this.getHeaders();
  //   const body: RequestBody = {
  //     dataSource,
  //     database,
  //     collection,
  //   }
  //   const url = `${this.baseUrl}/action/insertOne`;
  //   const options = { headers: headers };
  //   return this.http.post<Conductor[]>(url, body, options)     
  // }

  // rutasGetMethod(dataSource: string, database: string, collection: string):Observable<Rutas[]>{
  //   const headers = this.getHeaders();
  //   const body: RequestBody = {
  //     dataSource,
  //     database,
  //     collection,
  //   }
  //   const url = `${this.baseUrl}/action/find`;
  //   const options = { headers: headers };
  //   return this.http.post<Rutas[]>(url, body, options)     
  // }

  // rutasPostMethod(dataSource: string, database: string, collection: string):Observable<Rutas[]>{
  //   const headers = this.getHeaders();
  //   const body: RequestBody = {
  //     dataSource,
  //     database,
  //     collection,
  //   }
  //   const url = `${this.baseUrl}/action/insertOne`;
  //   const options = { headers: headers };
  //   return this.http.post<Rutas[]>(url, body, options)     
  // }

  // solicitudGetMethod(dataSource: string, database: string, collection: string):Observable<Solicitud[]>{
  //   const headers = this.getHeaders();
  //   const body: RequestBody = {
  //     dataSource,
  //     database,
  //     collection,
  //   }
  //   const url = `${this.baseUrl}/action/find`;
  //   const options = { headers: headers };
  //   return this.http.post<Solicitud[]>(url, body, options)     
  // }

  // solicitudPostMethod(dataSource: string, database: string, collection: string):Observable<Solicitud[]>{
  //   const headers = this.getHeaders();
  //   const body: RequestBody = {
  //     dataSource,
  //     database,
  //     collection,
  //   }
  //   const url = `${this.baseUrl}/action/insertOne`;
  //   const options = { headers: headers };
  //   return this.http.post<Solicitud[]>(url, body, options)     
  // }

}
