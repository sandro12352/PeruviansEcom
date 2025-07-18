import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements OnInit{

  public productos:Producto[]=[];
  public masVendido:Producto[] = [];
  public masNuevo:Producto[] = [];

  constructor(private peruviansService:PeruviansService){}
  
  ngOnInit(): void {
    this.peruviansService.todosProductos()
    .subscribe(productos=>{
      this.productos = productos;
    })


    this.peruviansService.masVendidos()
    .subscribe(masVendidos=>{
      this.masVendido = masVendidos;
    })


    this.peruviansService.masNuevo()
    .subscribe(masNuevo=>{
      this.masNuevo = masNuevo;
      console.log(masNuevo)
    })
  }
  

 

    
}
