import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CyberwowResponse, CyberwowBanner, CyberwowConfiguracion } from '../interfaces/cyberwow';
import { envs } from '../../config/envs';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CyberwowService {

  private readonly baseUrl = `${envs.apiUrl}/cyberwow`;

  constructor(private http: HttpClient) { }

  /**
   * Obtener configuración y banners de CyberWow
   */
  obtenerConfiguracion(): Observable<{
    categoria: CyberwowBanner | null;
    tiendas: CyberwowBanner | null;
    productos: CyberwowBanner[];
  }> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/configuracion`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          return {
            categoria: null,
            tiendas: null,
            productos: []
          };
        })
      );
  }

  /**
   * Obtener todos los banners de CyberWow
   */
  obtenerBanners(): Observable<CyberwowBanner[]> {
    return this.http.get<ApiResponse<CyberwowBanner[]>>(`${this.baseUrl}/banners`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          return [];
        })
      );
  }
}