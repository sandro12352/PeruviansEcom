import { Producto } from './producto';

export interface Liquidacion {
  id: number;
  producto_id: number;
  imagen: string;
  imagen_url?: string;
  orden: number;
  created_at?: string;
  updated_at?: string;
  producto: Producto;
}

export interface LiquidacionResponse {
  success: boolean;
  data: Liquidacion[];
  message?: string;
}