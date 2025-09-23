import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros-page',
  templateUrl: './nosotros-page.component.html',
  styleUrls: ['./nosotros-page.component.css']
})
export class NosotrosPageComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Nosotros | PeruviansEcom');

    this.metaService.updateTag({
      name: 'description',
      content: 'En PeruviansEcom queremos acercarte a lo mejor de los productos locales de Perú. Conoce nuestro equipo, nuestra misión y cómo trabajamos para ofrecerte lo que más te gusta.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'Nosotros, PeruviansEcom, equipo, misión, productos locales, ecommerce Perú'
    });
    this.metaService.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com/nosotros' 
    });

    this.metaService.updateTag({ property: 'og:title', content: 'Nosotros | PeruviansEcom' });
    this.metaService.updateTag({ property: 'og:description', content: 'Descubre nuestro equipo, nuestra misión y cómo en PeruviansEcom apoyamos los productos locales de Perú para que tengas la mejor experiencia de compra.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://peruviansecom.com/nosotros' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }
}
