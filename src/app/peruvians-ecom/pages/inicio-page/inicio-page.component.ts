// src/app/peruvians-ecom/pages/inicio-page/inicio-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DashboardService } from '../../services/dashboard.service';
import { CategoriaService } from '../../services/categoria.service';

// IMPORTS CORREGIDOS - Solo importar una vez cada interfaz
import { 
  Liquidacion, 
  ConfiguracionCyberwow, 
  CyberwowBannerProducto,
  Carrusel 
} from '../../interfaces/dashboard.interface';

import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria'; // SOLO UNA VEZ

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements OnInit {

  public productos: Producto[] = [];
  public masVendido: Producto[] = [];
  public masNuevo: Producto[] = [];
  public liquidacion: Liquidacion[] = [];
  public categorias: Categoria[] = []; // CAMBIAR: usar solo Categoria
  public carrusel: Carrusel[] = [];

  // Para manejar la estructura jerárquica de categorías
  public categoriasJerarquicas: Categoria[] = [];

  // CyberWow data
  public cyberwowBanners: ConfiguracionCyberwow = {
    categoria: null,
    tiendas: null,
    productos: []
  };
  
  public loading = {
    dashboard: false,
    masVendido: false,
    masNuevo: false,
    liquidacion: false,
    categorias: false,
    cyberwow: false,
    carrusel: false
  };

  constructor(
    private dashboardService: DashboardService,
    private categoriaService: CategoriaService,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {}
  
  ngOnInit(): void {
    this.configurarSEO();
    this.cargarCategoriasJerarquicas();
    this.cargarDatosDashboard();
  }


  /**
   * NUEVO: Carga las categorías con su estructura jerárquica
   */
 private cargarCategoriasJerarquicas(): void {
    this.loading.categorias = true;
    
    this.categoriaService.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categoriasJerarquicas = response.data;
          
          // Debug: mostrar estructura
          this.categoriasJerarquicas.forEach(cat => {
            if (cat.subcategorias) {
              cat.subcategorias.forEach((sub: any) => {
              });
            }
          });
        } else {
          console.error('Error en respuesta de categorías:', response);
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías jerárquicas:', err);
      },
      complete: () => {
        this.loading.categorias = false;
      }
    });
  }

  /**
   * Configura los meta tags SEO para la página de inicio
   */
  private configurarSEO(): void {
    // Configurar título de la página
    this.title.setTitle('Peruviansecom - Compra Online los Mejores Productos del Perú');

    // Meta tags básicos
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Descubre los mejores productos peruanos en nuestra tienda online. Encuentra categorías exclusivas, ofertas especiales, liquidaciones y los productos más vendidos del Perú. Compra seguro y con envío a todo el país.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'productos peruanos, tienda online perú, e-commerce perú, compras online, productos más vendidos, liquidaciones, ofertas especiales, categorías exclusivas' 
    });

    this.meta.updateTag({ 
      name: 'author', 
      content: 'Peruviansecom' 
    });

    this.meta.updateTag({ 
      name: 'robots', 
      content: 'index, follow' 
    });

    // Meta tags Open Graph para redes sociales
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'Peruviansecom - Los Mejores Productos del Perú Online' 
    });

    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Explora nuestra amplia selección de productos peruanos. Encuentra todo lo que necesitas con ofertas exclusivas, productos más vendidos y liquidaciones especiales.' 
    });

    this.meta.updateTag({ 
      property: 'og:type', 
      content: 'website' 
    });

    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://peruviansecom.com' 
    });

    this.meta.updateTag({ 
      property: 'og:image', 
      content: 'https://peruviansecom.com/logo.png' 
    });

    this.meta.updateTag({ 
      property: 'og:image:alt', 
      content: 'Peruviansecom - Productos destacados' 
    });

    this.meta.updateTag({ 
      property: 'og:site_name', 
      content: 'Peruviansecom' 
    });

    this.meta.updateTag({ 
      property: 'og:locale', 
      content: 'es_PE' 
    });

    // Meta tags Twitter Card
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });

    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'Peruviansecom - Los Mejores Productos del Perú' 
    });

    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Descubre productos exclusivos peruanos con ofertas especiales y envío a todo el país.' 
    });

    this.meta.updateTag({ 
      name: 'twitter:image', 
      content: 'https://peruviansecom.com/logo.png' 
    });

    this.meta.updateTag({ 
      name: 'twitter:image:alt', 
      content: 'Productos destacados de Peruviansecom' 
    });

    // Meta tags adicionales para SEO
    this.meta.updateTag({ 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1.0' 
    });

    this.meta.updateTag({ 
      'http-equiv': 'Content-Type', 
      content: 'text/html; charset=utf-8' 
    });

    this.meta.updateTag({ 
      name: 'language', 
      content: 'Spanish' 
    });

    this.meta.updateTag({ 
      name: 'revisit-after', 
      content: '7 days' 
    });

    this.meta.updateTag({ 
      name: 'distribution', 
      content: 'global' 
    });

    this.meta.updateTag({ 
      name: 'rating', 
      content: 'general' 
    });

    // Canonical URL
    this.meta.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com' 
    });
  }

  /**
   * Actualiza los meta tags dinámicamente basado en los datos cargados
   */
  private actualizarSEODinamico(): void {
    if (this.categorias.length > 0) {
      const categoriasNombres = this.categorias
        .slice(0, 5)
        .map(cat => cat.nombre)
        .join(', ');

      // Actualizar keywords con categorías dinámicas
      const keywordsActuales = this.meta.getTag('name="keywords"')?.content || '';
      this.meta.updateTag({ 
        name: 'keywords', 
        content: `${keywordsActuales}, ${categoriasNombres}` 
      });
    }

    if (this.masVendido.length > 0) {
      const productosDestacados = this.masVendido
        .slice(0, 3)
        .map(prod => prod.nombre)
        .join(', ');

      // Actualizar descripción con productos más vendidos
      const descripcionMejorada = `Descubre los mejores productos peruanos incluyendo ${productosDestacados}. Encuentra categorías exclusivas, ofertas especiales y los productos más vendidos del Perú.`;
      
      this.meta.updateTag({ 
        name: 'description', 
        content: descripcionMejorada 
      });

      this.meta.updateTag({ 
        property: 'og:description', 
        content: descripcionMejorada 
      });
    }
  }

  /**
   * Carga todos los datos del dashboard en una sola llamada
   */
  private cargarDatosDashboard(): void {
    this.loading.dashboard = true;

    this.dashboardService.getDashboardData('todas').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          if (response.data.categorias) {
            this.categorias = response.data.categorias.items;
          }

          if (response.data.mas_vendidos) {
            this.masVendido = this.convertirProductosDashboard(response.data.mas_vendidos);
          }

          if (response.data.mas_nuevos) {
            this.masNuevo = this.convertirProductosDashboard(response.data.mas_nuevos);
          }

          if (response.data.liquidaciones) {
            this.liquidacion = response.data.liquidaciones;
          }

          if (response.data.configuracion) {
            this.cyberwowBanners = response.data.configuracion;
          }

          if (response.data.carrusel) {
            this.carrusel = response.data.carrusel;
          }

          this.actualizarSEODinamico();
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del dashboard:', error);
        this.mostrarErrorCarga();
      },
      complete: () => {
        this.loading.dashboard = false;
      }
    });
  }


  /**
   * Convierte los productos del dashboard al formato esperado por los componentes
   */
 private convertirProductosDashboard(productosDashboard: any[]): Producto[] {
    return productosDashboard.map(producto => ({
      ...producto,
      imagenes: producto.imagenes ? producto.imagenes.map((url: string) => ({ url })) : []
    }));
  }

 

  /**
   * Resetea todos los estados de loading
   */
  private resetearLoadingStates(): void {
    this.loading = {
      dashboard: false,
      masVendido: false,
      masNuevo: false,
      liquidacion: false,
      categorias: false,
      cyberwow: false,
      carrusel: false
    };
  }

  /**
   * Muestra error de carga (opcional)
   */
  private mostrarErrorCarga(): void {
    // Aquí puedes implementar tu lógica de manejo de errores
    // Por ejemplo, mostrar un toast o mensaje de error
    console.error('No se pudieron cargar los datos del dashboard');
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

  // MÉTODO ACTUALIZADO: Para generar slug de categoría PADRE
  getCategoriaSlug(categoria: string | Categoria | undefined): string {
    if (!categoria) {
      return '';
    }
    
    // Si es un objeto con propiedad nombre
    if (typeof categoria === 'object' && 'nombre' in categoria) {
      return this.generarSlugCategoria(categoria.nombre);
    }
    
    // Si es un string
    if (typeof categoria === 'string') {
      return this.generarSlugCategoria(categoria);
    }
    
    return '';
  }

  // NUEVO: Método para generar slug de categoría (igual que en header y mostrar-producto)
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

// REEMPLAZA este método en inicio-page.component.ts



  private obtenerInfoCategoriasPorProducto(producto: Producto): {categoriaPadre: any | null, categoriaHijo: any | null} {
    let categoriaPadre: any | null = null;
    let categoriaHijo: any | null = null;

    if (!producto.categoria_id) {
      return { categoriaPadre, categoriaHijo };
    }

    for (const categoria of this.categoriasJerarquicas) {
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
      
      if (categoria.id.toString() === producto.categoria_id?.toString()) {
        categoriaPadre = categoria;
        break;
      }
    }

    return { categoriaPadre, categoriaHijo };
  }



  // NUEVO: Método para obtener la ruta correcta de categoría padre
getCategoriaRoute(categoria: Categoria): string[] {
    const slug = this.getCategoriaSlug(categoria);
    
    // Si es categoría padre (tiene subcategorías), usar ruta de categoría padre
    if (categoria.subcategorias && categoria.subcategorias.length > 0) {
      return ['/', slug];
    } else {
      // Si es subcategoría, navegar normalmente
      return ['/', slug];
    }
  }

  // Métodos para generar rutas de CyberWow actualizados
  getCyberwowCategoriaRoute(): string[] {
    if (this.cyberwowBanners.categoria?.categoria) {
      const categoria = this.cyberwowBanners.categoria.categoria;
      const slug = this.getCategoriaSlug(categoria.nombre);
      
      // Usar nueva estructura sin prefijo 'categoria/'
      return ['/', slug];
    }
    return ['/'];
  }

  // ACTUALIZADO: Método para generar ruta de producto CyberWow con nueva estructura
  getCyberwowProductoRoute(banner: CyberwowBannerProducto): string[] {
    if (banner.producto && banner.producto.categoria) {
      const producto = banner.producto;
      const { categoriaPadre, categoriaHijo } = this.obtenerInfoCategoriasPorCyberwowProducto(producto);
      const productoSlug = this.generarSlugProductoCyberwow(producto);

      if (categoriaPadre && categoriaHijo) {
        // Ruta completa: padre/hijo/producto
        const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
        const slugHijo = this.generarSlugCategoria(categoriaHijo.nombre);
        return ['/', slugPadre, slugHijo, productoSlug];
      } else if (categoriaPadre) {
        // Solo categoría padre: padre/producto
        const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
        return ['/', slugPadre, productoSlug];
      } else {
        // Fallback
        const categoriaSlug = this.getCategoriaSlug(producto.categoria.nombre);
        return ['/', categoriaSlug, productoSlug];
      }
    }
    return ['/'];
  }

  // NUEVO: Método auxiliar para productos CyberWow
  private obtenerInfoCategoriasPorCyberwowProducto(producto: any): {categoriaPadre: any | null, categoriaHijo: any | null} {
    let categoriaPadre: any | null = null;
    let categoriaHijo: any | null = null;

    if (!producto.categoria_id) {
      return { categoriaPadre, categoriaHijo };
    }

    // Buscar en categorías jerárquicas
    for (const categoria of this.categoriasJerarquicas) {
      if (categoria.id.toString() === producto.categoria_id?.toString()) {
        if (categoria.subcategorias && categoria.subcategorias.length > 0) {
          categoriaPadre = categoria;
        } else {
          categoriaHijo = categoria;
          for (const cat of this.categoriasJerarquicas) {
            if (cat.subcategorias?.some((sub: any) => sub.id === categoria.id)) {
              categoriaPadre = cat;
              break;
            }
          }
        }
        break;
      }
      
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

  private generarSlugProductoCyberwow(producto: any): string {
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

    const palabras = nombreLimpio.split(' ').filter((palabra: string) => palabra.length > 0).slice(0, 2);
    const nombreCorto = palabras.join('-');
    return `${nombreCorto}-${producto.id}`;
  }

  // Método para navegar cuando se hace clic en el banner de tiendas
  onCyberwowTiendasClick(): void {
    if (this.cyberwowBanners.tiendas?.tiendas && this.cyberwowBanners.tiendas.tiendas.length > 0) {
      // Obtener los IDs de las tiendas asociadas al banner
      const tiendasIds = this.cyberwowBanners.tiendas.tiendas.map(tienda => tienda.id);
      
      // Navegar a productos con queryParams que incluyan los filtros de tiendas
      this.router.navigate(['/productos'], {
        queryParams: {
          cyberwow: 'tiendas',
          tiendas: tiendasIds.join(',')
        }
      });
    } else {
      // Si no hay tiendas asociadas, navegar sin filtros
      this.router.navigate(['/productos'], {
        queryParams: {
          cyberwow: 'tiendas'
        }
      });
    }
  }

  // Método para navegar por categoría ID si es necesario
  navigateToCategory(categoriaId: number): void {
    // Este método puede usarse si necesitas navegar por ID de categoría
    // Por ejemplo: this.router.navigate(['/categoria', categoriaId]);
  }

  // ACTUALIZADO: Método para generar slug de liquidación con nueva estructura
  generarSlugLiquidacion(liquidacion: Liquidacion): string {
    return this.generarSlugConId(liquidacion.producto);
  }

  // NUEVO: Método para navegar a liquidación con nueva estructura
  navegarALiquidacion(liquidacion: Liquidacion): void {
    this.navegarAProducto(liquidacion.producto);
  }
 navegarAProducto(producto: Producto): void {
    const slug = this.generarSlugConId(producto);
    
    if (!this.categoriasJerarquicas || this.categoriasJerarquicas.length === 0) {
      console.warn('Categorías jerárquicas no cargadas, usando fallback...');
      
      if (producto.categoria_completa && typeof producto.categoria_completa === 'object') {
        const categoriaCompleta = producto.categoria_completa as any;
        if (categoriaCompleta.padre && categoriaCompleta.padre.nombre) {
          const padreSlug = this.generarSlugCategoria(categoriaCompleta.padre.nombre);
          const hijoSlug = this.generarSlugCategoria(categoriaCompleta.nombre);
          this.router.navigate(['/', padreSlug, hijoSlug, slug]);
          return;
        }
      }
      
      if (producto.categoria && typeof producto.categoria === 'string') {
        const categoriaSlug = this.generarSlugCategoria(producto.categoria);
        this.router.navigate(['/', categoriaSlug, slug]);
        return;
      } else {
        this.router.navigate(['/productos', slug]);
        return;
      }
    }

    const { categoriaPadre, categoriaHijo } = this.obtenerInfoCategoriasPorProducto(producto);

    if (categoriaPadre && categoriaHijo) {
      const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
      const slugHijo = this.generarSlugCategoria(categoriaHijo.nombre);
      this.router.navigate(['/', slugPadre, slugHijo, slug]);
    } else if (categoriaPadre) {
      const slugPadre = this.generarSlugCategoria(categoriaPadre.nombre);
      this.router.navigate(['/', slugPadre, slug]);
    } else {
      // Fallbacks adicionales
      if (producto.categoria_completa && typeof producto.categoria_completa === 'object') {
        const categoriaCompleta = producto.categoria_completa as any;
        if (categoriaCompleta.padre && categoriaCompleta.padre.nombre) {
          const padreSlug = this.generarSlugCategoria(categoriaCompleta.padre.nombre);
          const hijoSlug = this.generarSlugCategoria(categoriaCompleta.nombre);
          this.router.navigate(['/', padreSlug, hijoSlug, slug]);
          return;
        }
      }
      
      if (producto.categoria && typeof producto.categoria === 'string') {
        const categoriaSlug = this.generarSlugCategoria(producto.categoria);
        this.router.navigate(['/', categoriaSlug, slug]);
      } else {
        this.router.navigate(['/productos', slug]);
      }
    }
  }
 

  /**
   * Método para verificar si hay datos cargados
   */
  get hayCargaDatos(): boolean {
    return this.categorias.length > 0 || 
           this.masVendido.length > 0 || 
           this.masNuevo.length > 0 || 
           this.liquidacion.length > 0;
  }
}