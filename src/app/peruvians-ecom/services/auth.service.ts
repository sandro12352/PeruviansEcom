// src/app/peruvians-ecom/services/auth.service.ts
import { Injectable } from '@angular/core';
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
  UpdateProfileResponse

} from '../interfaces/cliente';
import { envs } from '../../config/envs';

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

  constructor(private http: HttpClient) {
    // Cargar perfil si hay token válido al inicializar el servicio
    if (this.hasValidToken()) {
      this.loadUserProfile();
    }
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${envs.apiUrl}/auth/register`, data).pipe(
      tap(response => {
        if (response.success && response.data) {
          // Guardar token y actualizar estado
          this.setAuthData(response.data.token, response.data.cliente);
        }
      })
    );
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${envs.apiUrl}/auth/login`, data).pipe(
      tap(response => {
        if (response.success && response.data) {
          // Guardar token y actualizar estado
          this.setAuthData(response.data.token, response.data.cliente);
        }
      })
    );
  }

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

  // NUEVOS MÉTODOS PARA RECUPERACIÓN DE CONTRASEÑA
  requestPasswordReset(data: RequestPasswordResetRequest): Observable<RequestPasswordResetResponse> {
    return this.http.post<RequestPasswordResetResponse>(`${envs.apiUrl}/auth/request-password-reset`, data);
  }

  verifyResetCode(data: VerifyResetCodeRequest): Observable<VerifyResetCodeResponse> {
    return this.http.post<VerifyResetCodeResponse>(`${envs.apiUrl}/auth/verify-reset-code`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${envs.apiUrl}/auth/reset-password`, data);
  }

  // Métodos para manejar el estado
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
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');
    
    if (!token) return false;
    
    if (expiration) {
      return new Date() < new Date(expiration);
    }
    
    return true; // Si no hay fecha de expiración, asumir que es válido
  }

  private loadUserProfile(): void {
    this.getProfile().subscribe({
      error: () => {
        // Si falla cargar el perfil, limpiar datos
        this.clearAuthData();
      }
    });
  }

  // Métodos públicos para obtener datos actuales
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
  updateProfile(data: UpdateProfileRequest): Observable<UpdateProfileResponse> {
  return this.http.put<UpdateProfileResponse>(`${envs.apiUrl}/auth/profile`, data).pipe(
    tap(response => {
      if (response.success && response.data) {
        // Actualizar el usuario actual en el BehaviorSubject
        this.currentUserSubject.next(response.data.cliente);
      }
    })
  );
}
}