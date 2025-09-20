// src/app/auth/pages/google-callback/google-callback.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { envs } from '../../../config/envs';

@Component({
  selector: 'app-google-callback',
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Procesando...</span>
        </div>
        <p class="mt-3">Procesando autenticación con Google...</p>
        <p class="text-muted small">{{ statusMessage }}</p>
        <div *ngIf="showRetryButton" class="mt-3">
          <button class="btn btn-primary" (click)="retry()">Reintentar</button>
          <button class="btn btn-link" (click)="goToLogin()">Volver al login</button>
        </div>
      </div>
    </div>
  `
})
export class GoogleCallbackComponent implements OnInit {
  statusMessage = 'Verificando credenciales...';
  showRetryButton = false;
  private queryParams: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Solo ejecutar en el navegador, no en SSR
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParams.subscribe(params => {
        this.queryParams = params;
        this.processCallback();
      });
    } else {
      // En el servidor, solo mostrar mensaje de carga
      this.statusMessage = 'Iniciando proceso de autenticación...';
    }
  }

  private processCallback(): void {
    if (this.queryParams['code']) {
      this.handleGoogleCallback(this.queryParams);
    } else if (this.queryParams['error']) {
      this.handleError(this.queryParams['error']);
    } else {
      this.handleError('No se recibió código de autorización');
    }
  }

  private handleGoogleCallback(params: any): void {
    this.statusMessage = 'Validando con Google...';
    this.showRetryButton = false;
    
    const requestBody = {
      code: params['code'],
      state: params['state']
    };
    
    this.http.post(`${envs.apiUrl}/auth/google/process-code`, requestBody).subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.statusMessage = 'Autenticación exitosa. Redirigiendo...';
          
          // Guardar token y datos del usuario
          localStorage.setItem('token', response.data.token);
          const expiresAt = new Date();
          expiresAt.setMinutes(expiresAt.getMinutes() + response.data.expires_in_minutes);
          localStorage.setItem('token_expiration', expiresAt.toISOString());
          
          // Si es popup, enviar mensaje al padre
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
              type: 'GOOGLE_AUTH_SUCCESS',
              data: response.data
            }, window.location.origin);
            window.close();
          } else {
            // Si no es popup, redirigir según si necesita completar datos
            setTimeout(() => {
              if (response.data.cliente.necesita_completar_datos) {
                window.location.href = '/auth/completar-perfil-google';
              } else {
                window.location.href = '/';
              }
            }, 1000);
          }
        } else {
          this.handleError(response.message || 'Error en autenticación');
        }
      },
      error: (error) => {
        console.error('Error en callback:', error);
        this.handleError(error.error?.message || 'Error interno del servidor');
      }
    });
  }

  private handleError(error: string): void {
    this.statusMessage = `Error: ${error}`;
    this.showRetryButton = true;
    
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: error
      }, window.location.origin);
      
      setTimeout(() => {
        window.close();
      }, 5000);
    }
  }

  retry(): void {
    this.showRetryButton = false;
    this.processCallback();
  }

  goToLogin(): void {
    if (window.opener && !window.opener.closed) {
      window.close();
    } else {
      window.location.href = '/auth';
    }
  }
}