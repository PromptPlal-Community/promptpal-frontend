import React, { useState, useRef, useEffect } from 'react';

interface Category {
  name: string;
  count: number;
  icon: React.ReactNode | null;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Helper function to find the count of the selected category
  const getSelectedCategoryCount = () => {
    return categories.find(cat => cat.name === selectedCategory)?.count || 0;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-6" ref={dropdownRef}>
      {/* Mobile Dropdown - Shows on small screens */}
      <div className="block lg:hidden mb-4">
        <button
          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium">
            {selectedCategory} 
            {/* FIX: Use the helper function to get the correct count for the main button */}
            <span className="ml-1.5 text-gray-500">
              ({getSelectedCategoryCount()})
            </span>
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMobileDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  if (category.count > 0 || category.name === 'All') {
                    onCategorySelect(category.name);
                    setIsMobileDropdownOpen(false);
                  }
                }}
                className={`
                  w-full text-left px-4 py-3 transition-colors border-b border-gray-100 last:border-b-0
                  ${
                    selectedCategory === category.name
                      ? 'bg-[#6B46C1] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }
                  ${category.count === 0 && category.name !== 'All' ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                // FIX: Only disable if count is 0 AND it's not the 'All' category
                disabled={category.count === 0 && category.name !== 'All'} 
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <span className={`
                    text-xs
                    ${selectedCategory === category.name ? 'text-white/90' : 'text-gray-500'}
                  `}>
                    ({category.count})
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Horizontal Layout - Shows on large screens */}
      <div className="hidden lg:flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors 
              cursor-pointer flex items-center
              ${
                selectedCategory === category.name
                  ? 'bg-[#6B46C1] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }
              ${category.count === 0 && category.name !== 'All' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            // FIX: Only disable if count is 0 AND it's not the 'All' category
            disabled={category.count === 0 && category.name !== 'All'}
          >
            {category.name}
            <span 
              className={`
                ml-1.5 text-xs
                ${selectedCategory === category.name ? 'text-white/90' : 'text-gray-500'}
              `}
            >
              ({category.count})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;