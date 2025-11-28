import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarruselService } from '../../services/carrusel.service';
import { Carrusel } from '../../interfaces/carrusel';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carrusel-principal',
  templateUrl: './carrusel-principal.component.html',
  styleUrls: ['./carrusel-principal.component.css']
})
export class CarruselPrincipalComponent implements OnInit, OnDestroy {
  
  @ViewChild('carouselInicio') desktopCarousel!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselInicioMobile') mobileCarousel!: ElementRef<HTMLDivElement>;
  
  carruselItems: Carrusel[] = [];
  isLoading = false; // Cambiado a false inicialmente
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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {  
    // Cargar contenido dinámico
    this.error = null;
    this.cargarCarrusel();
  }

 

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Inicializa los carruseles de Bootstrap
   */
  private initializeCarousels(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      const desktopCarousel = this.desktopCarousel.nativeElement;
      const mobileCarousel = this.mobileCarousel.nativeElement;
  
      // Reinicializar carrusel desktop
      if (desktopCarousel && (window as any).bootstrap) {
        try {
          const carousel = new (window as any).bootstrap.Carousel(desktopCarousel, {
            interval: 3000, // ✅ 3 segundos (3000 milisegundos)
            pause: 'hover',
            ride:'carousel',
          });
  
          // Escuchar eventos de cambio de slide
          desktopCarousel.addEventListener('slide.bs.carousel', (event: any) => {
            this.preloadNextSlideImages(event.to, 'desktop');
          });
  
          // Activar auto-play solo si hay slides dinámicos
          if (this.desktopSlides.length > 0) {
            setTimeout(() => {
              carousel.cycle();
            }, 2000);
          }
        } catch (error) {
          console.warn('Error inicializando carrusel desktop:', error);
        }
      }
  
      // Reinicializar carrusel móvil
      if (mobileCarousel && (window as any).bootstrap) {
        try {
          const carousel = new (window as any).bootstrap.Carousel(mobileCarousel, {
            ride: false,
            wrap: false,
            interval: 3000, // ✅ 3 segundos (3000 milisegundos)
            pause: 'hover'
          });
  
          // Escuchar eventos de cambio de slide
          mobileCarousel.addEventListener('slide.bs.carousel', (event: any) => {
            this.preloadNextSlideImages(event.to, 'mobile');
          });
  
          // Activar auto-play solo si hay slides dinámicos
          if (this.mobileSlides.length > 0) {
            setTimeout(() => {
              carousel.cycle();
            }, 2000);
          }
        } catch (error) {
          console.warn('Error inicializando carrusel móvil:', error);
        }
      }
    }
  }

  /**
   * Precarga las imágenes del siguiente slide
   */
  private preloadNextSlideImages(slideIndex: number, type: 'desktop' | 'mobile'): void {
    try {
      if (type === 'desktop' && slideIndex > 0) {
        const slide = this.desktopSlides[slideIndex - 1];
        if (slide) {
          slide.forEach(item => {
            if (item.imagen_url) {
              this.preloadImage(item.imagen_url);
            }
          });
        }
      } else if (type === 'mobile' && slideIndex > 0) {
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
  if (typeof window === 'undefined') return; // Evita ejecutar en SSR

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

    this.carruselService.getCarrusel().subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success && response.data && response.data.length > 0) {
          this.carruselItems = response.data;
          this.procesarSlides();
          this.preloadInitialImages();
          
          setTimeout(() => {
            this.initializeCarousels();
          }, 100);
        } else {
          // No hay data pero no es error crítico
          this.error = null;
          console.info('No hay slides dinámicos disponibles');
        }
      },
      error: (error) => {
        console.error('Error al cargar carrusel:', error);
        this.error = 'Error al conectar con el servidor. Mostrando solo banner principal.';
        this.isLoading = false;
      }
    });

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
  


  /**
   * Maneja el clic en "Lo quiero"
   */
  onLoQuiero(item: Carrusel): void {
    if (item.producto && item.producto.stock  && item.producto.categoria) {
      let categoriaPadre = item.producto.categoria.categoria_slug; // fallback por defecto
      let subcategoria = item.producto.subcategoria?.categoria_slug;
      if (item.producto.categoria.es_padre) {
        categoriaPadre = item.producto.categoria.categoria_slug;      
         
      }
      this.router.navigate(['/',categoriaPadre  ,subcategoria ,item.producto.producto_slug,item.producto.id]);
    } else if (item.producto && item.producto.stock) {
      const slug = item.producto.producto_slug;
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
   * Maneja errores de carga de imágenes
   */
  onImageError(event: any): void {
    const imageUrl = event.target.src;
    
    // Marcar como error
    this.imageErrorStates.set(imageUrl, true);
    this.imageLoadingStates.set(imageUrl, false);
    
    // Opcional: imagen de fallback solo para slides dinámicos
    if (!imageUrl.includes('banner')) {
      // event.target.src = 'assets/images/placeholder.jpg';
    }
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