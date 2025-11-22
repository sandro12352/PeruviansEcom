// interfaces/categoria.ts
export interface Categoria {
  id: number;
  categoria_slug?: string;
  nombre: string;
  imagen?: string;
  imagen_url?: string; 
  created_at?: string;
  updated_at?: string;
  subcategorias?: Categoria[];
  es_padre?: boolean;
  nivel?: number;
  parent_id?: number;
  cantidad_hijos?: number;
} 


export interface CategoriasSection {
  items: Categoria[];
  total: number;
  message: string;
}

export interface CategoriaResponse {
  success: boolean;
  data: Categoria[];
  total?: number;
  message?: string;
}
