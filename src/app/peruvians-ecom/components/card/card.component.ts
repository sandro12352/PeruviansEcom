import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';

declare const bootstrap: any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() producto!: Producto;
  @Input() rutaProducto?: string[]; // NUEVO: Ruta calculada por el componente padre
  
  constructor(private carritoService: CarritoService) {}


  
  ngOnChanges() {
    if (this.producto) {
      this.rutaProducto = this.obtenerRuta();
    }
  }

  AgregarCarrito() {
    this.carritoService.agregarProducto(this.producto);
    const offcanvasElement = document.getElementById('offcanvasCarrito');
    if (offcanvasElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      bsOffcanvas.show();
    }
  }

 
  /**
   * Obtiene la ruta a usar - usa rutaProducto si está disponible, sino fallback
   */
  obtenerRuta(): string[] {


    if (this.rutaProducto && this.rutaProducto.length > 0) {
      return this.rutaProducto;
    }
    
    
    
    if (this.producto.categoria && typeof this.producto.categoria === 'string') {
      const categoriaSlug = this.producto.categoria;
      return ['/', categoriaSlug,this.producto.nombre]; 
    }
    
    // Fallback final
    return ['/productos'];
  }
}