import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {
      contactForm: FormGroup;

    constructor(private fb: FormBuilder) {
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
        return;
      }

    console.log(this.contactForm.value);
  }


    campoInvalido(campo: string): boolean {
      const control = this.contactForm.get(campo);
      return !!(control && control.invalid && control.touched);
    }

  
}
