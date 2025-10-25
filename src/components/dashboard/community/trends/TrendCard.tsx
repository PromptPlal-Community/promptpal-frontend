import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp,
  MessageCircle,
  Share2,
  Eye,
  Award,
  Calendar,
  User,
  MoreHorizontal,
  Bookmark,
  Flag,
  ArrowBigUp,
  ArrowBigDown,
} from 'lucide-react';
import type { Trend } from '../../../../types/trend';
import { MdDelete } from 'react-icons/md';

type CategoryColorKey = 
  | 'Technology' 
  | 'Entertainment' 
  | 'Science' 
  | 'Sports' 
  | 'Politics' 
  | 'Business' 
  | 'Health' 
  | 'Education' 
  | 'Lifestyle';

type CategoryColors = {
  [key in CategoryColorKey]: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
};

const categoryColors: CategoryColors = {
  Technology: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200', badge: 'bg-blue-100' },
  Entertainment: { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-200', badge: 'bg-purple-100' },
  Science: { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200', badge: 'bg-green-100' },
  Sports: { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-200', badge: 'bg-orange-100' },
  Politics: { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-200', badge: 'bg-red-100' },
  Business: { bg: 'bg-indigo-50', text: 'text-indigo-900', border: 'border-indigo-200', badge: 'bg-indigo-100' },
  Health: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-200', badge: 'bg-emerald-100' },
  Education: { bg: 'bg-cyan-50', text: 'text-cyan-900', border: 'border-cyan-200', badge: 'bg-cyan-100' },
  Lifestyle: { bg: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-200', badge: 'bg-pink-100' },
};

const isValidCategory = (category: string): category is CategoryColorKey => {
  return Object.keys(categoryColors).includes(category);
};

const getColorScheme = (category: string) => {
  if (isValidCategory(category)) {
    return categoryColors[category];
  }
  return {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    border: 'border-gray-200',
    badge: 'bg-gray-100'
  };
};


interface TrendCardProps {
  trend: Trend;
  onViewTrend?: (trendId: string) => void;
  onUpvote?: (trendId: string) => void;
  onDownvote?: (trendId: string) => void;
  onComment?: (trendId: string) => void;
  onReward?: (trendId: string) => void;
  onShare?: (trend: Trend) => void;
  onBookmark?: (trendId: string) => void;
  onDelete?: (trendId: string) => void;
  className?: string;
  showCommunity?: boolean;
}

export default function TrendCard({ 
  trend,
  onViewTrend,
  onUpvote,
  onDownvote,
  onReward,
  onShare,
  onBookmark,
  onDelete,
  className = "",
  showCommunity = true
}: TrendCardProps) {
  const colorScheme = getColorScheme(trend.category);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewTrend) {
      onViewTrend(trend._id);
    } else {
      navigate(`/trends/${trend._id}`);
    }
  };

  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpvote) {
      onUpvote(trend._id);
    }
  };

  const handleDownvoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownvote) {
      onDownvote(trend._id);
    }
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewTrend) {
      onViewTrend(trend._id);
    } else {
      navigate(`/trends/${trend._id}#comments`);
    }
  };
  
  const handleDeleteTrend = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(trend._id);
    }
  };

  const handleRewardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReward) {
      onReward(trend._id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(trend);
    } else {
      // Default share behavior
      if (navigator.share) {
        navigator.share({
          title: trend.title,
          text: trend.content,
          url: `${window.location.origin}/trends/${trend._id}`,
        });
      } else {
        navigator.clipboard.writeText(`${window.location.origin}/trends/${trend._id}`);
      }
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(trend._id);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatTimeAgo = (date: string): string => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return past.toLocaleDateString();
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`${colorScheme.bg} ${colorScheme.border} rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer ${className}`}
    >
      <div className="p-6">
        {/* Header with community, category, and time */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {showCommunity && trend.community && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {trend.community.name?.charAt(0) || 'C'}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  r/{trend.community.name}
                </span>
                <span className="text-gray-400">•</span>
              </div>
            )}
            
            <div className={`${colorScheme.badge} px-3 py-1 rounded-full flex items-center gap-2`}>
              <TrendingUp className="w-3 h-3" />
              <span className={`text-xs font-semibold ${colorScheme.text}`}>
                {trend.category}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {formatTimeAgo(trend.createdAt)}
            </span>
          </div>
        </div>

        {/* Author info */}
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Posted by <span className="font-semibold text-gray-800">{trend.author?.username}</span>
          </span>
        </div>

        {/* Title and content preview */}
        <div className="mb-4">
          <h3 className={`text-xl font-bold ${colorScheme.text} mb-3 group-hover:opacity-80 transition-colors line-clamp-2`}>
            {trend.title}
          </h3>
          
          {trend.content && (
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {trend.content}
            </p>
          )}
        </div>

        {/* Tags */}
        {trend.tags && trend.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {trend.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-white/70 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium border border-gray-200"
              >
                #{tag}
              </span>
            ))}
            {trend.tags.length > 3 && (
              <span className="text-gray-500 text-xs font-medium self-center">
                +{trend.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
          {/* Left side - Stats with vote arrows */}
          <div className="flex items-center gap-4">
            {/* Other stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
            {/* Vote buttons */}
            <div className="flex items-center">
              <button 
                onClick={handleUpvoteClick}
                className="p-1 hover:bg-green-50 rounded transition-colors group/upvote"
                title="Upvote"
              >
                <ArrowBigUp className="w-4 h-4 text-gray-500 group-hover/upvote:text-purple-600" />
              </button>
              <span className="text-sm font-semibold text-gray-700">
                {formatNumber(trend.voteScore || 0)}
              </span>
              <button 
                onClick={handleDownvoteClick}
                className="p-1 hover:bg-red-50 rounded transition-colors group/downvote"
                title="Downvote"
              >
                <ArrowBigDown className="w-4 h-4 text-gray-500 group-hover/downvote:text-red-600" />
              </button>
            </div>

              {/* Comments */}
              <button 
                onClick={handleCommentClick}
                className="flex items-center hover:text-purple-600 transition-colors group/comment"
              >
                <div className="p-1 rounded group-hover/comment:bg-purple-50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="font-semibold">{formatNumber(trend.commentCount || 0)}</span>
              </button>

              {/* Views */}
              <div className="flex items-center">
                <div className="p-1 rounded">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="font-semibold">{formatNumber(trend.views || 0)}</span>
              </div>

              {/* Rewards */}
              {trend.totalRewards > 0 && (
                <button 
                  onClick={handleRewardClick}
                  className="flex items-center gap-2 hover:text-yellow-600 transition-colors group/reward"
                >
                  <div className="p-1 rounded group-hover/reward:bg-yellow-50 transition-colors">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-yellow-700">
                    {formatNumber(trend.totalRewards)}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-1">
            <button 
              onClick={handleBookmarkClick}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              title="Save"
            >
              <Bookmark className="w-4 h-4 text-purple-500" />
            </button>
            <button 
              onClick={handleDeleteTrend}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              title="Save"
            >
              <MdDelete className="w-4 h-4 text-purple-500" />
            </button>
            <button 
              onClick={handleShareClick}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-purple-500" />
            </button>
            <button 
              onClick={handleRewardClick}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              title="Reward"
            >
              <Award className="w-4 h-4 text-purple-500" />
            </button>
            <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
              <Flag className="w-4 h-4 text-purple-500" />
            </button>
            <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4 text-purple-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}