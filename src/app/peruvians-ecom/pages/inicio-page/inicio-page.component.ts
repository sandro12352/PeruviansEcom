// src/app/peruvians-ecom/pages/inicio-page/inicio-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DashboardService } from '../../services/dashboard.service';
import { 
  DashboardResponse,
  Categoria as DashboardCategoria, 
  Liquidacion, 
  ConfiguracionCyberwow, 
  CyberwowBannerProducto,
  Carrusel 
} from '../../interfaces/dashboard.interface';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria';

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
  public categorias: DashboardCategoria[] = [];
  public carrusel: Carrusel[] = [];

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
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {}
  
  ngOnInit(): void {
    this.configurarSEO();
    this.cargarDatosDashboard();
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

    // Cargar todas las secciones del dashboard
    this.dashboardService.getDashboardData('todas').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Asignar categorías
          if (response.data.categorias) {
            this.categorias = response.data.categorias.items;
          }

          // Asignar productos más vendidos
          if (response.data.mas_vendidos) {
            this.masVendido = this.convertirProductosDashboard(response.data.mas_vendidos);
          }

          // Asignar productos más nuevos
          if (response.data.mas_nuevos) {
            this.masNuevo = this.convertirProductosDashboard(response.data.mas_nuevos);
          }

          // Asignar liquidaciones
          if (response.data.liquidaciones) {
            this.liquidacion = response.data.liquidaciones;
          }

          // Asignar configuración CyberWow
          if (response.data.configuracion) {
            this.cyberwowBanners = response.data.configuracion;
          }

          // Asignar carrusel
          if (response.data.carrusel) {
            this.carrusel = response.data.carrusel;
          }

          // Actualizar SEO con datos dinámicos
          this.actualizarSEODinamico();
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del dashboard:', error);
        // Opcional: Mostrar mensaje de error al usuario
        this.mostrarErrorCarga();
      },
      complete: () => {
        this.loading.dashboard = false;
      }
    });
  }

  /**
   * Método opcional para cargar secciones específicas
   */
  private cargarSeccionesEspecificas(): void {
    this.loading = {
      dashboard: false,
      categorias: true,
      masVendido: true,
      masNuevo: true,
      liquidacion: true,
      cyberwow: true,
      carrusel: true
    };

    const secciones = ['categorias', 'mas_vendidos', 'mas_nuevos', 'liquidaciones', 'configuracion', 'carrusel'];

    this.dashboardService.getDashboardData(secciones).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.procesarDatosDashboard(response.data);
        }
      },
      error: (error) => {
        console.error('Error al cargar secciones específicas:', error);
        this.mostrarErrorCarga();
      },
      complete: () => {
        this.resetearLoadingStates();
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
   * Procesa los datos recibidos del dashboard
   */
  private procesarDatosDashboard(data: any): void {
    if (data.categorias) {
      this.categorias = data.categorias.items;
    }
    if (data.mas_vendidos) {
      this.masVendido = this.convertirProductosDashboard(data.mas_vendidos);
    }
    if (data.mas_nuevos) {
      this.masNuevo = this.convertirProductosDashboard(data.mas_nuevos);
    }
    if (data.liquidaciones) {
      this.liquidacion = data.liquidaciones;
    }
    if (data.configuracion) {
      this.cyberwowBanners = data.configuracion;
    }
    if (data.carrusel) {
      this.carrusel = data.carrusel;
    }
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

  // Método para obtener el slug de categoría
  getCategoriaSlug(categoria: string | DashboardCategoria | Categoria | undefined): string {
    if (!categoria) {
      return '';
    }
    
    // Si es un objeto con propiedad nombre
    if (typeof categoria === 'object' && 'nombre' in categoria) {
      return categoria.nombre
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .trim();
    }
    
    // Si es un string
    if (typeof categoria === 'string') {
      return categoria
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .trim();
    }
    
    return '';
  }

  // Métodos para generar rutas de CyberWow
  getCyberwowCategoriaRoute(): string[] {
    if (this.cyberwowBanners.categoria?.categoria) {
      return ['/', this.getCategoriaSlug(this.cyberwowBanners.categoria.categoria.nombre)];
    }
    return ['/'];
  }

  getCyberwowProductoRoute(banner: CyberwowBannerProducto): string[] {
    if (banner.producto && banner.producto.categoria) {
      const categoriaSlug = this.getCategoriaSlug(banner.producto.categoria.nombre);
      return ['/', categoriaSlug, this.generarSlugProductoCyberwow(banner.producto)];
    }
    return ['/'];
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

  generarSlugLiquidacion(liquidacion: Liquidacion): string {
    return this.generarSlugConId(liquidacion.producto);
  }

  /**
   * Método para recargar datos del dashboard
   */
  recargarDashboard(): void {
    this.cargarDatosDashboard();
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