import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';


const routes: Routes = [
  {
    path: '',
    component: InicioPageComponent
  },
  {
    path: 'mas-vendidos',
    component: MostrarProductoComponent
  },
  {
    path: 'mas-nuevos',
    component: MostrarProductoComponent
  },
  {
    path: ':categorias',
    component: MostrarProductoComponent
  },
  {
    path: ':categorias/:nombreProducto',
    component: DetalleProductoPageComponent
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
