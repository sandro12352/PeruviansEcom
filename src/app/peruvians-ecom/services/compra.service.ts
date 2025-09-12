import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envs } from '../../config/envs';

export interface ClienteInvitado {
  nombre: string;
  dni: string;
  email: string;
  telefono?: string;
  direccion?: string;
}

export interface DatosTarjeta {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
}

export interface ProductoCompra {
  producto_id: number;
  cantidad: number;
}

export interface DatosCompra {
  cliente: ClienteInvitado;
  direccion_envio: string;
  metodo_pago: 'tarjeta';
  productos: ProductoCompra[];
  tarjeta: DatosTarjeta;
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) {}

  procesarCompra(datosCompra: DatosCompra): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(`${envs.apiUrl}/compra`, datosCompra, { headers });
  }

  // Validaciones básicas
  validarTarjeta(tarjeta: DatosTarjeta): boolean {
    return tarjeta.card_number.length > 0 && 
           tarjeta.cvv.length === 3 && 
           tarjeta.expiration_month.length > 0 && 
           tarjeta.expiration_year.length > 0;
  }

  validarCliente(cliente: ClienteInvitado): boolean {
    return cliente.nombre.length > 0 && 
           cliente.dni.length === 8 && 
           cliente.email.includes('@');
  }
}