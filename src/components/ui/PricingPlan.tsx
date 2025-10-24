import { Check, Star, Crown, Zap, Users, Shield, Clock, Download, BarChart3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function PricingPlan() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'month',
      description: 'Perfect for individuals getting started with AI prompts',
      features: [
        { text: 'Up to 20 prompts per month', icon: Sparkles },
        { text: 'Basic prompt templates', icon: Download },
        { text: 'Community support', icon: Users },
        { text: 'Standard response quality', icon: Zap },
        { text: '1 workspace', icon: Star }
      ],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'from-gray-50 to-gray-100/50'
    },
    {
      name: 'Pro',
      price: 15,
      period: 'month',
      description: 'Ideal for professionals and content creators',
      features: [
        { text: 'Up to 500 prompts per month', icon: Sparkles },
        { text: 'Full prompt template library', icon: Download },
        { text: 'Advanced refinement tools', icon: Zap },
        { text: 'Analytics & version history', icon: BarChart3 },
        { text: 'Export & save prompts', icon: Download },
        { text: 'Priority email support', icon: Clock },
        { text: '5 workspaces', icon: Users }
      ],
      cta: 'Start Free Trial',
      popular: true,
      gradient: 'from-purple-50 to-blue-50/50'
    },
    {
      name: 'Executive',
      price: 20,
      period: 'month',
      description: 'For teams and power users needing maximum capabilities',
      features: [
        { text: 'Unlimited prompts', icon: Sparkles },
        { text: 'All premium templates + early access', icon: Crown },
        { text: 'Advanced AI models & customization', icon: Zap },
        { text: 'Advanced analytics & insights', icon: BarChart3 },
        { text: 'Team collaboration features', icon: Users },
        { text: 'Priority 24/7 support', icon: Shield },
        { text: 'Unlimited workspaces', icon: Star },
        { text: 'Custom onboarding & training', icon: Crown }
      ],
      cta: 'Start Free Trial',
      popular: false,
      gradient: 'from-blue-50 to-purple-50/50'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your workflow. Start free and upgrade as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
            <button className="px-6 py-2 rounded-md font-medium bg-purple-600 text-white shadow-sm">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-md font-medium text-gray-600 hover:text-gray-900">
              Yearly <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-purple-500 shadow-xl scale-105'
                  : 'border-gray-200 shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`bg-gradient-to-br ${plan.gradient} rounded-2xl p-8 h-full flex flex-col`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Features List */}
                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <feature.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                to='/dashboard/subscriptions'
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                      : plan.price === 0
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              All plans include:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure data encryption</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span>99.9% uptime guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Download className="w-4 h-4 text-green-500" />
                <span>Regular feature updates</span>
              </div>
            </div>
          </div>

          {/* FAQ CTA */}
          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              Need help choosing the right plan?
            </p>
            <Link
              to='/pricing'
              className="text-purple-600 hover:text-purple-700 font-semibold underline items-center justify-center">
              Compare all features →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPlan;