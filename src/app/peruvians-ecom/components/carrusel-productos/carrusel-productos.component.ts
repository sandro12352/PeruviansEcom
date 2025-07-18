import { Component, HostListener, Input, OnChanges } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';


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
  ){}

  gruposProductos: any[][] = [];

  ngOnChanges () {
    this.calcularGrupos();
  }

  @HostListener('window:resize')
  onResize() {
    this.calcularGrupos();
  }
  


  calcularGrupos() {
    const ancho = window.innerWidth;
    const chunkSize = ancho < 768 ? 2 : 5;
    
    this.gruposProductos = [];
    for (let i = 0; i < this.productos.length; i += chunkSize) {
      this.gruposProductos.push(this.productos.slice(i, i + chunkSize));
    }
    
      
  }
  
  AgregarCarrito(producto:Producto){
    this.carritoService.agregarProducto(producto);
    
  }   
 




  




}
