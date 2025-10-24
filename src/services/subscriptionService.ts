import type { SubscriptionPlan, UsageLimits, CheckoutSessionResponse } from '../types/subscription';
const API_BASE_URL = 'https://promptpal-backend-j5gl.onrender.com/api';

class SubscriptionService {
  private baseURL: string;

  

  constructor() {
    this.baseURL = API_BASE_URL || import.meta.env.VITE_API_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // This ensures cookies are sent with requests
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.message || error.error || 'Request failed');
    }

    return response.json();
  }

  // Get available subscription plans
  async getAvailablePlans(): Promise<SubscriptionPlan[]> {
    return this.request('/subscriptions');
  }

  // Activate free plan
  async activateFreePlan(): Promise<{
    success: boolean;
    message: string;
    plan: string;
    trialEnds: string;
    limits: any;
    features: string[];
  }> {
    return this.request('/subscriptions', { method: 'POST' });
  }

  // Create checkout session for paid plans
  async createCheckoutSession(planId: string, billingPeriod: 'monthly' | 'yearly', gateway: string): Promise<CheckoutSessionResponse> {
    return this.request('/subscriptions/usage', {
      method: 'POST',
      body: JSON.stringify({
        planId,
        billingPeriod,
        gateway
      }),
    });
  }

  // Check usage limits
  async checkUsageLimits(): Promise<UsageLimits> {
    return this.request('/subscriptions/usage');
  }

  // Cancel subscription
  async cancelSubscription(): Promise<{ success: boolean; message: string }> {
    return this.request('/subscriptions/cancel', { method: 'POST' });
  }

  // Get current subscription status
  async getSubscriptionStatus(): Promise<any> {
    return this.request('/subscriptions/status');
  }
}

export const subscriptionService = new SubscriptionService();