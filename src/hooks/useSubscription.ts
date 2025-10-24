// hooks/useSubscription.ts
import { useState, useEffect, useCallback } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import type  { SubscriptionPlan, UsageLimits, SubscriptionState } from '../types/subscription';

export const useSubscription = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [usage, setUsage] = useState<UsageLimits | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>('idle');

  // Load available plans
  const loadPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const availablePlans = await subscriptionService.getAvailablePlans();
      setPlans(availablePlans);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  }, []);

  // Activate free plan
  const activateFreePlan = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSubscriptionState('activating');
    try {
      const result = await subscriptionService.activateFreePlan();
      setSubscriptionState('active');
      await loadUsageLimits(); // Refresh usage after activation
      return result;
    } catch (err) {
      setSubscriptionState('error');
      setError(err instanceof Error ? err.message : 'Failed to activate free plan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create checkout session
  const createCheckoutSession = useCallback(async (planId: string, billingPeriod: 'monthly' | 'yearly', gateway: string) => {
    setLoading(true);
    setError(null);
    setSubscriptionState('processing');
    try {
      const session = await subscriptionService.createCheckoutSession(planId, billingPeriod, gateway);
      setSubscriptionState('redirecting');
      return session;
    } catch (err) {
      setSubscriptionState('error');
      setError(err instanceof Error ? err.message : 'Failed to create checkout session');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load usage limits
  const loadUsageLimits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const usageData = await subscriptionService.checkUsageLimits();
      setUsage(usageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load usage limits');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel subscription
  const cancelSubscription = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSubscriptionState('cancelling');
    try {
      const result = await subscriptionService.cancelSubscription();
      setSubscriptionState('cancelled');
      await loadUsageLimits(); // Refresh usage after cancellation
      return result;
    } catch (err) {
      setSubscriptionState('error');
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUsageLimits]);

  // Get subscription status
  const getSubscriptionStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const status = await subscriptionService.getSubscriptionStatus();
      return status;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get subscription status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize - load plans and usage on mount
  useEffect(() => {
    loadPlans();
    loadUsageLimits();
  }, [loadPlans, loadUsageLimits]);

  return {
    // State
    plans,
    usage,
    loading,
    error,
    subscriptionState,
    
    // Actions
    activateFreePlan,
    createCheckoutSession,
    cancelSubscription,
    loadUsageLimits,
    getSubscriptionStatus,
    refreshPlans: loadPlans,
    
    // Utility functions
    clearError: () => setError(null),
    resetState: () => {
      setSubscriptionState('idle');
      setError(null);
    }
  };
};