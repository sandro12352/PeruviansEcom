import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { PeruviansEcomRoutingModule } from './peruvians-ecom-routing.module';
import { CarruselPrincipalComponent } from './components/carrusel-principal/carrusel-principal.component';
import { CarruselProductosComponent } from './components/carrusel-productos/carrusel-productos.component';
import { CarruselMarcasComponent } from './components/carrusel-marcas/carrusel-marcas.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarruselComentariosComponent } from './components/carrusel-comentarios/carrusel-comentarios.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';
import { NosotrosPageComponent } from './pages/nosotros-page/nosotros-page.component';
import { PreguntasFrecuentesPageComponent } from './pages/preguntas-frecuentes-page/preguntas-frecuentes-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { CardComponent } from './components/card/card.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { LibroReclamacionesComponent } from './pages/libro-reclamaciones/libro-reclamaciones.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { NuestrasTiendasComponent } from './pages/nuestras-tiendas/nuestras-tiendas.component';
import { CarruselSkeletonComponent } from './components/carrusel-skeleton/carrusel-skeleton.component';
import { ModalEmergenteComponent } from './components/modal-emergente/modal-emergente.component';
import { ProductoNombrePipe } from '../pipes/producto-nombre.pipe';
import { SplitBeneficiosPipe } from '../pipes/split-beneficios.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutPageComponent,
    HeaderComponent,
    InicioPageComponent,
    PerfilComponent,
    PedidosComponent,
    CarruselPrincipalComponent,
    CarruselProductosComponent,
    CarruselMarcasComponent,
    FooterComponent,
    CarruselComentariosComponent,
    ContactanosComponent,
    MostrarProductoComponent,
    NosotrosPageComponent,
    PreguntasFrecuentesPageComponent,
    DetalleProductoPageComponent,
    CardComponent,
    PoliticaPrivacidadComponent,
    TerminosCondicionesComponent,
    LibroReclamacionesComponent,
    NuestrasTiendasComponent,
    CarruselSkeletonComponent,
    ModalEmergenteComponent,
    ProductoNombrePipe,
    SplitBeneficiosPipe,

  ],
  exports: [
     HeaderComponent,   // ✅ exportar
    FooterComponent,   // ✅ exportar
    ModalEmergenteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PeruviansEcomRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgOptimizedImage
]
  
})
export class PeruviansEcomModule { }