import React, { useState } from 'react';
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
  Lock
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
        tags: formData.tags
      });

      if (newCommunity) {
        // Navigate to the new community
        navigate(`/communities/${newCommunity._id}`);
      }
    } catch (error: any) {
      console.error('Failed to create community:', error);
      if (error.message?.includes('already exists')) {
        setErrors({ name: 'Community name already exists' });
      } else {
        setErrors({ submit: 'Failed to create community. Please try again.' });
      }
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Community
            </h1>
            <p className="text-gray-600 text-lg">
              Build a space for people to connect, share, and discuss common interests
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            {/* Community Name */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Users className="w-4 h-4" />
                Community Name
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">r/</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="community_name"
                  className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={50}
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
              <div className="text-xs text-gray-500 mt-1">
                Community names must be 3-50 characters and can only contain letters, numbers, and underscores
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <FileText className="w-4 h-4" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what your community is about, what kind of content is welcome, and what members can expect..."
                rows={6}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={500}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description}</p>
              )}
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.description.length}/500
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Shield className="w-4 h-4" />
                Privacy
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.isPublic 
                    ? 'border-blue-500 bg-blue-50' 
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
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Public</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Anyone can view, post, and comment
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  !formData.isPublic 
                    ? 'border-blue-500 bg-blue-50' 
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
                    <Lock className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Private</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Only approved members can view and participate
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Community Rules */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Shield className="w-4 h-4" />
                Community Rules (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.newRule}
                  onChange={(e) => handleInputChange('newRule', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'rule')}
                  placeholder="Add a community rule..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={100}
                />
                <button
                  type="button"
                  onClick={handleAddRule}
                  disabled={!formData.newRule.trim()}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Rules List */}
              {formData.rules.length > 0 && (
                <div className="space-y-2">
                  {formData.rules.map((rule, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-gray-800">{rule}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveRule(rule)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Hash className="w-4 h-4" />
                Tags (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.newTag}
                  onChange={(e) => handleInputChange('newTag', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'tag')}
                  placeholder="Add a tag to help people find your community..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!formData.newTag.trim()}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-600 transition-colors"
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
                disabled={creatingCommunity}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {creatingCommunity ? 'Creating...' : 'Create Community'}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">🏗️ Tips for creating a great community</h3>
          <ul className="text-blue-800 text-sm space-y-2">
            <li>• <strong>Choose a clear, descriptive name</strong> that reflects your community's purpose</li>
            <li>• <strong>Write a detailed description</strong> to help people understand what your community is about</li>
            <li>• <strong>Set clear rules</strong> to maintain a positive and respectful environment</li>
            <li>• <strong>Use relevant tags</strong> to help others discover your community</li>
            <li>• <strong>Consider privacy settings</strong> - public communities are discoverable by everyone</li>
            <li>• <strong>Be an active moderator</strong> to foster engagement and maintain quality</li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateCommunityPage;