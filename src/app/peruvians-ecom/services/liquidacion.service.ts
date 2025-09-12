import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { envs } from '../../config/envs';
import { Liquidacion, LiquidacionResponse } from '../interfaces/liquidacion';

@Injectable({
  providedIn: 'root'
})
export class LiquidacionService {

  private readonly baseUrl = `${envs.apiUrl}/liquidacion`;

  constructor(private http: HttpClient) { }

  /**
   * Obtener productos en liquidación desde la API
   */
  getProductosLiquidacion(): Observable<Liquidacion[]> {
    return this.http.get<LiquidacionResponse>(this.baseUrl)
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