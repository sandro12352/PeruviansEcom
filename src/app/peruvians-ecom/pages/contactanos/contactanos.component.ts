// src/app/peruvians-ecom/components/contactanos/contactanos.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, ContactRequest, ContactResponse } from '../../services/contact.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {
  contactForm: FormGroup;
  
  // Estados de carga y mensajes - igual que en forgot-password
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    mensaje: ['', Validators.required]
      });
    }
  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const contactData: ContactRequest = this.contactForm.value;

    this.contactService.sendContact(contactData).subscribe({
      next: (response: ContactResponse) => {
        if (response.success) {
          this.successMessage = response.message;
          this.contactForm.reset(); // Limpiar el formulario
          
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        } else {
          this.errorMessage = response.message || 'Error al enviar el mensaje';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al enviar contacto:', error);
        
        if (error.status === 422 && error.error?.errors) {
          // Mostrar el primer error de validación
          const firstError = Object.values(error.error.errors)[0] as string[];
          this.errorMessage = firstError[0];
        } else {
          this.errorMessage = error.error?.message || 'Error de conexión. Intenta nuevamente.';
        }
        
        this.isLoading = false;
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.contactForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  // Método para cerrar mensajes manualmente - igual que en forgot-password
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}