import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
import { combineLatest, filter, forkJoin } from 'rxjs';
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
  public categoria = '';
  public categoriaPadreId: string | null = null;
  public nombreCategoriaActual: string = '';
  public etiquetaId:string | null=null;
  public nombreEtiqueta?:string;
  public categoriaHijoSlug: string | null = null;
  public categoriaPadreSlug: string | null = null;
  public nombreCategoriaHijo: string = '';


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
      console.log("respuesta:",this.categoria,this.etiquetas,this.tiendas)


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

        // ✅ Cargar productos una vez que todo está listo
        this.cargarCategoriaDesdeRuta();
      });
    },
    error: (err) => console.error('Error cargando datos iniciales:', err)
  });
}


 
private obtenerInfoCategoriasPorProducto(producto: Producto): {categoriaPadre: any | null, categoriaHijo: any | null} {
  let categoriaPadre: any | null = null;
  let categoriaHijo: any | null = null;

  if (!producto.categoria_id) {
    return { categoriaPadre, categoriaHijo };
  }

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
          if (cat.subcategorias?.some((sub: any) => sub.id === categoria.id)) {
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
        (sub: any) => sub.id.toString() === producto.categoria_id?.toString()
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

private cargarCategorias(slug?: string): void {
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


generarRutaParaProducto(producto: Producto): string[] {
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
      if (producto.categoria_completa && typeof producto.categoria_completa === 'object') {
        const categoriaCompleta = producto.categoria_completa as any;
        if (categoriaCompleta.padre && categoriaCompleta.padre.nombre) {
          const padreSlug = this.generarSlugCategoria(categoriaCompleta.padre.nombre);
          const hijoSlug = this.generarSlugCategoria(categoriaCompleta.nombre);
          return ['/', padreSlug, hijoSlug, slug];
        }
      }
      
      if (producto.categoria && typeof producto.categoria === 'string') {
        const categoriaSlug = this.generarSlugCategoria(producto.categoria);
        return ['/', categoriaSlug, slug];
      }
      
      return ['/productos', slug];
    }
  }

  // Método actualizado en MostrarProductoComponent
  private cargarCategoriaDesdeRuta(): void {
  const path = this.route.snapshot.routeConfig?.path || '';

  // Capturar parámetros de la ruta
  this.categoriaPadreSlug = this.route.snapshot.paramMap.get('categoriaPadreSlug');
  this.categoriaHijoSlug = this.route.snapshot.paramMap.get('categoriaHijoSlug');

  // 🔹 1. Si hay etiqueta en query param (modo antiguo)
  this.etiquetaId = this.route.snapshot.queryParamMap.get('etiqueta');
  this.nombreEtiqueta = this.route.snapshot.queryParamMap.get('nombre_etiqueta') || '';
  
  console.log(this.categoriaPadreSlug,this.categoriaHijoSlug,this.etiquetaId,this.nombreEtiqueta)

  if (this.etiquetaId) {
    this.obtenerProductosPorEtiqueta(this.etiquetaId);
    return;
  }

  // 🔹 2. Si hay padre e hijo (categorías anidadas)
  if (this.categoriaPadreSlug && this.categoriaHijoSlug) {
    this.buscarCategoriaHijoPorSlug(this.categoriaPadreSlug, this.categoriaHijoSlug);
    return;
  }

  // 🔹 3. Si solo hay un slug (puede ser categoría o etiqueta)
  if (this.categoriaPadreSlug) {
    const slugNormalizado = this.normalizarSlug(this.categoriaPadreSlug);

    // 🧩 Primero, buscar si el slug pertenece a una etiqueta
    const etiquetaEncontrada = this.etiquetas.find(e =>
      this.generarSlugCategoria(e.nombre) === slugNormalizado
    );

    if (etiquetaEncontrada) {
      this.nombreEtiqueta = etiquetaEncontrada.nombre;
      this.obtenerProductosPorEtiqueta(etiquetaEncontrada.id.toString());
      return;
    }

    // 🧩 Si no hay etiqueta, buscar categoría padre normal
    this.buscarCategoriaPadrePorSlug(this.categoriaPadreSlug);
    return;
  }

  // 🔹 4. Compatibilidad con rutas antiguas
  this.categoria = this.route.snapshot.paramMap.get('categorias') || '';
  const categoriaPadreParam = this.route.snapshot.queryParamMap.get('categoria_padre_id');
  const nombreCategoriaParam = this.route.snapshot.queryParamMap.get('nombre_categoria');

  if (categoriaPadreParam) {
    this.categoriaPadreId = categoriaPadreParam;
    this.nombreCategoriaActual = nombreCategoriaParam || '';
    this.obtenerProductosPorCategoriaPadre(categoriaPadreParam);
    return;
  } else {
    this.categoriaPadreId = null;
    this.nombreCategoriaActual = '';
  }

  // 🔹 5. Otros filtros / rutas especiales
  const terminoBusqueda = this.route.snapshot.queryParamMap.get('buscar');
  if (terminoBusqueda) {
    this.buscarProductosConFiltros(terminoBusqueda);
    return;
  }

  if (this.filtroSeleccionado === 'oferta') {
    this.obtenerProductosEnOferta();
  } else if (this.filtroSeleccionado === 'masVendidos' || path === 'mas-vendidos') {
    this.obtenerProductosMasVendidos();
  } else if (this.filtroSeleccionado === 'masNuevos' || path === 'mas-nuevos') {
    this.obtenerProductosMasNuevos();
  } else if (this.filtroSeleccionado === 'ofertas' || path === 'ofertas') {
    this.obtenerProductosEnOferta();
  } else if (path === 'productos') {
    this.obtenerProductosConFiltros();
  } else {
    this.obtenerProductosPorCategoriaConFiltros(this.categoria);
  }
}



  private buscarCategoriaHijoPorSlug(padreSlug: string, hijoSlug: string): void {
    if (!this.categorias || this.categorias.length === 0) return;

    const padreSlugNormalizado = this.normalizarSlug(padreSlug);
    const hijoSlugNormalizado = this.normalizarSlug(hijoSlug);

    


    // Buscar la categoría padre
    const categoriaPadre = this.categorias.find(cat => 
      this.generarSlugCategoria(cat.nombre) === padreSlugNormalizado
    );

    if (categoriaPadre) {
      // Buscar la subcategoría (hijo) dentro de la categoría padre
      const subcategoria = categoriaPadre.subcategorias?.find((sub: any) =>
        this.generarSlugCategoria(sub.nombre) === hijoSlugNormalizado
      );

      if (subcategoria) {
        this.categoriaPadreId = categoriaPadre.id.toString();
        this.nombreCategoriaActual = categoriaPadre.nombre;
        this.nombreCategoriaHijo = subcategoria.nombre;
        this.categoria = subcategoria.id.toString();
        this.obtenerProductosPorCategoriaConFiltros(this.categoria);
      } else {
        console.warn('Subcategoría no encontrada:', hijoSlug);
        this.productos = [];
        this.isLoading = false;
      }
    } else {
      console.warn('Categoría padre no encontrada:', padreSlug);
      this.productos = [];
      this.isLoading = false;
    }
  }

  private buscarCategoriaPadrePorSlug(slug: string): void {
    if (this.categorias.length === 0 && this.etiquetas.length ===0) {
      return;
    }
    const slugNormalizado = this.normalizarSlug(slug);

  
    const categoriaEncontrada = this.categorias.find(categoria => 
      this.generarSlugCategoria(categoria.nombre) === slugNormalizado
    );

    if (categoriaEncontrada) {
      this.categoriaPadreId = categoriaEncontrada.id.toString();
      this.nombreCategoriaActual = categoriaEncontrada.nombre;
      this.nombreCategoriaHijo = ''; // Limpiar nombre de hijo
      this.obtenerProductosPorCategoriaPadre(this.categoriaPadreId);
    }
    
    else {
      this.buscarEnSubcategorias(slugNormalizado);
    }
  }

   private obtenerProductosPorEtiqueta(etiquetaid: string): void {
    this.isLoading = true;

    // Usar el endpoint específico para categorías padre
    this.productoService.getProductosPorEtiqueta(etiquetaid, {
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
        console.error('Error al obtener productos por etiqueta:', error);
        this.productos = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }
  
   private obtenerProductosPorCategoriaPadre(categoriaPadreId: string): void {
    this.isLoading = true;

    // Usar el endpoint específico para categorías padre
    this.productoService.getProductosPorCategoriaPadre(categoriaPadreId, {
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
        console.error('Error al obtener productos por categoría padre:', error);
        this.productos = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }



  private buscarEnSubcategorias(slug: string): void {
  if (!this.categorias || this.categorias.length === 0) {
    // 🔁 Si aún no hay categorías cargadas, las cargamos y volvemos a intentar
    this.cargarCategorias(slug);
    return;
  }

  for (const categoria of this.categorias) {
    const subcategoriaEncontrada = categoria.subcategorias?.find((sub: any) =>
      this.generarSlugCategoria(sub.nombre) === slug
    );

    if (subcategoriaEncontrada) {
      this.categoria = subcategoriaEncontrada.id.toString();
      this.nombreCategoriaActual = subcategoriaEncontrada.nombre;
      this.nombreCategoriaHijo = '';
      this.obtenerProductosPorCategoriaConFiltros(this.categoria);
      return;
    }
  }

  console.warn('Categoría no encontrada para el slug:', slug);
  this.productos = [];
  this.isLoading = false;
}

  
  public generarSlugCategoria(nombre: string): string {
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

// NUEVO: Método para normalizar slugs
private normalizarSlug(slug: string): string {
  return slug.toLowerCase()
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


 obtenerProductosEnOferta(): void {
    this.isLoading = true;
    
    const filtros: any = {
      en_oferta: true,
      precio_min: this.precioMinActual,
      precio_max: this.precioMaxActual,
      tienda_id: this.tiendasSeleccionadas.length > 0 ? this.tiendasSeleccionadas.join(',') : undefined
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

    // MODIFICADO: Considerar categoría padre
    if (this.categoriaPadreId) {
      filtros.categoria_padre_id = this.categoriaPadreId;
    } else if (this.categoria && this.categoria !== '') {
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
    } else if (this.categoria && this.categoria !== '') {
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