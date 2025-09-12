import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envs } from '../../config/envs';
import { CategoriaResponse } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly baseUrl = `${envs.apiUrl}/categoria`;

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<CategoriaResponse> {
    return this.http.get<CategoriaResponse>(`${this.baseUrl}/`);
  }

  obtenerCategoriaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}