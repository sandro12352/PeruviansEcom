// src/app/peruvians-ecom/pages/pedidos/pedidos.component.ts

import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { 
  Pedido, 
  DetallePedido, 
  PaginationInfo, 
  ApiError 
} from '../../interfaces/pedidos';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  // Datos principales
  pedidos: Pedido[] = [];
  pedidoSeleccionado: DetallePedido | null = null;
  paginacion: PaginationInfo | null = null;

  // Estados de carga y control
  cargando: boolean = false;
  cargandoDetalle: boolean = false;
  error: string = '';
  mostrarDetalle: boolean = false;

  // Filtros y configuración
  estadoFiltro: string = 'todos';
  paginaActual: number = 1;
  elementosPorPagina: number = 10;

  // Opciones de filtro
  opcionesEstado = [
    { value: 'todos', label: 'Todos los pedidos' },
    { value: 'pendiente', label: 'Pendientes' },
    { value: 'pagado', label: 'Pagados' },
    { value: 'enviado', label: 'Enviados' },
    { value: 'cancelado', label: 'Cancelados' }
  ];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  /**
   * Cargar lista de pedidos
   */
  cargarPedidos(): void {
    this.cargando = true;
    this.error = '';

    this.pedidosService.misPedidos(
      this.paginaActual, 
      this.elementosPorPagina, 
      this.estadoFiltro
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.pedidos = response.data.pedidos;
          this.paginacion = response.data.pagination;
        } else {
          this.error = response.message;
          this.pedidos = [];
        }
        this.cargando = false;
      },
      error: (error: ApiError) => {
        this.error = error.message || 'Error al cargar los pedidos';
        this.pedidos = [];
        this.cargando = false;
      }
    });
  }

  /**
   * Ver detalle de un pedido
   */
verDetallePedido(pedidoId: number): void {
  this.mostrarDetalle = true;     // 👈 Abre el modal de inmediato
  this.cargandoDetalle = true;    // 👈 Activa el loader
  this.error = '';
  this.pedidoSeleccionado = null; // 👈 Limpia data anterior

  this.pedidosService.detallePedido(pedidoId).subscribe({
    next: (response) => {
      if (response.success) {
        this.pedidoSeleccionado = response.data;
      } else {
        this.error = response.message;
      }
      this.cargandoDetalle = false;
    },
    error: (error: ApiError) => {
      this.error = error.message || 'Error al cargar el detalle del pedido';
      this.cargandoDetalle = false;
    }
  });
}


  /**
   * Cerrar modal de detalle
   */
  cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.pedidoSeleccionado = null;
  }

  /**
   * Cambiar filtro de estado
   */
  cambiarFiltro(nuevoEstado: string): void {
    if (this.estadoFiltro !== nuevoEstado) {
      this.estadoFiltro = nuevoEstado;
      this.paginaActual = 1; // Resetear a primera página
      this.cargarPedidos();
    }
  }

  /**
   * Cambiar página
   */
  cambiarPagina(nuevaPagina: number): void {
    if (this.paginacion && nuevaPagina >= 1 && nuevaPagina <= this.paginacion.last_page) {
      this.paginaActual = nuevaPagina;
      this.cargarPedidos();
    }
  }

  /**
   * Generar array de páginas para paginación
   */
  getPaginas(): number[] {
    if (!this.paginacion) return [];

    const totalPaginas = this.paginacion.last_page;
    const paginaActual = this.paginacion.current_page;
    const paginas: number[] = [];

    // Mostrar máximo 5 páginas
    const inicio = Math.max(1, paginaActual - 2);
    const fin = Math.min(totalPaginas, inicio + 4);

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  }

  /**
   * Formatear precio
   */
  formatearPrecio(precio: any): string {
  const num = Number(precio) || 0;
  return `S/ ${num.toFixed(2)}`;
}


  /**
   * Obtener clase CSS para estado
   */
  getEstadoClass(estado: string): string {
    return this.pedidosService.getEstadoClass(estado);
  }

  /**
   * Formatear fecha
   */
  formatearFecha(fecha: string): string {
    return this.pedidosService.formatearFecha(fecha);
  }

  /**
   * Obtener resumen del pedido
   */
  getResumenPedido(pedido: Pedido): string {
    return this.pedidosService.getResumenPedido(pedido);
  }

  /**
   * Verificar si el pedido está pagado
   */
  estaPagado(pedido: Pedido): boolean {
    return this.pedidosService.estaPagado(pedido);
  }

  /**
   * Verificar si se puede cancelar el pedido
   */
  sePuedeCancelar(pedido: Pedido): boolean {
    return this.pedidosService.sePuedeCancelar(pedido);
  }

  /**
   * Obtener imagen del producto o placeholder
   */
getImagenProducto(producto: any): string {
  return producto?.imagen_principal || '/assets/images/producto-placeholder.jpg';
}

onImageError(event: any): void {
  // Para evitar el bucle infinito
  if (!event.target.src.includes('producto-placeholder.jpg')) {
    event.target.src = '/assets/images/producto-placeholder.jpg';
  }
}


  /**
   * Refrescar lista de pedidos
   */
  refrescar(): void {
    this.cargarPedidos();
  }
}