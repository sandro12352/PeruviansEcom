import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamacionesService } from '../../services/reclamaciones.service';
import { Reclamacion, ConsultaReclamacionResponse } from '../../interfaces/reclamacion';

@Component({
  selector: 'app-libro-reclamaciones',
  templateUrl: './libro-reclamaciones.component.html',
  styleUrl: './libro-reclamaciones.component.css'
})
export class LibroReclamacionesComponent {
  // Formulario principal
  reclamacionForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitError = '';
  numeroReclamoGenerado = '';

  // Funcionalidad de pestañas
  activeTab: 'crear' | 'consultar' = 'crear';

  // Formulario de consulta
  consultaForm: FormGroup;
  isConsultando = false;
  consultaError: string | null = null;
  consultaResultado: ConsultaReclamacionResponse | null = null;

  tiposDocumento = [
    { value: 'dni', label: 'DNI' },
    { value: 'ce', label: 'Carnet de Extranjería' },
    { value: 'pasaporte', label: 'Pasaporte' }
  ];

  tiposReclamo = [
    { value: 'reclamo', label: 'Reclamo' },
    { value: 'queja', label: 'Queja' },
  ];

  tiposBien = [
    { value: 'producto', label: 'Producto' },
    { value: 'servicio', label: 'Servicio' }
  ];

  constructor(
    private fb: FormBuilder,   
    private reclamacionesService: ReclamacionesService
  ) {
    // Inicializar formulario principal
    this.reclamacionForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern(/^\d{8,12}$/)]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      // Identificación del bien contratado
      tipoBien: ['', Validators.required],
      descripcionBien: ['', [Validators.required, Validators.minLength(5)]],
      montoReclamado: [''],
      fechaIncidente: ['', Validators.required],
      // Datos del reclamo
      tipoReclamo: ['', Validators.required],
      detalleReclamo: ['', [Validators.required, Validators.minLength(10)]],
      pedidoConcreto: ['', [Validators.required, Validators.minLength(10)]],
    });

    // Inicializar formulario de consulta
    this.consultaForm = this.fb.group({
      numeroReclamo: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Método para cambiar de pestaña
  setActiveTab(tab: 'crear' | 'consultar') {
    this.activeTab = tab;
    this.clearMessages();
    if (tab === 'consultar') {
      this.consultaError = null;
      this.consultaResultado = null;
    }
  }

  // Enviar reclamación
  onSubmit() {
    if (this.reclamacionForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = '';
      this.submitError = '';
      this.numeroReclamoGenerado = '';

      // Preparar datos para enviar
      const formData = this.reclamacionForm.value;
      const reclamacionData: Reclamacion = {
        tipo_documento: formData.tipoDocumento,
        numero_documento: formData.numeroDocumento,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        telefono: formData.telefono,
        email: formData.email,
        direccion: formData.direccion,
        tipo_bien: formData.tipoBien,
        descripcion_bien: formData.descripcionBien,
        monto_reclamado: formData.montoReclamado || null,
        fecha_incidente: formData.fechaIncidente,
        tipo_reclamo: formData.tipoReclamo,
        detalle_reclamo: formData.detalleReclamo,
        pedido_concreto: formData.pedidoConcreto
      };

      // Enviar a la API
      this.reclamacionesService.crearReclamacion(reclamacionData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response) {
            this.submitMessage = 'Reclamación enviada exitosamente';
            this.numeroReclamoGenerado = response.numero_reclamo;
            this.reclamacionForm.reset();
            
            // Scroll hacia arriba para mostrar el mensaje
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            this.submitError = 'Error al procesar la reclamación';
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error al enviar reclamación:', error);
          
          // Manejar errores específicos
          if (error.error && error.error.errors) {
            const firstErrorKey = Object.keys(error.error.errors)[0];
            const firstErrorMessage = error.error.errors[firstErrorKey][0];
            this.submitError = firstErrorMessage;
          } else if (error.error && error.error.message) {
            this.submitError = error.error.message;
          } else {
            this.submitError = 'Error interno del servidor. Por favor, inténtelo nuevamente.';
          }
          
          // Scroll hacia arriba para mostrar el error
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    } else {
      console.log('Formulario inválido');
      this.markFormGroupTouched();
    }
  }

  // Consultar estado de reclamación
  onConsultar() {
    if (this.consultaForm.valid && !this.isConsultando) {
      this.isConsultando = true;
      this.consultaError = null;
      this.consultaResultado = null;

      const numeroReclamo = this.consultaForm.get('numeroReclamo')?.value;

      this.reclamacionesService.consultarReclamacion(numeroReclamo).subscribe({
        next: (response) => {
          this.isConsultando = false;
          if (response) {
            this.consultaResultado = response;
          } else {
            this.consultaError = 'No se pudo obtener la información del reclamo';
          }
        },
        error: (error) => {
          this.isConsultando = false;
          console.error('Error al consultar reclamación:', error);
          
          if (error.status === 404) {
            this.consultaError = 'No se encontró ninguna reclamación con ese número';
          } else if (error.error && error.error.message) {
            this.consultaError = error.error.message;
          } else {
            this.consultaError = 'Error interno del servidor. Por favor, inténtelo nuevamente.';
          }
        }
      });
    } else {
      this.markConsultaFormGroupTouched();
    }
  }

  // Método para limpiar mensajes
  clearMessages() {
    this.submitMessage = '';
    this.submitError = '';
    this.numeroReclamoGenerado = '';
  }

  // Validaciones para formulario principal
  private markFormGroupTouched() {
    Object.keys(this.reclamacionForm.controls).forEach(key => {
      const control = this.reclamacionForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.reclamacionForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.reclamacionForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return 'Este campo es obligatorio';
      if (field.errors['email']) return 'Formato de email inválido';
      if (field.errors['pattern']) {
        if (fieldName === 'numeroDocumento') return 'Documento debe tener entre 8 y 12 dígitos';
        if (fieldName === 'telefono') return 'Teléfono debe tener 9 dígitos';
        if (fieldName === 'montoReclamado') return 'Ingrese un monto válido';
      }
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  // Validaciones para formulario de consulta
  private markConsultaFormGroupTouched() {
    Object.keys(this.consultaForm.controls).forEach(key => {
      const control = this.consultaForm.get(key);
      control?.markAsTouched();
    });
  }

  isConsultaFieldInvalid(fieldName: string): boolean {
    const field = this.consultaForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getConsultaFieldError(fieldName: string): string {
    const field = this.consultaForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return 'El número de reclamo es obligatorio';
      if (field.errors['minlength']) return 'Ingrese un número de reclamo válido';
    }
    return '';
  }
}