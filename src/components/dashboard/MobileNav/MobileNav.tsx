import React, { useEffect, useState } from 'react';
import { FaHome, FaBook, FaFolderOpen, FaHeart, FaUserCircle, FaPen, FaTimes, FaBars, FaCrown } from 'react-icons/fa';
import type { User } from '../../../types/auth';
import promptPalLogo from "/prompt-pal-logo.png"

interface MobileNavProps {
  getCurrentUser?: () => Promise<User | null> | User | null;
  hovered: string | null;
  setHovered: (key: string | null) => void;
  activeItem: string;
  onItemClick: (key: string) => void;
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

const MobileNav: React.FC<MobileNavProps> = ({ 
  getCurrentUser = defaultGetCurrentUser,
  activeItem = 'workspace', 
  setHovered,
  onItemClick,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Workspace", icon: <FaHome />, key: "workspace" },
    { name: "Library", icon: <FaBook />, key: "promptpal-library" },
    { name: 'Created Prompts', icon: <FaFolderOpen />, key: 'created-prompt' },
    { name: 'Create New Prompt', icon: <FaPen />, key: "create-new-prompt" },
    { name: "Favorites", icon: <FaHeart />, key: "favorites" },
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
    onItemClick(key);
    setIsSidebarOpen(false); // Close sidebar after clicking
  };

  const handleUserAvatarClick = () => {
    handleItemClick('settings');
  };

  const handleUpgradeClick = () => {
    // Navigate to subscription page
    handleItemClick('subscription');
    // Alternatively, you can use window.location or your routing method:
    // window.location.href = '/subscription';
    // or
    // navigate('/subscription');
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
    <>
      {/* Top Navigation Bar */}
      <nav className="lg:hidden bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo and Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:text-[#270450] hover:bg-gray-50 transition-colors"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={promptPalLogo}
                alt="Prompt-Pal Logo"
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold text-gray-900 hidden sm:block">PromptPal</span>
            </div>
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2">
            {!loading && user && (
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="font-medium text-sm text-gray-900 truncate max-w-24">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate max-w-24">{user.email}</p>
                </div>
                <button 
                  onClick={handleUserAvatarClick}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#270450] text-white font-bold text-sm hover:bg-[#270450]/90 transition-colors cursor-pointer border-2 border-white shadow-sm"
                  title="Go to Settings"
                >
                  {getUserInitials(user.name)}
                </button>
              </div>
            )}
            
            {loading && (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-none bg-opacity-50 z-50 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-60 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#270450] to-purple-800 text-white">
          <div className="flex items-center gap-3">
            <img
              src={promptPalLogo}
              alt="Prompt-Pal Logo"
              className="h-8 w-auto"
            />
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200 group
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
                <span className="font-medium text-left flex-1">{item.name}</span>
                {activeItem === item.key && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Subscription Section - Added just before support */}
        <div className="p-1 border-t border-gray-200 bg-gradient-to-br from-purple-50 to-white">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${subscription ? getPlanColor(subscription.plan) : 'from-gray-500 to-gray-700'}`}>
                <FaCrown className="text-white text-sm" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">Current Plan</h3>
                {subscriptionLoading ? (
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                ) : (
                  <p className="text-lg font-bold text-gray-900">
                    {subscription?.plan || 'Free'}
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleUpgradeClick}
              className="w-full bg-gradient-to-r from-[#270450] to-purple-700 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:from-[#270450]/90 hover:to-purple-700/90 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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

        {/* User Profile Section */}
        <div className="p-3 border-b border-gray-100 bg-gray-50">
          {!loading && user && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#270450] text-white font-bold text-lg shadow-sm"
                onClick={handleUserAvatarClick}>
                {getUserInitials(user.name)}
              </div>
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
      </div>


      {/* Bottom Navigation Bar - For quick access */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex justify-around items-center px-2 py-3">
          {navItems.slice(0, 2).map((item) => ( 
            <div
              key={item.key}
              className="relative flex flex-col items-center"
              onClick={() => handleItemClick(item.key)}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <button 
                className={`
                  flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-16
                  ${activeItem === item.key 
                    ? 'text-[#270450] bg-purple-50 shadow-inner' 
                    : 'text-gray-600 hover:text-[#270450] hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs font-medium truncate max-w-16">{item.name.split(' ')[0]}</span>
              </button>
              
              {/* Active indicator */}
              {activeItem === item.key && (
                <div className="absolute -top-1 w-1 h-1 bg-[#270450] rounded-full"></div>
              )}
            </div>
          ))}
          
          {/* More menu button */}
          <div className="relative">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`
                flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-16
                ${isSidebarOpen 
                  ? 'text-[#270450] bg-purple-50 shadow-inner' 
                  : 'text-gray-600 hover:text-[#270450] hover:bg-gray-50'
                }
              `}
            >
              <span className="text-lg mb-1">
                <FaBars />
              </span>
              <span className="text-xs font-medium">More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed navs */}
      <div className="lg:hidden h-32" />
    </>
  );
};

export default MobileNav;