import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent implements OnInit {

  public blog? = 'Blog';
  constructor(
    private meta: Meta,
    private seoService:SeoService
  ) {}

  ngOnInit() {
    
    this.seoService.setTitle('Blog - Peruvian Ecom | Noticias y Artículos');


    this.seoService.setDescription('Descubre las últimas noticias, tendencias y artículos sobre productos peruanos, comercio electrónico y cultura en nuestro blog oficial.')

    this.seoService.setCanonical('https://peruviansecom.com/blog')

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'blog, noticias, artículos, productos peruanos, ecommerce, tendencias, cultura peruana' 
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
