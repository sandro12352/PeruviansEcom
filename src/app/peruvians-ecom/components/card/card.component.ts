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

  AgregarCarrito() {
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

  /**
   * NUEVO: Generar slug de categoría para fallbacks
   */
  private generarSlugCategoria(nombre: string): string {
    return nombre.toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[áàäâ]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Obtiene la ruta a usar - usa rutaProducto si está disponible, sino fallback
   */
  obtenerRuta(): string[] {
    if (this.rutaProducto && this.rutaProducto.length > 0) {
      return this.rutaProducto;
    }
    
    // Fallbacks si no se pasó rutaProducto
    if (this.producto.categoria_completa && typeof this.producto.categoria_completa === 'object') {
      const categoriaCompleta = this.producto.categoria_completa as any;
      if (categoriaCompleta.padre && categoriaCompleta.padre.nombre) {
        const padreSlug = this.generarSlugCategoria(categoriaCompleta.padre.nombre);
        const hijoSlug = this.generarSlugCategoria(categoriaCompleta.nombre);
        return ['/', padreSlug, hijoSlug, this.generarSlugConId(this.producto)];
      }
    }
    
    if (this.producto.categoria && typeof this.producto.categoria === 'string') {
      const categoriaSlug = this.generarSlugCategoria(this.producto.categoria);
      return ['/', categoriaSlug, this.generarSlugConId(this.producto)];
    }
    
    // Fallback final
    return ['/productos', this.generarSlugConId(this.producto)];
  }
}