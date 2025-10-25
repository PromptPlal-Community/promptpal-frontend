
export interface User {
  id: string;
  googleId: string | null;
  email: string;
  name: string;
  username?: string;
  profile?: UserProfile;
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


export interface UserProfile {
  bio?: string;
  dob?: Date;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  location?: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  instagram?: string;
}

export interface UpdateProfileData {
  name?: string;
  username?: string;
  email?: string;
  
  profile?: {
    bio?: string;
    dob?: Date | string; // Allow string for form inputs
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    location?: string;
    socialLinks?: {
      website?: string;
      twitter?: string;
      github?: string;
      linkedin?: string;
      portfolio?: string;
      instagram?: string;
    };
  };
  
  avatar?: string;
  
  preferences?: {
    language?: string;
    timezone?: string;
    emailNotifications?: boolean;
    theme?: 'light' | 'dark' | 'auto';
  };
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: User;
  updatedFields: string[];
}

export interface UpdateProfileError {
  success: false;
  error: string;
  fieldErrors?: {
    [key: string]: string;
  };
  code?: 'EMAIL_EXISTS' | 'USERNAME_EXISTS' | 'VALIDATION_ERROR' | 'SERVER_ERROR';
}

export interface ProfileFormData {
  name: string;
  username: string;
  email: string;
  bio: string;
  dob: string; 
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  location: string;
  socialLinks: {
    website: string;
    twitter: string;
    github: string;
    linkedin: string;
    portfolio: string;
    instagram: string;
  };
  avatar: string;
}
