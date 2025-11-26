import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
import { combineLatest, distinctUntilChanged, forkJoin } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { TiendaService } from '../../services/tienda.service';
import { Etiqueta } from '../../interfaces/etiqueta.interface';
import { EtiquetaService } from '../../services/etiqueta.service';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrl: './mostrar-producto.component.css'
})
export class MostrarProductoComponent implements OnInit {

  public productos: Producto[] = [];
  public categoria?:Categoria;
  public categoriaPadreId: string | null = null;
  public nombreCategoriaActual: string = '';
  public etiquetaId:string | null=null;
  public nombreEtiqueta?:string;
  public categoriaHijoSlug: string | null = null;
  public categoriaPadreSlug: string | null = null;
  public nombreCategoriaHijo: string = '';
  public pathParts: string[] = [];

 public tipo:string = '';

  public categorias: Categoria[] = [];
  public etiquetas:Etiqueta[] = [];
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
  private peruviansService: PeruviansService,
    private router: Router,
  private carritoService: CarritoService,
  private productoService: ProductoService,
  private categoriaService: CategoriaService,
  private etiquetaService:EtiquetaService, 
  private tiendaService: TiendaService,
  private cdr: ChangeDetectorRef
) {}

ngOnInit(): void {
  this.precioMinActual = this.precioMin;
  this.precioMaxActual = this.precioMax;

  // 1️⃣ Primero carga categorías, etiquetas y tiendas
  forkJoin([
    this.categoriaService.obtenerCategorias(),
    this.etiquetaService.getEtiquetas(),
    this.tiendaService.obtenerTiendas()
  ]).subscribe({
    next: ([categoriasResp, etiquetasResp, tiendasResp]) => {
      if (categoriasResp.success) this.categorias = categoriasResp.data;  
      if (etiquetasResp.etiquetas) this.etiquetas = etiquetasResp.etiquetas;
      if (tiendasResp.success) this.tiendas = tiendasResp.data;


      // ✅ 2️⃣ Ahora sí: escuchar cambios en la ruta
      combineLatest([
        this.route.paramMap,
        this.route.queryParamMap
      ])
      .subscribe(([params, query]) => {
        this.categoriaPadreSlug = params.get('categoriaPadreSlug');
        this.categoriaHijoSlug = params.get('categoriaHijoSlug');
        this.etiquetaId = query.get('etiqueta');
        this.nombreEtiqueta = query.get('nombre_etiqueta') || '';


         // ⭐ CAPTURAR EL PATH SIN SLASH Y SIN GUIONES
       this.pathParts = this.router.url
          .split('?')[0]             // Quitar query params
      .replace(/^\/+/, '')       // Quitar slash inicial
      .split('/')                // Dividir por /
      .map(p => decodeURIComponent(p))  // ⭐ Decodificar correctamente
      .map(p => p.replace(/-/g, ' '));   // Reemplazar guiones por espacios

        
        // ✅ Cargar productos una vez que todo está listo
        this.cargarCategoriaDesdeRuta();
      });
    },
    error: (err) => console.error('Error cargando datos iniciales:', err)
  });
}





  generarRutaParaProducto(producto: Producto): string[] {
    const categoriaPadre = producto.categoria?.categoria_slug;
    const categoriaHijo = producto.subcategoria?.categoria_slug;
    const slug = producto.producto_slug;
      console.log("padre:" + categoriaPadre,"hijo:" + categoriaHijo)
    if (categoriaPadre && categoriaHijo) {
      return ['/', categoriaPadre, categoriaHijo, slug, String(producto.id)];
    } else if (categoriaPadre) {
      // Solo categoría padre: padre/producto
      return ['/', categoriaPadre, slug];
    } else {
      
      return ['/'];
    }
  }

  // Método actualizado en MostrarProductoComponent
  private cargarCategoriaDesdeRuta(): void {

     const terminoBusqueda = this.route.snapshot.queryParamMap.get('buscar');

  if (terminoBusqueda) {
    this.buscarProductosConFiltros(terminoBusqueda);
    return;
  }


  if (this.filtroSeleccionado === 'ofertas') {
   return this.obtenerProductosEnOferta();
  } else if (this.filtroSeleccionado === 'masVendidos' ) {
    return this.obtenerProductosMasVendidos();
  } else if (this.filtroSeleccionado === 'masNuevos' ) {
    return this.obtenerProductosMasNuevos();
  } else if (this.filtroSeleccionado === 'ofertas') {
    return this.obtenerProductosEnOferta();
  }


     this.categoriaPadreSlug = this.route.snapshot.paramMap.get('categoriaPadreSlug');
  this.categoriaHijoSlug = this.route.snapshot.paramMap.get('categoriaHijoSlug');

  // 1. --------- SI HAY CATEGORÍA ---------
  if (this.categoriaPadreSlug && this.categoriaHijoSlug) {
    this.categoriaService.obtenerCategoriaPorSlug(this.categoriaHijoSlug).subscribe(
      categoria => {
        this.nombreCategoriaActual = categoria.nombre;
        this.obtenerProductosPorCategoriaConFiltros(categoria.id);
      }
    );
    return; // <-- IMPORTANTE
  }

  if (this.categoriaPadreSlug) {
    this.categoriaService.obtenerCategoriaPorSlug(this.categoriaPadreSlug).subscribe(
      categoria => {
        this.nombreCategoriaActual = categoria.nombre;
        this.obtenerProductosPorCategoriaConFiltros(categoria.id);
      }
    );
    return; // <-- IMPORTANTE
  }

  // 2. --------- SI NO HAY CATEGORÍA → USAR TIPO ---------
  this.tipo = this.route.snapshot.data['tipo'];

  if (this.tipo) {
    this.nombreCategoriaActual = this.tipo;

    switch (this.tipo) {
      case 'ofertas': return this.obtenerProductosEnOferta();
      case 'mas-vendidos': return this.obtenerProductosMasVendidos();
      case 'mas-nuevos': return this.obtenerProductosMasNuevos();
      case 'productos': return this.obtenerProductosConFiltros();
    }
  }

  // 3. --------- SI NO ES CATEGORÍA NI TIPO → HOME ---------
  this.router.navigate(['/']);
    

 

}



 
   




 obtenerProductosEnOferta(): void {
    this.isLoading = true;
    
    const filtros: any = {
      en_oferta: true,
      precio_min: this.precioMinActual,
      precio_max: this.precioMaxActual,
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : ""
    };

    this.productoService.getPacks(filtros).subscribe({
      next: (data) => {
        this.productos = data.data;
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
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : ""
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
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : ""
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

private obtenerProductosPorCategoriaConFiltros(categoria_id: number): void {
    this.isLoading = true;

    this.productoService.getProductosConFiltros({
      categoria_id: categoria_id,
      precio_min: this.precioMinActual,
      precio_max: this.precioMaxActual,
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : ""
    }).subscribe({
      next: (resp) => {
        console.log(resp)
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
  
  // Aplicar el filtro seleccionado manteniendo el contexto de categoría
  if (this.filtroSeleccionado === 'oferta') {
    this.obtenerProductosEnOferta();
  } else if (this.filtroSeleccionado === 'masVendidos') {
    this.obtenerProductosMasVendidos();
  } else if (this.filtroSeleccionado === 'masNuevos') {
    this.obtenerProductosMasNuevos();
  } else {
    // Para otros filtros, usar el método general
    this.aplicarFiltros();
  }
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

obtenerProductosPorCategoria(categoriaId: number ): void {
  this.obtenerProductosPorCategoriaConFiltros(categoriaId);
}

obtenerProductosMasVendidos(): void {
    this.isLoading = true;
    
    const filtros: any = {
      precio_min: this.precioMinActual,
      precio_max: this.precioMaxActual,
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
    };

    // MODIFICADO: Considerar categoría padre
    if (this.categoriaPadreId) {
      filtros.categoria_padre_id = this.categoriaPadreId;
    } else if (this.categoria ) {
      filtros.categoria_id = this.categoria;
    }

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

    // MODIFICADO: Considerar categoría padre
    if (this.categoriaPadreId) {
      filtros.categoria_padre_id = this.categoriaPadreId;
    } else if (this.categoria ) {
      filtros.categoria_id = this.categoria;
    }

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
  this.isLoading = true;
  this.cdr.detectChanges();
  
  setTimeout(() => {
    // Si hay un filtro especial seleccionado, usarlo directamente
    if (this.filtroSeleccionado === 'oferta') {
      this.obtenerProductosEnOferta();
    } else if (this.filtroSeleccionado === 'masVendidos') {
      this.obtenerProductosMasVendidos();
    } else if (this.filtroSeleccionado === 'masNuevos') {
      this.obtenerProductosMasNuevos();
    } else {
      // Para filtros normales, usar cargarCategoriaDesdeRuta
      this.cargarCategoriaDesdeRuta();
    }
  }, 100);
}

  AgregarCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }

 
}