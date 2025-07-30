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
  private storageKey = 'carrito';

  constructor() { 
     this.cargarDesdeLocalStorage();
      this.actualizarCantidadTotal();

  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.productos));
  }

  private cargarDesdeLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    this.productos = data ? JSON.parse(data) : [];
  }



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

     this.guardarEnLocalStorage();
    this.actualizarCantidadTotal(); // ← Llama a la función para contar correctamente
    this.ultimoProductoSubject.next(producto); // Emite el último producto
  }



  aumentarCantidad(producto: Producto): void {
    const item = this.productos.find(p => p.id === producto.id);
    if (item) {
      item.cantidad!++;
      this.guardarEnLocalStorage();
      this.actualizarCantidadTotal();
    }
  }

  disminuirCantidad(producto: Producto): void {
    const item = this.productos.find(p => p.id === producto.id);
    if (item && item.cantidad! > 1) {
      item.cantidad!--;
      this.guardarEnLocalStorage();
      this.actualizarCantidadTotal();
    }
  }

  eliminarProducto(producto:Producto){
    const index = this.productos.findIndex(p => p.id == producto.id);
    if(index !== -1) {
      this.productos.splice(index, 1);

       this.guardarEnLocalStorage();
      this.actualizarCantidadTotal(); // Actualiza el conteo después de eliminar
    }
  }

  limpiarCarrito(): void {
    this.productos = [];
    this.guardarEnLocalStorage();
    this.actualizarCantidadTotal();
  }


   calcularSubtotal(): number {
    let subtotal = 0;
    this.productos.forEach(producto => {
      subtotal += (producto.precio_antes || 0) * (producto.cantidad || 1);
    });
    return subtotal;
  }

  calcularDescuento(): number {
    let descuento = 0;
    this.productos.forEach(producto => {
      const porcentaje = parseFloat(producto.descuento );
 
      descuento += (producto.precio_antes || 0) * (producto.cantidad || 1) * (porcentaje / 100);
    });
    return descuento;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() - this.calcularDescuento();
  }

}
