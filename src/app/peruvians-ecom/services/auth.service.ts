// src/app/peruvians-ecom/services/auth.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { 
  RegisterRequest, 
  RegisterResponse, 
  LoginResponse, 
  LoginRequest, 
  Cliente, 
  ProfileResponse, 
  LogoutResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  GoogleRedirectResponse,
  CompletarDatosGoogleRequest,
  CompletarDatosGoogleResponse
} from '../interfaces/cliente';
import { envs } from '../../config/envs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para mantener el estado del usuario
  private currentUserSubject = new BehaviorSubject<Cliente | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // BehaviorSubject para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
    // Cargar perfil si hay token válido al inicializar el servicio
    if (this.hasValidToken()) {
      this.loadUserProfile();
    }
  }

  // MÉTODOS EXISTENTES...
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${envs.apiUrl}/auth/register`, data).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setAuthData(response.data.token, response.data.cliente);
        }
      })
    );
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${envs.apiUrl}/auth/login`, data).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setAuthData(response.data.token, response.data.cliente);
        }
      })
    );
  }

  // NUEVOS MÉTODOS PARA GOOGLE OAUTH

  /**
   * Obtiene la URL de redirección a Google
   */
  getGoogleRedirectUrl(): Observable<GoogleRedirectResponse> {
    return this.http.get<GoogleRedirectResponse>(`${envs.apiUrl}/auth/google/redirect`);
  }

  /**
   * Inicia el proceso de autenticación con Google
   */
  loginWithGoogle(): void {
    this.getGoogleRedirectUrl().subscribe({
      next: (response) => {
        if (response.success && response.redirect_url) {
          // Abrir ventana popup para Google OAuth
          const popup = window.open(
            response.redirect_url,
            'google-login',
            'width=500,height=600,scrollbars=yes,resizable=yes'
          );

          // Escuchar mensajes del popup
          const messageListener = (event: MessageEvent) => {
            // Verificar origen por seguridad
            if (event.origin !== window.location.origin) return;

            if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
              // Procesar respuesta exitosa
              this.handleGoogleAuthSuccess(event.data.data);
              popup?.close();
              window.removeEventListener('message', messageListener);
            } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
              console.error('Error en autenticación con Google:', event.data.error);
              popup?.close();
              window.removeEventListener('message', messageListener);
            }
          };

          window.addEventListener('message', messageListener);

          // Verificar si el popup se cerró manualmente
          const checkClosed = setInterval(() => {
            if (popup?.closed) {
              clearInterval(checkClosed);
              window.removeEventListener('message', messageListener);
            }
          }, 1000);
        }
      },
      error: (error) => {
        console.error('Error obteniendo URL de Google:', error);
      }
    });
  }
/**
 * Maneja la respuesta exitosa de Google OAuth
 */
private handleGoogleAuthSuccess(data: any): void {
/*   console.log('Datos recibidos de Google OAuth:', data);
 */  
  if (data.token && data.cliente) {
    this.setAuthData(data.token, data.cliente);
    
    // Guardar información adicional si está disponible
    if (data.expires_in_minutes) {
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + data.expires_in_minutes);
      localStorage.setItem('token_expiration', expiresAt.toISOString());
    }
    
    // Verificar si necesita completar datos
    console.log('¿Necesita completar datos?', data.cliente.necesita_completar_datos);
    
    if (data.cliente.necesita_completar_datos) {
      console.log('Redirigiendo a completar perfil');
      setTimeout(() => {
        window.location.href = '/auth/completar-perfil-google';
      }, 500);
    } else {
      console.log('Datos completos, redirigiendo al home');
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  } else {
    console.error('Datos incompletos recibidos de Google:', data);
  }
}

  /**
   * Completa los datos del usuario de Google
   */
  completarDatosGoogle(data: CompletarDatosGoogleRequest): Observable<CompletarDatosGoogleResponse> {
    return this.http.post<CompletarDatosGoogleResponse>(`${envs.apiUrl}/auth/completar-datos-google`, data).pipe(
      tap(response => {
        if (response.success && response.data) {
          // Actualizar el usuario actual
          this.currentUserSubject.next(response.data.cliente);
        }
      })
    );
  }

  // MÉTODOS EXISTENTES CONTINUOS...
  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${envs.apiUrl}/auth/profile`).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.currentUserSubject.next(response.data.cliente);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${envs.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.clearAuthData();
      })
    );
  }

  requestPasswordReset(data: RequestPasswordResetRequest): Observable<RequestPasswordResetResponse> {
    return this.http.post<RequestPasswordResetResponse>(`${envs.apiUrl}/auth/request-password-reset`, data);
  }

  verifyResetCode(data: VerifyResetCodeRequest): Observable<VerifyResetCodeResponse> {
    return this.http.post<VerifyResetCodeResponse>(`${envs.apiUrl}/auth/verify-reset-code`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${envs.apiUrl}/auth/reset-password`, data);
  }

  updateProfile(data: UpdateProfileRequest): Observable<UpdateProfileResponse> {
    return this.http.put<UpdateProfileResponse>(`${envs.apiUrl}/auth/profile`, data).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.currentUserSubject.next(response.data.cliente);
        }
      })
    );
  }

  // MÉTODOS AUXILIARES
  private setAuthData(token: string, cliente: Cliente): void {
    localStorage.setItem('token', token);
    this.currentUserSubject.next(cliente);
    this.isAuthenticatedSubject.next(true);
  }

  public clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private hasValidToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const expiration = localStorage.getItem('token_expiration');
      
      if (!token) return false;
      
      if (expiration) {
        return new Date() < new Date(expiration);
      }
      
      return true;

    }
    return false
  }

  private loadUserProfile(): void {
    this.getProfile().subscribe({
      error: () => {
        this.clearAuthData();
      }
    });
  }

  getCurrentUser(): Cliente | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUserName(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.nombre : null;
  }
}