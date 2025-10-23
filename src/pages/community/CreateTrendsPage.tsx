import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Hash, 
  Type, 
  FileText, 
  Users,
  Plus,
  Trash2
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
    navigate(-1); // Go back to previous page
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Trend
            </h1>
            <p className="text-gray-600 text-lg">
              Share your ideas, questions, or discoveries with the community
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            {/* Community Selection */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Users className="w-4 h-4" />
                Community
              </label>
              <select
                value={formData.community}
                onChange={(e) => handleInputChange('community', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.community ? 'border-red-300' : 'border-gray-300'
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
                <p className="text-red-600 text-sm mt-1">{errors.community}</p>
              )}
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Type className="w-4 h-4" />
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter a compelling title for your trend..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={300}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.title.length}/300
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <FileText className="w-4 h-4" />
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Share your thoughts, ideas, or questions..."
                rows={12}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                  errors.content ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={40000}
              />
              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
              )}
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.content.length}/40000
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Hash className="w-4 h-4" />
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.newTag}
                  onChange={(e) => handleInputChange('newTag', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!formData.newTag.trim()}
                  className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Tags List */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-purple-600 transition-colors"
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
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingTrend}
                className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {creatingTrend ? 'Creating...' : 'Create Trend'}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-2">💡 Tips for creating great trends</h3>
          <ul className="text-purple-800 text-sm space-y-1">
            <li>• Write clear and engaging titles that capture attention</li>
            <li>• Provide detailed context and background information</li>
            <li>• Use relevant tags to help others discover your trend</li>
            <li>• Choose the right community for your topic</li>
            <li>• Be respectful and follow community guidelines</li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateTrendPage;