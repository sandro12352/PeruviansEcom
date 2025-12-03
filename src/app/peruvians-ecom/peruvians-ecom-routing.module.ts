import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { NosotrosPageComponent } from './pages/nosotros-page/nosotros-page.component';
import { PreguntasFrecuentesPageComponent } from './pages/preguntas-frecuentes-page/preguntas-frecuentes-page.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { LibroReclamacionesComponent } from './pages/libro-reclamaciones/libro-reclamaciones.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { NuestrasTiendasComponent } from './pages/nuestras-tiendas/nuestras-tiendas.component';
import { categoriaEtiquetaResolver } from '../resolvers/categoria-etiqueta.resolver';
import { detalleProductoResolver } from '../resolvers/detalle-producto.resolver';

const routes: Routes = [
  { path: 'blog', loadChildren:()=>import('./pages/blog-page/blog-page.module').then(m=>m.BlogPageModule)},
  { path: 'perfil', component: PerfilComponent },
  { path: 'mis-pedidos', component: PedidosComponent },  
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'nosotros', component: NosotrosPageComponent },
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesPageComponent },
  { path: 'nuestras-tiendas', component: NuestrasTiendasComponent },
  { path: 'mas-vendidos', component: MostrarProductoComponent,data:{tipo:'mas-vendidos'} },
  { path: 'ofertas', component: MostrarProductoComponent ,data:{tipo:'ofertas'}},
  { path: 'mas-nuevos', component: MostrarProductoComponent ,data:{tipo:'mas-nuevos'}},
  { path: 'productos', component: MostrarProductoComponent,data:{tipo:'productos'} },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
  { path: 'libro-reclamaciones', component: LibroReclamacionesComponent },
  { path: ':categoriaPadreSlug', component: MostrarProductoComponent ,resolve:{ recurso:categoriaEtiquetaResolver}},
  { path: ':categoriaPadreSlug/:categoriaHijoSlug', component: MostrarProductoComponent },      
  { path: ':categoriaPadreSlug/:categoriaHijoSlug/:nombreProducto/:id', component: DetalleProductoPageComponent , 
    resolve:{producto:detalleProductoResolver}
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PeruviansEcomRoutingModule { }