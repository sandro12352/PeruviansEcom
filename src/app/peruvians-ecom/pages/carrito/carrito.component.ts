import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

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
