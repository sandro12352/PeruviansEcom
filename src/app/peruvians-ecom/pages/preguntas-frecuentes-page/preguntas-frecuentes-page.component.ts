import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-preguntas-frecuentes-page',
  templateUrl: './preguntas-frecuentes-page.component.html',
  styleUrl: './preguntas-frecuentes-page.component.css'
})
export class PreguntasFrecuentesPageComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Preguntas Frecuentes | PeruviansEcom');

    this.metaService.updateTag({
      name: 'description',
      content: 'Encuentra respuestas a las preguntas más frecuentes sobre envíos, pagos, devoluciones y servicios en PeruviansEcom.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'Preguntas frecuentes, ayuda, soporte, envíos, devoluciones, pagos, PeruviansEcom'
    });
    this.metaService.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com/preguntas-frecuentes' 
    });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: 'Preguntas Frecuentes | PeruviansEcom' });
    this.metaService.updateTag({ property: 'og:description', content: 'Resolvemos tus dudas más comunes sobre nuestros productos y servicios en PeruviansEcom.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://peruviansecom.com/preguntas-frecuentes' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });


    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Preguntas Frecuentes | PeruviansEcom' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Resuelve tus dudas sobre envíos, pagos y devoluciones en PeruviansEcom.' });
  }
}
