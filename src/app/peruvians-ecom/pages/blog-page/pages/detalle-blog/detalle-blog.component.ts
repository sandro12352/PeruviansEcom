import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-detalle-blog',
  templateUrl: './detalle-blog.component.html',
  styleUrl: './detalle-blog.component.css'
})
export class DetalleBlogComponent {

  public nombreBlog?:string;
  public pathParts: string[] = [];
  titulo!: string;
  blogItem: any;

  blogs = [
    { img: 'https://previews.123rf.com/images/loonara/loonara1607/loonara160700012/60728838-professional-makeup-brushes-and-tools-collection-make-up-products-set-on-black-table-background.jpg', titulo: 'Belleza Natural', subtitulo: '¿Por qué comprar?' },
    { img: 'https://matarrania.com/img/cms/gama_hombre_matarrania2.png', titulo: 'Cuidado Ecológico' },
    { img: 'https://verdecora.es/blog/wp-content/uploads/2019/09/beneficios-productos-organicos.jpg', titulo: 'Vida Orgánica' },
    { img: 'https://elbalconverde.com/wp-content/uploads/2024/04/masterclass-rutina-facial-banner-1024x556.jpg', titulo: 'Cuidado Facial' }
  ];
  breadcrumbTitulos = this.blogs.map(b => b.titulo);

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private seoService:SeoService
    
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.titulo = params.get('titulo') || '';
      // Busca el blog por título
      this.blogItem = this.blogs.find(item => item.titulo === this.titulo);
      
         // ⭐ CAPTURAR EL PATH SIN SLASH Y SIN GUIONES
        this.pathParts = this.router.url
      .split('?')[0]             // Quitar query params
      .replace(/^\/+/, '')       // Quitar slash inicial
      .split('/')                // Dividir por /
      .map(p => decodeURIComponent(p))  // ⭐ Decodificar correctamente
      .map(p => p.replace(/-/g, ' '));  // Opcional: quitar guiones → espacios

        console.log("PARTES:", this.pathParts);
    });



  }


}
