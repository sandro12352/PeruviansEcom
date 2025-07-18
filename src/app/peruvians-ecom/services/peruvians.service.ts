import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class PeruviansService {

  private url = './data';

  constructor(private http: HttpClient) {}

  todosProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/productos.json`);
  }

  masVendidos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/masVendidos.json`);
  }

  masNuevo():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/masNuevo.json`);
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${this.url}/productos.json`).pipe(
    map(productos => productos.filter(p => p.categoria === categoria))
    );
  }
  
}
