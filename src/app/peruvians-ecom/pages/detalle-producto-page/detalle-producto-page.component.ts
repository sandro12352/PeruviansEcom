import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria';
import { SeoService } from '../../services/seo.service';
import { DOCUMENT } from '@angular/common';
declare const bootstrap: any;
  
@Component({
  selector: 'app-detalle-producto-page',
  templateUrl: './detalle-producto-page.component.html',
  styleUrl: './detalle-producto-page.component.css'
})
export class DetalleProductoPageComponent implements OnInit {

  public producto: Producto | undefined;
  public productosRelacionados: Producto[] = [];
  public loading = false;
  public nombreProducto!:string;
  public loadingRelacionados = false;
  public error: string | null = null;
  public imagenSeleccionada: string | null | undefined = null;
  // NUEVO: Para manejar la estructura de categorías
  public categorias: Categoria[] = [];
  public categoriaPadreSlug: string | null = null;
  public categoriaHijoSlug: string | null = null;

  public pathParts: string[] = [];

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private route: ActivatedRoute,
    private router: Router,
     private seoService: SeoService,
    private peruviansService: PeruviansService,
    private carritoService: CarritoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    // Cargar categorías primero
    this.cargarCategorias();
    
    
    this.route.paramMap.subscribe(params => {
      this.nombreProducto = params.get('nombreProducto')!;
      const id = Number(params.get('id'));
      this.categoriaPadreSlug = params.get('categoriaPadreSlug');
      this.categoriaHijoSlug = params.get('categoriaHijoSlug');

      this.pathParts = this.router.url
        .split('?')[0]
        .replace(/^\/+/, '')
        .split('/')
        .filter(p => isNaN(Number(p)))               // 🚫 Quitar números puros
        .map(p => decodeURIComponent(p))
        .map(p => p.replace(/-/g, ' '));


      if (this.nombreProducto) {

        if (!isNaN(id)) {
          this.cargarProducto(id);
        } else {
          this.error = 'ID de producto inválido';
        }
      } else {
        this.error = 'No se encontró el parámetro del producto';
      }
    });
  }

  private cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.success) {
          this.categorias = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  private cargarProducto(id: number): void {
    this.loading = true;
    this.error = null;
    const canonicalUrl = this.document.location.href;
    this.peruviansService.getProducto(id).subscribe({
      next: (producto: Producto | null) => {
        if (producto) {
          this.producto = { ...producto, cantidad: 1 };
          this.seoService.setProductMeta(
            this.producto.nombre,
            this.producto.descripcion,
            canonicalUrl);

          const structuredData  =
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": producto.nombre,
            "image": producto.img,
            "description": producto.descripcion,
            "sku": producto.sku,
            "brand": {
              "@type": "Brand",
              "name": "Peruviansecom"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "PEN",
              "price": producto.precio,
              "availability": "https://schema.org/InStock"
            },
            "additionalProperty": [
              { "@type": "PropertyValue", "name": "Modo de uso", "value": producto.modo_de_uso },
              { "@type": "PropertyValue", "name": "Beneficios", "value": producto.beneficios},
              { "@type": "PropertyValue", "name": "Ingredientes", "value": producto.ingredientes},
              { "@type": "PropertyValue", "name": "Recomendado para", "value": producto.faq_quienes_toman },
              { "@type": "PropertyValue", "name": "Vida útil", "value":producto.vida_util }
            ]
          }



          this.seoService.setStructuredData(structuredData)


          this.producto.beneficios?.split(' ');
          this.imagenSeleccionada = producto.img;
          this.cargarProductosRelacionados();
        } else {
          this.error = 'Producto no encontrado';
        }
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
        this.error = 'Error al cargar el producto. Inténtalo de nuevo.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private cargarProductosRelacionados(): void {
    if (!this.producto) return;

    this.loadingRelacionados = true;
    
    this.peruviansService.getProductosPorCategoria(this.producto.categoria_id!).subscribe({
      next: (productosPorCategoria: Producto[]) => {
        let relacionados = productosPorCategoria
          .filter(p => p.id !== this.producto!.id)
          .slice(0, 8);

        if (relacionados.length < 8) {
          this.peruviansService.getProductosPorTienda(this.producto!.tienda_id!).subscribe({
            next: (productosPorTienda: Producto[]) => {
              const productosAdicionalesTienda = productosPorTienda
                .filter(p => 
                  p.id !== this.producto!.id && 
                  !relacionados.some(r => r.id === p.id)
                )
                .slice(0, 8 - relacionados.length);

              this.productosRelacionados = [...relacionados, ...productosAdicionalesTienda];
              this.loadingRelacionados = false;
            },
            error: (error) => {
              console.error('Error al cargar productos de la tienda:', error);
              this.productosRelacionados = relacionados;
              this.loadingRelacionados = false;
            }
          });
        } else {
          this.productosRelacionados = relacionados;
          this.loadingRelacionados = false;
        }
      },
      error: (error) => {
        console.error('Error al cargar productos relacionados:', error);
        this.loadingRelacionados = false;
      }
    });
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

      const offcanvasElement = document.getElementById('offcanvasCarrito');
      if (offcanvasElement) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        bsOffcanvas.show();
      }

      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        const bsModal = new bootstrap.Modal(modalElement);
        bsModal.show();
      }
    }
  }

  eliminarProducto(): void {
    if (this.producto) {
      this.carritoService.eliminarProducto(this.producto);
      this.carritoService.actualizarCantidadTotal();
    }
  }

  generarSlugConId(producto: Producto): string {
    let nombreLimpio = (producto.nombre || producto.titulo || 'producto')
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

  // ACTUALIZADO: Método para generar slug de categoría
  generarSlugCategoria(nombre: string): string {
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

  // NUEVO: Método para obtener información de categorías por ID
  private obtenerInfoCategoriasPorProducto(producto: Producto): {categoriaPadre: Categoria | null, categoriaHijo: Categoria | null} {
    let categoriaPadre: Categoria | null = null;
    let categoriaHijo: Categoria | null = null;

    // Buscar la categoría del producto en las categorías cargadas
    for (const categoria of this.categorias) {
      // Verificar si es una categoría padre
      if (categoria.id.toString() === producto.categoria_id?.toString()) {
        if (categoria.subcategorias && categoria.subcategorias.length > 0) {
          // Es una categoría padre
          categoriaPadre = categoria;
        } else {
          // Es una subcategoría, buscar su padre
          categoriaHijo = categoria;
          // Buscar la categoría padre
          for (const cat of this.categorias) {
            if (cat.subcategorias?.some(sub => sub.id === categoria.id)) {
              categoriaPadre = cat;
              break;
            }
          }
        }
        break;
      }
      
      // Buscar en subcategorías
      if (categoria.subcategorias) {
        const subcategoriaEncontrada = categoria.subcategorias.find(
          sub => sub.id.toString() === producto.categoria_id?.toString()
        );
        if (subcategoriaEncontrada) {
          categoriaPadre = categoria;
          categoriaHijo = subcategoriaEncontrada;
          break;
        }
      }
    }

    return { categoriaPadre, categoriaHijo };
  }

  // ACTUALIZADO: Método de navegación con nueva estructura
  navegarAProducto(producto: Producto): void {
    const slug = this.generarSlugConId(producto);
    const { categoriaPadre, categoriaHijo } = this.obtenerInfoCategoriasPorProducto(producto);

    if (categoriaPadre && categoriaHijo) {
      // Ruta completa: padre/hijo/producto
      const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
      const slugHijo = this.generarSlugCategoria(categoriaHijo.nombre);
      this.router.navigate(['/', slugPadre, slugHijo, slug]).then(() => {
        window.scrollTo(0, 0);
      });
    } else if (categoriaPadre) {
      // Solo categoría padre: padre/producto
      const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
      this.router.navigate(['/', slugPadre, slug]).then(() => {
        window.scrollTo(0, 0);
      });
    } else {
      // Fallback a la navegación anterior
      let categoriaNombre = '';
      if (typeof producto.categoria === 'object' && producto.categoria?.nombre) {
        categoriaNombre = producto.categoria.nombre;
      } else if (typeof producto.categoria === 'string') {
        categoriaNombre = producto.categoria;
      } else {
        categoriaNombre = 'productos';
      }
      
      const categoriaSlug = this.generarSlugCategoria(categoriaNombre);
      this.router.navigate(['/', categoriaSlug, slug]).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }
}