export interface Reclamacion {
  id?: number;
  tipo_documento: 'dni' | 'ce' | 'pasaporte';
  numero_documento: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  direccion: string;
  tipo_bien: 'producto' | 'servicio';
  descripcion_bien: string;
  monto_reclamado?: number;
  fecha_incidente: string; 
  tipo_reclamo: 'reclamo' | 'queja';
  detalle_reclamo: string;
  pedido_concreto: string;
  estado?: 'pendiente' | 'en_proceso' | 'resuelto';
  numero_reclamo?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReclamacionResponse {
  numero_reclamo: string;
  fecha_registro: string;
  estado: string;
}

export interface ConsultaReclamacionResponse {
  numero_reclamo: string;
  estado: string;
  tipo_reclamo: string;
  fecha_registro: string;
  fecha_actualizacion: string;
}
