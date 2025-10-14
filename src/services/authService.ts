import axios, { type AxiosError } from 'axios';
import Cookies from "js-cookie"
import type { User } from '../types/auth';
import type { RegisterData, AuthResponse, OTPResponse, ProfileResponse, BasicResponse } from '../types/auth';

const Api = 'https://promptpal-backend-j5gl.onrender.com/api';



// Define interface for error response data
interface ErrorResponseData {
  message?: string;
  [key: string]: unknown;
}

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: true,
  sameSite: 'strict' as const,
  path: '/',
};

// Create axios instance with proper typing
const authApi = axios.create({
  baseURL: Api,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token from cookies if present
authApi.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper functions for cookie management
const cookieService = {
  setToken: (token: string) => {
    Cookies.set('accessToken', token, COOKIE_OPTIONS);
  },
  
  setRefreshToken: (refreshToken: string) => {
    Cookies.set('refreshToken', refreshToken, COOKIE_OPTIONS);
  },
  
  getToken: (): string | undefined => {
    return Cookies.get('accessToken');
  },
  
  getRefreshToken: (): string | undefined => {
    return Cookies.get('refreshToken');
  },
  
  clearAuth: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');
  },
  
  setUser: (user: User) => {
    Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
  },
  
  getUser: (): User | null => {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) : null;
  }
};

