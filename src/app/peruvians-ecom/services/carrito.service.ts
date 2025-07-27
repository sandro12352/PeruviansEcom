import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { BehaviorSubject } from 'rxjs';
declare const bootstrap: any;
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productos:Producto[] =[];
  private ultimoProductoSubject = new BehaviorSubject<Producto | null>(null);
  ultimoProducto$ = this.ultimoProductoSubject.asObservable();
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
    this.ultimoProductoSubject.next(producto); // Emite el último producto
  }


  eliminarProducto(producto:Producto){
    const index = this.productos.findIndex(p => p.id == producto.id);
    if(index !== -1) {
      this.productos.splice(index, 1);
      this.actualizarCantidadTotal(); // Actualiza el conteo después de eliminar
    }
  }



}
