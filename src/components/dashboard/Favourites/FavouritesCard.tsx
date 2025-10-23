import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Code, 
  Palette, 
  FileText, 
  MessageSquare,
  Image,
  Bot,
  Database,
  Smartphone,
  Shield,
  Music,
  Video,
  BarChart3,
  Languages,
  Heart,
} from 'lucide-react';
import type { Prompt } from '../../../types/prompt';
import { FaHeart } from 'react-icons/fa';

// Define the type for category colors
type CategoryColorKey = 
  | 'Coding' 
  | 'Design' 
  | 'Writing' 
  | 'Development' 
  | 'AI' 
  | 'Content' 
  | 'Marketing' 
  | 'Analytics' 
  | 'Security';

type CategoryColors = {
  [key in CategoryColorKey]: {
    bg: string;
    text: string;
    badge: string;
    btn: string;
  };
};

const categoryColors: CategoryColors = {
  Coding: { bg: 'bg-violet-50', text: 'text-violet-900', badge: 'bg-violet-100', btn: 'bg-violet-500' },
  Design: { bg: 'bg-amber-50', text: 'text-amber-900', badge: 'bg-amber-100', btn: 'bg-amber-500' },
  Writing: { bg: 'bg-emerald-50', text: 'text-emerald-900', badge: 'bg-emerald-100', btn: 'bg-emerald-500' },
  Development: { bg: 'bg-blue-50', text: 'text-blue-900', badge: 'bg-blue-100', btn: 'bg-blue-500' },
  AI: { bg: 'bg-cyan-50', text: 'text-cyan-900', badge: 'bg-cyan-100', btn: 'bg-cyan-500' },
  Content: { bg: 'bg-green-50', text: 'text-green-900', badge: 'bg-green-100', btn: 'bg-green-500' },
  Marketing: { bg: 'bg-pink-50', text: 'text-pink-900', badge: 'bg-pink-100', btn: 'bg-pink-500' },
  Analytics: { bg: 'bg-orange-50', text: 'text-orange-900', badge: 'bg-orange-100', btn: 'bg-orange-500' },
  Security: { bg: 'bg-red-50', text: 'text-red-900', badge: 'bg-red-100', btn: 'bg-red-500' },
};

// Better type guard that explicitly checks each key
const isValidCategory = (category: string): category is CategoryColorKey => {
  return Object.keys(categoryColors).includes(category);
};

// Alternative approach: use type assertion with proper checking
const getColorScheme = (category: string) => {
  if (isValidCategory(category)) {
    return categoryColors[category];
  }
  return {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    badge: 'bg-gray-100',
    btn: 'bg-gray-500'
  };
};

// Define a minimal prompt interface for the icon function
interface PromptForIcon {
  title: string;
  category: string;
  aiTool: string[];
}

