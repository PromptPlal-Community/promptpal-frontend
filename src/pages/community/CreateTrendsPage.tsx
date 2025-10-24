import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Hash, 
  Type, 
  FileText, 
  Users,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';
import { useTrends } from '../../hooks/useTrends';
import { useCommunities } from '../../hooks/useCommunity';
import { PageContainer } from '../../components/layout/PageContainer';

const CreateTrendPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTrend, loading: creatingTrend } = useTrends();
  const { communities, getCommunities } = useCommunities();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    community: '',
    tags: [] as string[],
    newTag: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Fetch communities when component mounts
    getCommunities();
  }, [getCommunities]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, formData.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && formData.newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    if (!formData.community) {
      newErrors.community = 'Please select a community';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const newTrend = await createTrend({
        title: formData.title,
        content: formData.content,
        communityId: formData.community,
        tags: formData.tags
      });

      if (newTrend) {
        navigate(`/trends/${newTrend._id}`);
      }
    } catch (error) {
      console.error('Failed to create trend:', error);
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          setErrors({ submit: 'Server endpoint not found. Please check your connection.' });
        } else if (error.message.includes('Network Error')) {
          setErrors({ submit: 'Network error. Please check your internet connection.' });
        } else {
          setErrors({ submit: 'Failed to create trend. Please try again.' });
        }
      } else {
        setErrors({ submit: 'An unexpected error occurred.' });
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to Previous</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Create New Trend
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Share your ideas, questions, or discoveries with the community
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Form Section - 2/3 on desktop, full width on mobile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm sm:shadow-md">
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
                {/* Community Selection */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>Community</span>
                  </label>
                  <select
                    value={formData.community}
                    onChange={(e) => handleInputChange('community', e.target.value)}
                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.community ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select a community</option>
                    {communities.map(community => (
                      <option key={community._id} value={community._id}>
                        {community.name}
                      </option>
                    ))}
                  </select>
                  {errors.community && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.community}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <Type className="w-4 h-4 flex-shrink-0" />
                    <span>Title</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter a compelling title for your trend..."
                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    maxLength={300}
                  />
                  {errors.title && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.title}
                    </p>
                  )}
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.title.length}/300
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span>Content</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Share your thoughts, ideas, or questions..."
                    rows={isMobile ? 8 : 12}
                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-colors ${
                      errors.content ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    maxLength={40000}
                  />
                  {errors.content && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.content}
                    </p>
                  )}
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.content.length}/40000
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <Hash className="w-4 h-4 flex-shrink-0" />
                    <span>Tags</span>
                  </label>
                  
                  {/* Tag Input - Stack on mobile, row on desktop */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <input
                      type="text"
                      value={formData.newTag}
                      onChange={(e) => handleInputChange('newTag', e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add a tag..."
                      className="flex-1 p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      maxLength={20}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      disabled={!formData.newTag.trim()}
                      className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 sm:gap-1 sm:px-4"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="sm:hidden">Add Tag</span>
                    </button>
                  </div>
                  
                  {/* Tags List */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm transition-colors hover:bg-purple-200"
                        >
                          <span className="max-w-[120px] sm:max-w-none truncate">#{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-purple-600 transition-colors flex-shrink-0"
                            aria-label={`Remove tag ${tag}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="mb-4 sm:mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-xs sm:text-sm flex items-center gap-2">
                      <span className="text-red-500">⚠</span>
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Actions - Stack on mobile, row on larger screens */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingTrend}
                    className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base order-1 sm:order-2 flex items-center justify-center gap-2"
                  >
                    {creatingTrend ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Create Trend
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Help Section - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-8 bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <h3 className="font-semibold text-purple-900 mb-3 text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Tips for Great Trends
              </h3>
              <ul className="text-purple-800 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Write clear and engaging titles that capture attention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Provide detailed context and background information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Use relevant tags to help others discover your trend</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Choose the right community for your topic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Be respectful and follow community guidelines</span>
                </li>
              </ul>
              
              {/* Mobile Help Button - Only shown on mobile */}
              <div className="lg:hidden mt-6">
                <button
                  onClick={() => {/* You could add a modal or expandable section here */}}
                  className="w-full py-3 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                >
                  Show Tips
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Help Section - Shown only on mobile */}
        <div className="lg:hidden mt-6">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <h3 className="font-semibold text-purple-900 mb-2 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Quick Tips
            </h3>
            <ul className="text-purple-800 text-xs space-y-1">
              <li>• Clear titles get more attention</li>
              <li>• Add relevant tags for discovery</li>
              <li>• Choose the right community</li>
              <li>• Be respectful in your content</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateTrendPage;