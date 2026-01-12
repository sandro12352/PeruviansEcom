import { Producto } from "./producto";

export interface Carrusel {
  id: number;
  imagen: string;
  imagen_url: string;
  imgen_mobil_url:string;
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