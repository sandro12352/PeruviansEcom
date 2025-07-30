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
    let subtotal=0;
    this.productos.forEach(producto=>{
      subtotal += (producto.precio_antes)*(producto.cantidad)
    })
    return subtotal  
  }


  calcularDescuento():number{
    let descuento=0;
    this.productos.forEach(producto =>{
      const porcentaje = parseInt(producto.descuento || '0', 10);
      descuento += (producto.precio_antes * (producto.cantidad || 1)) * (porcentaje / 100);
    })
    return Math.round(descuento);
  }


  calcularTotal():number{
    let total=0;
     total = this.calcularSubtotal() - this.calcularDescuento();
     return total;
  }


  aumentarCantidad(producto: Producto) {
    producto.cantidad! += 1;
   this.carritoService.actualizarCantidadTotal(); // actualiza total, badge, etc.
  }

  disminuirCantidad(producto: Producto) {
    if (producto.cantidad! > 1) {
      producto.cantidad! -= 1;
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
