import { Categoria } from './categoria';
import { ProductoImagen } from './productoimagen';

export interface Producto {
  id: number;
  titulo?: string;
  nombre: string;
  producto_slug:string;
  descripcion: string;
  precio: number;
  precio_despues?: number;
  descuento?: string | number;
  img: string;                
  imagen?: string;            
  imagenes?: ProductoImagen[]; 
  tienda?: string;
  tienda_id?: string | number;
  categoria?:Categoria;
  meta_description?: string;
  rutaCalculada?:string[];
  subcategoria?:Categoria;
  categoria_id?: string | number;
  sku?: string;
  ingredientes?: string;
  beneficios?: string;
  modo_de_uso?: string;
  modo_uso?: string;
  cantidad?: number;
  stock?: number;
  faq_quienes_toman:string,
  faq_por_que_elegir:string,
  faq_tiempo_uso:string,
  faq_efectos_secundarios:string,
  faq_consumo_alcohol:string
  vida_util:string,
  estado?: string;
  created_at?: string;
  updated_at?: string;
  total_vendidos?: number; // Para mas_vendidos
}