import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarruselService } from '../../services/carrusel.service';
import { Carrusel } from '../../interfaces/carrusel';

@Component({
  selector: 'app-carrusel-principal',
  templateUrl: './carrusel-principal.component.html',
  styleUrls: ['./carrusel-principal.component.css']
})
export class CarruselPrincipalComponent implements OnInit, OnDestroy, AfterViewInit {
  
  carruselItems: Carrusel[] = [];
  isLoading = true;
  error: string | null = null;
  private subscription: Subscription = new Subscription();

  // Propiedades para cachear los slides y evitar re-renders
  desktopSlides: Carrusel[][] = [];
  mobileSlides: Carrusel[] = [];

  constructor(
    private carruselService: CarruselService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCarrusel();
  }

  ngAfterViewInit(): void {
    // Asegurar que Bootstrap inicialice correctamente el carrusel
    setTimeout(() => {
      this.initializeCarousels();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Inicializa los carruseles de Bootstrap
   */
  private initializeCarousels(): void {
    const desktopCarousel = document.getElementById('carouselInicio');
    const mobileCarousel = document.getElementById('carouselInicioMobile');

    // Reinicializar carruseles si es necesario
    if (desktopCarousel && (window as any).bootstrap) {
      const carousel = new (window as any).bootstrap.Carousel(desktopCarousel, {
        ride: 'carousel',
        wrap: true,
        interval: 5000
      });
    }

    if (mobileCarousel && (window as any).bootstrap) {
      const carousel = new (window as any).bootstrap.Carousel(mobileCarousel, {
        ride: 'carousel',
        wrap: true,
        interval: 5000
      });
    }
  }

  /**
   * Carga los elementos del carrusel desde la API
   */
  cargarCarrusel(): void {
    this.isLoading = true;
    this.error = null;

    const sub = this.carruselService.getCarrusel().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.carruselItems = response.data;
          // Procesar slides una sola vez después de cargar los datos
          this.procesarSlides();
          console.log('Carrusel items cargados:', this.carruselItems.length);
        } else {
          this.error = 'No se pudieron cargar las imágenes del carrusel';
        }
        this.isLoading = false;
        
        // Reinicializar carruseles después de cargar datos
        setTimeout(() => {
          this.initializeCarousels();
        }, 50);
      },
      error: (error) => {
        console.error('Error al cargar carrusel:', error);
        this.error = 'Error al conectar con el servidor';
        this.isLoading = false;
      }
    });

    this.subscription.add(sub);
  }

  /**
   * Procesa los slides una sola vez para evitar re-renders
   */
  private procesarSlides(): void {
    // Desktop slides (agrupando de a 2)
    this.desktopSlides = [];
    if (this.carruselItems && this.carruselItems.length > 0) {
      for (let i = 0; i < this.carruselItems.length; i += 2) {
        const slide = this.carruselItems.slice(i, i + 2);
        this.desktopSlides.push(slide);
      }
    }

    // Mobile slides (uno por uno)
    this.mobileSlides = [...this.carruselItems];

    console.log('Desktop slides generados:', this.desktopSlides.length);
    console.log('Mobile slides:', this.mobileSlides.length);
  }

/**
 * Genera slug optimizado para productos
 */
generarSlugConId(producto: any): string {
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

const palabras = nombreLimpio
  .split(' ')
  .filter((palabra: string) => palabra.length > 0)
  .slice(0, 2);
  const nombreCorto = palabras.join('-');
  return `${nombreCorto}-${producto.id}`;
}

/**
 * Maneja el clic en "Lo quiero" - VERSIÓN ACTUALIZADA
 */
onLoQuiero(item: Carrusel): void {
  if (item.producto && item.producto.disponible && item.producto.categoria) {
    // Generar slug optimizado y navegar al producto específico
    const slug = this.generarSlugConId(item.producto);
    this.router.navigate(['/', item.producto.categoria, slug]);
  } else if (item.producto && item.producto.disponible) {
    // Si no tiene categoría, usar ruta genérica con slug
    const slug = this.generarSlugConId(item.producto);
    this.router.navigate(['/productos', slug]);
  } else {
    // Navegar a la página general de productos
    this.router.navigate(['/productos']);
  }
}

  /**
   * Genera slides para desktop (agrupando de a 2)
   * DEPRECATED: Usar desktopSlides directamente en el template
   */
  getDesktopSlides(): Carrusel[][] {
    return this.desktopSlides;
  }

  /**
   * Obtiene los slides para móvil (uno por uno)
   * DEPRECATED: Usar mobileSlides directamente en el template
   */
  getMobileSlides(): Carrusel[] {
    return this.mobileSlides;
  }

  /**
   * Verifica si hay slides dinámicos disponibles
   */
  hasDynamicSlides(): boolean {
    return this.carruselItems && this.carruselItems.length > 0;
  }

  /**
   * Recarga el carrusel
   */
  recargar(): void {
    this.cargarCarrusel();
  }

  /**
   * Maneja errores de carga de imágenes
   */
  onImageError(event: any): void {
    console.warn('Error al cargar imagen:', event.target.src);
    // Opcional: poner imagen por defecto
    // event.target.src = 'assets/images/placeholder.jpg';
  }

  /**
   * TrackBy function para optimizar rendimiento en *ngFor
   */
  trackByIndex(index: number, item: any): number {
    return index;
  }
}