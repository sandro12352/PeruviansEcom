import { Component } from '@angular/core';
import { Producto } from '../../../peruvians-ecom/interfaces/producto';
import { CarritoService } from '../../../peruvians-ecom/services/carrito.service';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent {
  productos: Producto[] = [];
    constructor(
      private carritoService:CarritoService
    ){}
    ngOnInit(): void {
     this.productos = this.carritoService.getProductos(); 
    
    }
  
  
  
  
  calcularSubtotal():number{
      return this.carritoService.calcularSubtotal();
    }
  
  
    calcularDescuento():number{
     return this.carritoService.calcularDescuento();
    }
  
  
    calcularTotal():number{
      return this.carritoService.calcularTotal()
    }
  
  
    aumentarCantidad(producto: Producto) {
      this.carritoService.aumentarCantidad(producto);
     this.carritoService.actualizarCantidadTotal(); // actualiza total, badge, etc.
    }
  
    disminuirCantidad(producto: Producto) {
      if (producto.cantidad! > 1) {
        this.carritoService.disminuirCantidad(producto);
        this.carritoService.actualizarCantidadTotal();
  
      } else {
        this.eliminarProducto(producto); // o deshabilitar el botón
        }
      }
  
  
    eliminarProducto(producto: Producto) {
      this.carritoService.eliminarProducto(producto);
      this.carritoService.actualizarCantidadTotal(); // Actualiza la lista de productos en el carrito
    }
}
