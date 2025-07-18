import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ActivatedRoute } from '@angular/router';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrl: './mostrar-producto.component.css'
})
export class MostrarProductoComponent implements OnInit {

  public productos:Producto[]=[];
  public categoria = '';

   constructor(
    private route: ActivatedRoute,
    private peruviansService: PeruviansService,
    private carritoService:CarritoService,
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.categoria = params.get('categorias') || '';
    

    if (this.categoria === 'mas-vendidos') {
      this.obtenerProductosMasVendidos();
    } else if (this.categoria === 'mas-nuevos') {
      this.obtenerProductosMasNuevos();
    } else {
      this.obtenerProductosPorCategoria(this.categoria);
    }
  });
    }



  obtenerProductosPorCategoria(categoria: string): void {
    this.peruviansService.getProductosPorCategoria(categoria)
      .subscribe(resp => {
        this.productos = resp;
      });
  }

  obtenerProductosMasVendidos(): void {
    this.peruviansService.masVendidos()
      .subscribe(resp => {
        this.productos = resp;
      });
  }
    obtenerProductosMasNuevos(): void {
    this.peruviansService.masNuevo()
      .subscribe(resp => {
        this.productos = resp;
      });
  }


  AgregarCarrito(producto:Producto){
    this.carritoService.agregarProducto(producto);
    
  }   


} 
