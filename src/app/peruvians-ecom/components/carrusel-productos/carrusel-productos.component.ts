import { Component, HostListener, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'peruvians-carrusel-productos',
  templateUrl: './carrusel-productos.component.html',
  styleUrl: './carrusel-productos.component.css'
})
export class CarruselProductosComponent implements OnChanges {
  @Input() carouselId!: string;
  @Input() public productos!: Producto[];

  constructor(
    private carritoService:CarritoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

  gruposProductos: Producto[][] = [];

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
  
  AgregarCarrito(producto:Producto){
    this.carritoService.agregarProducto(producto);
    
  }   
 




  




}
