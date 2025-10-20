import React, { useState, useMemo } from 'react';
import type { Prompt, PromptFilters } from '../../../types/prompt';
import LibraryHeader from './LibraryHeader';
import LibrarySearch from './LibrarySearch';
import CategoryFilter from './CategoryFilter';
import PromptCard from './PromptCard';
import LoadMoreButton from './LoadMoreButton';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

interface LibraryProps {
  prompts?: Prompt[];
  loading?: boolean;
  onSearch?: (filters: PromptFilters) => void;
  onLike?: (id: string) => void;
  onCopy?: (id: string) => void;
  onView?: (id: string) => void;
}

// Define default categories that should always appear
const DEFAULT_CATEGORIES = [
  'Finance',
  'Sales', 
  'Education',
  'Writing',
  'Code',
  'Design',
  'Productivity',
  'Marketing',
  'SEO',
  'Art',
  'Business',
  'Health',
  'Technology',
  'Entertainment',
  'Other'
];

const Library: React.FC<LibraryProps> = ({
  prompts = [],
  loading = false,
  onSearch,
  onLike,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Calculate categories dynamically from prompts data
  const categories = useMemo(() => {
    // Get all unique categories from prompts
    const uniqueCategoriesFromData = Array.from(new Set(prompts.map(prompt => prompt.category)))
      .filter(category => category) // Remove empty/null categories
      .sort();

    // Combine default categories with actual data categories
    const allCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...uniqueCategoriesFromData]))
      .sort();

    // Calculate count for each category
    const categoryCounts = allCategories.reduce((acc, category) => {
      acc[category] = prompts.filter(prompt => prompt.category === category).length;
      return acc;
    }, {} as Record<string, number>);

    // Create categories array with counts
    const categoryList = [
      { name: 'All', count: prompts.length, icon: null }
    ];

    // Add each category with its count
    allCategories.forEach(category => {
      categoryList.push({
        name: category,
        count: categoryCounts[category] || 0,
        icon: null
      });
    });

    return categoryList;
  }, [prompts]);

  const displayPrompts = prompts.length > 0 ? prompts : [];

  const filteredPrompts = displayPrompts.filter(prompt => {
    const matchesSearch = searchQuery === '' ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch({
        search: query,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        status: 'published'
      });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (onSearch) {
      onSearch({
        search: searchQuery,
        category: category !== 'All' ? category : undefined,
        status: 'published'
      });
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-15">
      <div className="max-w-7xl mx-auto">
        <LibraryHeader/>

        <LibrarySearch
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredPrompts.length} prompts found
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              onLike={onLike}
            />
          ))}
        </div>

        {filteredPrompts.length === 0 && !loading && (
          <EmptyState />
        )}

        {filteredPrompts.length > 0 && (
          <LoadMoreButton />
        )}
      </div>
    </div>
  );
};

export default Library;