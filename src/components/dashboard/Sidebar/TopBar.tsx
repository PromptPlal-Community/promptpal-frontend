import React from 'react';
import { Plus } from 'lucide-react';

interface TopBarProps {
  onCreatePrompt?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onCreatePrompt }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-end">
        <button
          onClick={onCreatePrompt}
          className="flex items-center gap-2 px-4 py-2 bg-[#6B46C1] text-white rounded-lg font-medium hover:bg-[#5a3aa3] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Create prompt
        </button>
      </div>
    </div>
  );
};

export default TopBar;
