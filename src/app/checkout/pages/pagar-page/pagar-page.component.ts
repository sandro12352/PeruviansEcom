import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil, takeWhile, tap } from 'rxjs';
import { CarritoService } from '../../../peruvians-ecom/services/carrito.service';
import { CompraService, DatosTarjeta } from '../../../peruvians-ecom/services/compra.service';
import { AuthService } from '../../../peruvians-ecom/services/auth.service';
import { Cliente } from '../../../peruvians-ecom/interfaces/cliente';
import { Producto } from '../../../peruvians-ecom/interfaces/producto';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UbigeoService } from '../../services/ubigeo.service';
import { Departamento, Distrito, Provincia, Ubigeo } from '../../interfaces/ubigeo.interface';

@Component({
  selector: 'app-pagar-page',
  templateUrl: './pagar-page.component.html',
  styleUrl: './pagar-page.component.css'
})
export class PagarPageComponent implements OnInit, OnDestroy {
  direccionCliente = 'Ingrese su dirección de envío';
  selectedPayment = 'card';
  procesandoPago = false;
  isAuthenticated = false;
   loadingYape = false;
  currentUser: Cliente | null = null;


  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];


  selectedDepartamento: Departamento  | null = null;
  selectedProvincia: Provincia | null = null;
  selectedDistrito: Distrito | null = null;
  direccionExacta: string = '';
    
  productos: Producto[] = [];
  private subscriptions = new Subscription();

  clienteForm!: FormGroup;

  // Datos de tarjeta - valores por defecto de Culqi para testing
  tarjeta: DatosTarjeta = {
    card_number: '',
    cvv: '',
    expiration_month: '',
    expiration_year: ''
  };

  constructor(
     private fb: FormBuilder,
    private carritoService: CarritoService,
    private compraService: CompraService,
    private authService: AuthService,
    private ubigeoService:UbigeoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const entrega = this.carritoService.getEntrega();

    this.ubigeoService.getUbigeo(entrega).subscribe(res=>{
        this.departamentos = res;
    })

    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3),this.nombreCompletoValidator]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/),Validators.minLength(9), Validators.maxLength(9)]],
    });


    this.productos = this.carritoService.getProductos();
    if (this.productos.length === 0) {
      this.router.navigate(['/checkout/carrito']);
    }

    // Suscribirse al estado de autenticación
    const authSubscription = this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.loadUserData();
      } else {
        this.clearClientData();
      }
    });
    this.subscriptions.add(authSubscription);

    // Suscribirse al usuario actual
    const userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.fillClientData(user);
      }
    });
    this.subscriptions.add(userSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  nombreCompletoValidator(control: FormControl): ValidationErrors | null {
    const valor = control.value?.trim();
    if (!valor) return null;

    // Dividir por espacios y eliminar vacíos
    const palabras = valor.split(' ').filter((p:any) => p.length > 0);

    // Si hay menos de 2 palabras → inválido
    return palabras.length < 2 ? { nombreIncompleto: true } : null;
  }

  

    onDepartamentoChange() {
    this.provincias = this.selectedDepartamento ? this.selectedDepartamento.provincias : [];
    this.selectedProvincia = null;
    this.distritos = [];
    this.selectedDistrito = null;
  }

  onProvinciaChange() {
    this.distritos = this.selectedProvincia ? this.selectedProvincia.distritos : [];
    this.selectedDistrito = null;
  }




  

  /**
   * Carga los datos del usuario autenticado
   */
  private loadUserData(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.fillClientData(user);
    }
  }

  /**
   * Llena los campos del formulario con los datos del usuario logueado
   */
  private fillClientData(user: Cliente): void {
    this.clienteForm.patchValue({
      nombre: user.nombre || '',
      dni: user.dni || '',
      email: user.email || '',
      telefono: user.telefono || '',
      direccion: user.direccion || ''
    });

    if (user.direccion) {
      this.direccionCliente = user.direccion;
    }

    // Si quieres bloquear los campos cuando está autenticado:
    this.clienteForm.disable();
  }

  /**
   * Limpia los datos del cliente cuando no está autenticado
   */
  private clearClientData(): void {
    this.clienteForm.reset();
  }

  get subtotal(): number {
    return this.carritoService.calcularSubtotal();
  }

  get descuento(): number {
    return this.carritoService.calcularDescuento();
  }

  get total(): number {
    return this.carritoService.calcularTotal();
  }

  cantidadProductos(){
    return this.productos.reduce((sum, producto) => sum + (producto.cantidad || 1), 0);
  }

  calcularTotalProductos(){
    return this.productos.reduce((total, producto) => total + ((producto.precio_despues || producto.precio) * (producto.cantidad || 1)), 0);
  }


  selectPayment(medio: string): void {
    this.selectedPayment = medio;
  }

  modificarDireccion(): void {
    Swal.fire({
      title: 'Modificar dirección',
      input: 'textarea',
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
    if (this.procesandoPago) return;

    // Validación básica
    if (!this.compraService.validarCliente(this.clienteForm.value)) {
      Swal.fire('Error', 'Complete todos los datos del cliente', 'error');
      return;
    }

     // Validar dirección
  if (
    !this.selectedDepartamento ||
    !this.selectedProvincia ||
    !this.selectedDistrito ||
    !this.direccionExacta ||
    this.direccionExacta.trim() === ''
  ) {
    Swal.fire('Error', 'Debe completar todos los datos de la dirección de entrega', 'error');
    return;
  }


    // Solo validar tarjeta si está seleccionado el pago con tarjeta
    if (this.selectedPayment === 'card') {
      if (!this.compraService.validarTarjeta(this.tarjeta)) {
        Swal.fire('Error', 'Complete los datos de la tarjeta', 'error');
        return;
      }
      // Confirmar compra
        Swal.fire({
            title: '¿Confirmar compra?',
            text: `Total a pagar: S/ ${this.total.toFixed(2)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, pagar',
            cancelButtonText: 'Cancelar'
          }).then((result)=>{
            if(result.isConfirmed){
              this.procesandoPago = true;
              
              this.procesarPagoTarjeta()
            }
            this.procesandoPago = false;

          })


      
    }

    if (this.selectedPayment === 'yape') {
    
      this.procesarPagoYape();
    } 
  }

  
  private procesarPagoTarjeta() {
    this.procesandoPago = true;

    Swal.fire({
      title: 'Procesando pago...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const datosCompra = {
      cliente: this.clienteForm.value,
      departamento:this.selectedDepartamento?.nombre!,
      provincia:this.selectedProvincia?.nombre!,
      distrito:this.selectedDistrito?.nombre!,
      direccion_envio: this.direccionCliente,
      metodo_pago: 'tarjeta' as const ,
      productos: this.productos.map(p => ({
        producto_id: p.id,
        cantidad: p.cantidad || 1
      })),
      tarjeta: this.tarjeta,
    };

    this.compraService.procesarCompra(datosCompra).subscribe({
      next: (data) => {
        console.log(data)
        this.carritoService.limpiarCarrito();
        Swal.fire({
          icon: 'success',
          title: data.message,
          text: `Recibiras tu constacia de compra en:${data.data.cliente.email}`,
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el pago',
          text: error.error?.message || error.message || 'No se pudo procesar el pago',
          confirmButtonText: 'Reintentar'
        });
      },
      complete: () => {
        this.procesandoPago = false;
      }
    });
  }

  private procesarPagoYape(){

     const datosCompra = {
      cliente: this.clienteForm.value,
      direccion_envio: this.direccionExacta,
      departamento:this.selectedDepartamento!.nombre,
      provincia:this.selectedProvincia!.nombre,
      distrito:this.selectedDistrito!.nombre,
      metodo_pago: 'yape' as const,
      productos: this.productos.map(p => ({
        producto_id: p.id,
        cantidad: p.cantidad || 1
      })),
    };

     Swal.fire({
    title: 'Generando QR...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();

      
this.compraService.procesarCompra(datosCompra).subscribe({
  next: (data) => {
    Swal.close();
    const qr = data.data.yape.qr_url;
    
    Swal.fire({
      title: '<h2 style="color: #1f2937; margin-bottom: 10px;">Escanea este QR con Yape</h2>',
      html: `
        <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; margin-bottom: 20px;">
          <img src="${qr}" alt="QR de pago" width="220" height="220" style="border-radius: 10px; background: white; padding: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
        </div>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10b981;">
          <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Por favor ingresar el monto exacto:</p>
          <span style="font-size: 32px; font-weight: 700; color: #10b981;">S/ ${this.total.toFixed(2)}</span>
        </div>
        
        <div style="background: #fef3c7; padding: 12px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>⏱️ Tiempo de espera:</strong> Una vez realizado el pago puede tardar <strong>1 minuto</strong> en confirmar su compra. Espere por favor.
          </p>
        </div>
        
        <div style="background: #dbeafe; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <p style="margin: 0; color: #1e40af; font-size: 13px;">
            <strong>ℹ️ Consejo:</strong> Asegúrese de tener Yape actualizado e ingrese el monto exacto para evitar rechazos.
          </p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Cerrar',
      showDenyButton: true,
      denyButtonText: '✓ Ya realicé el pago',
      confirmButtonColor: '#6b7280',
      denyButtonColor: '#10b981',
      allowOutsideClick: false,
      allowEscapeKey: true,
      buttonsStyling: true,
      didOpen: (modal) => {
        // Estilos adicionales para los botones
        const confirmBtn = modal.querySelector('.swal2-confirm') as HTMLElement;
        const denyBtn = modal.querySelector('.swal2-deny') as HTMLElement;
        
        if (confirmBtn) {
          confirmBtn.style.borderRadius = '8px';
          confirmBtn.style.padding = '10px 30px';
          confirmBtn.style.fontSize = '14px';
          confirmBtn.style.fontWeight = '600';
        }
        
        if (denyBtn) {
          denyBtn.style.borderRadius = '8px';
          denyBtn.style.padding = '10px 30px';
          denyBtn.style.fontSize = '14px';
          denyBtn.style.fontWeight = '600';
        }
      }
    }).then((result) => {      

      if (result.isDenied) {
        this.mostrarProcesando(data.data.yape.order_id);
        
      } else if (result.isConfirmed) {
        // Usuario presionó "Cerrar"
        console.log('Modal cerrado');
      }
    });
  },
  error: (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Error en la compra',
      text: 'Ocurrió un problema al procesar tu compra. Por favor, intenta de nuevo.',
      confirmButtonColor: '#ef4444'
    });
  }
});
    }
  });
  }
  

  onExpiryDateChange(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // quitar todo lo que no sea número
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    event.target.value = value;

    // Guardarlo en tu objeto tarjeta
    const parts = value.split('/');
    this.tarjeta.expiration_month = parts[0] || '';
    this.tarjeta.expiration_year = parts[1] ? '20' + parts[1] : '';
  }
  onCardNumberChange(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // solo dígitos
    value = value.substring(0, 16); // máximo 16 dígitos

    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    event.target.value = formattedValue;


    this.tarjeta.card_number = value;
  }

  

    private mostrarProcesando(orden_id: number): void {
        Swal.fire({
        title: 'Procesando pago...',
        html: `
          <div style="padding: 20px;">
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
              <div style="
                border: 4px solid #f3f4f6;
                border-top: 4px solid #10b981;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
              "></div>
            </div>
            <p style="color: #374151; font-size: 16px; margin: 0;">
              Estamos verificando tu pago con Yape...
            </p>
            <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">
              Esto puede tardar hasta 2 minutos ,por favor no cierres esta ventana
            </p>
          </div>
          
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        `,
        icon: undefined,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: (modal) => {
          // 👇 Subject para detener el polling manualmente
          const stopPolling$ = new Subject<void>();

          this.compraService.pollEstadoPedido(orden_id)
            .pipe(
              takeWhile(
                res => {
                  if (!res.pedido) return true;
                  return !['pagado', 'fallido', 'expirado'].includes(res.pedido.estado);
                },
                true
              ),
              takeUntil(stopPolling$) // ⛔ se detiene cuando se emite el stop
            )
            .subscribe({
              next: res => {
                if (!res.pedido) {
                  console.log('⌛ Aún esperando confirmación de pago...');
                  return;
                }

                const estado = res.pedido.estado;

                if (['pagado', 'fallido', 'expirado'].includes(estado)) {
                  stopPolling$.next(); // 🔚 detenemos polling
                  stopPolling$.complete();

                  Swal.close();

                  if (estado === 'pagado') {
                    clearTimeout(timeoutId);
                    Swal.fire({
                      icon: 'success',
                      title: '¡Pago confirmado!',
                      html: `
                        <div style="text-align: center; padding: 10px;">
                          <p style="font-size: 16px; color: #1f2937; margin-bottom: 8px;">
                            Tu pedido fue pagado correctamente.
                          </p>
                          <p style="font-size: 14px; color: #6b7280; margin: 0;">
                            Te enviamos los detalles de tu pedido al correo que registraste.
                          </p>
                        </div>
                      `,
                      confirmButtonColor: '#10b981',
                      confirmButtonText: 'Continuar',
                      background: '#ffffff',
                      backdrop: 'rgba(0, 0, 0, 0.5)',
                      customClass: {
                        popup: 'rounded-4 shadow-lg'
                      }
                    });
                  } else if (estado === 'fallido') {
                    clearTimeout(timeoutId);
                    Swal.fire({
                      icon: 'error',
                      title: 'Pago fallido',
                      text: 'El pago no se pudo procesar. Inténtalo nuevamente.',
                      confirmButtonColor: '#ef4444'
                    });
                  } else if (estado === 'expirado') {
                    clearTimeout(timeoutId);
                    Swal.fire({
                      icon: 'warning',
                      title: 'QR expirado',
                      text: 'Tu QR ya no es válido, genera uno nuevo.',
                      confirmButtonColor: '#f59e0b'
                    });
                  }
                }
              },
              error: err => {
                clearTimeout(timeoutId);
                stopPolling$.next();
                stopPolling$.complete();
                console.error('❌ Error en el polling:', err);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Ocurrió un error al verificar tu pago.',
                  confirmButtonColor: '#ef4444'
                });
              }
            });

          // ⏱️ Timeout máximo de 2 minutos
        const timeoutId = setTimeout(() => {
            stopPolling$.next(); // 🔚 detenemos el polling
            stopPolling$.complete();
            Swal.close();
            Swal.fire({
              icon: 'info',
              title: 'Aún no hemos recibido tu pago',
              html: `
                <p>Por favor, contacta con nosotros al <strong>912 391 231</strong> para verificar el estado de tu pago.</p>
              `,
              confirmButtonColor: '#3b82f6',
              confirmButtonText: 'Entendido'
            });
          }, 90000); // 2 minutos
        }
      });

}
  
  

}

