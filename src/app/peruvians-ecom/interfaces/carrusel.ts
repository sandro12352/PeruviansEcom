import { Producto } from "./producto";

export interface Carrusel {
  id: number;
  imagen: string;
  imagen_url: string;
  imagen_mobile_url:string;
  orden: number;
  estado: string;
  created_at: string;
  updated_at: string;
  producto?: Producto | null;
}

export interface CategoriaResponse {
  success: boolean;
  data: Carrusel[];
  slide_principal:Carrusel,
  message?: string;
}