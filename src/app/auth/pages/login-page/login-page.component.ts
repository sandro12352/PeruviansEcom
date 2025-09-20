import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../peruvians-ecom/services/auth.service';
import { LoginRequest, LoginResponse } from "../../../peruvians-ecom/interfaces/cliente";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email = '';
  password = '';
  remember = false;
  isLoading = false;
  isGoogleLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData: LoginRequest = {
        email: this.email,
        password: this.password
      };

      this.authService.login(loginData).subscribe({
        next: (response: LoginResponse) => {
          if (response.success && response.data) {
            // Guardar expiración del token
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + response.data.expires_in_minutes);
            localStorage.setItem('token_expiration', expiresAt.toISOString());

            // Redirigir después de un pequeño delay
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 100);
            
          } else {
            // Verificar si es usuario de Google
            if (response.is_google_user) {
              this.errorMessage = 'Esta cuenta fue creada con Google. Por favor, usa "Continuar con Google" para iniciar sesión.';
            } else {
              this.errorMessage = response.message || 'Error al iniciar sesión';
            }
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error en login:', error);
          
          // Verificar si el error indica que es usuario de Google
          if (error.error?.is_google_user) {
            this.errorMessage = 'Esta cuenta fue creada con Google. Por favor, usa "Continuar con Google" para iniciar sesión.';
          } else if (error.error?.suggestion === 'use_google_login') {
            this.errorMessage = error.error.message || 'Esta cuenta requiere autenticación con Google.';
          } else {
            this.errorMessage = error.error?.message || 'Credenciales incorrectas';
          }
          
          this.isLoading = false;
        }
      });

    } else {
      this.errorMessage = 'Por favor completa todos los campos requeridos.';
    }
  }

  /**
   * Inicia el proceso de autenticación con Google
   */
  onGoogleLogin(): void {
    this.isGoogleLoading = true;
    this.errorMessage = '';
    
    try {
      this.authService.loginWithGoogle();
      // El loading se desactiva cuando se cierra el popup
      setTimeout(() => {
        this.isGoogleLoading = false;
      }, 1000);
    } catch (error) {
      console.error('Error iniciando Google OAuth:', error);
      this.errorMessage = 'Error al conectar con Google. Intenta nuevamente.';
      this.isGoogleLoading = false;
    }
  }
}