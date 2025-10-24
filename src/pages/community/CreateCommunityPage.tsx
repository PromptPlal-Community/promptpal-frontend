import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Users, 
  FileText, 
  Shield,
  Hash,
  Plus,
  Trash2,
  Globe,
  Lock,
  Sparkles
} from 'lucide-react';
import { useCommunities } from '../../hooks/useCommunity';
import { PageContainer } from '../../components/layout/PageContainer';

const CreateCommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const { createCommunity, loading: creatingCommunity } = useCommunities();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true,
    rules: [] as string[],
    newRule: '',
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddRule = () => {
    if (formData.newRule.trim() && !formData.rules.includes(formData.newRule.trim())) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, formData.newRule.trim()],
        newRule: ''
      }));
    }
  };

  const handleRemoveRule = (ruleToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule !== ruleToRemove)
    }));
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

  const handleKeyPress = (e: React.KeyboardEvent, type: 'rule' | 'tag') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'rule') {
        handleAddRule();
      } else {
        handleAddTag();
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Community name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Community name must be at least 3 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Community name must be less than 50 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.name)) {
      newErrors.name = 'Community name can only contain letters, numbers, and underscores';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const newCommunity = await createCommunity({
        name: formData.name,
        description: formData.description,
        isPublic: formData.isPublic,
        rules: formData.rules.map(rule => ({ title: rule, description: '' })),
        tags: formData.tags
      });

      if (newCommunity) {
        navigate(`/communities/${newCommunity._id}`);
      }
    } catch (error: unknown) {
      console.error('Failed to create community:', error);
      
      if (error instanceof Error && error.message?.includes('already exists')) {
        setErrors({ name: 'Community name already exists' });
      } else {
        setErrors({ submit: 'Failed to create community. Please try again.' });
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
        {/* Header */}
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
                Create New Community
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Build a space for people to connect, share, and discuss common interests
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm sm:shadow-md">
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
                {/* Community Name */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>Community Name</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium text-sm sm:text-base">r/</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="community_name"
                      className={`flex-1 p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      maxLength={50}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.name}
                    </p>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Community names must be 3-50 characters and can only contain letters, numbers, and underscores
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span>Description</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what your community is about, what kind of content is welcome, and what members can expect..."
                    rows={isMobile ? 4 : 6}
                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-colors ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    maxLength={500}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.description}
                    </p>
                  )}
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.description.length}/500
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>Privacy</span>
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <label className={`relative border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                      formData.isPublic 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="privacy"
                        checked={formData.isPublic}
                        onChange={() => handleInputChange('isPublic', true)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Public</div>
                          <div className="text-xs sm:text-sm text-gray-600 mt-1">
                            Anyone can view, post, and comment
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className={`relative border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                      !formData.isPublic 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="privacy"
                        checked={!formData.isPublic}
                        onChange={() => handleInputChange('isPublic', false)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Private</div>
                          <div className="text-xs sm:text-sm text-gray-600 mt-1">
                            Only approved members can view and participate
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Community Rules */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>Community Rules (Optional)</span>
                  </label>
                  
                  {/* Rule Input - Stack on mobile */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <input
                      type="text"
                      value={formData.newRule}
                      onChange={(e) => handleInputChange('newRule', e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'rule')}
                      placeholder="Add a community rule..."
                      className="flex-1 p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      maxLength={100}
                    />
                    <button
                      type="button"
                      onClick={handleAddRule}
                      disabled={!formData.newRule.trim()}
                      className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 sm:gap-1 sm:px-4"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="sm:hidden">Add Rule</span>
                    </button>
                  </div>
                  
                  {/* Rules List */}
                  {formData.rules.length > 0 && (
                    <div className="space-y-2">
                      {formData.rules.map((rule, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs sm:text-sm font-semibold flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 text-sm sm:text-base truncate">{rule}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveRule(rule)}
                            className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0 ml-2"
                            aria-label={`Remove rule ${index + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    <Hash className="w-4 h-4 flex-shrink-0" />
                    <span>Tags (Optional)</span>
                  </label>
                  
                  {/* Tag Input - Stack on mobile */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <input
                      type="text"
                      value={formData.newTag}
                      onChange={(e) => handleInputChange('newTag', e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'tag')}
                      placeholder="Add a tag to help people find your community..."
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
                          className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors hover:bg-purple-200"
                        >
                          <span className="max-w-[80px] sm:max-w-none truncate">#{tag}</span>
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
                    disabled={creatingCommunity}
                    className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base order-1 sm:order-2 flex items-center justify-center gap-2"
                  >
                    {creatingCommunity ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Create Community
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
                Community Building Tips
              </h3>
              <ul className="text-purple-800 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span><strong>Choose a clear name</strong> that reflects your community's purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span><strong>Write a detailed description</strong> to help people understand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span><strong>Set clear rules</strong> to maintain a positive environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span><strong>Use relevant tags</strong> to help discovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span><strong>Consider privacy settings</strong> carefully</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span><strong>Be an active moderator</strong> to foster engagement</span>
                </li>
              </ul>
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
              <li>• Choose a clear, descriptive name</li>
              <li>• Write a detailed description</li>
              <li>• Set clear community rules</li>
              <li>• Use relevant tags for discovery</li>
              <li>• Consider privacy settings</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateCommunityPage;