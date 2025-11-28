import {AfterViewChecked,Component,HostListener,Inject,Input,OnChanges,PLATFORM_ID, SimpleChanges} from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'peruvians-carrusel-productos',
  templateUrl: './carrusel-productos.component.html',
  styleUrl: './carrusel-productos.component.css'
})
export class CarruselProductosComponent implements OnChanges, AfterViewChecked {
  @Input() carouselId!: string;
  @Input() productos!: Producto[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  gruposProductos: Producto[][] = [];
  carouselInstanciado = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productos'] && this.productos) {
    // Calcular rutas cuando cambien los productos
    this.productos = this.productos.map(producto => ({
      ...producto,
      rutaCalculada: this.generarRutaParaProducto(producto)
    }));
  }



    this.calcularGrupos();
    this.carouselInstanciado = false; // para reinicializar el carrusel
  }

  @HostListener('window:resize')
  onResize() {
    this.calcularGrupos();
  }

  ngAfterViewChecked(): void {
    if (!this.carouselInstanciado && isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(this.carouselId);
      if (el) {
        new bootstrap.Carousel(el, {
          pause:'hover',
          interval: 10000,
          ride:'carousel',          
        });

        this.carouselInstanciado = true;
      }
    }
  }

  calcularGrupos() {
    if (isPlatformBrowser(this.platformId)) {
      const ancho = window.innerWidth;
      const chunkSize = ancho < 768 ? 2 : 5;

      this.gruposProductos = [];
      for (let i = 0; i < this.productos.length; i += chunkSize) {
        this.gruposProductos.push(this.productos.slice(i, i + chunkSize));
      }
    }
  }

  

  

  // NUEVO: Generar ruta para un producto específico
  generarRutaParaProducto(producto: Producto): string[] {
    const categoriaPadre = producto.categoria?.categoria_slug;
    const categoriaHijo = producto.subcategoria?.categoria_slug;
    const slug = producto.producto_slug;
    if (categoriaPadre && categoriaHijo) {
      return ['/', categoriaPadre, categoriaHijo, slug, String(producto.id)];
    } else if (categoriaPadre) {
      // Solo categoría padre: padre/producto
      return ['/', categoriaPadre, slug];
    } else {
      
      return ['/'];
    }
  }
}