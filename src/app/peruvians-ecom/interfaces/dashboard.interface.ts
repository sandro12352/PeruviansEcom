// src/app/peruvians-ecom/interfaces/dashboard.interface.ts

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface DashboardData {
  categorias?: CategoriasSection;
  mas_vendidos?: Producto[];
  mas_nuevos?: Producto[];
  liquidaciones?: Liquidacion[];
  configuracion?: ConfiguracionCyberwow;
  carrusel?: Carrusel[];
}

export interface CategoriasSection {
  items: Categoria[];
  total: number;
  message: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  imagen: string;
  imagen_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Producto {
  id: number;
  nombre: string;
  titulo: string;
  descripcion: string;
  precio: number;
  sku: string;
  precio_despues: number;
  stock: number;
  categoria: string;
  categoria_id: number;
  img: string;
  imagenes: ProductoImagen[];
  total_imagenes: number;
  estado: string;
  cantidad: number;
  descuento: string;
  tienda: string;
  tienda_id: number;
  beneficios: string;
  modo_de_uso: string;
  detalle: string;
  created_at: string;
  updated_at: string;
  total_vendidos?: number; // Solo para mas_vendidos
}

export interface ProductoImagen {
  id?: number;
  url: string;
  principal?: boolean;
}

export interface Liquidacion {
  id: number;
  producto_id: number;
  precio_liquidacion: number;
  fecha_inicio: string;
  fecha_fin: string;
  orden: number;
  estado: string;
  imagen: string;
  imagen_url: string | null;
  created_at: string;
  updated_at: string;
  producto: Producto;
}

export interface ConfiguracionCyberwow {
  categoria: CyberwowBannerCategoria | null;
  tiendas: CyberwowBannerTiendas | null;
  productos: CyberwowBannerProducto[];
}

export interface CyberwowBannerCategoria {
  id: number;
  titulo: string;
  imagen_url: string | null;
  categoria: Categoria;
}

export interface CyberwowBannerTiendas {
  id: number;
  titulo: string;
  imagen_url: string | null;
  tiendas: Tienda[];
}

export interface CyberwowBannerProducto {
  id: number;
  titulo: string;
  imagen_url: string | null;
  producto: ProductoCyberwow;
  orden: number;
}

export interface ProductoCyberwow {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
  categoria: Categoria;
}

export interface Tienda {
  id: number;
  nombre: string;
  descripcion?: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface Carrusel {
  id: number;
  imagen: string;
  imagen_url: string | null;
  orden: number;
  estado: string;
  created_at: string;
  updated_at: string;
  producto: ProductoCarrusel | null;
}

export interface ProductoCarrusel {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  estado: string;
  categoria: string;
  url: string;
  disponible: boolean;
}