import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactanosComponent } from './peruvians-ecom/pages/contactanos/contactanos.component';
import { BlogPageComponent } from './peruvians-ecom/pages/blog-page/blog-page.component';
import { NosotrosPageComponent } from './peruvians-ecom/pages/nosotros-page/nosotros-page.component';
import { PreguntasFrecuentesPageComponent } from './peruvians-ecom/pages/preguntas-frecuentes-page/preguntas-frecuentes-page.component';

const routes: Routes = [
  {
    path: 'contactanos',
    component: ContactanosComponent,
  },
  {
    path: 'blog',
    component:BlogPageComponent,
  },
  {
    path: 'nosotros',
    component:NosotrosPageComponent,
  },
  {
    path:'preguntas-frecuentes',
    component:PreguntasFrecuentesPageComponent
  },
  {
    path: '',
     loadChildren: () => import('./peruvians-ecom/peruvians-ecom.module').then(m => m.PeruviansEcomModule)
  },
  
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
