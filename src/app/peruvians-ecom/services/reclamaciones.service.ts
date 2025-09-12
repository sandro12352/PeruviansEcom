import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Reclamacion, ReclamacionResponse, ConsultaReclamacionResponse } from '../interfaces/reclamacion';
import { envs } from '../../config/envs';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReclamacionesService {

  private readonly baseUrl = `${envs.apiUrl}/reclamaciones`;

  constructor(private http: HttpClient) { }

  /**
   * Crear una nueva reclamación
   */
  crearReclamacion(reclamacion: Reclamacion): Observable<ReclamacionResponse | null> {
    return this.http.post<ApiResponse<ReclamacionResponse>>(`${this.baseUrl}`, reclamacion)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            return response.data;
          }
          return null;
        })
      );
  }

  /**
   * Consultar estado de reclamación por número
   */
  consultarReclamacion(numeroReclamo: string): Observable<ConsultaReclamacionResponse | null> {
    return this.http.post<ApiResponse<ConsultaReclamacionResponse>>(`${this.baseUrl}/consultar`, {
      numero_reclamo: numeroReclamo
    })
      .pipe(
        map(response => {
          if (response.success && response.data) {
            return response.data;
          }
          return null;
        })
      );
  }

  /**
   * Método para manejar errores de la API
   */
  private handleError(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.error && error.error.errors) {
      // Si hay errores de validación, mostrar el primero
      const firstError = Object.values(error.error.errors)[0] as string[];
      return firstError[0] || 'Error en la validación de datos';
    }
    return 'Error interno del servidor. Por favor, inténtelo nuevamente.';
  }
}