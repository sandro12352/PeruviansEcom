import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './pages/blog-principal/blog-page.component';
import { DetalleBlogComponent } from './pages/detalle-blog/detalle-blog.component';

const routes: Routes = [
  { path: '', component: BlogPageComponent },
  { path: ':id_blog/:blog_slug', component: DetalleBlogComponent } // blog/:titulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPageRoutingModule {}
