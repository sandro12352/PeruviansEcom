export interface EtiquetaResponse{
    etiquetas:Etiqueta[],
    pagination:PaginationEtiqueta
}

export interface Etiqueta {
    id:                 number;
    nombre:             string;
    imagen:             string;
    imagen_url:         string;
    cantidad_productos: number;
    created_at:         Date;
    updated_at:         Date;
} 

export interface PaginationEtiqueta{
    current_page:number,
    last_page:number,
    per_page:number,
    total:number
}

