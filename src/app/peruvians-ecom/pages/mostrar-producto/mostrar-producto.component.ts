import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PeruviansService } from '../../services/peruvians.service';
import { CarritoService } from '../../services/carrito.service';
import { filter } from 'rxjs';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrl: './mostrar-producto.component.css'
})
export class MostrarProductoComponent implements OnInit {

  public productos:Producto[]=[];
  public categoria = '';
  public isLoading = true;
  public skeletonArray = Array(8);
   constructor(
    private route: ActivatedRoute,
    private router: Router ,
    private peruviansService: PeruviansService,
    private carritoService:CarritoService,
    private productoService: ProductoService
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
   this.categoria = this.route.snapshot.paramMap.get('categorias') || '';

 if (path === 'mas-vendidos') {
    this.obtenerProductosMasVendidos();
  } else if (path === 'mas-nuevos') {
    this.obtenerProductosMasNuevos();
  } else if (path === 'productos') {
    this.obtenerProductos();  // 👈 aquí
  } else {
    this.obtenerProductosPorCategoria(this.categoria);
  }
}


obtenerProductos(): void {
  this.isLoading = true;

  
    this.productoService.getProductos().subscribe({
      next: (resp) => {
        this.productos = resp;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  
}






 obtenerProductosPorCategoria(categoria: string): void {
  this.isLoading = true;
  this.peruviansService.getProductosPorCategoria(categoria)
    .subscribe({
      next: (resp) => {
        if (resp.length === 0) {
          this.isLoading = false;
          // Redirigir si quieres
        } else {
          this.productos = resp;
          this.isLoading = false;
        }
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
}






 obtenerProductosMasVendidos(): void {
  this.isLoading = true;
  this.peruviansService.masVendidos()
    .subscribe({
      next: (resp) => {
        this.productos = resp;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
}






   obtenerProductosMasNuevos(): void {
  this.isLoading = true;
  this.peruviansService.masNuevo()
    .subscribe({
      next: (resp) => {
        this.productos = resp;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
}





  AgregarCarrito(producto:Producto){
    this.carritoService.agregarProducto(producto);
    
  }   
  generarSlugConId(producto: Producto): string {
    return `${producto.nombre.replace(/\s+/g, '-').toLowerCase()}-${producto.id}`;
  }

} 