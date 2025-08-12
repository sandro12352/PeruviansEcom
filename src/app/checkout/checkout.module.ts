import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { PagarPageComponent } from './pages/pagar-page/pagar-page.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CheckoutPageComponent,
    CarritoPageComponent,
    PagarPageComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule
]
})
export class CheckoutModule { }
