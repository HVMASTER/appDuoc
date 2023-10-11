import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginData } from '../interfaces/login.interface';

// @Injectable({
//   providedIn: 'root'
// })

// export class ApiLoginService {

//   private baseUrl: string;

//   constructor(private http: HttpClient) {
//     this.baseUrl = environment.url;
//    }

//   login(credenciales: LoginData) {
//     const url = `${this.baseUrl}/login`;
//     return this.http.post(url, credenciales);
//   }

// }
