import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCreatePrompt?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
        <div className="relative w-full lg:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Find Prompts"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#270450]/50"
          />
        </div>
        <Link 
          to="/dashboard/create-new-prompt"
          className="flex items-center gap-2 bg-[#270450] hover:bg-[#270450]/80 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus /> Create prompt
        </Link>
      </div>
    </form>
  );
};

export default SearchBar;