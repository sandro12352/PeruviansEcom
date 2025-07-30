import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';

@Component({
  selector: 'peruvians-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  mantenerVisible = false;
  cartCount = 0;
  productosEnCarrito: Producto[] = [];
  productosFiltrados: Producto[] = [];
  constructor(
    private carritoService: CarritoService,
    private peruvianService:PeruviansService
  ) {}

  ngOnInit(): void {
   this.carritoService.itemsCount$.subscribe(count => {
    this.cartCount = count;
   
  });
   this.productosEnCarrito = this.carritoService.getProductos();



   
  }

  activeCategory: string | null = null;

      mostrarProductos(categoria: string) {
        this.activeCategory = categoria;

          this.peruvianService.getProductosPorCategoria(categoria).subscribe((productos) => {
            this.productosFiltrados = productos;
        });
      }
      

      ocultarProductos() {
        this.activeCategory = null;
      }

       mantenerProductos() {
          this.mantenerVisible = true;
      }


    

  calcularSubtotal():number{
    let subtotal=0;
    this.productosEnCarrito.forEach(producto=>{
      subtotal += (producto.precio_antes)*(producto.cantidad)
    })
    return subtotal  
  }


  calcularDescuento():number{
    let descuento=0;
    this.productosEnCarrito.forEach(producto =>{
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



