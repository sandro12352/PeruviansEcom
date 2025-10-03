export interface Ubigeo {
  nombre: string;
  provincias: Provincia[];
}

export interface Departamento {
  nombre: string;
  provincias: Provincia[];
}

export interface Provincia {
  nombre: string;
  distritos: Distrito[];
}

export interface Distrito {
  nombre: string;
  ubigeo: string;
  id: number;
  inei: string;
}