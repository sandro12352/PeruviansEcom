import { Component } from '@angular/core';

@Component({
  selector: 'peruvians-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mantenerVisible = false;

  constructor() {}

  activeCategory: string | null = null;

      mostrarProductos(categoria: string) {
        this.activeCategory = categoria;
      }
      

      ocultarProductos() {
        this.activeCategory = null;
      }

       mantenerProductos() {
          this.mantenerVisible = true;
      }
}
