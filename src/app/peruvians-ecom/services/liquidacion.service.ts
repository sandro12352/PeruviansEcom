import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class LiquidacionService {

  constructor(private http:HttpClient) { }

  getProductosLiquidacion():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${envs.apiUrl}/liquidacion.json`)
  }

  
}
