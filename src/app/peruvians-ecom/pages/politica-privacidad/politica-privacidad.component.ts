import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Política de Privacidad | PeruviansEcom');

    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce cómo en PeruviansEcom protegemos tu información personal, el uso de tus datos y nuestras políticas de seguridad y privacidad.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'Política de privacidad, protección de datos, seguridad, información personal, PeruviansEcom'
    });
    this.metaService.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com/politica-de-privacidad' 
    });

    this.metaService.updateTag({ property: 'og:title', content: 'Política de Privacidad | PeruviansEcom' });
    this.metaService.updateTag({ property: 'og:description', content: 'Descubre cómo en PeruviansEcom cuidamos tu privacidad y protegemos tus datos personales.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://peruviansecom.com/politica-de-privacidad' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Política de Privacidad | PeruviansEcom' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Conoce nuestras políticas de privacidad y cómo protegemos tus datos en PeruviansEcom.' });
  }
}