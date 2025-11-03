import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageRoutingModule } from './blog-page-routing.module';
import { BlogPageComponent } from './pages/blog-principal/blog-page.component';
import { DetalleBlogComponent } from './pages/detalle-blog/detalle-blog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [BlogPageComponent, DetalleBlogComponent],
  imports: [CommonModule, BlogPageRoutingModule, SharedModule]
})
export class BlogPageModule {}
