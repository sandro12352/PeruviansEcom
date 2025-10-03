import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ubigeo } from '../interfaces/ubigeo.interface';
import { Observable } from 'rxjs';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(
    private http:HttpClient
  ) { }

  public getUbigeo(tipo:'domicilio' | 'agencia'):Observable<Ubigeo[]>{
   return this.http.get<Ubigeo[]>(`${envs.apiUrl}/ubigeo?tipo_envio=${tipo}`)
  }









}
