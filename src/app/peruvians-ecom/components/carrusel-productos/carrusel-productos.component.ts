import { AfterViewInit, Component, HostListener, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { isPlatformBrowser } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'peruvians-carrusel-productos',
  templateUrl: './carrusel-productos.component.html',
  styleUrl: './carrusel-productos.component.css'
})
export class CarruselProductosComponent implements OnChanges,AfterViewInit  {
  @Input() carouselId!: string;
  @Input() public productos!: Producto[];
  gruposProductos: Producto[][] = [];

  private touchStartX = 0;
  private touchEndX = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ){}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const carousel = document.getElementById(this.carouselId);
      if (carousel) {
        carousel.addEventListener('touchstart', (e: TouchEvent) => {
          this.touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e: TouchEvent) => {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe(carousel);
        });
      }
    }
  }

  private handleSwipe(carouselElement: HTMLElement) {
    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) > 50) {
      const instance = bootstrap.Carousel.getInstance(carouselElement);
      if (instance) {
        if (deltaX > 0) {
          instance.prev(); // swipe derecha
        } else {
          instance.next(); // swipe izquierda
        }
      }
    }
  }

  

  ngOnChanges () {
    this.calcularGrupos();
  }

  @HostListener('window:resize')
  onResize() {
    this.calcularGrupos();
  }
  


 calcularGrupos() {
  if (isPlatformBrowser(this.platformId)) {
    const ancho = window.innerWidth;
    const chunkSize = ancho < 768 ? 2 : 5;

    this.gruposProductos = [];
    for (let i = 0; i < this.productos.length; i += chunkSize) {
      this.gruposProductos.push(this.productos.slice(i, i + chunkSize));
    }
  }
}
  
 


 




  




}
