import React from 'react';
import { FaPlus, FaBook, FaHome } from 'react-icons/fa';
import type { QuickAction, Category } from '../../../types/dashboard';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  actions?: QuickAction[];
  categories?: Category[];
  onActionClick?: (action: string) => void;
  onCategoryClick?: (category: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  actions = [],
  categories = [],
  onActionClick,
  onCategoryClick
}) => {
  const navigate = useNavigate();

  const handleCreatePrompt = () => {
    navigate("/dashboard/create-prompt");
  };

  const handleBrowseLibrary = () => {
    navigate("/dashboard/library");
  };

  const handleCommunityFeeds = () => {
    navigate("/dashboard/community");
  };

  const defaultActions: QuickAction[] = [
    {
      label: "Create New Prompt",
      icon: <FaPlus />,
      variant: "primary" as const,
      onClick: handleCreatePrompt
    },
    {
      label: "Browse Library", 
      icon: <FaBook />,
      variant: "secondary" as const,
      onClick: handleBrowseLibrary
    },
    {
      label: "Community Feeds",
      icon: <FaHome />,
      variant: "secondary" as const,
      onClick: handleCommunityFeeds
    }
  ];

  const defaultCategories: Category[] = [
    { name: "Coding", color: "purple" },
    { name: "Design", color: "yellow" },
    { name: "Writing", color: "blue" },
    { name: "Marketing", color: "pink" }
  ];

  const actionsToUse = actions.length > 0 ? actions : defaultActions;
  const categoriesToUse = categories.length > 0 ? categories : defaultCategories;

  const colorMap = {
    purple: 'bg-purple-100 text-[#270450]',
    yellow: 'bg-yellow-100 text-yellow-700', 
    blue: 'bg-blue-100 text-blue-700',
    pink: 'bg-pink-100 text-pink-700'
  };

  const handleActionClick = (action: QuickAction) => {
    action.onClick?.();
    onActionClick?.(action.label);
  };

  return (
    <div className='bg-white w-full h-auto p-5 rounded-lg'>
      <h2 className="text-lg font-bold text-gray-700 mb-3">Quick Actions</h2>
      <p className='mb-5 text-sm'>Common tasks and shortcuts</p>
      <div className="space-y-3">
        {actionsToUse.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              action.variant === 'primary' 
                ? 'bg-black text-white hover:bg-gray-800 cursor-pointer' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-300 font-bold cursor-pointer'
            }`}
          >
            {action.icon} {action.label}
          </button>
        ))}
      </div>

      <h3 className="mt-6 font-semibold text-gray-700">Popular Categories</h3>
      <div className="flex flex-wrap gap-2 mt-3">
        {categoriesToUse.map((category, index) => (
          <span
            key={index}
            onClick={() => onCategoryClick?.(category.name)}
            className={`px-3 py-1 rounded-full text-xs cursor-pointer hover:opacity-80 transition-opacity ${
              colorMap[category.color]
            }`}
          >
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;