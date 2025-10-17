import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'peruvians-carrusel-comentarios',
  templateUrl: './carrusel-comentarios.component.html',
  styleUrl: './carrusel-comentarios.component.css'
})
export class CarruselComentariosComponent implements OnInit{
   carouselId = 'carouselTestimonials';
    public ocultarUltimoSlide: boolean = false;
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object){
      
    }

  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth >= 768) {
        this.ocultarUltimoSlide = true;
      }
    }
  }
    carouselInstanciado = false;
    
    ngOnChanges() {
 
      this.carouselInstanciado = false; // para reinicializar el carrusel
    }
  
    @HostListener('window:resize')
    onResize() {
    
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



}
