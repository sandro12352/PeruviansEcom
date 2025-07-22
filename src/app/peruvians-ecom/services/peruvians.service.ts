import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class PeruviansService {

  

  constructor(private http: HttpClient) {}


  masVendidos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${envs.apiUrl}/masVendidos.json`);
  }

  masNuevo():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${envs.apiUrl}/masNuevo.json`);
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${envs.apiUrl}/productos.json`).pipe(
    map(productos => productos.filter(p => p.categoria === categoria))
    );
  }
  
}
