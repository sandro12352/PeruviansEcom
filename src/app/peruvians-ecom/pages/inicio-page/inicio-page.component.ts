// src/app/peruvians-ecom/pages/inicio-page/inicio-page.component.ts

import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

// IMPORTS CORREGIDOS - Solo importar una vez cada interfaz
import { ConfiguracionCyberwow } from '../../interfaces/dashboard.interface';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria'; // SOLO UNA VEZ
import { Etiqueta } from '../../interfaces/etiqueta.interface';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements OnInit {

  public productos: Producto[] = [];
  public masVendido: Producto[] = [];
  public masNuevo: Producto[] = [];
  public categorias: Categoria[] = []; // CAMBIAR: usar solo Categoria
  public etiquetas: Etiqueta[] = [];


  // Para manejar la estructura jerárquica de categorías
  public categoriasJerarquicas: Categoria[] = [];

  // CyberWow data
  public cyberwowBanners: ConfiguracionCyberwow = {
    categoria: null,
    tiendas: null,
    productos: []
  };
  
  public loading = {
    dashboard: false,
    masVendido: false,
    masNuevo: false,
    liquidacion: false,
    categorias: false,
    cyberwow: false,
    carrusel: false
  };

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  /**
   * Carga todos los datos del dashboard en una sola llamada
   */
  private cargarDatosDashboard(): void {
    this.loading.dashboard = true;

    this.dashboardService.getDashboardData('todas').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          if (response.data.categorias) {
            this.categorias = response.data.categorias.items;
          }

          if (response.data.mas_vendidos) {
            this.masVendido = (response.data.mas_vendidos);
          }

          if (response.data.mas_nuevos) {
            this.masNuevo = response.data.mas_nuevos;
          }
          if(response.data.etiquetas){
            this.etiquetas = response.data.etiquetas;
          }

          if (response.data.configuracion) {
            this.cyberwowBanners = response.data.configuracion;
          }
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del dashboard:', error);
        this.mostrarErrorCarga();
      },
      complete: () => {
        this.loading.dashboard = false;
      }
    });
  }




  /**
   * Muestra error de carga (opcional)
   */
  private mostrarErrorCarga(): void {
    // Aquí puedes implementar tu lógica de manejo de errores
    // Por ejemplo, mostrar un toast o mensaje de error
    console.error('No se pudieron cargar los datos del dashboard');
  }

  

  // Método para navegar cuando se hace clic en el banner de tiendas
  onCyberwowTiendasClick(): void {
    if (this.cyberwowBanners.tiendas?.tiendas && this.cyberwowBanners.tiendas.tiendas.length > 0) {
      // Obtener los IDs de las tiendas asociadas al banner
      const tiendasIds = this.cyberwowBanners.tiendas.tiendas.map(tienda => tienda.id);
      
      // Navegar a productos con queryParams que incluyan los filtros de tiendas
      this.router.navigate(['/productos'], {
        queryParams: {
          cyberwow: 'tiendas',
          tiendas: tiendasIds.join(',')
        }
      });
    } else {
      // Si no hay tiendas asociadas, navegar sin filtros
      this.router.navigate(['/productos'], {
        queryParams: {
          cyberwow: 'tiendas'
        }
      });
    }
  }

 

 



}