import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
import { filter } from 'rxjs';

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
    private router: Router ,
    private peruviansService: PeruviansService,
    private carritoService:CarritoService,
  ) {}

  ngOnInit(): void {
  this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.cargarCategoriaDesdeRuta();
    });

  // Ejecutar la primera vez
  this.cargarCategoriaDesdeRuta();
}

private cargarCategoriaDesdeRuta(): void {
  const path = this.route.snapshot.routeConfig?.path || '';
  const categoria = this.route.snapshot.paramMap.get('categorias') || '';

  if (path === 'mas-vendidos') {
    this.obtenerProductosMasVendidos();
  } else if (path === 'mas-nuevos') {
    this.obtenerProductosMasNuevos();
  } else {
    this.obtenerProductosPorCategoria(categoria);
    
  }
}




  obtenerProductosPorCategoria(categoria: string): void {
    this.peruviansService.getProductosPorCategoria(categoria)
      .subscribe({
        next: (resp) => {
          if (resp.length === 0) {
            // ❗ Redirigir si la categoría no tiene productos
            
          } else {
            this.productos = resp;
          }
        },
        error: () => {
          // ❗ También redirigir si hay error con la API
          this.router.navigate(['/']);
        }
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
