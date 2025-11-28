import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { envs } from '../../config/envs';
import { Etiqueta } from '../interfaces/etiqueta.interface';
import { Categoria } from '../interfaces/categoria';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeruviansService {

  private readonly baseUrl = `${envs.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  
  masVendidos(filtros?: { 
  precio_min?: number; 
  precio_max?: number;
  tienda_id?: string;
  categoria_id?: string;
  categoria_padre_id?: string; // NUEVO
}): Observable<Producto[]> {
  let params = '';
  if (filtros) {
    const queryParams: string[] = [];
    if (filtros.precio_min !== undefined) {
      queryParams.push(`precio_min=${filtros.precio_min}`);
    }
    if (filtros.precio_max !== undefined) {
      queryParams.push(`precio_max=${filtros.precio_max}`);
    }
    if (filtros.tienda_id) {
      queryParams.push(`tienda_id=${filtros.tienda_id}`);
    }
    if (filtros.categoria_id) {
      queryParams.push(`categoria_id=${filtros.categoria_id}`);
    }
    // NUEVO: Soporte para categoría padre
    if (filtros.categoria_padre_id) {
      queryParams.push(`categoria_padre_id=${filtros.categoria_padre_id}`);
    }
    if (queryParams.length > 0) {
      params = '?' + queryParams.join('&');
    }
  }
  
  return this.http.get<ApiResponse<Producto[]>>(`${this.baseUrl}/vendidos${params}`)
    .pipe(
      map(response => {
        if (response.success) {
          return response.data;
        }
        return [];
      })
    );
  }


  masNuevo(filtros?: { 
    precio_min?: number; 
    precio_max?: number;
    tienda_id?: string;
    categoria_id?: string;
    categoria_padre_id?: string; // NUEVO
  }): Observable<Producto[]> {
    let params = '';
    if (filtros) {
      const queryParams: string[] = [];
      if (filtros.precio_min !== undefined) {
        queryParams.push(`precio_min=${filtros.precio_min}`);
      }
      if (filtros.precio_max !== undefined) {
        queryParams.push(`precio_max=${filtros.precio_max}`);
      }
      if (filtros.tienda_id) {
        queryParams.push(`tienda_id=${filtros.tienda_id}`);
      }
      if (filtros.categoria_id) {
        queryParams.push(`categoria_id=${filtros.categoria_id}`);
      }
      // NUEVO: Soporte para categoría padre
      if (filtros.categoria_padre_id) {
        queryParams.push(`categoria_padre_id=${filtros.categoria_padre_id}`);
      }
      if (queryParams.length > 0) {
        params = '?' + queryParams.join('&');
      }
    }

    return this.http.get<ApiResponse<Producto[]>>(`${this.baseUrl}/nuevos${params}`)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            return Array.isArray(response.data) ? response.data : [response.data];
          }
          return [];
        })
      );
  }

 
  getProductos(): Observable<Producto[]> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.productos || [];
          }
          return [];
        })
      );
  }

  getProductosPorCategoria(categoriaId: string | number): Observable<Producto[]> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}?categoria_id=${categoriaId}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.productos || [];
          }
          return [];
        })
      );
  }

  /**
   * Obtener productos por tienda - NUEVO MÉTODO
   */
  getProductosPorTienda(tiendaId: string | number): Observable<Producto[]> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}?tienda_id=${tiendaId}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.productos || [];
          }
          return [];
        })
      );
  }

  
  getProducto(id: number): Observable<Producto | null> {
    return this.http.get<ApiResponse<Producto>>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          return null;
        })
      );
  }

  obtenerPorSlug(slug:string):Observable<Etiqueta | Categoria>{
        return this.http.post<Etiqueta | Categoria>(`${envs.apiUrl}/slug`,{slug});
  }
  
}