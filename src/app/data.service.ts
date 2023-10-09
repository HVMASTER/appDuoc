import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://sa-east-1.aws.data.mongodb-api.com/app/data-maeli/endpoint/data/v1';

  constructor(private http: HttpClient) { }

  getHeaders() {
    return new HttpHeaders({
      "dataSource": "cluster0",
      "database": "TeLlevoApp",
      "collection": "Alumnos"
    })
  }

  // Ejemplo de solicitud GET para obtener datos de la base de datos
  getDatos(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/action/find`, { headers });
  }

  // Ejemplo de solicitud POST para enviar datos a la base de datos
  enviarDatos(datos: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/action/find`, datos, { headers: this.getHeaders() });
  }
}
