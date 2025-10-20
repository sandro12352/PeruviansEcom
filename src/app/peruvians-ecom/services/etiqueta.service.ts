import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etiqueta, EtiquetaResponse } from '../interfaces/etiqueta.interface';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(private http: HttpClient) { }


  getEtiquetas():Observable<EtiquetaResponse>{
    return this.http.get<EtiquetaResponse>(`${envs.apiUrl}/etiqueta/`)
  }

}
