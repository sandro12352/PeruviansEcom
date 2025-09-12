import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { envs } from '../../config/envs';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }

  obtenerTiendas(): Observable<any> {
    return this.http.get<ApiResponse<any[]>>(`${envs.apiUrl}/tiendas`)
      .pipe(
        map(response => {
          if (response.success) {
            return { success: true, data: response.data };
          }
          return { success: false, data: [] };
        })
      );
  }
}