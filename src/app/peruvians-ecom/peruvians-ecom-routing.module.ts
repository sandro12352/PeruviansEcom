import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';


const routes:Routes = [
  {
    path:':categorias',
    component:MostrarProductoComponent,
  },
  {
    path:'**',
    redirectTo:'/',
    pathMatch:'full'
  }
];

@NgModule({
 exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PeruviansEcomRoutingModule { }
