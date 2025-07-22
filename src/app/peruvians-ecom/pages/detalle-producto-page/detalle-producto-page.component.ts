import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-detalle-producto-page',
  templateUrl: './detalle-producto-page.component.html',
  styleUrl: './detalle-producto-page.component.css'
})
export class DetalleProductoPageComponent implements OnInit {

  public producto: Producto | undefined;

  constructor(
    private route: ActivatedRoute,
    private peruviansService: PeruviansService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const nombreProducto = this.route.snapshot.paramMap.get('nombreProducto');

    if (nombreProducto) {
      const idStr = nombreProducto.split('-').pop();
      const id = parseInt(idStr!, 10);

      if (!isNaN(id)) {
        this.peruviansService.getProductoPorId(id).subscribe(producto => {
          if (producto) {
            this.producto = { ...producto, cantidad: 1 }; // asegura que tenga cantidad
          }
        });
      }
    }
  }

  aumentarCantidad(): void {
    if (this.producto) {
      this.producto.cantidad! += 1;
    }
  }

  disminuirCantidad(): void {
    if (this.producto && this.producto.cantidad! > 1) {
      this.producto.cantidad! -= 1;
    }
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.carritoService.agregarProducto(this.producto);
      this.carritoService.actualizarCantidadTotal();
    }
  }

  eliminarProducto(): void {
    if (this.producto) {
      this.carritoService.eliminarProducto(this.producto);
      this.carritoService.actualizarCantidadTotal();
    }
  }
}
