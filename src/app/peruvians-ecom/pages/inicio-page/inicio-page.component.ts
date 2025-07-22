import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { PeruviansService } from '../../services/peruvians.service';
import { LiquidacionService } from '../../services/liquidacion.service';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements OnInit{

  public productos:Producto[]=[];
  public masVendido:Producto[] = [];
  public masNuevo:Producto[] = [];
  public liquidacion:Producto[] =[];
  constructor(
    private peruviansService:PeruviansService,
    private liquidacionService:LiquidacionService,
  ){}
  
  ngOnInit(): void {
  

    this.peruviansService.masVendidos()
    .subscribe(masVendidos=>{
      this.masVendido = masVendidos;
    })


    this.peruviansService.masNuevo()
    .subscribe(masNuevo=>{
      this.masNuevo = masNuevo;
     
    })

    this.liquidacionService.getProductosLiquidacion()
    .subscribe(productos=>{
      this.liquidacion = productos;
    
    })
  }
  
    generarSlugConId(producto: Producto): string {
      const slug = producto.nombre
        .toLowerCase()
        .replace(/\s+/g, '-')        // espacios → guiones
        .replace(/[^\w\-]+/g, '')    // elimina caracteres especiales
        .replace(/\-\-+/g, '-')      // colapsa múltiples guiones
        .trim();
      return `${slug}-${producto.id}`;
    }
 
 

    
}
