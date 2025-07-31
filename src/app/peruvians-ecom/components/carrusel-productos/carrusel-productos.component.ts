import {
  AfterViewChecked,
  Component,
  HostListener,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID
} from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'peruvians-carrusel-productos',
  templateUrl: './carrusel-productos.component.html',
  styleUrl: './carrusel-productos.component.css'
})
export class CarruselProductosComponent implements OnChanges, AfterViewChecked {
  @Input() carouselId!: string;
  @Input() productos!: Producto[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  gruposProductos: Producto[][] = [];
  carouselInstanciado = false;

  ngOnChanges() {
    this.calcularGrupos();
    this.carouselInstanciado = false; // para reinicializar el carrusel
  }

  @HostListener('window:resize')
  onResize() {
    this.calcularGrupos();
    this.carouselInstanciado = false; // reinicia si cambia de tamaño
  }

  ngAfterViewChecked(): void {
    if (!this.carouselInstanciado && isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(this.carouselId);
      if (el) {
        new bootstrap.Carousel(el, {
          touch: true,
          interval: false
        });
        this.carouselInstanciado = true;
      }
    }
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
