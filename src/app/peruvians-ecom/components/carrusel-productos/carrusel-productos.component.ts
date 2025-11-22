import {AfterViewChecked,Component,HostListener,Inject,Input,OnChanges,PLATFORM_ID} from '@angular/core';
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
  @Input() categoriasJerarquicas: Categoria[] = []; // NUEVO: Recibe las categorías

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  gruposProductos: Producto[][] = [];
  carouselInstanciado = false;

  ngOnChanges() {
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

  // NUEVO: Generar slug de categoría
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

  // NUEVO: Generar slug de producto
  private generarSlugConId(producto: Producto): string {
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

  // NUEVO: Obtener información de categorías por producto
  private obtenerInfoCategoriasPorProducto(producto: Producto): {categoriaPadre: any | null, categoriaHijo: any | null} {
    let categoriaPadre: any | null = null;
    let categoriaHijo: any | null = null;

    if (!producto.categoria_id) {
      return { categoriaPadre, categoriaHijo };
    }

    // Buscar en categoriasJerarquicas 
    for (const categoria of this.categoriasJerarquicas) {
      // Primero verificar si el producto pertenece a una subcategoría
      if (categoria.subcategorias && categoria.subcategorias.length > 0) {
        const subcategoriaEncontrada = categoria.subcategorias.find(
          (sub: any) => sub.id.toString() === producto.categoria_id?.toString()
        );
        
        if (subcategoriaEncontrada) {
          categoriaPadre = categoria;
          categoriaHijo = subcategoriaEncontrada;
          break;
        }
      }
      
      // Si no se encuentra en subcategorías, verificar si pertenece directamente a la categoría padre
      if (categoria.id.toString() === producto.categoria_id?.toString()) {
        categoriaPadre = categoria;
        break;
      }
    }

    return { categoriaPadre, categoriaHijo };
  }

  // NUEVO: Generar ruta para un producto específico
  generarRutaParaProducto(producto: Producto): string[] {
    if (!this.categoriasJerarquicas || this.categoriasJerarquicas.length === 0) {
      // Fallback si no hay categorías jerárquicas
      if (producto.categoria && typeof producto.categoria === 'string') {
        const categoriaSlug = this.generarSlugCategoria(producto.categoria);
       let categoriaPadre = 'productos'; // fallback por defecto
      // if (producto.categoria_completa?.padre?.nombre) {
      //   categoriaPadre = this.generarSlugCategoria(producto.categoria_completa.padre.nombre);
      // }
        return ['/',categoriaPadre, categoriaSlug, this.generarSlugConId(producto)];
      }
      return ['/productos', this.generarSlugConId(producto)];
    }

    const { categoriaPadre, categoriaHijo } = this.obtenerInfoCategoriasPorProducto(producto);
    const slug = this.generarSlugConId(producto);

    if (categoriaPadre && categoriaHijo) {
      // Ruta completa: padre/hijo/producto
      const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
      const slugHijo = this.generarSlugCategoria(categoriaHijo.nombre);
      return ['/', slugPadre, slugHijo, slug];
    } else if (categoriaPadre) {
      // Solo categoría padre: padre/producto
      const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
      return ['/', slugPadre, slug];
    } else {
      // Fallbacks
      // if (producto.categoria_completa && typeof producto.categoria_completa === 'object') {
      //   const categoriaCompleta = producto.categoria_completa as any;
      //   if (categoriaCompleta.padre && categoriaCompleta.padre.nombre) {
      //     const padreSlug = this.generarSlugCategoria(categoriaCompleta.padre.nombre);
      //     const hijoSlug = this.generarSlugCategoria(categoriaCompleta.nombre);
      //     return ['/', padreSlug, hijoSlug, slug];
      //   }
      // }
      
      if (producto.categoria && typeof producto.categoria === 'string') {
        const categoriaSlug = this.generarSlugCategoria(producto.categoria);
        return ['/', categoriaSlug, slug];
      }
      
      return ['/productos', slug];
    }
  }
}