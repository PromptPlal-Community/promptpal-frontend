
import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaFolderOpen, FaHeart, FaUserCircle, FaPen, FaCrown } from 'react-icons/fa';
import type { NavItem } from '../../../types/dashboard';
import type { User } from '../../../types/auth';
import promptPalLogo from "/prompt-pal-logo.png"

interface SidebarProps {
  getCurrentUser?: () => Promise<User | null> | User | null;
  activeItem?: string;
  onItemClick?: (key: string) => void;
  hovered?: string | null;
  setHovered?: (key: string | null) => void;
}

// Add subscription type
interface Subscription {
  plan: string;
  status: string;
  isActive: boolean;
}

const defaultGetCurrentUser = async (): Promise<User | null> => {
  return {
    googleId: null,
    name: 'John Doe',
    username: "Ade",
    email: 'john@example.com',
    avatar: undefined,
    isEmailVerified: true,
    id: "",
    isVerified: true
  };
};

// Mock function to get subscription data - replace with your actual implementation
const getCurrentSubscription = async (): Promise<Subscription> => {
  // This should be replaced with your actual subscription data fetching logic
  return {
    plan: 'Free',
    status: 'active',
    isActive: true
  };
};

const Sidebar: React.FC<SidebarProps> = ({ 
  getCurrentUser = defaultGetCurrentUser,
  activeItem = 'workspace',
  onItemClick,
  setHovered
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  const navItems: NavItem[] = [
    { name: 'Workspace', icon: <FaHome />, key: 'workspace' },
    { name: 'Library', icon: <FaBook />, key: 'promptpal-library' },
    { name: 'Created Prompts', icon: <FaFolderOpen />, key: 'created-prompt' },
    { name: 'Create New Prompt', icon: <FaPen />, key: 'create-new-prompt' },
    { name: 'Favorites', icon: <FaHeart />, key: 'favorites' },
    { name: 'Community', icon: <FaUserCircle />, key: 'community' },
    { name: 'Settings', icon: <FaUserCircle />, key: 'settings' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscription = async () => {
      try {
        setSubscriptionLoading(true);
        const subscriptionData = await getCurrentSubscription();
        setSubscription(subscriptionData);
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
        setSubscription(null);
      } finally {
        setSubscriptionLoading(false);
      }
    };

    fetchUser();
    fetchSubscription();
  }, [getCurrentUser]);

  const handleItemClick = (key: string) => {
    onItemClick?.(key);
  };

  const handleUpgradeClick = () => {
    onItemClick?.('subscription');
  };

  const handleUserAvatarClick = () => {
    handleItemClick('settings');
  };

  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'premium':
        return 'from-yellow-500 to-orange-500';
      case 'pro':
        return 'from-purple-500 to-pink-500';
      case 'enterprise':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <aside className="hidden lg:flex w-64 bg-white shadow-xl flex-col justify-between h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="flex-1 flex flex-col">
        {/* Logo Section - Matching MobileNav gradient */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200 bg-white to-purple-800 text-white">
          <img
            src={promptPalLogo}
            alt="Prompt-Pal Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation Items - Matching MobileNav styling */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              onMouseEnter={() => setHovered?.(item.key)}
              onMouseLeave={() => setHovered?.(null)}
              className={`
                flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200 group
                ${activeItem === item.key 
                  ? 'bg-[#270450] text-white shadow-lg transform scale-105' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#270450] hover:shadow-md'
                }
              `}
            >
              <span className={`
                text-lg transition-transform duration-200
                ${activeItem === item.key ? 'transform scale-110' : 'group-hover:scale-110'}
              `}>
                {item.icon}
              </span>
              <span className="font-medium text-left flex-1 text-sm">{item.name}</span>
              {activeItem === item.key && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Subscription Section - Matching MobileNav design */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-br from-purple-50 to-white">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${subscription ? getPlanColor(subscription.plan) : 'from-gray-500 to-gray-700'}`}>
                <FaCrown className="text-white text-sm" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">Current Plan</h3>
                {subscriptionLoading ? (
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mt-1"></div>
                ) : (
                  <p className="text-lg font-bold text-gray-900">
                    {subscription?.plan || 'Free'}
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleUpgradeClick}
              className="w-full bg-gradient-to-r from-[#270450] to-[#270450]/70 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:from-[#270450]/90 hover:to-purple-700/90 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <FaCrown className="text-sm" />
              Upgrade Plan
            </button>
            
            {subscription && subscription.plan.toLowerCase() === 'free' && (
              <p className="text-xs text-gray-600 text-center mt-2">
                Unlock premium features
              </p>
            )}
          </div>
        </div>
      </div>
  {/* User Profile Section - Matching MobileNav */}
        <div className="p-4 border-gray-100 bg-gray-200 border-t rounded-t-2xl shadow-2xl">
          {!loading && user && (
            <div className="flex items-center gap-3">
              <button 
                onClick={handleUserAvatarClick}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#270450] text-white font-bold text-lg shadow-sm hover:bg-[#270450]/90 transition-colors cursor-pointer"
                title="Go to Settings"
              >
                {getUserInitials(user.name)}
              </button>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          )}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
    </aside>
  );
};

export default Sidebar;