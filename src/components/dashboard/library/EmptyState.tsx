import React from 'react';

interface EmptyStateProps {
  searchQuery?: string;
  selectedCategory?: string;
  onClearSearch?: () => void;
  onClearCategory?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  searchQuery, 
  selectedCategory, 
  onClearSearch,
  onClearCategory 
}) => {
  const hasActiveFilters = searchQuery || selectedCategory !== 'All';

  return (
    <div className="text-center py-8 md:py-12">
      <div className="text-4xl md:text-6xl mb-4">🔍</div>
      
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
        {hasActiveFilters ? 'No prompts found' : 'No prompts available yet'}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {searchQuery && selectedCategory !== 'All' ? (
          `No prompts found for "${searchQuery}" in ${selectedCategory}. Try different keywords or categories.`
        ) : searchQuery ? (
          `No prompts found for "${searchQuery}". Try different keywords or browse all categories.`
        ) : selectedCategory !== 'All' ? (
          `No prompts found in ${selectedCategory}. Try another category or browse all prompts.`
        ) : (
          'There are no public prompts available yet. Be the first to create one!'
        )}
      </p>

      {hasActiveFilters && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="bg-[#6B46C1] text-white px-6 py-2 rounded-lg hover:bg-[#5A3AA3] transition-colors"
            >
              Clear Search
            </button>
          )}
          {selectedCategory !== 'All' && (
            <button
              onClick={onClearCategory}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Show All Categories
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;