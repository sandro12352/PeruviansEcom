// interfaces/categoria.ts
export interface Categoria {
  id: number;
  nombre: string;
  estado?: string;
  imagen?: string;
  imagen_url?: string; 
  created_at?: string;
  updated_at?: string;
  slug?: string;
  subcategorias?: Categoria[];
  // Propiedades del backend
  es_padre?: boolean;
  nivel?: number;
  parent_id?: number;
  cantidad_hijos?: number;
  path_completo?: string;
} 


export interface CategoriasSection {
  items: Categoria[];
  total: number;
  message: string;
}

export interface CategoriaResponse {
  success: boolean;
  data: Categoria[];
  total: number;
  message: string;
}
