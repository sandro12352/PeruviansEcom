import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etiqueta } from '../interfaces/etiqueta.interface';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(private http: HttpClient) { }


  getEtiquetas():Observable<Etiqueta[]>{
    return this.http.get<Etiqueta[]>(`${envs.apiUrl}/etiqueta/`)
  }

}
