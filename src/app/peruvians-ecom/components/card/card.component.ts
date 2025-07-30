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

  @Input() producto!:Producto;
  
  constructor(
    private carritoService:CarritoService
  ){}


   AgregarCarrito(){
    this.carritoService.agregarProducto(this.producto);
    

    const offcanvasElement = document.getElementById('offcanvasCarrito');
  if (offcanvasElement) {
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    bsOffcanvas.show();
  }
    
  }   


   generarSlugConId(producto: Producto): string {
  const slug = producto.nombre
    .toLowerCase()
    .replace(/\s+/g, '-')        // espacios → guiones
    .replace(/[^\w\-]+/g, '')    // elimina caracteres especiales
    .replace(/\-\-+/g, '-')      // colapsa múltiples guiones
    .trim();
  return `${slug}-${producto.id}`;
}
 
}
