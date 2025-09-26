import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { envs } from '../../config/envs';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ProductosResponse {
  productos: Producto[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface CategoriaPadreProductosResponse {
  categoria_padre: {
    id: number;
    nombre: string;
    imagen_url?: string;
  };
  productos: Producto[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  /**
   * Obtener todos los productos
   */
  getProductos(): Observable<Producto[]> {
    return this.http.get<ApiResponse<ProductosResponse>>(`${envs.apiUrl}/productos`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.productos;
          }
          return [];
        })
      );
  }

  /**
   * Buscar productos por término de búsqueda
   */
  buscarProductos(termino: string): Observable<Producto[]> {
    const params = new HttpParams().set('buscar', termino);
    
    return this.http.get<ApiResponse<ProductosResponse>>(`${envs.apiUrl}/productos`, { params })
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.productos;
          }
          return [];
        })
      );
  }

  /**
   * Obtener productos con filtros
   */
  getProductosConFiltros(filtros: { 
  buscar?: string; 
  categoria_id?: string;
  categoria_padre_id?: string; // NUEVO
  con_stock?: boolean; 
  per_page?: number; 
  page?: number;
  precio_min?: number;
  precio_max?: number;
  tienda_id?: string;
  en_oferta?: boolean;  
}): Observable<{productos: Producto[], pagination: any}> {
  let params = new HttpParams();
  
  if (filtros.buscar) {
    params = params.set('buscar', filtros.buscar);
  }
  
  if (filtros.categoria_id) {
    params = params.set('categoria_id', filtros.categoria_id);
  }
  
  // NUEVO: Soporte para categoría padre
  if (filtros.categoria_padre_id) {
    params = params.set('categoria_padre_id', filtros.categoria_padre_id);
  }
  
  if (filtros.con_stock !== undefined) {
    params = params.set('con_stock', filtros.con_stock.toString());
  }
  
  if (filtros.per_page) {
    params = params.set('per_page', filtros.per_page.toString());
  }
  
  if (filtros.page) {
    params = params.set('page', filtros.page.toString());
  }

  if (filtros.precio_min !== undefined) {
    params = params.set('precio_min', filtros.precio_min.toString());
  }

  if (filtros.precio_max !== undefined) {
    params = params.set('precio_max', filtros.precio_max.toString());
  }
  
  if (filtros.en_oferta !== undefined) {
    params = params.set('en_oferta', filtros.en_oferta.toString());
  }
  
  if (filtros.tienda_id) {
    params = params.set('tienda_id', filtros.tienda_id);
  }
  
  return this.http.get<ApiResponse<ProductosResponse>>(`${envs.apiUrl}/productos`, { params })
    .pipe(
      map(response => {
        if (response.success) {
          return {
            productos: response.data.productos,
            pagination: response.data.pagination
          };
        }
        return {
          productos: [],
          pagination: null
        };
      })
    );
}

  /**
   * Obtener productos por categoría
   */
  getProductosPorCategoria(categoriaId: string): Observable<Producto[]> {
    return this.http.get<ApiResponse<ProductosResponse>>(`${envs.apiUrl}/productos?categoria_id=${categoriaId}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.productos;
          }
          return [];
        })
      );
  }

  /**
   * NUEVO: Obtener productos por categoría padre (incluye subcategorías)
   */
 getProductosPorCategoriaPadre(categoriaPadreId: string, filtros?: {
  precio_min?: number;
  precio_max?: number;
  tienda_id?: string;
}): Observable<{productos: Producto[], pagination: any}> {
  let params = new HttpParams();
  
  // Agregar filtros básicos
  if (filtros?.precio_min !== undefined) {
    params = params.set('precio_min', filtros.precio_min.toString());
  }
  
  if (filtros?.precio_max !== undefined) {
    params = params.set('precio_max', filtros.precio_max.toString());
  }
  
  if (filtros?.tienda_id) {
    params = params.set('tienda_id', filtros.tienda_id);
  }

  return this.http.get<ApiResponse<ProductosResponse>>(
    `${envs.apiUrl}/productos/categoria-padre/${categoriaPadreId}`, 
    { params }
  ).pipe(
    map(response => {
      if (response.success) {
        return {
          productos: response.data.productos,
          pagination: response.data.pagination
        };
      }
      return {
        productos: [],
        pagination: null
      };
    })
  );
}

  /**
   * Obtener un producto específico
   */
  getProducto(id: number): Observable<Producto | null> {
    return this.http.get<ApiResponse<Producto>>(`${envs.apiUrl}/productos/${id}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          return null;
        })
      );
  }
}