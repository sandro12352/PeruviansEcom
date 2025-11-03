import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BreadcrumbComponent]
})
export class SharedModule { }
