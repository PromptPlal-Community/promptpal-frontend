// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import type { LoginCredentials, RegisterData } from '../types/auth';
import type { User } from '../types/auth';
import { useMessage } from './useMessage';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Add user state
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  // Load user on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = async (
    credentials: LoginCredentials,
    successMessage: string,
    redirectPath: string
  ): Promise<boolean> => {
    setLoading(true);
    
    try {
      const email = credentials.email || null;
      const username = credentials.username || null;
      
      const response = await authService.signIn(email, credentials.password, username);
            
      if (!response.success) {
        if (response.statusCode === 403 && response.message.includes('not verified')) {
          showMessage("Please enter the OTP sent to your email to verify your account.", "info");
          navigate('/verify', { 
            state: { 
              email: credentials.email,
              message: "Please enter the OTP sent to your email to verify your account.",
              fromLogin: true
            } 
          });
          return true;
        }
        showMessage(response.message || 'Login failed', 'error');
        return false;
      }

      // Update user state after successful login
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);

      showMessage(successMessage, 'success');
      setTimeout(() => navigate(redirectPath), 1500);
      return true;
      
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Something went wrong';
      showMessage(errorMessage, 'error');
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
        showMessage(response.message || 'Registration failed', 'error');
        return false;
      }

      showMessage(successMessage, 'success');

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
      showMessage(errorMessage, 'error');
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
      setUser(null); // Clear user state
      showMessage('Logged out successfully', 'success');
    } catch (error: unknown) {
      console.error('Logout error:', error);
      setUser(null); // Clear user state even on error
      showMessage('Logged out successfully', 'success');
    } finally {
      navigate('/login');
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);

      if (!response.success) {
        showMessage(response.message || 'Failed to send reset link', 'error');
        return false;
      }

      showMessage('Reset link sent successfully!', 'success');
      navigate('/passwordverify', { state: { email } });
      return true;
    } catch (error: unknown) {
      console.error('Forgot password error:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Something went wrong';
      showMessage(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authService.resetPassword(email, newPassword);

      if (!response.success) {
        showMessage(response.message || 'Failed to reset password', 'error');
        return false;
      }

      showMessage('Password reset successfully!', 'success');
      navigate('/login');
      return true;

    } catch (error: unknown) {
      console.error('Reset password error:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Something went wrong';
      showMessage(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated();
  };

  const getCurrentUser = (): User | null => {
    return authService.getCurrentUser();
  };

  const googleLogin = (): void => {
    // Store current location to return to after login
    sessionStorage.setItem('returnUrl', window.location.pathname);
    
    // Redirect to Google auth
    authService.googleAuthRedirect();
  };

  // Handle Google callback after redirect
  const handleGoogleCallback = async (): Promise<boolean> => {
    setLoading(true);
    
    try {
      const response = await authService.handleGoogleCallback();
      
      if (!response.success) {
        showMessage(response.message || 'Google authentication failed', 'error');
        return false;
      }

      // Update user state after successful Google login
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);

      showMessage('Google login successful!', 'success');

      // Redirect to stored location or dashboard
      const returnUrl = sessionStorage.getItem('returnUrl') || '/dashboard';
      sessionStorage.removeItem('returnUrl');
      navigate(returnUrl);
      
      return true;
    } catch (error: unknown) {
      console.error('Google callback error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      showMessage(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const googleRegister = (): void => {
    // Store current location to return to after registration
    sessionStorage.setItem('returnUrl', window.location.pathname);

    // Redirect to Google auth
    authService.googleAuthRedirect();
  };

  // Link Google account
  const linkGoogleAccount = async (): Promise<boolean> => {
    setGoogleLoading(true);
    
    try {
      const response = await authService.linkGoogleAccount();
      
      if (!response.success) {
        showMessage(response.message || 'Failed to link Google account', 'error');
        return false;
      }

      // Update user state after linking
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);

      showMessage('Google account linked successfully!', 'success');
      return true;
      
    } catch (error: unknown) {
      console.error('Google link error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to link Google account';
      showMessage(errorMessage, 'error');
      return false;
    } finally {
      setGoogleLoading(false);
    }
  };

  // Check if Google account is linked
  const hasGoogleAccount = (): boolean => {
    return authService.hasGoogleAccount();
  };

  return {
    loading,
    googleLoading,
    user,
    login,
    register,
    logout,
    googleLogin,
    linkGoogleAccount,
    hasGoogleAccount,
    isAuthenticated,
    getCurrentUser,
    handleGoogleCallback,
    googleRegister,
    forgotPassword,
    resetPassword
  };
};