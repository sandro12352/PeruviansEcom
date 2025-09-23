import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nuestras-tiendas',
  templateUrl: './nuestras-tiendas.component.html',
  styleUrl: './nuestras-tiendas.component.css'
})
export class NuestrasTiendasComponent implements OnInit {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Configurar título de la página
    this.titleService.setTitle('Nuestras Tiendas - Peruvian Ecom | Ubicaciones y Horarios');

    // Configurar metadatos SEO
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Encuentra nuestras tiendas físicas en Perú. Conoce ubicaciones, horarios de atención y servicios disponibles en cada local.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'tiendas físicas, ubicaciones, horarios, locales comerciales, Perú, direcciones, contacto' 
    });

    this.meta.updateTag({ 
      name: 'author', 
      content: 'Peruvian Ecom' 
    });

    // Open Graph tags para redes sociales
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'Nuestras Tiendas - Peruvian Ecom' 
    });

    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Visita nuestras tiendas físicas en Perú. Encuentra ubicaciones, horarios y servicios.' 
    });

    this.meta.updateTag({ 
      property: 'og:type', 
      content: 'website' 
    });

    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://peruvianecom.com/nuestras-tiendas' 
    });

    // Twitter Card tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary' 
    });

    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'Nuestras Tiendas - Peruvian Ecom' 
    });

    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Encuentra nuestras tiendas físicas en Perú con horarios y ubicaciones.' 
    });

    // Metadatos de localización
    this.meta.updateTag({ 
      name: 'geo.region', 
      content: 'PE' 
    });

    this.meta.updateTag({ 
      name: 'geo.country', 
      content: 'Peru' 
    });

    // Metadatos adicionales
    this.meta.updateTag({ 
      name: 'robots', 
      content: 'index, follow' 
    });

    this.meta.updateTag({ 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1' 
    });
    this.meta.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com/nuestras-tiendas' 
    });
  }
}