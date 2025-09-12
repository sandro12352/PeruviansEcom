import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { NosotrosPageComponent } from './pages/nosotros-page/nosotros-page.component';
import { PreguntasFrecuentesPageComponent } from './pages/preguntas-frecuentes-page/preguntas-frecuentes-page.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { LibroReclamacionesComponent } from './pages/libro-reclamaciones/libro-reclamaciones.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { NuestrasTiendasComponent } from './pages/nuestras-tiendas/nuestras-tiendas.component';


const routes: Routes = [
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      { path: '', component: InicioPageComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'mis-pedidos', component: PedidosComponent },  
      { path: 'contactanos', component: ContactanosComponent },
      { path: 'blog', component: BlogPageComponent },
      { path: 'nosotros', component: NosotrosPageComponent },
      { path: 'preguntas-frecuentes', component: PreguntasFrecuentesPageComponent },
      { path: 'nuestras-tiendas', component: NuestrasTiendasComponent},
      { path: 'mas-vendidos', component: MostrarProductoComponent },
      { path: 'ofertas', component: MostrarProductoComponent },
      { path: 'mas-nuevos', component: MostrarProductoComponent },
      { path: 'productos', component: MostrarProductoComponent },
      { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
      { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
      { path: 'libro-reclamaciones', component: LibroReclamacionesComponent },            
      { path: ':categorias/:nombreProducto', component: DetalleProductoPageComponent },      
      { path: ':categorias', component: MostrarProductoComponent },
      ]
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
