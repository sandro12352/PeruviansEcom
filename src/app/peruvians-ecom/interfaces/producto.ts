// interfaces/producto.ts
import { Categoria } from './categoria';
import { ProductoImagen } from './productoimagen';

export interface Producto {
  id: number;
  titulo?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precio_despues?: number;
  descuento?: string | number;
  img: string;                
  imagen?: string;            
  imagen_url?: string;        
  imagenes?: ProductoImagen[]; 

  tienda?: string;
  tienda_id?: string | number;
  categoria?: string | Categoria;
  categoria_id?: string | number;
  sku?: string;
  detalle?: string;
  beneficios?: string;
  modo_de_uso?: string;
  modo_uso?: string;
  cantidad?: number;
  stock?: number;
  estado?: string;
  created_at?: string;
  updated_at?: string;
}
