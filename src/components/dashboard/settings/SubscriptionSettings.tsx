// components/dashboard/SubscriptionSettings.tsx
import React from 'react';
import { Crown, Check, Star, Zap, Calendar } from 'lucide-react';
import { useSubscription } from '../../../hooks/useSubscription';
import { Link } from 'react-router-dom';

const SubscriptionSettings: React.FC = () => {
  const { usage, cancelSubscription, subscriptionState } = useSubscription();

  const currentPlan = {
    name: 'Pro Plan',
    price: '$15',
    period: 'month',
    status: 'active',
    nextBilling: '2024-02-15',
    features: [
      'Unlimited prompts',
      'Advanced AI models',
      'Priority support',
      'Export capabilities',
      'Team collaboration'
    ]
  };

  const plansData = [
    {
      name: 'Free',
      price: '$0',
      period: 'month',
      features: ['10 prompts/month', 'Basic templates', 'Community support'],
      current: false
    },
    {
      name: 'Pro',
      price: '$15',
      period: 'month',
      features: ['Unlimited prompts', 'All templates', 'Priority support', 'Export features'],
      current: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$45',
      period: 'month',
      features: ['Everything in Pro', 'Custom models', 'Dedicated support', 'API access'],
      current: false
    }
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Subscription Management</h2>
        <p className="text-gray-600">Manage your current plan and billing</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">Current Plan: {currentPlan.name}</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Active
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              You're currently on the {currentPlan.name}. Next billing date: {currentPlan.nextBilling}
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Upgrade Plan
              </button>
              <button 
                onClick={cancelSubscription}
                disabled={subscriptionState === 'cancelling'}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {subscriptionState === 'cancelling' ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{currentPlan.price}</div>
            <div className="text-gray-600">per {currentPlan.period}</div>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Prompts Used</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {usage?.usage.promptsThisMonth || 0}/{usage?.usage.promptsLimit || 50}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${((usage?.usage.promptsThisMonth || 0) / (usage?.usage.promptsLimit || 50)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">API Calls</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {usage?.usage.apiCalls || 0}/{usage?.usage.apiLimit || 1000}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${((usage?.usage.apiCalls || 0) / (usage?.usage.apiLimit || 1000)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">Renewal Date</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {currentPlan.nextBilling}
          </div>
          <p className="text-sm text-gray-600 mt-1">Next billing cycle</p>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plansData.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-2xl p-6 ${
                plan.current
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white'
              } ${plan.popular ? 'relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h4>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.current
                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
          <Link
            to="/dashboard/billing"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Jan 15, 2024</td>
                <td className="px-6 py-4 text-sm text-gray-900">Pro Plan Subscription</td>
                <td className="px-6 py-4 text-sm text-gray-900">$15.00</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Dec 15, 2023</td>
                <td className="px-6 py-4 text-sm text-gray-900">Pro Plan Subscription</td>
                <td className="px-6 py-4 text-sm text-gray-900">$15.00</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettings;