import { Link } from "react-router-dom";
import { 
  Heart, 
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
  Languages
} from 'lucide-react';
import { Prompt } from '../../../types/prompt';

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
  };
};

const categoryColors: CategoryColors = {
  Coding: { bg: 'bg-violet-50', text: 'text-violet-900', badge: 'bg-violet-100' },
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
  aiTool: string;
}

// Icon mapping based on title and category keywords
const getIconFromPrompt = (prompt: PromptForIcon) => {
  const lowerTitle = prompt.title.toLowerCase();
  const category = prompt.category.toLowerCase();
  const aiTool = prompt.aiTool.toLowerCase();

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

interface PromptCardProps {
  prompt: Prompt;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onDownload?: (id: string) => void;
  className?: string;
}

export default function HomePromptCard({ 
  prompt, 
  onLike, 
  onBookmark, 
  onDownload,
  className = "" 
}: PromptCardProps) {
  // Use the helper function to safely get color scheme
  const colorScheme = getColorScheme(prompt.category);

  const icon = getIconFromPrompt(prompt);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike?.(prompt._id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark?.(prompt._id);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDownload?.(prompt._id);
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
      to={`/prompts/${prompt._id}`}
      className={`${colorScheme.bg} rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full group cursor-pointer ${className}`}
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
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-white/50"
              title="Like prompt"
            >
              <Heart 
                className={`w-5 h-5 ${prompt.upvotedBy.length > 0 ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </button>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className={`text-xl font-bold ${colorScheme.text} mb-3 group-hover:opacity-80 transition-colors line-clamp-2`}>
          {prompt.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
          {prompt.description}
        </p>

        {/* AI Tool and Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-200">
            {prompt.aiTool}
          </span>
          <span className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${getDifficultyColor(prompt.difficulty)}`}>
            {prompt.difficulty}
          </span>
        </div>

        {/* Output Preview */}
        <div className={`${colorScheme.badge} rounded-lg p-4 mb-4 group-hover:opacity-80 transition-colors`}>
          <p className="text-sm font-semibold text-gray-600 mb-2">Output Preview:</p>
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {prompt.resultText || prompt.promptText}
          </p>
        </div>

        {/* Tags */}
        {prompt.tags.length > 0 && (
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

        {/* Stats and Author */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 mt-auto">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5 font-medium">
              <Heart className={`w-4 h-4 ${prompt.upvotedBy.length > 0 ? 'text-red-500' : ''}`} />
              <span>{prompt.upvotes}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Download className="w-4 h-4" />
              <span>{prompt.downloads}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Eye className="w-4 h-4" />
              <span>{prompt.views}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{prompt.rating.average.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700 font-semibold">{prompt.author.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}