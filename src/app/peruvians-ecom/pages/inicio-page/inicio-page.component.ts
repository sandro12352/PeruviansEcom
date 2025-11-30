// src/app/peruvians-ecom/pages/inicio-page/inicio-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

// IMPORTS CORREGIDOS - Solo importar una vez cada interfaz
import { ConfiguracionCyberwow, DashboardResponse } from '../../interfaces/dashboard.interface';
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
    private router: Router,
    private dashboardService:DashboardService
    
  ) {}
  
  ngOnInit(): void {
    
  //  this.cargarDatosDesdeResolver();

  }

  private cargarDatosDesdeResolver(): void {
   this.dashboardService.getDashboardData('todas')
    .subscribe({
      next:(dashboardData)=>{
         // Validación
      if (!dashboardData?.success || !dashboardData.data) {
        console.error('No se pudieron cargar los datos del dashboard');
        return;
      }

      const data = dashboardData.data;

      // Cargar categorías
      if (data.categorias) {
        this.categorias = data.categorias.items;
      }

      // Cargar productos más vendidos
      if (data.mas_vendidos) {
        this.masVendido = data.mas_vendidos;
      }

      // Cargar productos más nuevos
      if (data.mas_nuevos) {
        this.masNuevo = data.mas_nuevos;
      }

      // Cargar etiquetas
      if (data.etiquetas) {
        this.etiquetas = data.etiquetas;
      }

      // Cargar configuración CyberWow
      if (data.configuracion) {
        this.cyberwowBanners = data.configuracion;
      }
      }
    });
  }

  /**
   * Navega a productos filtrados por tiendas CyberWow
   */
  onCyberwowTiendasClick(): void {
    if (this.cyberwowBanners.tiendas?.tiendas && this.cyberwowBanners.tiendas.tiendas.length > 0) {
      const tiendasIds = this.cyberwowBanners.tiendas.tiendas.map(tienda => tienda.id);
      
      this.router.navigate(['/productos'], {
        queryParams: {
          cyberwow: 'tiendas',
          tiendas: tiendasIds.join(',')
        }
      });
    } else {
      this.router.navigate(['/productos'], {
        queryParams: {
          cyberwow: 'tiendas'
        }
      });
    }
  }






 

 



}