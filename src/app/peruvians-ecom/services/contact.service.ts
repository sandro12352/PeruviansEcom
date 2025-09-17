// src/app/peruvians-ecom/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envs } from '../../config/envs';

export interface ContactRequest {
  nombre: string;
  email: string;
  celular: string;
  mensaje: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  sendContact(data: ContactRequest): Observable<ContactResponse> {
    // Asegúrate de que la URL sea correcta
    // Si tu API está en http://localhost/api-culqi/api/contact/
    // Entonces envs.apiUrl debería ser http://localhost/api-culqi/api
    console.log('Enviando a:', `${envs.apiUrl}/contact`); // Para debug
    console.log('Datos:', data); // Para debug
    
    return this.http.post<ContactResponse>(`${envs.apiUrl}/contact`, data);
  }
}