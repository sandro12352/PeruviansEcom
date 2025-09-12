export interface Categoria {
  id: number;
  nombre: string;
  slug?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
  categoria: Categoria;
}

export interface Tienda {
  id: number;
  nombre: string;
  logo?: string;
}

export interface CyberwowBanner {
  id: number;
  titulo: string;
  imagen_url?: string;
  orden: number;
  estado?: 'activo' | 'inactivo';
  categoria?: Categoria;
  producto?: Producto;
  tiendas?: Tienda[];
}

export interface CyberwowConfiguracion {
  categoria: CyberwowBanner | null;
  tiendas: CyberwowBanner | null;
  productos: CyberwowBanner[];
}

export interface CyberwowResponse {
  success: boolean;
  data: CyberwowConfiguracion;
  message?: string;
}
