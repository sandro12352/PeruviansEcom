import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { PagarPageComponent } from './pages/pagar-page/pagar-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CheckoutPageComponent,
    CarritoPageComponent,
    PagarPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule, // ← Agregar esta línea
    ReactiveFormsModule,
    CheckoutRoutingModule,
    FormsModule
  ]
})
export class CheckoutModule { }