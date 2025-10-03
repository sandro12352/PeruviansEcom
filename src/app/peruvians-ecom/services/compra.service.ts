import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';
import { envs } from '../../config/envs';
import { Departamento, Distrito, Provincia } from '../../checkout/interfaces/ubigeo.interface';

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
  departamento:Departamento,
  provincia:Provincia,
  distrito:Distrito,
  direccion_envio: string;
  metodo_pago: 'tarjeta' | 'yape';
  productos: ProductoCompra[];
  tarjeta?: DatosTarjeta;
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) {}

  procesarCompra(datosCompra: DatosCompra): Observable<any> {

    return this.http.post<any>(`${envs.apiUrl}/compra`, datosCompra);
  }

  getEstadoPedido(id: number): Observable<any> {
    return this.http.get(`${envs.apiUrl}/estado.php?id=${id}`);
  }

  pollEstadoPedido(idorder_id: number): Observable<any> {
    return timer(0, 3000).pipe(
      switchMap(() => this.getEstadoPedido(idorder_id))
    );
  }

  // Validaciones mejoradas
  validarTarjeta(tarjeta: DatosTarjeta): boolean {
    return !!(tarjeta.card_number && tarjeta.card_number.replace(/\s/g, '').length > 0) && 
           !!(tarjeta.cvv && tarjeta.cvv.length === 3) && 
           !!(tarjeta.expiration_month && tarjeta.expiration_month.length > 0) && 
           !!(tarjeta.expiration_year && tarjeta.expiration_year.length > 0);
  }

  validarCliente(cliente: ClienteInvitado): boolean {
    // Convertir a string para validaciones consistentes
    const nombre = cliente.nombre ? cliente.nombre.toString().trim() : '';
    const dni = cliente.dni ? cliente.dni.toString().trim() : '';
    const email = cliente.email ? cliente.email.toString().trim() : '';

    return nombre.length > 0 && 
           dni.length === 8 && 
           /^\d{8}$/.test(dni) && // Validar que sea exactamente 8 dígitos
           email.includes('@') && 
           email.length > 0;
  }
}