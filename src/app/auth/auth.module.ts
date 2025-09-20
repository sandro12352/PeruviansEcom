// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthInterceptor } from '../peruvians-ecom/interceptors/auth.interceptor';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CompleteGoogleProfileComponent } from './pages/complete-google-profile/complete-google-profile.component';
import { GoogleCallbackComponent } from './pages/google-callback/google-callback.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CompleteGoogleProfileComponent,
    GoogleCallbackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AuthModule { }