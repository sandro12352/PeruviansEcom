  export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
  }

  export interface ItemPedido {
    id: number;
    cantidad: number;
    precio_venta: number;
    subtotal: number;
    producto: Producto;
  }

  export interface Pago {
    id: number;
    monto: number;
    metodo_pago: 'tarjeta' | 'yape';
    estado_pago: 'pendiente' | 'pendiente_yape' | 'aprobado' | 'fallido';
    fecha_pago: string;
  }

  export interface Pedido {
    id: number;
    total: number;
    direccion_envio: string;
    estado_pedido: 'pendiente' | 'pagado' | 'cancelado' | 'enviado';
    estado_pedido_texto: string;
    fecha_pedido: string;
    fecha_pedido_iso: string;
    cantidad_items: number;
    total_productos: number;
    items: ItemPedido[];
    pago?: Pago | null;
  }

  export interface DetallePedido extends Pedido {
    pagos: Pago[];
  }

  export interface PaginationInfo {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  }

  export interface PedidosResponse {
    success: boolean;
    message: string;
    data: {
      pedidos: Pedido[];
      pagination: PaginationInfo;
    };
  }

  export interface DetallePedidoResponse {
    success: boolean;
    message: string;
    data: DetallePedido;
  }

  export interface ApiError {
    success: false;
    message: string;
    error?: string;
  }