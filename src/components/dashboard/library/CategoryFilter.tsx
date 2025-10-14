import React from 'react';

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
  return (
    <div className="mb-6">
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === category.name
                ? 'bg-[#6B46C1] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.name}
            <span className={`ml-1.5 ${selectedCategory === category.name ? 'text-white' : 'text-gray-500'}`}>
              {category.count} prompts
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
