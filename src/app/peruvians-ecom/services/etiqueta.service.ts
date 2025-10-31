import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Etiqueta, EtiquetaResponse } from '../interfaces/etiqueta.interface';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
private etiquetasCache: Etiqueta[] | null = null;
  constructor(private http: HttpClient) { }


  getEtiquetas():Observable<EtiquetaResponse>{
    if (this.etiquetasCache) {
      // 🔹 Devuelve el caché en memoria si ya fue cargado
      return of({ etiquetas: this.etiquetasCache });
    } else {
      return this.http.get<EtiquetaResponse>(`${envs.apiUrl}/etiqueta/`).pipe(
        tap((response)=>{
          this.etiquetasCache = response.etiquetas;
        })
      )
  }}

}
