// src/app/peruvians-ecom/interfaces/cliente.ts
export interface Cliente {
  id?: number;
  nombre: string;
  dni: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  tipo?: 'registrado' | 'invitado';
  necesita_completar_datos?: boolean;
}

export interface User {
  id?: number;
  email: string;
  avatar?: string;
  provider?: string;
  is_google_user?: boolean;
}

// INTERFACES EXISTENTES...
export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  dni: string;
  telefono?: string;
  direccion?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    cliente: Cliente;
    token: string;
    expires_in_minutes: number;
  };
  errors?: any;
  suggestion?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    cliente: Cliente;
    token: string;
    expires_in_minutes: number;
  };
  errors?: any;
  suggestion?: string;
  is_google_user?: boolean;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    cliente: Cliente;
    google_info?: any;
  };
  error?: string;
}

// NUEVAS INTERFACES PARA GOOGLE OAUTH
export interface GoogleRedirectResponse {
  success: boolean;
  redirect_url: string;
  message: string;
}

export interface GoogleAuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    cliente: Cliente;
    token: string;
    expires_in_minutes: number;
    google_info: {
      is_google_user: boolean;
      has_avatar: boolean;
      needs_profile_completion: boolean;
      account_created: string;
    };
  };
  redirect_to_login?: boolean;
}

export interface CompletarDatosGoogleRequest {
  dni: string;
  telefono?: string;
  direccion?: string;
  nombre?: string;
}

export interface CompletarDatosGoogleResponse {
  success: boolean;
  message: string;
  data?: {
    cliente: Cliente;
  };
  errors?: any;
}

// RESTO DE INTERFACES EXISTENTES...
export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface RequestPasswordResetResponse {
  success: boolean;
  message: string;
  expires_in_minutes?: number;
  errors?: any;
}

export interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface VerifyResetCodeResponse {
  success: boolean;
  message: string;
  errors?: any;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  errors?: any;
}

export interface UpdateProfileRequest {
  nombre?: string;
  telefono?: string;
  direccion?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: {
    cliente: Cliente;
  };
  errors?: any;
}

export interface ContactRequest {
  nombre: string;
  email: string;
  celular: string;
  mensaje: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: any;
}