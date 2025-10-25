import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

const PrivacySettings: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    dataCollection: true,
    personalizedAds: false,
    searchVisibility: true
  });

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy & Security</h2>
      <p className="text-gray-600 mb-8">Manage your privacy and security settings</p>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                <p className="text-sm text-gray-600">Who can see your profile</p>
              </div>
              <select 
                value={privacySettings.profileVisibility}
                onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
          <div className="space-y-4">
            <button className="flex items-center gap-3 w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Download Your Data</h4>
                <p className="text-sm text-gray-600">Get a copy of your personal data</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 w-full p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <Trash2 className="w-5 h-5 text-red-600" />
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently delete your account and data</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;