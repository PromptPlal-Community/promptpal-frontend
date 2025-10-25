// components/dashboard/ProfileSettings.tsx
import React, { useState, useEffect } from 'react';
import type { UpdateProfileData, ProfileFormData } from '../../../types/auth';
import { useAuth } from '../../../hooks/useAuth';

// Define social link keys as a union type
type SocialLinkKey = keyof ProfileFormData['socialLinks'];

const ProfileSettings: React.FC = () => {
  const { 
    updateProfile,
    user,
    profileLoading,
  } = useAuth();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    username: '',
    email: '',
    bio: '',
    dob: '',
    gender: 'prefer-not-to-say',
    location: '',
    socialLinks: {
      website: '',
      twitter: '',
      github: '',
      linkedin: '',
      portfolio: '',
      instagram: '',
    },
    avatar: '',
  });

  // Initialize form data when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.profile?.bio || '',
        dob: user.profile?.dob ? new Date(user.profile.dob).toISOString().split('T')[0] : '',
        gender: user.profile?.gender || 'prefer-not-to-say',
        location: user.profile?.location || '',
        socialLinks: {
          website: user.profile?.socialLinks?.website || '',
          twitter: user.profile?.socialLinks?.twitter || '',
          github: user.profile?.socialLinks?.github || '',
          linkedin: user.profile?.socialLinks?.linkedin || '',
          portfolio: user.profile?.socialLinks?.portfolio || '',
          instagram: user.profile?.socialLinks?.instagram || '',
        },
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updateData: UpdateProfileData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        profile: {
          bio: formData.bio,
          dob: formData.dob,
          gender: formData.gender,
          location: formData.location,
          socialLinks: Object.fromEntries(
            Object.entries(formData.socialLinks).filter(([_, value]) => value.trim() !== '')
          ) as any,
        },
        avatar: formData.avatar,
      };

      await updateProfile(updateData);
    } catch (err) {
      // Error handled by hook
      console.error('Profile update error:', err);
    }
  };

  // Type-safe handleInputChange for regular fields
  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Separate handler for social links
  const handleSocialLinkChange = (platform: SocialLinkKey, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <div className="max-w-4xl">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Tell us about yourself..."
            maxLength={500}
          />
          <div className="text-sm text-gray-500 mt-1">
            {formData.bio.length}/500 characters
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.entries(formData.socialLinks) as [SocialLinkKey, string][]).map(([platform, value]) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {platform}
                </label>
                <input
                  type="url"
                  value={value}
                  onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder={`https://${platform}.com/username`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Avatar URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avatar URL
          </label>
          <input
            type="url"
            value={formData.avatar}
            onChange={(e) => handleInputChange('avatar', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={profileLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {profileLoading ? 'Updating Profile...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;