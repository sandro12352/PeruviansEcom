import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent implements OnInit {
  correo: string = 'peruvianecom@gmail.com';

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Configurar título de la página
    this.titleService.setTitle('Términos y Condiciones - Peruvian Ecom | Políticas de Uso');

    // Configurar metadatos SEO
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Lee nuestros términos y condiciones de uso. Conoce las políticas, derechos y obligaciones para el uso de nuestros servicios y productos.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'términos y condiciones, políticas de uso, derechos, obligaciones, legal, privacidad, servicios' 
    });

    this.meta.updateTag({ 
      name: 'author', 
      content: 'Peruvian Ecom' 
    });

    // Open Graph tags para redes sociales
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'Términos y Condiciones - Peruvian Ecom' 
    });

    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Consulta nuestros términos y condiciones de uso y políticas de servicio.' 
    });

    this.meta.updateTag({ 
      property: 'og:type', 
      content: 'website' 
    });

    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://peruvianecom.com/terminos-condiciones' 
    });

    // Twitter Card tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary' 
    });

    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'Términos y Condiciones - Peruvian Ecom' 
    });

    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Políticas y términos de uso de nuestros servicios.' 
    });

    // Metadatos legales
    this.meta.updateTag({ 
      name: 'robots', 
      content: 'index, follow' 
    });

    this.meta.updateTag({ 
      name: 'revisit-after', 
      content: '30 days' 
    });

    this.meta.updateTag({ 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1' 
    });

    // Información de contacto legal
    this.meta.updateTag({ 
      name: 'contact', 
      content: this.correo 
    });
    this.meta.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com/terminos-condiciones' 
    });
  }
}