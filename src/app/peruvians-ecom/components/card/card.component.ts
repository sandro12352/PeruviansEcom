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
  let nombreLimpio = producto.nombre
    .toLowerCase()
    .trim()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i') 
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/\d+\s*(ml|mg|gr|g|kg|unidades|und|piezas|pzs|%)/gi, '')
    .replace(/\b(100|natural|puro|premium|original|autentico|de|del|la|las|el|los|para|con|sin|y|o|u)\b/gi, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const palabras = nombreLimpio.split(' ').filter(palabra => palabra.length > 0).slice(0, 2);
  const nombreCorto = palabras.join('-');
  return `${nombreCorto}-${producto.id}`;
}
 
}
