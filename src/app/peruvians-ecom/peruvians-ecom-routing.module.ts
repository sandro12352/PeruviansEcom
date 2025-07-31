import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LayoutSimpleComponent } from './pages/layout-simple/layout-simple.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { NosotrosPageComponent } from './pages/nosotros-page/nosotros-page.component';
import { PreguntasFrecuentesPageComponent } from './pages/preguntas-frecuentes-page/preguntas-frecuentes-page.component';
import { PagarPageComponent } from './pages/pagar-page/pagar-page.component';


const routes: Routes = [
  {
    path:'checkout',
    component:
    LayoutSimpleComponent,
    children:[
       { path:'carrito',component:CarritoComponent},
       {path:'pagar',component:PagarPageComponent}
    ]
  },
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      { path: '', component: InicioPageComponent },
      { path: 'contactanos', component: ContactanosComponent },
      { path: 'blog', component: BlogPageComponent },
      { path: 'nosotros', component: NosotrosPageComponent },
      { path: 'preguntas-frecuentes', component: PreguntasFrecuentesPageComponent },
      { path: 'mas-vendidos', component: MostrarProductoComponent },
      { path: 'mas-nuevos', component: MostrarProductoComponent },
      { path: 'productos', component: MostrarProductoComponent },
      
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
