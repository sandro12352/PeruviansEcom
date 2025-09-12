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
            console.log('Login exitoso:', response.data.cliente.nombre);
            
            // Guardar expiración del token
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + response.data.expires_in_minutes);
            localStorage.setItem('token_expiration', expiresAt.toISOString());

            // El AuthService ya se encarga de actualizar el estado
            // Redirigir después de un pequeño delay para permitir que se actualice el header
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 100);
            
          } else {
            this.errorMessage = response.message || 'Error al iniciar sesión';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.errorMessage = error.error?.message || 'Credenciales incorrectas';
          this.isLoading = false;
        }
      });

    } else {
      this.errorMessage = 'Por favor completa todos los campos requeridos.';
    }
  }
}