const authService = {
  // --- Register User ---
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      // Transform data to match backend expectations
      const backendData = {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        profession: userData.profession,
        level: userData.level,
      };

      const response = await authApi.post('/auth/register', backendData);

      // Store tokens in cookies if they exist
      if (response.data.accessToken || response.data.token) {
        const token = response.data.accessToken || response.data.token;
        cookieService.setToken(token);
      }
      if (response.data.refreshToken) {
        cookieService.setRefreshToken(response.data.refreshToken);
      }
      if (response.data.user) {
        cookieService.setUser(response.data.user);
      }

      return {
        success: true,
        accessToken: response.data.accessToken || response.data.token,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
        message: response.data.message || 'Registration successful.',
        statusCode: response.status,
      };
    } catch (error) {
      console.error("AuthService register error:", error);
      const axiosError = error as AxiosError<ErrorResponseData>;
      
      if (axiosError.response) {
        return {
          success: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          message: axiosError.response.data?.message || 'Registration failed.',
          statusCode: axiosError.response.status,
        };
      } else if (axiosError.request) {
        return {
          success: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          message: 'No response from server. Please check your network connection.',
          statusCode: 0,
        };
      }
      
      return {
        success: false,
        accessToken: null,
        refreshToken: null,
        user: null,
        message: axiosError.message || 'Unexpected client-side error during registration.',
        statusCode: 0,
      };
    }
  },

  // --- Sign In ---
  signIn: async (email: string | null, password: string, username: string | null = null): Promise<AuthResponse> => {
    const payload = email ? { email, password } : { username, password };
    
    try {
      const response = await authApi.post('/auth/login', payload);

      // Store tokens and user data in cookies
      if (response.data.accessToken) {
        cookieService.setToken(response.data.accessToken);
      }
      if (response.data.refreshToken) {
        cookieService.setRefreshToken(response.data.refreshToken);
      }
      if (response.data.user) {
        cookieService.setUser(response.data.user);
      }

      return {
        success: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
        message: response.data.message || 'Login successful.',
        statusCode: response.status,
      };
    } catch (error) {
      console.error("AuthService signIn error:", error);
      const axiosError = error as AxiosError<ErrorResponseData>;
      
      if (axiosError.response) {
        return {
          success: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          message: axiosError.response.data?.message || 'Login failed.',
          statusCode: axiosError.response.status,
        };
      } else if (axiosError.request) {
        return {
          success: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          message: 'No response from server. Please check your network connection.',
          statusCode: 0,
        };
      }
      
      return {
        success: false,
        accessToken: null,
        refreshToken: null,
        user: null,
        message: axiosError.message || 'Unexpected client-side error.',
        statusCode: 0,
      };
    }
  },

  // --- Verify OTP ---
  verifyOtp: async (identifier: string, otp: string): Promise<OTPResponse> => {
    const payload = { email: identifier, otp };
    
    try {
      const response = await authApi.post('/auth/verify-email', payload);

      // Store tokens in cookies if they exist
      if (response.data.accessToken) {
        cookieService.setToken(response.data.accessToken);
      }
      if (response.data.refreshToken) {
        cookieService.setRefreshToken(response.data.refreshToken);
      }
      if (response.data.user) {
        cookieService.setUser(response.data.user);
      }
      
      return {
        success: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
        message: response.data.message || 'OTP verified successfully.',
        statusCode: response.status
      };
    } catch (error) {
      console.error("AuthService verifyOtp error:", error);
      const axiosError = error as AxiosError<ErrorResponseData>;
      
      if (axiosError.response) {
        return { 
          success: false, 
          message: axiosError.response.data?.message || 'Failed to verify OTP.', 
          statusCode: axiosError.response.status 
        };
      }
      
      return { 
        success: false, 
        message: axiosError.message || 'An unexpected error occurred during OTP verification.',
        statusCode: 0
      };
    }
  },

  // --- Request OTP ---
  requestOtp: async (identifier: string): Promise<BasicResponse> => {
    const payload = { email: identifier };
    
    try {
      console.log("Sending OTP request with payload:", payload);
      const response = await authApi.post('/auth/resend-otp', payload);
      console.log("OTP resend response:", response.data);
      
      return {
        success: true,
        message: response.data.message || 'OTP sent successfully.',
        statusCode: response.status
      };
    } catch (error) {
      console.error("AuthService requestOtp error:", error);
      const axiosError = error as AxiosError<ErrorResponseData>;
      
      if (axiosError.response) {
        console.error("Response error data:", axiosError.response.data);
        console.error("Response status:", axiosError.response.status);
        return { 
          success: false, 
          message: axiosError.response.data?.message || 'Failed to request OTP.', 
          statusCode: axiosError.response.status 
        };
      }
      
      return { 
        success: false, 
        message: axiosError.message || 'An unexpected error occurred during OTP request.',
        statusCode: 0
      };
    }
  },

  // --- Get User Profile ---
  getUserProfile: async (): Promise<ProfileResponse | null> => {
    try {
      const token = cookieService.getToken();
      if (!token) {
        console.warn("AuthService: No token found for getUserProfile.");
        return null;
      }

      const response = await authApi.get('/auth/profile');
      
      // Update user data in cookies
      if (response.data) {
        cookieService.setUser(response.data);
      }
      
      return {
        success: true,
        user: response.data,
        message: response.data.message || 'Profile fetched successfully.',
        statusCode: response.status
      };
    } catch (error) {
      console.error("AuthService getUserProfile failed:", error);
      const axiosError = error as AxiosError<ErrorResponseData>;
      
      if (axiosError.response?.status === 401) {
        cookieService.clearAuth();
        return { 
          success: false, 
          message: "Authentication expired. Please log in again.", 
          statusCode: 401 
        };
      }
      
      return { 
        success: false, 
        message: axiosError.response?.data?.message || 'Failed to fetch user profile.', 
        statusCode: axiosError.response?.status || 0 
      };
    }
  },

  // --- Refresh User Data ---
  refreshUserData: async (): Promise<User | null> => {
    try {
      const profileResponse = await authService.getUserProfile();
      if (profileResponse?.success && profileResponse.user) {
        cookieService.setUser(profileResponse.user);
        return profileResponse.user;
      }
      return null;
    } catch (error) {
      console.error("AuthService refreshUserData failed:", error);
      return null;
    }
  },

  // --- Check if user is verified ---
  isUserVerified: (): boolean => {
    const user = cookieService.getUser();
    return !!(user && (user.isVerified || user.isEmailVerified));
  },

  // --- Forgot Password ---
  forgotPassword: async (email: string | null = null, phoneNumber: string | null = null): Promise<BasicResponse> => {
    const payload = email ? { email } : { phoneNumber };
    
    try {
      const response = await authApi.post('/auth/reset-password', payload);
      
      return {
        success: true,
        message: response.data.message || 'Password reset link sent.',
        statusCode: response.status
      };
    } catch (error) {
      console.error("AuthService forgotPassword error:", error);
      const axiosError = error as AxiosError<ErrorResponseData>;
      
      if (axiosError.response) {
        return { 
          success: false, 
          message: axiosError.response.data?.message || 'Failed to initiate password reset.', 
          statusCode: axiosError.response.status 
        };
      }
      
      return { 
        success: false, 
        message: axiosError.message || 'An unexpected error occurred during password reset request.',
        statusCode: 0
      };
    }
  },

  // --- Social Sign In (Simulated) ---
  socialSignIn: async (provider: string): Promise<BasicResponse> => {
    console.log(`Simulating social sign-in with ${provider}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      message: `${provider} sign-in successful (simulated)!`,
      statusCode: 200
    };
  },

  // --- Refresh Token ---
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/auth/refresh-token', { refreshToken });

      // Update stored tokens in cookies
      if (response.data.accessToken) {
        cookieService.setToken(response.data.accessToken);
      }
      if (response.data.refreshToken) {
        cookieService.setRefreshToken(response.data.refreshToken);
      }
      if (response.data.user) {
        cookieService.setUser(response.data.user);
      }
      
      return {
        success: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
        message: response.data.message || 'Token refreshed successfully.',
        statusCode: response.status,
      };
    } catch (error) {
      console.error("AuthService refreshToken error:", error);
      const axiosError = error as AxiosError<ErrorResponseData>;
      
      if (axiosError.response) {
        return {
          success: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          message: axiosError.response.data?.message || 'Token refresh failed.',
          statusCode: axiosError.response.status,
        };
      }
      
      return {
        success: false,
        accessToken: null,
        refreshToken: null,
        user: null,
        message: axiosError.message || 'Unexpected error during token refresh.',
        statusCode: 0,
      };
    }
  },

  // --- Logout ---
  logout: async (): Promise<BasicResponse> => {
    try {
      const response = await authApi.post('/auth/logout');
      cookieService.clearAuth();
      
      return {
        success: true,
        message: response.data.message || 'Logged out successfully.',
        statusCode: response.status
      };
    } catch (error) {
      console.error("AuthService logout error:", error);
      // Clear cookies even if API call fails
      cookieService.clearAuth();
      
      return {
        success: true,
        message: 'Logged out successfully.',
        statusCode: 200
      };
    }
  },

  // --- Check if user is authenticated ---
  isAuthenticated: (): boolean => {
    return !!cookieService.getToken();
  },

  // --- Get current user ---
  getCurrentUser: (): User | null => {
    return cookieService.getUser();
  },

  // --- Get user verification status ---
  getVerificationStatus: (): { isVerified: boolean; isEmailVerified: boolean } => {
    const user = cookieService.getUser();
    return {
      isVerified: !!(user && user.isVerified),
      isEmailVerified: !!(user && user.isEmailVerified)
    };
  }
};

export default authService;