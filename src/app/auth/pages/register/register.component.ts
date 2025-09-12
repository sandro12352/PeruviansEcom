// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../peruvians-ecom/services/auth.service';
import { RegisterRequest } from '../../../peruvians-ecom/interfaces/cliente';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      dni: ['', [
        Validators.required, 
        Validators.pattern(/^\d{8}$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/) // Al menos una letra y un número
      ]],
      telefono: ['', [Validators.maxLength(100)]],
      direccion: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const registerData: RegisterRequest = {
        ...this.registerForm.value
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          if (response.success) {
            // Guardar token si es necesario
            if (response.data?.token) {
              localStorage.setItem('token', response.data.token);
            }
            
            // Redirigir al dashboard o página principal
            this.router.navigate(['/']);
          } else {
            this.errorMessage = response.message;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error en registro:', error);
          
          if (error.status === 409 && error.error?.suggestion === 'forgot_password') {
            this.errorMessage = error.error.message;
          } else if (error.status === 422 && error.error?.errors) {
            // Mostrar errores de validación específicos
            const errors = error.error.errors;
            const firstError = Object.values(errors)[0];
            this.errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            this.errorMessage = error.error?.message || 'Error al registrar usuario';
          }
          
          this.isLoading = false;
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}