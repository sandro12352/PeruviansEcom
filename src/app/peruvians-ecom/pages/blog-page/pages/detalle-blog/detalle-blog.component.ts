import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../../../services/seo.service';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog.interface';

@Component({
  selector: 'app-detalle-blog',
  templateUrl: './detalle-blog.component.html',
  styleUrl: './detalle-blog.component.css'
})
export class DetalleBlogComponent {

  public nombreBlog?:string[];
  public pathParts: string[] = [];
  public blog?:Blog;
  titulo!: string;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly router:Router,
    private readonly seoService:SeoService,
    private readonly blogService:BlogService
    
  ) {}

  ngOnInit(): void {
    const id_blog = Number( this.route.snapshot.paramMap.get('id_blog'));


    this.blogService.getBlogById(id_blog).subscribe({
      next:(resp)=>{
        this.blog = resp;
        this.seoService.setTitle(this.blog?.meta_title!);
        this.seoService.setDescription(this.blog.meta_description);
        this.seoService.setCanonical(this.router.url)

     this.pathParts = this.router.url
        .split('?')[0]
        .replace(/^\/+/, '')
        .split('/')
        .filter(p => isNaN(Number(p)))               // 🚫 Quitar números puros
        .map(p => decodeURIComponent(p))
        .map(p => p.replace(/-/g, ' '));

      } 
    })
    


   



  }


}
