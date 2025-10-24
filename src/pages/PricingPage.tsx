// components/pricing/PricingPage.tsx
import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Users, 
  Sparkles,  
  Globe, 
  Download, 
  Image,  
  Infinity as Infinite,
  TrendingUp,
  Award,
  Rocket,
  Heart
} from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { useAuth } from '../hooks/useAuth';
import { PageContainer } from '../components/layout/PageContainer';
import type { SubscriptionPlan } from '../types/subscription';
import { mockPlans } from '../types/mockPlan';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/ui/Footer';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { 
    loading: plansLoading, 
    error, 
    activateFreePlan, 
    createCheckoutSession,
    subscriptionState 
  } = useSubscription();
  const { user } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      // Use mock data for development, but you can replace with actual API call
      // await loadPlans(); // Uncomment this when you want to use real API
      setPlans(mockPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return 'Free';
    
    const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    });
    
    return formatter.format(price);
  };

  const getSavings = (monthlyPrice: number, yearlyPrice: number) => {
    if (monthlyPrice === 0) return null;
    
    const yearlyTotal = yearlyPrice;
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyTotal;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      // Redirect to login or show login modal
      window.location.href = '/auth/login';
      return;
    }

    try {
      if (plan.isFree) {
        await activateFreePlan();
        // Handle successful free plan activation
        console.log('Free plan activated successfully!');
      } else {
        const session = await createCheckoutSession(plan._id, billingCycle, plan.supportedGateways[0]?.name || 'stripe');
        // Redirect to checkout page
        if (session.url) {
          window.location.href = session.url;
        }
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      // Error is already handled in the hook
    }
  };

  const getPlanIcon = (tier: number) => {
    switch (tier) {
      case 1: return <Sparkles className="w-8 h-8" />;
      case 2: return <Zap className="w-8 h-8" />;
      case 3: return <Crown className="w-8 h-8" />;
      default: return <Star className="w-8 h-8" />;
    }
  };

  const getLimitDisplay = (limit: number, unit: string = '') => {
    if (limit === -1) return <Infinite className="w-4 h-4 inline" />;
    if (limit === 0) return 'Unlimited';
    return `${limit}${unit}`;
  };

//   const getCurrentPrice = (plan: SubscriptionPlan) => {
//     return billingCycle === 'monthly' ? plan.pricing.monthly : plan.pricing.yearly;
//   };

  const getCurrentFormattedPrice = (plan: SubscriptionPlan) => {
    return billingCycle === 'monthly' ? plan.pricing.formatted.monthly : plan.pricing.formatted.yearly;
  };

  const isLoading = loading || plansLoading;
  const isProcessing = subscriptionState === 'activating' || subscriptionState === 'processing';

  if (isLoading) {
    return (
      <PageContainer>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </PageContainer>
    );
  }

  return (
<>
<Navbar/>
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Choose Your Perfect Plan
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start for free and upgrade as you grow. All plans include access to our core features.
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>

            {/* Currency Toggle - Note: This is now decorative since currency comes from user preferences */}
            <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-md font-medium text-sm ${
                  currency === 'USD'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-4 py-2 rounded-md font-medium text-sm ${
                  currency === 'NGN'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                NGN
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto mb-6">
              {error}
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan) => {
            //   const price = getCurrentPrice(plan);
              const formattedPrice = getCurrentFormattedPrice(plan);
              const savings = getSavings(plan.pricing.monthly, plan.pricing.yearly);
              const isPopular = plan.tier === 2;

              return (
                <div
                  key={plan._id}
                  className={`relative rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    isPopular
                      ? 'border-purple-500 bg-white shadow-xl scale-105'
                      : 'border-gray-200 bg-white shadow-lg'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className="flex justify-center mb-4">
                        <div className={`p-3 rounded-2xl ${
                          plan.tier === 1 ? 'bg-blue-100 text-blue-600' :
                          plan.tier === 2 ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {getPlanIcon(plan.tier)}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.displayName}
                      </h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-gray-900">
                            {plan.isFree ? 'Free' : formattedPrice}
                          </span>
                          {!plan.isFree && (
                            <span className="text-gray-500">
                              /{billingCycle === 'monthly' ? 'month' : 'year'}
                            </span>
                          )}
                        </div>
                        {savings && billingCycle === 'yearly' && !plan.isFree && (
                          <div className="text-green-600 text-sm font-medium mt-1">
                            Save {formatPrice(savings.savings, plan.currency)} ({savings.percentage}%)
                          </div>
                        )}
                      </div>

                      {/* Level Requirement */}
                      <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        <Award className="w-4 h-4" />
                        {plan.levelRequired} Level
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <h4 className="font-semibold text-gray-900">What's included:</h4>
                      <div className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            {feature.included ? (
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                              {feature.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Limits */}
                    <div className="border-t border-gray-200 pt-6 mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Plan Limits:</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-gray-400" />
                          <span>{getLimitDisplay(plan.limits.promptsLimit)} prompts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span>{getLimitDisplay(plan.limits.apiCallsLimit)} API calls</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Image className="w-4 h-4 text-gray-400" />
                          <span>{getLimitDisplay(plan.limits.storageLimit, 'MB')} storage</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{getLimitDisplay(plan.limits.maxCommunities)} communities</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSubscribe(plan)}
                      disabled={isProcessing}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                        isPopular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                          : plan.isFree
                          ? 'bg-gray-900 hover:bg-gray-800 text-white'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : plan.isFree ? (
                        'Get Started Free'
                      ) : (
                        `Upgrade to ${plan.displayName}`
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "The Starter plan is completely free forever. Paid plans come with a 14-day money-back guarantee."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel anytime. No questions asked."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Our team is here to help you choose the right plan and answer any questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Sales
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
    <Footer/>
</>
  );
};

export default PricingPage;