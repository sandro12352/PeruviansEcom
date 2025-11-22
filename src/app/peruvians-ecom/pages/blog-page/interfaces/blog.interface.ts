export interface Blog {
    id:                 number;
    titulo:             string;
    blog_slug:          string;
    meta_title:         string;
    meta_description:   string;
    portada:            string;
    portada_url:        string;
    portada_sec_url:        string;
    contenido_flexible: ContenidoFlexible;
    creado_en:          Date;
}

export interface ContenidoFlexible {
    intro:      string[];
    contenido:  Contenido[];
    conclusion: string;
}

export interface Contenido {
    titulo?:   string;
    usaH3 ?:boolean,
    subsecciones?:Subsecciones[];
    lista?:string[];
    parrafos?: string[];
}


export interface Subsecciones {
    subtitulo?:   string;
    texto?: string;
}
