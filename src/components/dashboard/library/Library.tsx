import React, { useState } from 'react';
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
  onLike?: (promptId: string) => void;
  onCopy?: (promptId: string) => void;
  onView?: (promptId: string) => void;
}

const Library: React.FC<LibraryProps> = ({
  prompts = [],
  loading = false,
  onSearch,
  onLike,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', count: 102, icon: null },
    { name: 'Finance', count: 0, icon: null },
    { name: 'Sales', count: 0, icon: null },
    { name: 'Education', count: 0, icon: null },
    { name: 'Writing', count: 8, icon: null },
    { name: 'Code', count: 18, icon: null },
    { name: 'Design', count: 7, icon: null },
    { name: 'Productivity', count: 0, icon: null },
    { name: 'Marketing', count: 40, icon: null },
    { name: 'SEO', count: 40, icon: null },
  ];

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
