import type { SubscriptionPlan } from "./subscription";

export const mockPlans: SubscriptionPlan[] = [
  {
    _id: '1',
    name: 'basic',
    displayName: 'Starter Plan',
    description: 'Perfect for beginners starting with AI prompts',
    isFree: true,
    isActive: true,
    tier: 1,
    levelRequired: 'Newbie',
    pricing: {
      monthly: 0,
      yearly: 0,
      formatted: {
        monthly: '$0',
        yearly: '$0'
      }
    },
    currency: 'USD',
    limits: {
      promptsLimit: 20,
      apiCallsLimit: 100,
      storageLimit: 100,
      maxImageSize: 5,
      maxImagesPerPrompt: 5,
      maxCommunities: 2,
      canCreatePrivate: true,
      canExport: false,
      maxPromptLength: 1000,
    },
    features: [
      { 
        name: 'Create Public Prompts', 
        included: true,
        description: 'Create and share public prompts'
      },
      { 
        name: 'Join Communities', 
        included: true,
        description: 'Join up to 2 communities'
      },
      { 
        name: 'Image Uploads', 
        included: true,
        description: 'Upload images with prompts'
      },
      { 
        name: 'Private Prompts', 
        included: true,
        description: 'Create private prompts'
      },
      { 
        name: 'Export Features', 
        included: false,
        description: 'Export prompts and data'
      }
    ],
    supportedGateways: [
      { name: 'free', displayName: 'Free Plan' }
    ]
  },
  {
    _id: '2',
    name: 'standard',
    displayName: 'Creator Plan',
    description: 'For content creators and regular users',
    isFree: false,
    isActive: true,
    tier: 2,
    levelRequired: 'Contributor',
    pricing: {
      monthly: 9.99,
      yearly: 99.99,
      formatted: {
        monthly: '$9.99',
        yearly: '$99.99'
      }
    },
    currency: 'USD',
    limits: {
      promptsLimit: 100,
      apiCallsLimit: 1000,
      storageLimit: 1024,
      maxImageSize: 10,
      maxImagesPerPrompt: 10,
      maxCommunities: 5,
      canCreatePrivate: true,
      canExport: true,
      maxPromptLength: 5000,
    },
    features: [
      { 
        name: 'Create Public Prompts', 
        included: true,
        description: 'Create and share public prompts'
      },
      { 
        name: 'Join Communities', 
        included: true,
        description: 'Join up to 5 communities'
      },
      { 
        name: 'Image Uploads', 
        included: true,
        description: 'Upload higher resolution images'
      },
      { 
        name: 'Private Prompts', 
        included: true,
        description: 'Create unlimited private prompts'
      },
      { 
        name: 'Export Features', 
        included: true,
        description: 'Export prompts and data'
      }
    ],
    supportedGateways: [
      { name: 'stripe', displayName: 'Stripe' },
      { name: 'paypal', displayName: 'PayPal' }
    ]
  },
  {
    _id: '3',
    name: 'premium',
    displayName: 'Pro Plan',
    description: 'For professionals and power users',
    isFree: false,
    isActive: true,
    tier: 3,
    levelRequired: 'Pro',
    pricing: {
      monthly: 19.99,
      yearly: 199.99,
      formatted: {
        monthly: '$19.99',
        yearly: '$199.99'
      }
    },
    currency: 'USD',
    limits: {
      promptsLimit: -1, // -1 typically means unlimited
      apiCallsLimit: 10000,
      storageLimit: 5120,
      maxImageSize: 20,
      maxImagesPerPrompt: 20,
      maxCommunities: -1,
      canCreatePrivate: true,
      canExport: true,
      maxPromptLength: 10000,
    },
    features: [
      { 
        name: 'Create Public Prompts', 
        included: true,
        description: 'Create unlimited public prompts'
      },
      { 
        name: 'Join Communities', 
        included: true,
        description: 'Join unlimited communities'
      },
      { 
        name: 'Image Uploads', 
        included: true,
        description: 'Upload highest resolution images'
      },
      { 
        name: 'Private Prompts', 
        included: true,
        description: 'Create unlimited private prompts'
      },
      { 
        name: 'Export Features', 
        included: true,
        description: 'Advanced export capabilities'
      }
    ],
    supportedGateways: [
      { name: 'stripe', displayName: 'Stripe' },
      { name: 'paypal', displayName: 'PayPal' }
    ]
  }
];