import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  cliente: Cliente | null = null;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      telefono: ['', [Validators.maxLength(100)]],
      direccion: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Verificar si hay token válido antes de hacer la petición
    if (!this.authService.isAuthenticated()) {
      this.showMessage('Debes iniciar sesión para ver tu perfil', 'error');
      this.loading = false;
      return;
    }

    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.cliente = response.data.cliente;
          this.fillForm();
        } else {
          this.showMessage('No se pudo cargar la información del perfil', 'error');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando perfil:', error);
        if (error.status === 401) {
          this.showMessage('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'error');
          // Limpiar datos de autenticación
          this.authService.clearAuthData();
        } else {
          this.showMessage('Error al cargar el perfil. Intenta nuevamente.', 'error');
        }
        this.loading = false;
      }
    });
  }

  fillForm(): void {
    if (this.cliente) {
      this.perfilForm.patchValue({
        nombre: this.cliente.nombre || '',
        telefono: this.cliente.telefono || '',
        direccion: this.cliente.direccion || ''
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.fillForm(); // Restaurar valores originales al cancelar
      this.message = '';
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.loading = true;
      const formData = this.perfilForm.value;

      this.authService.updateProfile(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.cliente = response.data?.cliente || this.cliente;
            this.showMessage('Perfil actualizado exitosamente', 'success');
            this.isEditing = false;
          } else {
            this.showMessage(response.message || 'Error al actualizar perfil', 'error');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error actualizando perfil:', error);
          this.showMessage('Error al actualizar el perfil', 'error');
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.perfilForm.controls).forEach(key => {
      const control = this.perfilForm.get(key);
      control?.markAsTouched();
    });
  }

  private showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  get telefono() { return this.perfilForm.get('telefono'); }
  get direccion() { return this.perfilForm.get('direccion'); }
}