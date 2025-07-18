import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { PeruviansEcomRoutingModule } from './peruvians-ecom-routing.module';
import { CarruselPrincipalComponent } from './components/carrusel-principal/carrusel-principal.component';
import { CarruselProductosComponent } from './components/carrusel-productos/carrusel-productos.component';
import { CarruselMarcasComponent } from './components/carrusel-marcas/carrusel-marcas.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarruselComentariosComponent } from './components/carrusel-comentarios/carrusel-comentarios.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';




@NgModule({
  declarations: [
    LayoutPageComponent,
    HeaderComponent,
    InicioPageComponent,
    CarruselPrincipalComponent,
    CarruselProductosComponent,
    CarruselMarcasComponent,
    FooterComponent,
    CarruselComentariosComponent,
    ContactanosComponent,
    MostrarProductoComponent,
  ],
  exports: [
    LayoutPageComponent,
  ]
    ,
  imports: [
    CommonModule,
    RouterModule,
    PeruviansEcomRoutingModule,
    ReactiveFormsModule   
  ]
})
export class PeruviansEcomModule { }
