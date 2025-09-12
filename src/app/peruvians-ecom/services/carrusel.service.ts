import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaResponse } from '../interfaces/carrusel';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class CarruselService {
  

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los elementos del carrusel desde la API pública
   */
  getCarrusel(): Observable<CategoriaResponse> {
    return this.http.get<CategoriaResponse>(`${envs.apiUrl}/carrusel`);
  }

  /**
   * Obtiene un elemento específico del carrusel
   */
  getElementoCarrusel(id: number): Observable<any> {
    return this.http.get<any>(`${envs.apiUrl}/carrusel/${id}`);
  }
}