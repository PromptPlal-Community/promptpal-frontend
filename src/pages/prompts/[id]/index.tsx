import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Download, 
  Eye, 
  User, 
  Star, 
  Code, 
  Palette, 
  FileText, 
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Copy,
  Check,
  Share2,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Grid, Card, CardContent } from '../../../components/layout/Grid';
import { usePrompts } from '../../../hooks/usePrompts';
import type { Prompt } from '../../../types/prompt';
import toast from 'react-hot-toast';

// Reuse the same category colors and icon logic from your PromptCard
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
    badge: 'bg-gray-100',
  };
};

const getIconFromPrompt = (prompt: Prompt) => {
  const lowerTitle = prompt.title.toLowerCase();
  // ... (same icon mapping logic as in PromptCard)
  if (lowerTitle.includes('react') || lowerTitle.includes('component') || lowerTitle.includes('javascript') || lowerTitle.includes('typescript')) {
    return <Code className="w-5 h-5" />;
  }
  if (lowerTitle.includes('design') || lowerTitle.includes('ui') || lowerTitle.includes('ux') || lowerTitle.includes('figma')) {
    return <Palette className="w-5 h-5" />;
  }
  if (lowerTitle.includes('write') || lowerTitle.includes('blog') || lowerTitle.includes('article') || lowerTitle.includes('content')) {
    return <FileText className="w-5 h-5" />;
  }
  // ... include all other icon mappings from your PromptCard

  return <Code className="w-5 h-5" />;
};

const PromptDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { prompts, loading, upvotePrompt, favoritePrompt } = usePrompts(); // Removed unused 'error'
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id && prompts.length > 0) {
      const foundPrompt = prompts.find(p => p._id === id);
      if (foundPrompt) {
        setPrompt(foundPrompt);
      }
    }
  }, [id, prompts]);

  const handleCopyPrompt = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopied(true);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpvote = async () => {
    if (prompt) {

        await upvotePrompt(prompt._id);
        toast.success('Prompt upvoted!');

    }
  };

const handleFavorite = async () => {
  if (prompt) {
 
      await favoritePrompt(prompt._id);
      toast.success('Prompt added to favorites!');
    
  }
};

  const handleShare = async () => {
    if (prompt) {
      const shareUrl = `${window.location.origin}/prompts/${prompt._id}`;
      if (navigator.share) {

          await navigator.share({
            title: prompt.title,
            text: prompt.description,
            url: shareUrl,
          });

      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'newbie':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'contributor':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'pro':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'expert':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!prompt) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Prompt Not Found</h1>
          <p className="text-gray-600 mb-6">The prompt you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/dashboard/library"
            className="bg-[#270450] text-white px-6 py-2 rounded-lg hover:bg-[#270450]/90 transition-colors"
          >
            Back to Library
          </Link>
        </div>
      </PageContainer>
    );
  }

  const colorScheme = getColorScheme(prompt.category);
  const icon = getIconFromPrompt(prompt);

  return (
    <PageContainer>
      {/* Header with Navigation */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{prompt.title}</h1>
            <p className="text-gray-600 text-lg">{prompt.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      <Grid >
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Content */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Prompt Content</h2>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap border">
                {prompt.promptText}
              </div>
            </CardContent>
          </Card>

          {/* Expected Result */}
          {prompt.resultText && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Expected Result</h2>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{prompt.resultText}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Images */}
          {prompt.images && prompt.images.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Reference Images ({prompt.images.length})
                </h2>
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={prompt.images[activeImageIndex].url}
                      alt={prompt.images[activeImageIndex].caption || 'Prompt reference image'}
                      className="w-full h-96 object-contain"
                    />
                  </div>
                  
                  {/* Image Thumbnails */}
                  {prompt.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {prompt.images.map((image, index) => (
                        <button
                          key={image.public_id}
                          onClick={() => setActiveImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            index === activeImageIndex ? 'border-[#270450]' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image.thumbnail_url || image.url}
                            alt={image.caption || `Reference image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Prompt Info Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Category and AI Tool */}
                <div className="flex items-center justify-between">
                  <div className={`${colorScheme.badge} px-3 py-2 rounded-lg flex items-center gap-2`}>
                    {icon}
                    <span className={`font-semibold ${colorScheme.text}`}>
                      {prompt.category}
                    </span>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-semibold">
                    {prompt.aiTool}
                  </div>
                </div>

                {/* Difficulty and Level */}
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(prompt.difficulty)}`}>
                    {prompt.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getLevelColor(prompt.requiresLevel)}`}>
                    {prompt.requiresLevel}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Heart className="w-4 h-4" />
                      <span className="font-semibold">{prompt.upvotes}</span>
                    </div>
                    <div className="text-xs text-gray-500">Upvotes</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Download className="w-4 h-4" />
                      <span className="font-semibold">{prompt.downloads}</span>
                    </div>
                    <div className="text-xs text-gray-500">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Eye className="w-4 h-4" />
                      <span className="font-semibold">{prompt.views}</span>
                    </div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{prompt.rating.average.toFixed(1)}</span>
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleUpvote}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    Upvote
                  </button>
                  <button
                    onClick={handleFavorite}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Author Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Author</h3>
              <div className="flex items-center gap-3">
                {prompt.author.avatar ? (
                  <img
                    src={prompt.author.avatar}
                    alt={prompt.author.username}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{prompt.author.username}</div>
                  <div className="text-sm text-gray-600 capitalize">{prompt.author.level}</div>
                  {prompt.author && (
                    <div className="text-sm text-gray-500">{prompt._id}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Created {formatDate(prompt.createdAt)}</span>
                </div>
                {prompt.updatedAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Updated {formatDate(prompt.updatedAt)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span>Version {prompt.version}</span>
                </div>
                {prompt.community && (
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <span>Community: </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`${colorScheme.badge} ${colorScheme.text} px-3 py-1.5 rounded-lg text-sm font-medium capitalize`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Technical Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tokens:</span>
                  <span className="font-medium">{prompt.estimatedTokens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Word Count:</span>
                  <span className="font-medium">{prompt.metadata.wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Character Count:</span>
                  <span className="font-medium">{prompt.metadata.characterCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contains Code:</span>
                  <span className="font-medium">{prompt.metadata.hasCode ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Has Images:</span>
                  <span className="font-medium">{prompt.metadata.hasImages ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </PageContainer>
  );
};

export default PromptDetailsPage;