// Icon mapping based on title and category keywords
const getIconFromPrompt = (prompt: PromptForIcon) => {
  const lowerTitle = prompt.title.toLowerCase();
  const category = prompt.category.toLowerCase();
  const aiTool = prompt.aiTool.map(t => t.toLowerCase());

  // Check title keywords first
  if (lowerTitle.includes('react') || lowerTitle.includes('component') || lowerTitle.includes('javascript') || lowerTitle.includes('typescript')) {
    return <Code className="w-4 h-4" />;
  }
  if (lowerTitle.includes('design') || lowerTitle.includes('ui') || lowerTitle.includes('ux') || lowerTitle.includes('figma')) {
    return <Palette className="w-4 h-4" />;
  }
  if (lowerTitle.includes('write') || lowerTitle.includes('blog') || lowerTitle.includes('article') || lowerTitle.includes('content')) {
    return <FileText className="w-4 h-4" />;
  }
  if (lowerTitle.includes('chat') || lowerTitle.includes('assistant') || lowerTitle.includes('conversation')) {
    return <MessageSquare className="w-4 h-4" />;
  }
  if (lowerTitle.includes('image') || lowerTitle.includes('photo') || lowerTitle.includes('art') || lowerTitle.includes('graphic')) {
    return <Image className="w-4 h-4" />;
  }
  if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning') || lowerTitle.includes('neural')) {
    return <Bot className="w-4 h-4" />;
  }
  if (lowerTitle.includes('database') || lowerTitle.includes('sql') || lowerTitle.includes('query')) {
    return <Database className="w-4 h-4" />;
  }
  if (lowerTitle.includes('mobile') || lowerTitle.includes('app') || lowerTitle.includes('ios') || lowerTitle.includes('android')) {
    return <Smartphone className="w-4 h-4" />;
  }
  if (lowerTitle.includes('security') || lowerTitle.includes('privacy') || lowerTitle.includes('encryption')) {
    return <Shield className="w-4 h-4" />;
  }
  if (lowerTitle.includes('music') || lowerTitle.includes('audio') || lowerTitle.includes('song')) {
    return <Music className="w-4 h-4" />;
  }
  if (lowerTitle.includes('video') || lowerTitle.includes('film') || lowerTitle.includes('movie')) {
    return <Video className="w-4 h-4" />;
  }
  if (lowerTitle.includes('analytics') || lowerTitle.includes('data') || lowerTitle.includes('chart') || lowerTitle.includes('metrics')) {
    return <BarChart3 className="w-4 h-4" />;
  }
  if (lowerTitle.includes('translation') || lowerTitle.includes('language')) {
    return <Languages className="w-4 h-4" />;
  }

  // Check category
  if (category.includes('coding') || category.includes('development')) {
    return <Code className="w-4 h-4" />;
  }
  if (category.includes('design')) {
    return <Palette className="w-4 h-4" />;
  }
  if (category.includes('writing') || category.includes('content')) {
    return <FileText className="w-4 h-4" />;
  }
  if (category.includes('ai')) {
    return <Bot className="w-4 h-4" />;
  }
  if (category.includes('analytics')) {
    return <BarChart3 className="w-4 h-4" />;
  }
  if (category.includes('security')) {
    return <Shield className="w-4 h-4" />;
  }
  if (category.includes('marketing')) {
    return <MessageSquare className="w-4 h-4" />;
  }

  // Check AI tool
  if (aiTool.includes('dall-e') || aiTool.includes('midjourney') || aiTool.includes('stable diffusion')) {
    return <Image className="w-4 h-4" />;
  }
  if (aiTool.includes('chatgpt') || aiTool.includes('gpt') || aiTool.includes('claude')) {
    return <MessageSquare className="w-4 h-4" />;
  }

  // Default icon
  return <Code className="w-4 h-4" />;
};

interface FavouritesCardProps {
  prompt: Prompt;
  className?: string;
}

export default function FavouritesCard({ 
  prompt,  
  className = "" 
}: FavouritesCardProps) {
  // Use the helper function to safely get color scheme
  const colorScheme = getColorScheme(prompt.category);
  const navigate = useNavigate();

  const icon = getIconFromPrompt(prompt);

  // Format category name for display
  const formatCategory = (category: string) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const handleTryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/dashboard/prompts/${prompt._id}`);
  };

  return (
    <div 
      className={`${colorScheme.bg} rounded-xl border border-gray-300 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full group ${className}`}
    >
      <div className="p-5 flex-1 flex flex-col">
        {/* Header with category and actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`${colorScheme.badge} px-3 py-1.5 rounded-lg flex items-center gap-2`}>
              {icon}
              <span className={`text-sm font-semibold ${colorScheme.text}`}>
                {formatCategory(prompt.category)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between items-start">
          <div className="flex-1">
            {/* Title */}
            <h3 className={`text-xl font-bold ${colorScheme.text} mb-3 group-hover:opacity-80 transition-colors line-clamp-2`}>
              {prompt.title}
            </h3>

            {/* Description (if available) */}
            {prompt.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {prompt.description}
              </p>
            )}
          </div>
          
          {/* Try Button */}
          <div className="mr-5 flex flex-row items-center justify-center gap-3">
            <button
              onClick={handleTryClick}
              className="border-2 border-purple-700 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-colors text-sm font-medium whitespace-nowrap"
            >
              Try
            </button>
            <FaHeart className="w-6 h-6 text-red-600" />
          </div>
        </div>

        {/* Stats and Author */}
        <div className="flex flex-col pt-4 border-gray-200/50 mt-auto">
          <div className="flex flex-row items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-semibold">
                By {prompt.author?.username || 'Unknown'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">
                {prompt.upvotes || 0} likes
              </span>
            </div>
          </div>
          
        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className={`${colorScheme.badge} ${colorScheme.text} px-3 py-1.5 rounded-lg text-sm font-medium capitalize`}
              >
                {tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className={`${colorScheme.badge} ${colorScheme.text} px-3 py-1.5 rounded-lg text-sm font-medium`}>
                +{prompt.tags.length - 3}
              </span>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}