import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { envs } from '../../config/envs';
import { Categoria, CategoriaResponse } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriasCache: Categoria[] | null = null;
  private readonly baseUrl = `${envs.apiUrl}/categoria`;

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<CategoriaResponse> {

    if(this.categoriasCache){
       return of({ success: true, data: this.categoriasCache});
    }else{
      return this.http.get<CategoriaResponse>(`${this.baseUrl}/`).pipe(
        tap((response)=>{
          this.categoriasCache = response.data;
        })
      )
    }

    
  }

  obtenerCategoriaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}