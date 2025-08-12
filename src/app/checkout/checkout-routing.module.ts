import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { PagarPageComponent } from './pages/pagar-page/pagar-page.component';

  const routes: Routes = [
      {
        path:'',
        component:CheckoutPageComponent,
        children:[
          { path:'carrito',component:CarritoPageComponent},
          {path:'pagar',component:PagarPageComponent}
        ]
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
