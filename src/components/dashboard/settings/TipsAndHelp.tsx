// components/dashboard/TipsAndHelp.tsx
import React from 'react';
import { Book, Video, MessageCircle, Star } from 'lucide-react';

const TipsAndHelp: React.FC = () => {
  const helpResources = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation',
      link: '#'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '#'
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Get help from other users',
      link: '#'
    },
    {
      icon: Star,
      title: 'Best Practices',
      description: 'Tips for creating effective prompts',
      link: '#'
    }
  ];

  const tips = [
    'Use specific and detailed descriptions for better AI results',
    'Experiment with different prompt structures',
    'Save your successful prompts as templates',
    'Use variables to make prompts reusable',
    'Test prompts with different AI models'
  ];

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Tips & Help Center</h2>
      <p className="text-gray-600 mb-8">Get the most out of PromptPal with these resources</p>

      {/* Help Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {helpResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <a
              key={index}
              href={resource.link}
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="p-3 bg-purple-100 rounded-lg">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <Star className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Support */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h3>
        <p className="text-gray-600 mb-4">
          Our support team is here to help you get the most out of PromptPal.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Contact Support
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Schedule a Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsAndHelp;