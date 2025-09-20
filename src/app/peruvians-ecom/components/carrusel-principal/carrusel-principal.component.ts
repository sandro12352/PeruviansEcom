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

  // Control de carga de imágenes individuales
  imageLoadingStates: Map<string, boolean> = new Map();
  imageErrorStates: Map<string, boolean> = new Map();

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
   * Inicializa los carruseles de Bootstrap con eventos mejorados
   */
  private initializeCarousels(): void {
    const desktopCarousel = document.getElementById('carouselInicio');
    const mobileCarousel = document.getElementById('carouselInicioMobile');

    // Reinicializar carrusel desktop
    if (desktopCarousel && (window as any).bootstrap) {
      const carousel = new (window as any).bootstrap.Carousel(desktopCarousel, {
        ride: 'carousel',
        wrap: true,
        interval: 6000, // Aumentado para dar más tiempo a las imágenes
        pause: 'hover'
      });

      // Escuchar eventos de cambio de slide
      desktopCarousel.addEventListener('slide.bs.carousel', (event: any) => {
        this.preloadNextSlideImages(event.to, 'desktop');
      });
    }

    // Reinicializar carrusel móvil
    if (mobileCarousel && (window as any).bootstrap) {
      const carousel = new (window as any).bootstrap.Carousel(mobileCarousel, {
        ride: 'carousel',
        wrap: true,
        interval: 6000, // Aumentado para dar más tiempo a las imágenes
        pause: 'hover'
      });

      // Escuchar eventos de cambio de slide
      mobileCarousel.addEventListener('slide.bs.carousel', (event: any) => {
        this.preloadNextSlideImages(event.to, 'mobile');
      });
    }
  }

  /**
   * Precarga las imágenes del siguiente slide
   */
  private preloadNextSlideImages(slideIndex: number, type: 'desktop' | 'mobile'): void {
    try {
      if (type === 'desktop' && slideIndex > 0) {
        // Para desktop, precargar las imágenes del slide (son arrays de 2)
        const slide = this.desktopSlides[slideIndex - 1];
        if (slide) {
          slide.forEach(item => {
            if (item.imagen_url) {
              this.preloadImage(item.imagen_url);
            }
          });
        }
      } else if (type === 'mobile' && slideIndex > 0) {
        // Para móvil, precargar la imagen del slide
        const item = this.mobileSlides[slideIndex - 1];
        if (item && item.imagen_url) {
          this.preloadImage(item.imagen_url);
        }
      }
    } catch (error) {
      console.warn('Error al precargar imágenes:', error);
    }
  }

  /**
   * Precarga una imagen específica
   */
  private preloadImage(imageUrl: string): void {
    if (!imageUrl || this.imageLoadingStates.has(imageUrl)) return;

    this.imageLoadingStates.set(imageUrl, true);
    
    const img = new Image();
    img.onload = () => {
      this.imageLoadingStates.set(imageUrl, false);
    };
    img.onerror = () => {
      this.imageLoadingStates.set(imageUrl, false);
      this.imageErrorStates.set(imageUrl, true);
    };
    img.src = imageUrl;
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
          // Precargar las primeras imágenes
          this.preloadInitialImages();
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
   * Precarga las primeras imágenes del carrusel
   */
  private preloadInitialImages(): void {
    // Precargar primeras 2 slides de desktop
    if (this.desktopSlides.length > 0) {
      this.desktopSlides.slice(0, 2).forEach(slide => {
        slide.forEach(item => {
          if (item.imagen_url) {
            this.preloadImage(item.imagen_url);
          }
        });
      });
    }

    // Precargar primeras 3 imágenes de móvil
    if (this.mobileSlides.length > 0) {
      this.mobileSlides.slice(0, 3).forEach(item => {
        if (item.imagen_url) {
          this.preloadImage(item.imagen_url);
        }
      });
    }
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
  }

  /**
   * Verifica si una imagen está cargando
   */
  isImageLoading(imageUrl: string): boolean {
    return this.imageLoadingStates.get(imageUrl) || false;
  }

  /**
   * Verifica si una imagen tuvo error al cargar
   */
  hasImageError(imageUrl: string): boolean {
    return this.imageErrorStates.get(imageUrl) || false;
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
   * Maneja el clic en "Lo quiero"
   */
  onLoQuiero(item: Carrusel): void {
    if (item.producto && item.producto.disponible && item.producto.categoria) {
      const slug = this.generarSlugConId(item.producto);
      this.router.navigate(['/', item.producto.categoria, slug]);
    } else if (item.producto && item.producto.disponible) {
      const slug = this.generarSlugConId(item.producto);
      this.router.navigate(['/productos', slug]);
    } else {
      this.router.navigate(['/productos']);
    }
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
    // Limpiar estados de carga
    this.imageLoadingStates.clear();
    this.imageErrorStates.clear();
    this.cargarCarrusel();
  }

  /**
   * Maneja errores de carga de imágenes - MEJORADO
   */
  onImageError(event: any): void {
    const imageUrl = event.target.src;
    console.warn('Error al cargar imagen:', imageUrl);
    
    // Marcar como error
    this.imageErrorStates.set(imageUrl, true);
    this.imageLoadingStates.set(imageUrl, false);
    
    // Opcional: poner imagen por defecto
    // event.target.src = 'assets/images/placeholder.jpg';
  }

  /**
   * Maneja cuando una imagen se carga correctamente
   */
  onImageLoad(event: any): void {
    const imageUrl = event.target.src;
    this.imageLoadingStates.set(imageUrl, false);
    this.imageErrorStates.set(imageUrl, false);
  }

  /**
   * Maneja cuando una imagen empieza a cargar
   */
  onImageLoadStart(imageUrl: string): void {
    if (imageUrl) {
      this.imageLoadingStates.set(imageUrl, true);
    }
  }

  /**
   * TrackBy function para optimizar rendimiento en *ngFor
   */
  trackByIndex(index: number, item: any): number {
    return index;
  }
}