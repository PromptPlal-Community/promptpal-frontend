import { Link, useNavigate } from "react-router-dom";
import { 
  Download, 
  Eye, 
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
  Edit3,
  Archive,
  Send,
  Trash2,
  MoreVertical // Added for mobile menu
} from 'lucide-react';
import type { Prompt } from '../../../types/prompt';
import { useState } from 'react';

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
    btn: string
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

interface RecentCardProps {
  prompt: Prompt;
  onPublish?: (id: string) => void;
  onEdit?: (id: string) => void;
  onUnpublish?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export default function RecentCard({ 
  prompt, 
  onPublish, 
  onEdit,
  onUnpublish,
  onDelete,
  className = "" 
}: RecentCardProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const colorScheme = getColorScheme(prompt.category);
  const navigate = useNavigate();

  const icon = getIconFromPrompt(prompt);

  const handlePublish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPublish?.(prompt._id);
    setShowMobileMenu(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(prompt._id);
    setShowMobileMenu(false);
    if (!onEdit) {
      navigate(`/dashboard/prompts/edit/${prompt._id}`);
    }
  };

  const handleUnpublish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUnpublish?.(prompt._id);
    setShowMobileMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(prompt._id);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMobileMenu(!showMobileMenu);
  };

  // Format category name for display
  const formatCategory = (category: string) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  // Check if prompt is published or draft
  const isPublished = prompt.isPublic === true && prompt.isDraft === false;
  const isDraft = prompt.isDraft === true;

  return (
    <Link 
      to={`/dashboard/prompts/${prompt._id}`}
      className={`${colorScheme.bg} rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full group cursor-pointer ${className}`}
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

          {/* Mobile Menu Button - Only show on small screens */}
          <div className="sm:hidden relative">
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-lg hover:bg-white/50"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1">
                {/* Edit option */}
                {onEdit && (
                  <button
                    onClick={handleEdit}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    {isPublished ? "Edit Published" : "Edit Draft"}
                  </button>
                )}
                
                {/* Publish/Unpublish options */}
                {isDraft && onPublish && (
                  <button
                    onClick={handlePublish}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Publish
                  </button>
                )}
                
                {isPublished && onUnpublish && (
                  <button
                    onClick={handleUnpublish}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Archive className="w-4 h-4" />
                    Unpublish
                  </button>
                )}
                
                {/* Delete option */}
                {onDelete && (
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Title and Status Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          {/* Title - Full width on mobile, 70% on desktop */}
          <div className="sm:w-[70%]">
            <h3 className={`text-lg sm:text-xl font-bold ${colorScheme.text} group-hover:opacity-80 transition-colors line-clamp-2 break-words`}>
              {prompt.title}
            </h3>
          </div>        
          
          {/* Status and Desktop Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-1 sm:w-[30%]">
            {/* Status Badge */}
            <div className={`px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ${
              isPublished 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : isDraft 
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              {isPublished ? 'Published' : isDraft ? 'Draft' : 'Archived'}
            </div>
            
            {/* Desktop Action Buttons - Hidden on mobile */}
            <div className="hidden sm:flex gap-1">
              {/* Edit button */}
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded-lg hover:bg-white/50"
                  title={isPublished ? "Edit published prompt" : "Edit draft"}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
              
              {/* Publish button for drafts */}
              {isDraft && onPublish && (
                <button
                  onClick={handlePublish}
                  className="p-1.5 text-gray-400 hover:text-green-500 transition-colors duration-200 rounded-lg hover:bg-white/50"
                  title="Publish prompt"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
              
              {/* Unpublish button for published prompts */}
              {isPublished && onUnpublish && (
                <button
                  onClick={handleUnpublish}
                  className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors duration-200 rounded-lg hover:bg-white/50"
                  title="Unpublish and move to drafts"
                >
                  <Archive className="w-4 h-4" />
                </button>
              )}
              
              {/* Delete button for all prompts */}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-white/50"
                  title="Delete prompt"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description (if available) */}
        {prompt.description && (
          <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2 break-words">
            {prompt.description}
          </p>
        )}

        {/* AI Tools */}
        {prompt.aiTool && prompt.aiTool.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
            {prompt.aiTool.slice(0, 2).map((tool, index) => ( // Show fewer on mobile
              <span
                key={index}
                className="px-2 py-1 bg-white/70 text-gray-700 text-xs rounded-md border border-gray-200 truncate max-w-[100px] sm:max-w-none"
              >
                {tool}
              </span>
            ))}
            {prompt.aiTool.length > 2 && (
              <span className="px-2 py-1 bg-white/70 text-gray-500 text-xs rounded-md border border-gray-200">
                +{prompt.aiTool.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Stats and Author */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200/50 mt-auto">
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
            {isPublished ? (
              <>
                <div className="flex items-center gap-1 sm:gap-1.5 font-medium">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{prompt.downloads || 0}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 font-medium">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{prompt.views || 0}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 font-medium">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span className="text-xs sm:text-sm">{(prompt.rating?.average || 0).toFixed(1)}</span>
                </div>
              </>
            ) : (
              <div className="text-xs text-gray-500">
                Updated: {new Date(prompt.updatedAt || prompt.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
          
          {/* Version badge for published prompts */}
          {isPublished && prompt.version && (
            <div className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded border border-gray-200 hidden sm:block">
              v{prompt.version}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}