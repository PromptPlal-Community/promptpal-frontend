import React, { useEffect, useState } from 'react';
import { FaHome, FaBook, FaFolderOpen, FaHeart, FaUserCircle } from 'react-icons/fa';
import type { User } from '../../../types/auth';
import promptPalLogo from "/prompt-pal-logo.png"


interface MobileNavProps {
  getCurrentUser?: () => Promise<User | null> | User | null;
  hovered: string | null;
  setHovered: (key: string | null) => void;
  activeItem: string;
  onItemClick: (key: string) => void;
}

const defaultGetCurrentUser = async (): Promise<User | null> => {
  return {
    name: 'John Doe',
    username: "Ade",
    email: 'john@example.com',
    avatar: undefined,
    isEmailVerified: true,
    id: "",
    isVerified: true
  };
};

const MobileNav: React.FC<MobileNavProps> = ({ 
  getCurrentUser = defaultGetCurrentUser,
  activeItem = 'workspace',
  hovered, 
  setHovered,
  onItemClick,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Workspace", icon: <FaHome />, key: "workspace" },
    { name: "Library", icon: <FaBook />, key: "library" },
    { name: "Created Prompts", icon: <FaFolderOpen />, key: "created" },
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

    fetchUser();
  }, [getCurrentUser]);

  const handleItemClick = (key: string) => {
    onItemClick(key);
    setIsMenuOpen(false); // Close menu after clicking
  };

  const handleUserAvatarClick = () => {
    handleItemClick('settings');
  };

  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
     
      <nav className="lg:hidden bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-4 py-3">
        {/* Logo Section */}
        <div className="flex items-start gap-3">
          <img
            src={promptPalLogo}
            alt="Prompt-Pal Logo"
            className=""
          />
        </div>

          {/* User Avatar - Clickable to Settings */}
          <div className="flex items-center gap-2">
            {!loading && user && (
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                </div>
                <button 
                  onClick={handleUserAvatarClick}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#270450] text-white font-bold text-sm hover:bg-[#270450]/90 transition-colors cursor-pointer"
                  title="Go to Settings"
                >
                  {getUserInitials(user.name)}
                </button>
              </div>
            )}
            
            {loading && (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Bar - Fixed at bottom */}
        <div className="flex justify-around items-center bg-white px-4 py-2 border-t border-gray-100">
          {navItems.slice(0, 4).map((item) => ( 
            <div
              key={item.key}
              className="relative flex flex-col items-center"
              onClick={() => handleItemClick(item.key)}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <button 
                className={`text-xl p-2 rounded-lg transition-colors ${
                  activeItem === item.key 
                    ? 'text-[#270450] bg-purple-50' 
                    : 'text-gray-600 hover:text-[#270450] hover:bg-gray-50'
                }`}
              >
                {item.icon}
              </button>
              
              {/* Tooltip on hover */}
              {hovered === item.key && (
                <div className="absolute top-12 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                  {item.name}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              )}
            </div>
          ))}
          
          {/* More menu for additional items */}
          <div className="relative">
            <button 
              className={`text-xl p-2 rounded-lg transition-colors ${
                isMenuOpen 
                  ? 'text-[#270450] bg-purple-50' 
                  : 'text-gray-600 hover:text-[#270450] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaUserCircle />
            </button>
            
            {/* Dropdown menu */}
            {isMenuOpen && (
              <div className="absolute top-5 right-0 bg-white shadow-lg rounded-lg border border-gray-200 z-10 min-w-48 mt-10">
                {navItems.slice(4).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleItemClick(item.key)}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                      activeItem === item.key 
                        ? 'text-[#270450] font-semibold bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop for dropdown when open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-none bg-opacity-10 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="lg:hidden h-24" />
    </>
  );
};

export default MobileNav;