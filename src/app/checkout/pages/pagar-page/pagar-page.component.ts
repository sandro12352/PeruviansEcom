import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, takeWhile } from 'rxjs';
import { CarritoService } from '../../../peruvians-ecom/services/carrito.service';
import { CompraService, DatosTarjeta } from '../../../peruvians-ecom/services/compra.service';
import { AuthService } from '../../../peruvians-ecom/services/auth.service';
import { Cliente } from '../../../peruvians-ecom/interfaces/cliente';
import { Producto } from '../../../peruvians-ecom/interfaces/producto';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      nombre: ['', [Validators.required, Validators.minLength(3)]],
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
      departamento:this.selectedDepartamento!,
      provincia:this.selectedProvincia!,
      distrito:this.selectedDistrito!,
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
      direccion_envio: this.direccionCliente,
      departamento:this.selectedDepartamento!,
      provincia:this.selectedProvincia!,
      distrito:this.selectedDistrito!,
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

      this.compraService.procesarCompra(datosCompra).subscribe(data => {
        Swal.close(); // cerramos el loading  
        const qr = data.yape.qr_url;
         Swal.fire({
          title: 'Escanea este QR con Yape',
          html: `<img src="${qr}" alt="QR de pago" width="200" height="200"><br>
                 <small class="text-muted">Estamos esperando la confirmación del pago...</small>`,
          showConfirmButton: false,
          allowOutsideClick: false
        });

        this.compraService.pollEstadoPedido(data.order_id)
              .pipe(
                takeWhile(res => res.estado !== 'pendiente' && res.estado !== 'creado' && res.estado !== 'pagado' && res.estado !== 'eliminado' && res.estado !== 'eliminado', true)
              )
              .subscribe(res => {
                if (res.estado === 'pagado') {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Pago confirmado!',
                    text: 'Tu pedido fue pagado con Yape'
                  });
                } else if (res.estado === 'fallido') {
                  Swal.fire({
                    icon: 'error',
                    title: 'Pago fallido',
                    text: 'El pago no se pudo procesar. Inténtalo nuevamente.'
                  });
                } else if (res.estado === 'expirado') {
                  Swal.fire({
                    icon: 'warning',
                    title: 'QR expirado',
                    text: 'Tu QR ya no es válido, genera uno nuevo.'
                  });
                }
                Swal.close();

              });


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
  

}