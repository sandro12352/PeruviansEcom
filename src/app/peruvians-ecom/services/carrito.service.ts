import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { BehaviorSubject } from 'rxjs';
declare const bootstrap: any;
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productos:Producto[] =[];

   private itemsCount = new BehaviorSubject<number>(0);
  itemsCount$ = this.itemsCount.asObservable();

  constructor() { }


  getProductos(): Producto[] {
    return this.productos;
    
  }

  public actualizarCantidadTotal() {
    const totalUnidades = this.productos.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    this.itemsCount.next(totalUnidades);
  }
  

  agregarProducto(producto: Producto) {
    const productoExistente = this.productos.find(p => p.id == producto.id);
    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
      this.productos.push({ ...producto, cantidad: 1 });
    }
    this.actualizarCantidadTotal(); // ← Llama a la función para contar correctamente
    
  }



}
