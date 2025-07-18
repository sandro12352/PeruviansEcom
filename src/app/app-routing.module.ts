import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPageComponent } from './peruvians-ecom/pages/inicio-page/inicio-page.component';
import { ContactanosComponent } from './peruvians-ecom/pages/contactanos/contactanos.component';

const routes: Routes = [
  {
    path: '',
    component:InicioPageComponent,
  },
  {
    path:'contactanos',
    component:ContactanosComponent
  },
 
  {
    path:'productos',
    loadChildren: () => import('./peruvians-ecom/peruvians-ecom.module').then(m => m.PeruviansEcomModule)
  }, 
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
