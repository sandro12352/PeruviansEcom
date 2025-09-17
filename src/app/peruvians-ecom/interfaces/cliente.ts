// src/app/peruvians-ecom/interfaces/cliente.ts
export interface Cliente {
  id?: number;
  nombre: string;
  dni: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  tipo?: 'registrado' | 'invitado';
}

export interface User {
  id?: number;
  email: string;
}

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
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    cliente: Cliente;
  };
  error?: string;
}

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