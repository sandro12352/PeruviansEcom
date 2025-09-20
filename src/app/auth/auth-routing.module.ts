// src/app/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CompleteGoogleProfileComponent } from './pages/complete-google-profile/complete-google-profile.component';
import { GoogleCallbackComponent } from './pages/google-callback/google-callback.component';
import { GoogleProfileGuard } from '../peruvians-ecom/guards/google-profile.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { 
    path: 'recuperar-password', 
    component: ForgotPasswordComponent 
  },
  {
    path: 'google/callback',
    component: GoogleCallbackComponent
  },
  {
    path: 'completar-perfil-google',
    component: CompleteGoogleProfileComponent,
    canActivate: [GoogleProfileGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }