import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPageComponent } from './peruvians-ecom/pages/inicio-page/inicio-page.component';

const routes: Routes = [
  {
    path:'checkout',
    loadChildren:()=>import('../app/checkout/checkout.module').then(m=>m.CheckoutModule),
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: '',
    component:InicioPageComponent
  },
  {
    path:'',
    loadChildren:()=>import('./peruvians-ecom/peruvians-ecom.module').then(m=>m.PeruviansEcomModule)
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
