import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeruviansEcomModule } from './peruvians-ecom/peruvians-ecom.module';
import { provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PeruviansEcomModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
