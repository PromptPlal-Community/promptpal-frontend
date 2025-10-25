// components/dashboard/SettingsNavbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

const SettingsNavbar: React.FC = () => {
    const { user} = useAuth();


  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>

          {/* Center Section */}
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || '/default-avatar.png'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SettingsNavbar;