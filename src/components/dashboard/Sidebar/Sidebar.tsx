// components/dashboard/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaFolderOpen, FaHeart, FaUserCircle, FaPen } from 'react-icons/fa';
import type {NavItem } from '../../../types/dashboard';
import type { User } from '../../../types/auth';
import promptPalLogo from "/prompt-pal-logo.png"


interface SidebarProps {
  getCurrentUser?: () => Promise<User | null> | User | null;
  activeItem?: string;
  onItemClick?: (key: string) => void;
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

const Sidebar: React.FC<SidebarProps> = ({ 
  getCurrentUser = defaultGetCurrentUser,
  activeItem = 'workspace',
  onItemClick
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navItems: NavItem[] = [
    { name: 'Workspace', icon: <FaHome />, key: 'workspace' },
    { name: 'Library', icon: <FaBook />, key: 'promptpal-library' },
    { name: 'Created Prompts', icon: <FaFolderOpen />, key: 'created-prompt' },
    { name: 'Create New Prompt', icon: <FaPen/>, key: "create-new-prompt"},
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

    fetchUser();
  }, [getCurrentUser]);

  const handleItemClick = (key: string) => {
    onItemClick?.(key);
  };

  return (
    <aside className="hidden lg:flex w-64 bg-white shadow-md flex-col justify-between h-screen fixed left-0 top-0">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
          <img
            src={promptPalLogo}
            alt="Prompt-Pal Logo"
            className=""
          />
        </div>

        {/* Navigation Items */}
        <nav className="mt-2 flex flex-col">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                activeItem === item.key 
                  ? 'text-[#270450] font-semibold bg-purple-50 border-r-2 border-[#270450]' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className={`text-lg ${activeItem === item.key ? 'text-[#270450]' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* User Section */}
      {!loading && user && (
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-xl text-gray-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-600 truncate">{user.email}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;