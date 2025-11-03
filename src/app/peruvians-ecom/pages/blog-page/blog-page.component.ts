import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent implements OnInit {

  public blog? = 'Blog';
  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Configurar título de la página
    this.titleService.setTitle('Blog - Peruvian Ecom | Noticias y Artículos');

    // Configurar metadatos SEO
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Descubre las últimas noticias, tendencias y artículos sobre productos peruanos, comercio electrónico y cultura en nuestro blog oficial.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'blog, noticias, artículos, productos peruanos, ecommerce, tendencias, cultura peruana' 
    });

    this.meta.updateTag({ 
      name: 'author', 
      content: 'Peruvian Ecom' 
    });
      this.meta.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com/blog' 
    });

    // Open Graph tags para redes sociales
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'Blog - Peruvian Ecom' 
    });

    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Descubre las últimas noticias y artículos sobre productos peruanos y comercio electrónico.' 
    });

    this.meta.updateTag({ 
      property: 'og:type', 
      content: 'website' 
    });

    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://peruvianecom.com/blog' 
    });

    // Twitter Card tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary' 
    });

    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'Blog - Peruvian Ecom' 
    });

    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Noticias y artículos sobre productos peruanos y ecommerce.' 
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
  }
}
