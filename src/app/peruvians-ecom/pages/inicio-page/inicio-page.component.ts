import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria';
import { CyberwowBanner } from '../../interfaces/cyberwow';
import { Liquidacion } from '../../interfaces/liquidacion';
import { PeruviansService } from '../../services/peruvians.service';
import { LiquidacionService } from '../../services/liquidacion.service';
import { CategoriaService } from '../../services/categoria.service';
import { CyberwowService } from '../../services/cyberwow.service';
import { forkJoin } from 'rxjs';


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
  public categorias: Categoria[] = [];

  
  // CyberWow data
  public cyberwowBanners = {
    categoria: null as CyberwowBanner | null,
    tiendas: null as CyberwowBanner | null,
    productos: [] as CyberwowBanner[]
  };
  
  public loading = {
    masVendido: false,
    masNuevo: false,
    liquidacion: false,
    categorias: false,
    cyberwow: false
  };

  constructor(
    private peruviansService: PeruviansService,
    private liquidacionService: LiquidacionService,
    private categoriaService: CategoriaService,
    private cyberwowService: CyberwowService,
    private router: Router // Agregar Router
  ) {}
  
  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
  this.loading = {
    categorias: true,
    masVendido: true,
    masNuevo: true,
    liquidacion: true,
    cyberwow: true
  };

  forkJoin({
    categorias: this.categoriaService.obtenerCategorias(),
    masVendido: this.peruviansService.masVendidos(),
    masNuevo: this.peruviansService.masNuevo(),
    liquidacion: this.liquidacionService.getProductosLiquidacion(),
    cyberwow: this.cyberwowService.obtenerConfiguracion()
  }).subscribe({
    next: (res) => {
      this.categorias = res.categorias.data; // depende de cómo viene tu API
      this.masVendido = res.masVendido;
      this.masNuevo = res.masNuevo;
      this.liquidacion = res.liquidacion;
      this.cyberwowBanners = res.cyberwow;
    },
    error: (err) => {
      console.error('Error al cargar datos de inicio:', err);
    },
    complete: () => {
      this.loading = {
        categorias: false,
        masVendido: false,
        masNuevo: false,
        liquidacion: false,
        cyberwow: false
      };
    }
  });
}

//   private cargarCategorias(): void {
//     this.loading.categorias = true;
//     this.categoriaService.obtenerCategorias()
//       .subscribe({
//         next: (response) => {
//           if (response.success) {
//             this.categorias = response.data;
//           }
//         },
//         error: (error) => {
//           console.error('Error al cargar categorías:', error);
//         },
//         complete: () => {
//           this.loading.categorias = false;
//         }
//       });
//   }

//   private cargarMasVendidos(): void {
//     this.loading.masVendido = true;
//     this.peruviansService.masVendidos()
//       .subscribe({
//         next: (masVendidos) => {
//           this.masVendido = masVendidos;
//         },
//         error: (error) => {
//           console.error('Error al cargar productos más vendidos:', error);
//         },
//         complete: () => {
//           this.loading.masVendido = false;
//         }
//       });
//   }

//   private cargarMasNuevo(): void {
//     this.loading.masNuevo = true;
//     this.peruviansService.masNuevo()
//       .subscribe({
//         next: (masNuevo) => {
//           this.masNuevo = masNuevo;
//         },
//         error: (error) => {
//           console.error('Error al cargar productos más nuevos:', error);
//         },
//         complete: () => {
//           this.loading.masNuevo = false;
//         }
//       });
//   }

//   private cargarLiquidacion(): void {
//   this.loading.liquidacion = true;
//   this.liquidacionService.getProductosLiquidacion()
//     .subscribe({
//       next: (liquidaciones) => {
//         this.liquidacion = liquidaciones;
//       },
//       error: (error) => {
//         console.error('Error al cargar productos en liquidación:', error);
//       },
//       complete: () => {
//         this.loading.liquidacion = false;
//       }
//     });
// }

//   private cargarCyberwow(): void {
//     this.loading.cyberwow = true;
//     this.cyberwowService.obtenerConfiguracion()
//       .subscribe({
//         next: (configuracion) => {
//           this.cyberwowBanners = configuracion;
//         },
//         error: (error) => {
//           console.error('Error al cargar configuración CyberWow:', error);
//         },
//         complete: () => {
//           this.loading.cyberwow = false;
//         }
//       });
//   }
  
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

  // Método para obtener el slug de categoría (basado en nombre)
getCategoriaSlug(categoria: string | Categoria | undefined): string {
  if (!categoria) {
    return '';
  }
  
  // Si es un objeto Categoria
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

  getCyberwowProductoRoute(banner: CyberwowBanner): string[] {
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

    const palabras = nombreLimpio.split(' ').filter((palabra: String) => palabra.length > 0).slice(0, 2);
    const nombreCorto = palabras.join('-');
    return `${nombreCorto}-${producto.id}`;
  }

  // NUEVO: Método para navegar cuando se hace clic en el banner de tiendas
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
}