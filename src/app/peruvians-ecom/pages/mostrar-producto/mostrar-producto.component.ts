import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
import { filter } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrl: './mostrar-producto.component.css'
})
export class MostrarProductoComponent implements OnInit {

  public productos: Producto[] = [];
  public categoria = '';

  public categorias: Categoria[] = [];
  public isLoading = true;
  public skeletonArray = Array(8);
  
  // Variables para el filtro de precio
  public precioMin = 0;
  public precioMax = 500;
  public precioMinActual = 0;
  public precioMaxActual = 100;

  public categoriasSeleccionadas: (string | number)[] = [];

  public filtroSeleccionado = '';
  public tiendasSeleccionadas: (string | number)[] = [];
  public tiendas: any[] = [];

  // NUEVO: Variable para indicar si venimos de CyberWow
  public esCyberwowTiendas = false;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private peruviansService: PeruviansService,
  private carritoService: CarritoService,
  private productoService: ProductoService,
  private categoriaService: CategoriaService, 
  private tiendaService: TiendaService,
  private cdr: ChangeDetectorRef
) {}

ngOnInit(): void {
  // Inicializar valores de precio
  this.precioMinActual = this.precioMin;
  this.precioMaxActual = this.precioMax;

  // Escuchar cambios de ruta
  this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.cargarCategoriaDesdeRuta();
    });

  // Ejecutar la primera vez
  this.cargarCategoriaDesdeRuta();
  this.cargarTiendas();

  // Cargar categorías
  this.cargarCategorias();
}

 private cargarTiendas(): void {
    this.tiendaService.obtenerTiendas().subscribe({
      next: (response) => {
        if (response.success) {
          this.tiendas = response.data;
          //console.log('Tiendas cargadas:', this.tiendas);
          
          // NUEVO: Verificar si venimos de CyberWow con filtros de tiendas
          this.verificarFiltrosCyberwow();
        }
      },
      error: (err) => {
        console.error('Error al cargar tiendas:', err);
      }
    });
  }

  // NUEVO: Método para verificar y aplicar filtros de CyberWow
  private verificarFiltrosCyberwow(): void {
    const cyberwowParam = this.route.snapshot.queryParamMap.get('cyberwow');
    const tiendasParam = this.route.snapshot.queryParamMap.get('tiendas');

    if (cyberwowParam === 'tiendas' && tiendasParam) {
      this.esCyberwowTiendas = true;
      
      // Convertir string de IDs a array de números
      const tiendasIds = tiendasParam.split(',').map(id => parseInt(id.trim()));
      
      // Preseleccionar las tiendas
      this.tiendasSeleccionadas = tiendasIds;
      
      //console.log('Filtros CyberWow aplicados - Tiendas:', this.tiendasSeleccionadas);
      
      // Aplicar los filtros automáticamente
      this.aplicarFiltros();
    }
  }

  private cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.success) {
          this.categorias = response.data;
          //console.log('Categorías cargadas en MostrarProducto:', this.categorias);
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  private cargarCategoriaDesdeRuta(): void {
    const path = this.route.snapshot.routeConfig?.path || '';
    this.categoria = this.route.snapshot.paramMap.get('categorias') || '';

    // Si hay un término de búsqueda en queryParams
    const terminoBusqueda = this.route.snapshot.queryParamMap.get('buscar');

    if (terminoBusqueda) {
      this.buscarProductosConFiltros(terminoBusqueda);
      return;
    }

    // MODIFICAR para considerar filtros de estado
    if (this.filtroSeleccionado === 'oferta') {
      this.obtenerProductosEnOferta();
    } else if (this.filtroSeleccionado === 'masVendidos' || path === 'mas-vendidos') {
      this.obtenerProductosMasVendidos();
    } else if (this.filtroSeleccionado === 'masNuevos' || path === 'mas-nuevos') {
      this.obtenerProductosMasNuevos();
    }
    else if (this.filtroSeleccionado === 'ofertas' || path === 'ofertas') {
      this.obtenerProductosEnOferta();
    }
    
     else if (path === 'productos') {
      this.obtenerProductosConFiltros();
    } else {
      this.obtenerProductosPorCategoriaConFiltros(this.categoria);
    }
  }

private obtenerProductosEnOferta(): void {
  this.isLoading = true;
  
  const filtros: any = {
    en_oferta: true,
    precio_min: this.precioMinActual,
    precio_max: this.precioMaxActual,
    tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
  };

  // AGREGAR: Si estamos en una categoría específica, incluirla en el filtro
  if (this.categoria && this.categoria !== '') {
    filtros.categoria_id = this.categoria;
  }

  this.productoService.getProductosConFiltros(filtros).subscribe({
    next: (resp) => {
      this.productos = resp.productos;
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
      this.productos = [];
    }
  });
}

  private buscarProductosConFiltros(termino: string): void {
    this.isLoading = true;
    this.productoService.getProductosConFiltros({
      buscar: termino,
      precio_min: this.precioMinActual,
      precio_max: this.precioMaxActual,
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
    }).subscribe({
      next: (resp) => {
        this.productos = resp.productos;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.productos = [];
      }
    });
  }

  obtenerProductosConFiltros(): void {
    this.isLoading = true;
    this.productoService.getProductosConFiltros({
      precio_min: this.precioMinActual,
      precio_max: this.precioMaxActual,
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
    }).subscribe({
      next: (resp) => {
        this.productos = resp.productos;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

private obtenerProductosPorCategoriaConFiltros(categorias: string): void {
    this.isLoading = true;

    this.productoService.getProductosConFiltros({
      categoria_id: categorias,
      precio_min: this.precioMinActual,
      precio_max: this.precioMaxActual,
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
    }).subscribe({
      next: (resp) => {
        this.productos = [...resp.productos];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        this.productos = [];
        this.isLoading = false; 
        this.cdr.markForCheck();
      }
    });
  } 

onFiltroEstadoChange(event: any): void {
    this.filtroSeleccionado = event.target.value;
    //console.log('Filtro seleccionado:', this.filtroSeleccionado);
    this.aplicarFiltros();
  }

toggleTiendaSeleccionada(tiendaId: number | string): void {
    if (this.tiendasSeleccionadas.includes(tiendaId)) {
      this.tiendasSeleccionadas = this.tiendasSeleccionadas.filter(t => t !== tiendaId);
    } else {
      this.tiendasSeleccionadas.push(tiendaId);
    }
    //console.log('Tiendas seleccionadas:', this.tiendasSeleccionadas);
    this.aplicarFiltros();
  }

  // Métodos originales para mas vendidos y mas nuevos (sin filtros por ahora)
  obtenerProductos(): void {
    this.obtenerProductosConFiltros();
  }

obtenerProductosPorCategoria(categoriaId: number | string): void {
  this.obtenerProductosPorCategoriaConFiltros(String(categoriaId));
}

obtenerProductosMasVendidos(): void {
  this.isLoading = true;
  
  const filtros: any = {
    precio_min: this.precioMinActual,
    precio_max: this.precioMaxActual,
    tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
  };

  // AGREGAR: Si estamos en una categoría específica, incluirla en el filtro
  if (this.categoria && this.categoria !== '') {
    filtros.categoria_id = this.categoria;
  }

  //console.log('Filtros para más vendidos:', filtros);

  this.peruviansService.masVendidos(filtros).subscribe({
    next: (resp) => {
      this.productos = [];
      this.cdr.detectChanges();
      this.productos = [...resp];
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.productos = [];
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}

obtenerProductosMasNuevos(): void {
  this.isLoading = true;
  
  const filtros: any = {
    precio_min: this.precioMinActual,
    precio_max: this.precioMaxActual,
    tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
  };

  // AGREGAR: Si estamos en una categoría específica, incluirla en el filtro
  if (this.categoria && this.categoria !== '') {
    filtros.categoria_id = this.categoria;
  }

 //console.log('Filtros para más nuevos:', filtros);

  this.peruviansService.masNuevo(filtros).subscribe({
    next: (resp) => {
      this.productos = [];
      this.cdr.detectChanges();
      this.productos = [...resp];
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.productos = [];
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}

  // Métodos para manejar el filtro de precio
 onPrecioMinChange(event: any): void {
    this.precioMinActual = parseInt(event.target.value);
    //console.log('Precio min cambiado a:', this.precioMinActual);
    this.aplicarFiltros();
  }

  onPrecioMaxChange(event: any): void {
    this.precioMaxActual = parseInt(event.target.value);
    //console.log('Precio max cambiado a:', this.precioMaxActual);
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    //console.log('Aplicando filtros...');
    // Marcar como cargando para mostrar skeleton
    this.isLoading = true;
    this.cdr.detectChanges();
    
    // Pequeño delay para asegurar que se muestre el loading
    setTimeout(() => {
      this.cargarCategoriaDesdeRuta();
    }, 100);
  }

  AgregarCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
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