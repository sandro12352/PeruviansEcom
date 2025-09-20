// src/app/peruvians-ecom/guards/google-profile.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleProfileGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    // Verificar autenticación básica primero
    if (!this.authService.isAuthenticated()) {
      console.log('Usuario no autenticado, redirigiendo a login');
      this.router.navigate(['/auth']);
      return false;
    }

    const currentUser = this.authService.getCurrentUser();
    
    // Si no hay usuario en memoria, intentar cargar el perfil
    if (!currentUser) {
      console.log('No hay usuario en memoria, cargando perfil...');
      return this.authService.getProfile().pipe(
        map(response => {
          if (response.success && response.data) {
            const cliente = response.data.cliente;
            console.log('Perfil cargado, necesita completar datos:', cliente.necesita_completar_datos);
            
            if (cliente.necesita_completar_datos) {
              return true; // Puede acceder a completar perfil
            } else {
              console.log('Datos ya completos, redirigiendo al home');
              this.router.navigate(['/']);
              return false;
            }
          } else {
            console.log('Error cargando perfil, redirigiendo a login');
            this.router.navigate(['/auth']);
            return false;
          }
        }),
        catchError(error => {
          console.error('Error en guard al cargar perfil:', error);
          this.authService.clearAuthData();
          this.router.navigate(['/auth']);
          return of(false);
        })
      );
    }

    // Si hay usuario en memoria, verificar estado
    console.log('Usuario en memoria:', {
      email: currentUser.email,
      necesita_completar_datos: currentUser.necesita_completar_datos
    });

    if (currentUser.necesita_completar_datos) {
      console.log('Usuario necesita completar datos, permitiendo acceso');
      return true;
    } else {
      console.log('Usuario ya completó datos, redirigiendo al home');
      this.router.navigate(['/']);
      return false;
    }
  }
}