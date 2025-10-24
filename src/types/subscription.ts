export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface PlanLimits {
  promptsLimit: number;
  apiCallsLimit: number;
  storageLimit: number;
  maxImageSize: number;
  maxImagesPerPrompt: number;
  maxCommunities: number;
  canCreatePrivate: boolean;
  canExport: boolean;
  maxPromptLength: number;
}

// types/subscription.ts
export interface SubscriptionPlan {
  _id: string;
  name: string;
  displayName: string;
  description?: string;
  isFree: boolean;
  isActive: boolean;
  tier: number;
  levelRequired: string;
  pricing: {
    monthly: number;
    yearly: number;
    formatted: {
      monthly: string;
      yearly: string;
    };
  };
  currency: string;
  limits: {
    promptsLimit: number;
    apiCallsLimit: number;
    storageLimit: number;
    maxImageSize: number;
    maxImagesPerPrompt: number;
    maxCommunities: number;
    canCreatePrivate: boolean;
    canExport: boolean;
    maxPromptLength: number;
  };
  features: Array<{
    name: string;
    included: boolean;
    description: string;
  }>;
  supportedGateways: Array<{
    name: string;
    displayName: string;
  }>;
}

export interface UsageLimits {
  plan: string;
  userLevel: string;
  usage: {
    promptsCreated: number;
    promptsThisMonth: number;
    promptsLimit: number;
    apiCalls: number;
    apiLimit: number;
    storageUsed: number;
    storageLimit: number;
  };
  canCreatePrompt: boolean;
  features: {
    canCreatePrivate: boolean;
    canExport: boolean;
    maxCommunities: number;
  };
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
  gateway: string;
}

export type SubscriptionState = 
  | 'idle'
  | 'activating'
  | 'processing'
  | 'redirecting'
  | 'active'
  | 'cancelling'
  | 'cancelled'
  | 'error';