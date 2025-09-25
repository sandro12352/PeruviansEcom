import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
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
  public loadingRelacionados = false;
  public error: string | null = null;
  public imagenSeleccionada: string | null | undefined = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peruviansService: PeruviansService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const nombreProducto = params.get('nombreProducto');

      if (nombreProducto) {
        const idStr = nombreProducto.split('-').pop();
        const id = parseInt(idStr!, 10);

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

  private cargarProducto(id: number): void {
    this.loading = true;
    this.error = null;
    
    this.peruviansService.getProducto(id).subscribe({
      next: (producto: Producto | null) => {
        if (producto) {
          this.producto = { ...producto, cantidad: 1 };
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

  navegarAProducto(producto: Producto): void {
    const slug = this.generarSlugConId(producto);
    
    let categoriaNombre = '';
    if (typeof producto.categoria === 'object' && producto.categoria?.nombre) {
      categoriaNombre = producto.categoria.nombre;
    } else if (typeof producto.categoria === 'string') {
      categoriaNombre = producto.categoria;
    } else {
      categoriaNombre = 'productos';
    }
    
    const categoriaSlug = categoriaNombre
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim();
    
    this.router.navigate(['/', categoriaSlug, slug]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}