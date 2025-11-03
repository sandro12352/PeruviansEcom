import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
    @Input()  nombreCategoriaActual? : string;
    @Input()  nombreEtiqueta?:string;
    @Input()  nombreCategoriaHijo?: string ;
    @Input()  otrasEtiquetas?: string ;
    @Input() nombreProducto?:string;
}
