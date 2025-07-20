import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'peruvians-carrusel-comentarios',
  templateUrl: './carrusel-comentarios.component.html',
  styleUrl: './carrusel-comentarios.component.css'
})
export class CarruselComentariosComponent implements OnInit{
  
    public ocultarUltimoSlide: boolean = false;
  
  
  ngOnInit(): void {
    if (window.innerWidth >= 768) {
      this.ocultarUltimoSlide = true;
    }
  }
    



}
