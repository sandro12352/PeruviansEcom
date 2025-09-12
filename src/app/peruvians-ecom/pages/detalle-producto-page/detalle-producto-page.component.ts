import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
          this.imagenSeleccionada = producto.img; // 👈 primera imagen mostrada
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
    
    // Primero intentamos obtener productos de la misma categoría
    this.peruviansService.getProductosPorCategoria(this.producto.categoria_id!).subscribe({
      next: (productosPorCategoria: Producto[]) => {
        // Filtrar el producto actual y limitar a 8 productos para el carrusel
        let relacionados = productosPorCategoria
          .filter(p => p.id !== this.producto!.id)
          .slice(0, 8);

        // Si no hay suficientes productos de la misma categoría, complementar con productos de la misma tienda
        if (relacionados.length < 8) {
          this.peruviansService.getProductosPorTienda(this.producto!.tienda_id!).subscribe({
            next: (productosPorTienda: Producto[]) => {
              // Filtrar productos que ya están en relacionados y el producto actual
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
    }
  }

  eliminarProducto(): void {
    if (this.producto) {
      this.carritoService.eliminarProducto(this.producto);
      this.carritoService.actualizarCantidadTotal();
    }
  }

  // Método para generar slug con ID (necesario para el routing)
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

  // Método para navegar a un producto relacionado
// Método corregido para navegar a un producto relacionado
navegarAProducto(producto: Producto): void {
  const slug = this.generarSlugConId(producto);
  
  // Obtener el nombre de la categoría para la ruta
  let categoriaNombre = '';
  if (typeof producto.categoria === 'object' && producto.categoria?.nombre) {
    categoriaNombre = producto.categoria.nombre;
  } else if (typeof producto.categoria === 'string') {
    categoriaNombre = producto.categoria;
  } else {
    // Fallback si no hay categoría
    categoriaNombre = 'productos';
  }
  
  // Limpiar el nombre de la categoría para la URL
  const categoriaSlug = categoriaNombre
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();
  
  this.router.navigate(['/', categoriaSlug, slug]).then(() => {
    // Scroll al top de la página después de la navegación
    window.scrollTo(0, 0);
  });
}
}