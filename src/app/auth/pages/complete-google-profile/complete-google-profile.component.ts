// src/app/auth/pages/complete-google-profile/complete-google-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../peruvians-ecom/services/auth.service';
import { CompletarDatosGoogleRequest } from '../../../peruvians-ecom/interfaces/cliente';

@Component({
  selector: 'app-complete-google-profile',
  templateUrl: './complete-google-profile.component.html',
  styleUrls: ['./complete-google-profile.component.css']
})
export class CompleteGoogleProfileComponent implements OnInit {
  dni = '';
  telefono = '';
  direccion = '';
  nombre = '';
  
  isLoading = false;
  errorMessage = '';
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Verificar que el usuario esté autenticado y sea de Google
    if (!this.authService.isAuthenticated() || !this.currentUser) {
      this.router.navigate(['/auth']);
      return;
    }

    // Pre-llenar el nombre si está disponible
    if (this.currentUser.nombre && this.currentUser.nombre !== '') {
      this.nombre = this.currentUser.nombre;
    }

    // Verificar si ya completó los datos
    if (!this.currentUser.necesita_completar_datos) {
      this.router.navigate(['/']);
      return;
    }
  }

  onSubmit(): void {
    this.errorMessage = '';

    // Validación básica
    if (!this.dni || this.dni.length !== 8) {
      this.errorMessage = 'El DNI debe tener exactamente 8 dígitos';
      return;
    }

    if (!this.nombre.trim()) {
      this.errorMessage = 'El nombre es requerido';
      return;
    }

    this.isLoading = true;

    const datosCompletos: CompletarDatosGoogleRequest = {
      dni: this.dni,
      telefono: this.telefono || undefined,
      direccion: this.direccion || undefined,
      nombre: this.nombre.trim()
    };

    this.authService.completarDatosGoogle(datosCompletos).subscribe({
      next: (response) => {
        if (response.success) {
          // Éxito - redirigir al home
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        } else {
          this.errorMessage = response.message || 'Error al completar datos';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error completando datos:', error);
        
        if (error.error?.errors) {
          // Mostrar errores de validación específicos
          const errors = error.error.errors;
          if (errors.dni) {
            this.errorMessage = errors.dni[0];
          } else if (errors.nombre) {
            this.errorMessage = errors.nombre[0];
          } else {
            this.errorMessage = 'Error en los datos proporcionados';
          }
        } else {
          this.errorMessage = error.error?.message || 'Error interno del servidor';
        }
        
        this.isLoading = false;
      }
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth']);
      },
      error: () => {
        // Limpiar datos locales aunque falle la petición
        this.authService.clearAuthData();
        this.router.navigate(['/auth']);
      }
    });
  }

  // Validar que solo se ingresen números en DNI
  onDniInput(event: any): void {
    const value = event.target.value;
    // Eliminar cualquier carácter que no sea número
    event.target.value = value.replace(/[^0-9]/g, '');
    this.dni = event.target.value;
  }

  // Validar que el teléfono solo tenga números
  onTelefonoInput(event: any): void {
    const value = event.target.value;
    // Permitir solo números y limitar a 9 dígitos
    event.target.value = value.replace(/[^0-9]/g, '').slice(0, 9);
    this.telefono = event.target.value;
  }
}