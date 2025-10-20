
export interface User {
  id: string;
  googleId: string | null;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  isEmailVerified: boolean;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  username: string;
  confirmPassword?: string;
  profession?: string;
  level?: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: User | null;
  message: string;
  statusCode: number;
}

export interface OTPResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  message: string;
  statusCode: number;
}

export interface ProfileResponse {
  success: boolean;
  user?: User;
  message: string;
  statusCode: number;
}

export interface BasicResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
