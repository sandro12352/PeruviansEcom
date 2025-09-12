export interface Categoria {
  id: number;
  nombre: string;
  estado?: string;
  imagen?: string;
  imagen_url?: string; 
  created_at?: string;
  updated_at?: string;
  slug?: string;
}

export interface CategoriaResponse {
  success: boolean;
  data: Categoria[];
  total: number;
  message: string;
}