// src/app/peruvians-ecom/services/dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { DashboardResponse } from '../interfaces/dashboard.interface';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly apiUrl = `${envs.apiUrl}/dashboard`;

  // 🔹 Cache de respuestas y ETag por tipo de sección
  private cache: Record<string, DashboardResponse> = {};
  private etags: Record<string, string> = {};

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del dashboard (con cache + validación condicional)
   */
  getDashboardData(
    secciones: string[] | 'todas' = 'todas',
    filtros?: DashboardFiltros
  ): Observable<DashboardResponse> {
    const key = this.generarCacheKey(secciones, filtros);

    // 🔹 Si ya tenemos cache, devolvemos temporalmente
    if (this.cache[key]) return of(this.cache[key]);

    let params = this.buildParams(secciones, filtros);
    let headers = new HttpHeaders();

    // Si tenemos un ETag guardado, lo enviamos para validar cambios
    if (this.etags[key]) headers = headers.set('If-None-Match', this.etags[key]);

    return this.http.get<DashboardResponse>(this.apiUrl, {
      params,
      headers,
      observe: 'response'
    }).pipe(
      map((resp: HttpResponse<DashboardResponse>) => {
        if (resp.status === 304 && this.cache[key]) {
          // ✅ No hay cambios → usar cache
          return this.cache[key];
        } else {
          // ✅ Hay cambios → actualizar cache y ETag
          const body = resp.body!;
          const etag = resp.headers.get('ETag');
          if (etag) this.etags[key] = etag;
          this.cache[key] = body;
          return body;
        }
      }),
      catchError(err => {
        console.error('Error obteniendo dashboard:', err);
        return of({ success: false, data: [] } as DashboardResponse);
      })
    );
  }

  /** 🧩 Helpers específicos */
  getCategorias(): Observable<DashboardResponse> {
    return this.getDashboardData(['categorias']);
  }

  getMasVendidos(filtros?: DashboardFiltros): Observable<DashboardResponse> {
    return this.getDashboardData(['mas_vendidos'], filtros);
  }

  getMasNuevos(filtros?: DashboardFiltros): Observable<DashboardResponse> {
    return this.getDashboardData(['mas_nuevos'], filtros);
  }

  getLiquidaciones(): Observable<DashboardResponse> {
    return this.getDashboardData(['liquidaciones']);
  }

  getConfiguracionCyberwow(): Observable<DashboardResponse> {
    return this.getDashboardData(['configuracion']);
  }

  getCarrusel(): Observable<DashboardResponse> {
    return this.getDashboardData(['carrusel']);
  }

  /** 🔧 Construye los parámetros de la URL */
  private buildParams(secciones: string[] | 'todas', filtros?: DashboardFiltros): HttpParams {
    let params = new HttpParams();

    params = params.set(
      'secciones',
      Array.isArray(secciones) ? secciones.join(',') : secciones
    );

    if (filtros) {
      Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params = params.set(key, value.join(','));
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }

    return params;
  }

  /** 🔧 Genera una clave única de cache */
  private generarCacheKey(secciones: string[] | 'todas', filtros?: DashboardFiltros): string {
    return JSON.stringify({ secciones, filtros });
  }
}

export interface DashboardFiltros {
  precio_min?: number;
  precio_max?: number;
  categoria_id?: number;
  tienda_id?: number | number[];
}
