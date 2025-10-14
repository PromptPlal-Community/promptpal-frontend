import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

interface LibrarySearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const LibrarySearch: React.FC<LibrarySearchProps> = ({ searchQuery, onSearch }) => {
  return (
    <div className="mb-6 flex flex-row md:w-full">
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Find Prompts"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 md:w-150 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
      </div>
        <div className='flex flex-row items-end justify-end w-full'>
        <Link 
          type="button"
          to="/dashboard/create-prompt"
          className="flex items-center gap-2 bg-[#270450] hover:bg-[#270450]/80 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus /> Create prompt
        </Link>
        </div>
    </div>
  );
};

export default LibrarySearch;
