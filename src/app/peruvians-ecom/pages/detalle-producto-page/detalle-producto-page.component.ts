import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
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
  ) {}

  ngOnInit(): void {

     this.pathParts = this.router.url
        .split('?')[0]
        .replace(/^\/+/, '')
        .split('/')
        .filter(p => isNaN(Number(p)))               // 🚫 Quitar números puros
        .map(p => decodeURIComponent(p))
    
   this.route.data.subscribe(({ producto }) => {
    
    if (!producto) {
      this.error = 'Producto no encontrado';
      return;
    }

    this.producto = { ...producto, cantidad: 1 };
    this.nombreProducto = producto.nombre;
    this.imagenSeleccionada = producto.img;

    const canonicalUrl = this.document.location.href;

    this.seoService.setProductMeta(
      producto.nombre,
      producto.descripcion,
      canonicalUrl
    );

    const structuredData = {
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
      }
    };

    this.seoService.setStructuredData(structuredData);

    // Cargar relacionados luego del producto
    this.cargarProductosRelacionados();

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



}