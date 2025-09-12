import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../peruvians-ecom/services/auth.service';
import { 
  RequestPasswordResetRequest, 
  RequestPasswordResetResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse
} from "../../../peruvians-ecom/interfaces/cliente";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  // Estados del formulario
  currentStep: 'email' | 'code' | 'password' = 'email';
  
  // Datos del formulario
  email = '';
  code = '';
  password = '';
  confirmPassword = '';
  
  // Estados de carga y mensajes
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  // Para el temporizador de expiración
  expiresInMinutes = 0;
  timeRemaining = '';
  private timerInterval: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Paso 1: Solicitar código
  onRequestCode(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const requestData: RequestPasswordResetRequest = {
        email: this.email
      };

      this.authService.requestPasswordReset(requestData).subscribe({
        next: (response: RequestPasswordResetResponse) => {
          if (response.success) {
            this.successMessage = response.message;
            this.expiresInMinutes = response.expires_in_minutes || 15;
            this.currentStep = 'code';
            this.startTimer();
          } else {
            this.errorMessage = response.message || 'Error al enviar el código';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al solicitar código:', error);
          this.errorMessage = error.error?.message || 'Error al enviar el código de verificación';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Por favor ingresa un correo válido.';
    }
  }

  // Paso 2: Verificar código
  onVerifyCode(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const verifyData: VerifyResetCodeRequest = {
        email: this.email,
        code: this.code
      };

      this.authService.verifyResetCode(verifyData).subscribe({
        next: (response: VerifyResetCodeResponse) => {
          if (response.success) {
            this.successMessage = response.message;
            this.currentStep = 'password';
            if (this.timerInterval) {
              clearInterval(this.timerInterval);
            }
          } else {
            this.errorMessage = response.message || 'Código inválido o expirado';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al verificar código:', error);
          this.errorMessage = error.error?.message || 'Código inválido o expirado';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Por favor ingresa el código de 6 dígitos.';
    }
  }

  // Paso 3: Cambiar contraseña
  onResetPassword(form: NgForm): void {
    if (form.valid && this.password === this.confirmPassword) {
      this.isLoading = true;
      this.errorMessage = '';

      const resetData: ResetPasswordRequest = {
        email: this.email,
        code: this.code,
        password: this.password,
        password_confirmation: this.confirmPassword
      };

      this.authService.resetPassword(resetData).subscribe({
        next: (response: ResetPasswordResponse) => {
          if (response.success) {
            this.successMessage = response.message;
            // Redirigir al login después de 3 segundos
            setTimeout(() => {
              this.router.navigate(['/auth']);
            }, 3000);
          } else {
            this.errorMessage = response.message || 'Error al cambiar la contraseña';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cambiar contraseña:', error);
          this.errorMessage = error.error?.message || 'Error al cambiar la contraseña';
          this.isLoading = false;
        }
      });
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
    } else {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
    }
  }

  // Validar contraseña
  isPasswordValid(): boolean {
    return this.password.length >= 8 && 
           /[a-zA-Z]/.test(this.password) && 
           /[0-9]/.test(this.password);
  }

  // Reiniciar proceso
  restartProcess(): void {
    this.currentStep = 'email';
    this.code = '';
    this.password = '';
    this.confirmPassword = '';
    this.errorMessage = '';
    this.successMessage = '';
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Volver al paso anterior
  goBack(): void {
    if (this.currentStep === 'code') {
      this.currentStep = 'email';
      this.code = '';
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
    } else if (this.currentStep === 'password') {
      this.currentStep = 'code';
      this.password = '';
      this.confirmPassword = '';
    }
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Temporizador para mostrar tiempo restante
  private startTimer(): void {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + this.expiresInMinutes);

    this.timerInterval = setInterval(() => {
      const now = new Date();
      const timeDiff = expirationTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        this.timeRemaining = 'El código ha expirado';
        clearInterval(this.timerInterval);
        return;
      }

      const minutes = Math.floor(timeDiff / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      this.timeRemaining = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }
}