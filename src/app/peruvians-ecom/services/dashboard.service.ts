// src/app/peruvians-ecom/services/dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../interfaces/dashboard.interface';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly apiUrl = `${envs.apiUrl}/dashboard`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los datos del dashboard
   * @param secciones - Array de secciones a obtener o 'todas' para obtener todo
   * @param filtros - Filtros adicionales para productos (precio, categoria, tienda)
   */
  getDashboardData(
    secciones: string[] | 'todas' = 'todas',
    filtros?: DashboardFiltros
  ): Observable<DashboardResponse> {
    let params = new HttpParams();

    // Agregar secciones como parámetro
    if (Array.isArray(secciones)) {
      params = params.set('secciones', secciones.join(','));
    } else {
      params = params.set('secciones', secciones);
    }

    // Agregar filtros si existen
    if (filtros) {
      if (filtros.precio_min !== undefined) {
        params = params.set('precio_min', filtros.precio_min.toString());
      }
      if (filtros.precio_max !== undefined) {
        params = params.set('precio_max', filtros.precio_max.toString());
      }
      if (filtros.categoria_id !== undefined) {
        params = params.set('categoria_id', filtros.categoria_id.toString());
      }
      if (filtros.tienda_id !== undefined) {
        if (Array.isArray(filtros.tienda_id)) {
          params = params.set('tienda_id', filtros.tienda_id.join(','));
        } else {
          params = params.set('tienda_id', filtros.tienda_id.toString());
        }
      }
    }

    return this.http.get<DashboardResponse>(this.apiUrl, { params });
  }

  /** Obtiene solo las categorías */
  getCategorias(): Observable<DashboardResponse> {
    return this.getDashboardData(['categorias']);
  }

  /** Obtiene solo los productos más vendidos */
  getMasVendidos(filtros?: DashboardFiltros): Observable<DashboardResponse> {
    return this.getDashboardData(['mas_vendidos'], filtros);
  }

  /** Obtiene solo los productos más nuevos */
  getMasNuevos(filtros?: DashboardFiltros): Observable<DashboardResponse> {
    return this.getDashboardData(['mas_nuevos'], filtros);
  }

  /** Obtiene solo las liquidaciones */
  getLiquidaciones(): Observable<DashboardResponse> {
    return this.getDashboardData(['liquidaciones']);
  }

  /** Obtiene solo la configuración de CyberWow */
  getConfiguracionCyberwow(): Observable<DashboardResponse> {
    return this.getDashboardData(['configuracion']);
  }

  /** Obtiene solo el carrusel */
  getCarrusel(): Observable<DashboardResponse> {
    return this.getDashboardData(['carrusel']);
  }
}

export interface DashboardFiltros {
  precio_min?: number;
  precio_max?: number;
  categoria_id?: number;
  tienda_id?: number | number[];
}
