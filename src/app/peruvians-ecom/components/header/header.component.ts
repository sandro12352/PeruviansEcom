import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Cliente } from '../../interfaces/cliente';
import { Subscription } from 'rxjs';

@Component({
  selector: 'peruvians-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  clienteNombre: string | null = null;
  currentUser: Cliente | null = null;
  isAuthenticated: boolean = false;
  
  public terminoBusqueda: string = '';
  mantenerVisible = false;
  cartCount = 0;
  productosEnCarrito: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = [];
  activeCategory: string | null = null;
  activeCategoryName: String | null = null;
  
  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscripción al contador del carrito
    const cartSubscription = this.carritoService.itemsCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.subscriptions.add(cartSubscription);
    
    // Suscripción al estado de autenticación
    const authSubscription = this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.subscriptions.add(authSubscription);
    
    // Suscripción al usuario actual
    const userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.clienteNombre = user ? user.nombre : null;
      //console.log('Usuario actualizado en header:', this.clienteNombre);
    });
    this.subscriptions.add(userSubscription);
    
    // Obtener productos en carrito
    this.productosEnCarrito = this.carritoService.getProductos();
    
    // Cargar categorías desde la API
    this.cargarCategorias();
  }

  ngOnDestroy(): void {
    // Limpiar todas las suscripciones para evitar memory leaks
    this.subscriptions.unsubscribe();
  }

  /**
   * Logout del usuario
   */
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        //console.log('Logout exitoso');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error en logout:', error);
        // Aunque falle la petición al server, limpiar datos localmente
        this.authService['clearAuthData'](); // Forzar limpieza local
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Carga las categorías desde la API
   */
  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.success) {
          this.categorias = response.data;
          //console.log('Categorías cargadas:', this.categorias);
        } else {
          console.warn('No se pudieron cargar las categorías:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  /**
   * Muestra productos de una categoría específica
   * @param categoriaId ID de la categoría
   */
  mostrarProductos(categoriaId: string, categoriaName: String) {
    this.activeCategory = categoriaId;
    this.activeCategoryName = categoriaName;
    
    this.productoService.getProductosPorCategoria(categoriaId).subscribe({
      next: (productos) => {
        this.productosFiltrados = productos;
        //console.log('Productos filtrados:', productos);
      },
      error: (error) => {
        console.error('Error al cargar productos de la categoría:', error);
        this.productosFiltrados = [];
      }
    });
  }

  /**
   * Oculta la lista de productos
   */
  ocultarProductos() {
    this.activeCategory = null;
    this.productosFiltrados = [];
  }

  /**
   * Mantiene visible el dropdown de productos
   */
  mantenerProductos() {
    this.mantenerVisible = true;
  }

  /**
   * Navega al checkout
   */
  irACheckout(): void {
    document.body.style.overflow = '';
    document.body.style.padding = '';
    this.router.navigate(['/checkout/carrito']);
  }

  /**
   * Calcula el subtotal del carrito
   */
  calcularSubtotal(): number {
    return this.carritoService.calcularSubtotal();
  }

  /**
   * Calcula el descuento del carrito
   */
  calcularDescuento(): number {
    return this.carritoService.calcularDescuento();
  }

  /**
   * Calcula el total del carrito
   */
  calcularTotal(): number {
    return this.carritoService.calcularTotal();
  }

  /**
   * Aumenta la cantidad de un producto en el carrito
   */
  aumentarCantidad(producto: Producto) {
    this.carritoService.aumentarCantidad(producto);
    this.carritoService.actualizarCantidadTotal();
  }

  /**
   * Disminuye la cantidad de un producto en el carrito
   */
  disminuirCantidad(producto: Producto) {
    if (producto.cantidad! > 1) {
      this.carritoService.disminuirCantidad(producto);
      this.carritoService.actualizarCantidadTotal();
    } else {
      this.eliminarProducto(producto);
    }
  }

  /**
   * Elimina un producto del carrito
   */
  eliminarProducto(producto: Producto) {
    this.carritoService.eliminarProducto(producto);
    this.carritoService.actualizarCantidadTotal();
  }

  /**
   * Genera un slug para la categoría (para ruteo)
   * @param nombre Nombre de la categoría
   * @returns Slug de la categoría
   */
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

  /**
   * Obtiene el nombre de una categoría por su ID
   * @param categoriaId ID de la categoría
   * @returns Nombre de la categoría o string vacío
   */
  obtenerNombreCategoria(categoriaId: string): string {
    const categoria = this.categorias.find(cat => cat.id.toString() === categoriaId);
    return categoria ? categoria.nombre : '';
  }

  /**
   * Busca productos por término
   */
  buscar(): void {
    const termino = this.terminoBusqueda.trim();

    if (!termino) {
      this.productosFiltrados = [];
      return;
    }

    this.productoService.buscarProductos(termino).subscribe({
      next: (productos) => {
        this.productosFiltrados = productos;
        //console.log('Resultados búsqueda:', productos);
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
        this.productosFiltrados = [];
      }
    });
  }

  /**
   * Selecciona un producto de las sugerencias
   */
  seleccionarProducto(producto: any): void {
    this.terminoBusqueda = producto.nombre;
    this.productosFiltrados = [];
  }

  /**
   * Genera slug optimizado para productos con ID
   * @param producto Producto del cual generar el slug
   * @returns Slug del producto
   */
  generarSlugConId(producto: Producto): string {
    if (!producto || !producto.nombre) {
      return '';
    }

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
   * Navega al detalle del producto usando el slug correcto
   * @param producto Producto al cual navegar
   */
    navegarAProducto(producto: Producto): void {
      const slug = this.generarSlugConId(producto);

      if (producto.categoria) {
        this.router.navigate(['/', producto.categoria, slug]);
      } else {
        // fallback si no tiene categoría
        this.router.navigate(['/productos', slug]);
      }
    }


  /**
   * Maneja el submit del formulario de búsqueda
   */
  onSubmit(): void {
    const termino = this.terminoBusqueda.trim();
    if (!termino) return;

    this.router.navigate(['/productos'], {
      queryParams: { buscar: termino }
    });

    this.terminoBusqueda = '';
    this.productosFiltrados = []; 
  }

  getShortName(): string {
  if (!this.clienteNombre) return 'Usuario';
  const parts = this.clienteNombre.trim().split(/\s+/);
  // Opción: primer nombre + inicial del segundo/apellido
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
}
}
