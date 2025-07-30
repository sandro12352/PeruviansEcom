import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';
import { Router } from '@angular/router';

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
    private peruvianService:PeruviansService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.carritoService.itemsCount$.subscribe(count => {
    this.cartCount = count;
   
  });
   this.productosEnCarrito = this.carritoService.getProductos();



   
  }
  activeCategory: string | null = null;


  irACheckout(): void {
      document.body.style.overflow = '';
      document.body.style.padding = ''; // 👈 quitar clase
      this.router.navigate(['/checkout/carrito']);        // 👈 navegar sin recargar
  }

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



