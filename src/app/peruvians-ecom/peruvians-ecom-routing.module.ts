import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';


const routes:Routes = [
  {
    path:'',
    children: [
      {path: '', component:InicioPageComponent},
      {path:':categorias', component:MostrarProductoComponent},
      {path: '',redirectTo: '', pathMatch: 'full'},
    ]
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
