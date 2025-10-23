import { Link } from "react-router-dom";
import {  
  Download, 
  Eye, 
  User, 
  Star, 
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
  Share,
  ThumbsDown,
  Bookmark,
  ThumbsUp
} from 'lucide-react';
import type { PromptCardProps } from '../../../types/prompt';
import { useAuth } from "../../../hooks/useAuth";

// Define the type for category colors
type CategoryColorKey = 
  | 'Code' 
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
  };
};

const categoryColors: CategoryColors = {
  Code: { bg: 'bg-violet-50', text: 'text-violet-900', badge: 'bg-violet-100' },
  Design: { bg: 'bg-amber-50', text: 'text-amber-900', badge: 'bg-amber-100' },
  Writing: { bg: 'bg-emerald-50', text: 'text-emerald-900', badge: 'bg-emerald-100' },
  Development: { bg: 'bg-blue-50', text: 'text-blue-900', badge: 'bg-blue-100' },
  AI: { bg: 'bg-cyan-50', text: 'text-cyan-900', badge: 'bg-cyan-100' },
  Content: { bg: 'bg-green-50', text: 'text-green-900', badge: 'bg-green-100' },
  Marketing: { bg: 'bg-pink-50', text: 'text-pink-900', badge: 'bg-pink-100' },
  Analytics: { bg: 'bg-orange-50', text: 'text-orange-900', badge: 'bg-orange-100' },
  Security: { bg: 'bg-red-50', text: 'text-red-900', badge: 'bg-red-100' },
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
  if (lowerTitle.includes('coding') || lowerTitle.includes('code') || lowerTitle.includes('react') || lowerTitle.includes('component') || lowerTitle.includes('javascript') || lowerTitle.includes('typescript')) {
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
  if (category.includes('coding') || category.includes('code') || category.includes('development')) {
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

export default function PromptCard({ 
  prompt, 
  onLike,
  onDislike,
  onFavorite,
  onDownload,
  onView,
  onShare,
  onRate,
  interactions,
  className = "" 
}: PromptCardProps) {
  // Use the helper function to safely get color scheme
  const colorScheme = getColorScheme(prompt.category);
  const icon = getIconFromPrompt(prompt);
  const {getCurrentUser} = useAuth();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike?.();
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDislike?.();
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.();
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDownload?.();
  };

  const handleRate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRate?.();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.();
  };

  // Handle card click to track views
  const handleCardClick = () => {
    // Call onView to increment views when the card is clicked
    onView?.();
  };

  const getVoteCount = () => {
    if (interactions?.liked) {
      return (prompt.upvotes || 0) + 1;
    }
    
    if (interactions?.disliked) {
      // If user was previously upvoting, remove that upvote
      const currentUser = getCurrentUser();
      const wasUpvoted = currentUser ? prompt.upvotedBy?.includes(currentUser.id) : false;
      if (wasUpvoted) {
        return Math.max(0, (prompt.upvotes || 0) - 1);
      }
      // Otherwise just show current upvotes
      return prompt.upvotes || 0;
    }
    
    return prompt.upvotes || 0;
  };

  // Format category name for display
  const formatCategory = (category: string) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Link 
      to={`/dashboard/prompts/${prompt._id}`}
      className={`${colorScheme.bg} rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full group cursor-pointer ${className}`}
      onClick={handleCardClick} // Track view when card is clicked
    >
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Header with category and actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 max-w-[70%]">
            <div className={`${colorScheme.badge} px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-2`}>
              {icon}
              <span className={`text-xs sm:text-sm font-semibold ${colorScheme.text} truncate`}>
                {formatCategory(prompt.category)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className="p-1 sm:p-1.5 text-gray-400 hover:text-yellow-500 transition-colors duration-200 rounded-lg hover:bg-white/50"
              title="Add to favorites"
            >
              <Bookmark 
                className={`w-4 h-4 sm:w-5 sm:h-5 ${interactions?.favorited ? 'fill-yellow-500 text-yellow-500' : ''}`} 
              />
            </button>
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded-lg hover:bg-white/50"
              title="Share prompt"
            >
              <Share className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className={`text-lg sm:text-xl font-bold ${colorScheme.text} mb-2 sm:mb-3 group-hover:opacity-80 transition-colors line-clamp-2 leading-tight`}>
          {prompt.title}
        </h3>
        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 flex-1 leading-relaxed text-sm sm:text-base">
          {prompt.description}
        </p>

        {/* AI Tool and Difficulty */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
          <span className="bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-700 border border-gray-200 truncate">
            {prompt.aiTool}
          </span>
          <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium capitalize ${getDifficultyColor(prompt.difficulty)} self-start sm:self-auto`}>
            {prompt.difficulty}
          </span>
        </div>

        {/* Output Preview */}
        <div className={`${colorScheme.badge} rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 group-hover:opacity-80 transition-colors`}>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Output Preview:</p>
          <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {prompt.resultText || prompt.promptText}
          </p>
        </div>

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {prompt.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className={`${colorScheme.badge} ${colorScheme.text} px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium capitalize truncate max-w-[80px] sm:max-w-none`}
              >
                {tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className={`${colorScheme.badge} ${colorScheme.text} px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium`}>
                +{prompt.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats and Author */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-200/50 mt-auto">
          {/* Stats Section */}
          <div className="flex items-center justify-between sm:justify-start sm:gap-4 text-sm text-gray-600 w-full sm:w-auto">
            {/* Like/Dislike Section */}
            <div className="flex items-center font-medium">
              <button
                onClick={handleLike}
                className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200 rounded-lg hover:bg-white/50"
                title="Like prompt"
              >
                <ThumbsUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${interactions?.liked ? 'fill-green-600 text-green-600' : ''}`} />
              </button>
              
              <span className="min-w-[16px] sm:min-w-[20px] text-center font-semibold text-xs sm:text-sm mx-1">
                {getVoteCount()}
              </span>
              
              <button
                onClick={handleDislike}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200 rounded-lg hover:bg-white/50"
                title="Dislike prompt"
              >
                <ThumbsDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${interactions?.disliked ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>

            {/* Downloads */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 sm:gap-1.5 font-medium hover:text-blue-600 transition-colors"
              title="Download prompt"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{prompt.downloads || 0}</span>
            </button>

            {/* Views */}
            <div className="flex items-center gap-1 sm:gap-1.5 font-medium">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{prompt.views || 0}</span>
            </div>

            {/* Rating */}
            <button
              onClick={handleRate}
              className="flex items-center gap-1 sm:gap-1.5 font-medium hover:text-yellow-600 transition-colors"
              title="Rate prompt"
            >
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm">{(prompt.rating?.average || 0).toFixed(1)}</span>              
            </button>
          </div>

          {/* Author - Only show on larger screens */}
          <div className="hidden sm:flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700 font-semibold truncate max-w-[80px]">
              {prompt.author?.username}
            </span>
          </div>

          {/* Author - Mobile version (simplified) */}
          <div className="sm:hidden flex items-center justify-center pt-2 border-t border-gray-200/50">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600 font-medium">
                by {prompt.author?.username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}