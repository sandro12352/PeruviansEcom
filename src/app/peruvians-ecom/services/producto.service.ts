import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }


  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${envs.apiUrl}/productos.json`);
  }




}
