import React, { useState, useEffect } from 'react';
import { 
  Search, 
  TrendingUp, 
  Star, 
  Users, 
  Zap, 
  Sparkles,
  Heart,
  Eye,
  MessageCircle,
  Bookmark,
  Share2,
  Grid,
  List,
  Clock,
  ArrowRight,
  Rocket,
  Award,
  BarChart3,
  Lightbulb,
  Gem
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import Footer from '../components/ui/Footer';
import Navbar from '../components/layout/Navbar';

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  stats: {
    likes: number;
    views: number;
    comments: number;
    saves: number;
  };
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const DiscoverPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'trending' | 'latest' | 'popular'>('trending');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockPrompts: Prompt[] = [
      {
        id: '1',
        title: 'AI-Powered Content Strategy Generator',
        description: 'Generate comprehensive content strategies with SEO optimization, topic clusters, and engagement metrics for your brand or client.',
        category: 'Marketing',
        tags: ['content', 'seo', 'strategy', 'marketing'],
        author: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          level: 'Pro'
        },
        stats: {
          likes: 342,
          views: 2150,
          comments: 28,
          saves: 156
        },
        isFeatured: true,
        isTrending: true,
        createdAt: '2024-01-15',
        difficulty: 'intermediate'
      },
      {
        id: '2',
        title: 'Creative Storytelling Framework',
        description: 'Transform basic ideas into compelling narratives with character development, plot structure, and emotional arcs.',
        category: 'Writing',
        tags: ['storytelling', 'creative', 'writing', 'narrative'],
        author: {
          name: 'Marcus Johnson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          level: 'Expert'
        },
        stats: {
          likes: 289,
          views: 1820,
          comments: 42,
          saves: 203
        },
        isFeatured: true,
        isTrending: false,
        createdAt: '2024-01-14',
        difficulty: 'advanced'
      },
      {
        id: '3',
        title: 'Product Description Generator',
        description: 'Create persuasive product descriptions that convert visitors into buyers with compelling copy and SEO optimization.',
        category: 'E-commerce',
        tags: ['ecommerce', 'copywriting', 'seo', 'sales'],
        author: {
          name: 'Alex Rivera',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
          level: 'Contributor'
        },
        stats: {
          likes: 156,
          views: 890,
          comments: 12,
          saves: 78
        },
        isFeatured: false,
        isTrending: true,
        createdAt: '2024-01-16',
        difficulty: 'beginner'
      },
      {
        id: '4',
        title: 'Social Media Post Generator',
        description: 'Generate engaging social media posts for multiple platforms with hashtags and optimal posting times.',
        category: 'Social Media',
        tags: ['social-media', 'engagement', 'content', 'marketing'],
        author: {
          name: 'Priya Patel',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
          level: 'Pro'
        },
        stats: {
          likes: 223,
          views: 1340,
          comments: 19,
          saves: 112
        },
        isFeatured: false,
        isTrending: true,
        createdAt: '2024-01-13',
        difficulty: 'beginner'
      },
      {
        id: '5',
        title: 'Technical Documentation Assistant',
        description: 'Create clear and comprehensive technical documentation with code examples and API references.',
        category: 'Development',
        tags: ['technical', 'documentation', 'api', 'code'],
        author: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
          level: 'Expert'
        },
        stats: {
          likes: 178,
          views: 950,
          comments: 8,
          saves: 89
        },
        isFeatured: true,
        isTrending: false,
        createdAt: '2024-01-12',
        difficulty: 'advanced'
      },
      {
        id: '6',
        title: 'Email Marketing Campaign Builder',
        description: 'Design complete email marketing campaigns with subject lines, body content, and CTAs for maximum conversion.',
        category: 'Marketing',
        tags: ['email', 'marketing', 'conversion', 'automation'],
        author: {
          name: 'Emily Watson',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
          level: 'Contributor'
        },
        stats: {
          likes: 134,
          views: 720,
          comments: 15,
          saves: 67
        },
        isFeatured: false,
        isTrending: false,
        createdAt: '2024-01-11',
        difficulty: 'intermediate'
      }
    ];

    setTimeout(() => {
      setPrompts(mockPrompts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { id: 'all', name: 'All Prompts', icon: <Grid className="w-4 h-4" />, count: prompts.length },
    { id: 'marketing', name: 'Marketing', icon: <TrendingUp className="w-4 h-4" />, count: prompts.filter(p => p.category === 'Marketing').length },
    { id: 'writing', name: 'Writing', icon: <MessageCircle className="w-4 h-4" />, count: prompts.filter(p => p.category === 'Writing').length },
    { id: 'development', name: 'Development', icon: <Zap className="w-4 h-4" />, count: prompts.filter(p => p.category === 'Development').length },
    { id: 'social-media', name: 'Social Media', icon: <Share2 className="w-4 h-4" />, count: prompts.filter(p => p.category === 'Social Media').length },
    { id: 'e-commerce', name: 'E-commerce', icon: <BarChart3 className="w-4 h-4" />, count: prompts.filter(p => p.category === 'E-commerce').length }
  ];

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || prompt.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.stats.views + b.stats.likes) - (a.stats.views + a.stats.likes);
      case 'latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.stats.likes - a.stats.likes;
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Newbie': return 'bg-blue-100 text-blue-800';
      case 'Contributor': return 'bg-purple-100 text-purple-800';
      case 'Pro': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Discover Amazing AI Prompts
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unleash Your
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"> Creativity</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Explore thousands of powerful AI prompts created by our community. 
              Find inspiration, boost productivity, and create amazing content.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts, categories, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              />
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-purple-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10K+ Community Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>5K+ AI Prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {category.icon}
                  {category.name}
                  <span className="bg-black/10 px-1.5 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="trending">Trending</option>
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* View Toggle */}
              <div className="bg-white border border-gray-300 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Prompts Grid/List */}
          {sortedPrompts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No prompts found</h3>
                <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {sortedPrompts.map(prompt => (
                <div
                  key={prompt.id}
                  className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-200 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Featured Badge */}
                  {prompt.isFeatured && (
                    <div className="absolute -top-2 -left-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Gem className="w-3 h-3" />
                        Featured
                      </div>
                    </div>
                  )}

                  <div className={viewMode === 'list' ? "flex-1 p-6" : "p-6"}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prompt.author.avatar}
                          alt={prompt.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{prompt.author.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadge(prompt.author.level)}`}>
                              {prompt.author.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Clock className="w-3 h-3" />
                            {new Date(prompt.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(prompt.difficulty)}`}>
                          {prompt.difficulty}
                        </span>
                        {prompt.isTrending && <TrendingUp className="w-4 h-4 text-green-500" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                        {prompt.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {prompt.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {prompt.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {prompt.stats.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {prompt.stats.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {prompt.stats.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bookmark className="w-4 h-4" />
                          {prompt.stats.saves}
                        </div>
                      </div>
                      
                      <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium">
                        Use Prompt
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="max-w-2xl mx-auto">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Share Your Own Prompts?
                </h2>
                <p className="text-purple-100 mb-6">
                  Join our community of creators and share your AI expertise. 
                  Get discovered, earn recognition, and help others create amazing content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Create Your First Prompt
                  </button>
                  <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                    Learn How It Works
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
    <Footer/>
</>
  );
};

export default DiscoverPage;