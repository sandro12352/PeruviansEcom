import { Component } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pagar-page',
  templateUrl: './pagar-page.component.html',
  styleUrl: './pagar-page.component.css'
})
export class PagarPageComponent {
  direccionCliente = 'Av. Los Olivos 123, Lima, Perú';
  correoCliente = 'pschascobba12352@gmail.com';
  selectedPayment: 'card' | 'yape' | 'plin' | null = null;

  selectPayment(medio: 'card' | 'yape' | 'plin') {
    this.selectedPayment = medio;
  }
  mediosPago = [
    { nombre: 'Tarjeta', img: '' },
    { nombre: 'Yape', img: '' },
    { nombre: 'Plin', img: '' }
  ];

  productos = [
    { nombre: 'Producto 1', precio: 50, cantidad: 1 },
    { nombre: 'Producto 2', precio: 30, cantidad: 2 }
  ];

  get subtotal() {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }

  get descuento() {
    return 5;
  }

  get total() {
    return this.subtotal - this.descuento;
  }

  aumentarCantidad(prod: any) {
    prod.cantidad++;
  }

  disminuirCantidad(prod: any) {
    if (prod.cantidad > 1) {
      prod.cantidad--;
    }
  }

  modificarDireccion() {
    Swal.fire({
      title: 'Modificar dirección',
      input: 'text',
      inputValue: this.direccionCliente,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.direccionCliente = result.value;
        Swal.fire('Dirección actualizada', '', 'success');
      }
    });
  }

  pagar() {
    Swal.fire({
      title: '¿Confirmar pago?',
      text: `Total a pagar: S/ ${this.total}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, pagar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire({
      title: 'Procesando',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Paso 2: Simular un retraso de 2 segundos y luego mostrar mensaje de éxito
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago realizado con éxito!',
        text: 'Gracias por su compra.',
        confirmButtonText: 'Aceptar'
      });
    }, 2000);
      }
    });
  }
} 
