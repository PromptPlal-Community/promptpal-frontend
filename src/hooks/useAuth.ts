import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/authService';
import type { LoginCredentials, RegisterData } from '../types/auth';
import type { User } from '../types/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (
    credentials: LoginCredentials,
    successMessage: string,
    redirectPath: string
  ): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Fix: Convert undefined to null to match authService.signIn signature
      const email = credentials.email || null;
      const username = credentials.username || null;
      
      const response = await authService.signIn(email, credentials.password, username);
            
      if (!response.success) {
        if (response.statusCode === 403 && response.message.includes('not verified')) {
          toast.success('Please verify your email to continue');
          navigate('/verify', { 
            state: { 
              email: credentials.email,
              message: "Please enter the OTP sent to your email to verify your account.",
              fromLogin: true
            } 
          });
          return true;
        }
        
        toast.error(response.message || 'Login failed');
        return false;
      }
      
      toast.success(successMessage);
      setTimeout(() => navigate(redirectPath), 1500);
      return true;
      
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Something went wrong';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    userData: RegisterData,
    successMessage: string,
    redirectPath: string
  ): Promise<boolean> => {
    setLoading(true);
    
    try {
      const response = await authService.register({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      
      if (!response.success) {
        toast.error(response.message || 'Registration failed');
        return false;
      }
      
      toast.success(successMessage);
      
      const finalRedirectPath = redirectPath === '/dashboard' ? '/verify' : redirectPath;
      setTimeout(() => navigate(finalRedirectPath, { 
        state: { 
          email: userData.email,
          message: "Please enter the OTP sent to your email to verify your account.",
          fromLogin: false
        } 
      }), 1500);
      return true;
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Something went wrong';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    return await handleLogin(credentials, 'Login successful!', '/dashboard');
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    return await handleRegister(userData, 'Registration successful! Please verify your email.', '/verify');
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      toast.success('Logged out successfully');
    } catch (error: unknown) {
      console.error('Logout error:', error);
      toast.success('Logged out successfully');
    } finally {
      navigate('/login');
    }
  };

  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated();
  };

  const getCurrentUser = (): User | null => {
    return authService.getCurrentUser();
  };

  return {
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    getCurrentUser,
  };
};