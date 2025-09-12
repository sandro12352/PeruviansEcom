export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  estado: string;
  imagen: string;
  imagen_url: string;
  categoria: string;
  url: string;
  disponible: boolean;
  sku?: string;
}

export interface Carrusel {
  id: number;
  imagen: string;
  imagen_url: string;
  orden: number;
  estado: string;
  created_at: string;
  updated_at: string;
  producto?: Producto | null;
}

export interface CategoriaResponse {
  success: boolean;
  data: Carrusel[];
  message?: string;
}