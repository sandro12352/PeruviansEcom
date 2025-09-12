
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { envs } from '../../config/envs';

import { 
  PedidosResponse, 
  DetallePedidoResponse, 
  ApiError,
  Pedido,
  DetallePedido
} from '../interfaces/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  misPedidos(page: number = 1, perPage: number = 10, estado?: string): Observable<PedidosResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (estado && estado !== 'todos') {
      params = params.set('estado', estado);
    }

    return this.http.get<PedidosResponse>(`${envs.apiUrl}/auth/mis-pedidos`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtener detalle de un pedido específico
   * @param pedidoId - ID del pedido
   */
  detallePedido(pedidoId: number): Observable<DetallePedidoResponse> {
    return this.http.get<DetallePedidoResponse>(`${envs.apiUrl}/auth/pedidos/${pedidoId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtener texto descriptivo del estado del pedido
   */
  getEstadoTexto(estado: string): string {
    const estados: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'pagado': 'Pagado',
      'cancelado': 'Cancelado',
      'enviado': 'Enviado'
    };
    return estados[estado] || 'Desconocido';
  }

  /**
   * Obtener clase CSS para el estado del pedido
   */
  getEstadoClass(estado: string): string {
    const clases: { [key: string]: string } = {
      'pendiente': 'badge-warning',
      'pagado': 'badge-success',
      'cancelado': 'badge-danger',
      'enviado': 'badge-info'
    };
    return clases[estado] || 'badge-secondary';
  }

  /**
   * Verificar si un pedido está pagado
   */
  estaPagado(pedido: Pedido): boolean {
    return pedido.estado_pedido === 'pagado' || 
           (pedido.pago?.estado_pago === 'aprobado');
  }

  /**
   * Verificar si un pedido se puede cancelar
   */
  sePuedeCancelar(pedido: Pedido): boolean {
    return pedido.estado_pedido === 'pendiente';
  }

  /**
   * Formatear fecha para mostrar
   */
  formatearFecha(fecha: string): string {
    try {
      return new Date(fecha).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return fecha; // Retorna la fecha original si no se puede formatear
    }
  }

  /**
   * Obtener resumen del pedido (para mostrar en tarjetas)
   */
  getResumenPedido(pedido: Pedido): string {
    const items = pedido.cantidad_items;
    const productos = pedido.total_productos;
    
    if (items === 1) {
      return `1 producto (${productos} unidades)`;
    }
    return `${items} productos (${productos} unidades)`;
  }

  /**
   * Manejo de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: ApiError = {
      success: false,
      message: 'Error desconocido'
    };

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage.message = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      if (error.error && error.error.message) {
        errorMessage = error.error;
      } else {
        errorMessage.message = `Error ${error.status}: ${error.statusText}`;
      }
    }

    return throwError(() => errorMessage);
  }
}