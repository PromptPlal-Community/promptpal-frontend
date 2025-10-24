import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { PromptFilters } from '../../../types/prompt';
import { usePrompts } from '../../../hooks/usePrompts';
import LibraryHeader from './LibraryHeader';
import LibrarySearch from './LibrarySearch';
import CategoryFilter from './CategoryFilter';
import PromptCard from './PromptCard';
import LoadMoreButton from './LoadMoreButton';
import EmptyState from './EmptyState';

interface LibraryProps {
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onDownload?: (id: string) => void;
  onCopy?: (id: string) => void;
  onView?: (id: string) => void;
  onShare?: (id: string) => void;
}

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
  onFavorite,
  onDownload,
  onCopy,
  onView,
  onShare,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [allPrompts, setAllPrompts] = useState<any[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  
  const {  
    loading, 
    error, 
    getPublicPrompts,
    pagination, 
    upvotePrompt,
    downvotePrompt,
    favoritePrompt,
    incrementPromptViews 
  } = usePrompts();

  const [localInteractions, setLocalInteractions] = useState<{
    [key: string]: {
      liked: boolean;
      favorited: boolean;
      disliked: boolean;
    }
  }>({});

  const fetchPrompts = useCallback(async (page: number, search: string, category: string, isNewFilter: boolean) => {
    try {
      const filters: PromptFilters = {
        limit: 12,
        page: page,
        ...(search && { search: search }),
        ...(category !== 'All' && { category: category })
      };
      
      const response = await getPublicPrompts(filters);
      
      
      if (response && response.prompts) {
        if (isNewFilter || page === 1) {
          setAllPrompts(response.prompts);
        } else {
          setAllPrompts(prev => [...prev, ...response.prompts]);
        }
        
        if (page === 1 && !search && category === 'All' && response.prompts) {
          const counts: Record<string, number> = {};
          DEFAULT_CATEGORIES.forEach(cat => {
            counts[cat] = response.prompts.filter((prompt: any) => prompt.category === cat).length;
          });
          setCategoryCounts(counts);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching public prompts:', error);
    }
  }, [getPublicPrompts]);

  // State to track if the current fetch is due to a filter change
  const [isFilterChange, setIsFilterChange] = useState(false);

  useEffect(() => {
    const isNewFilter = isFilterChange;
    
    if (isFilterChange) {
      setIsFilterChange(false);
    }

    fetchPrompts(currentPage, searchQuery, selectedCategory, isNewFilter);
  }, [currentPage, searchQuery, selectedCategory, fetchPrompts, isFilterChange]);

  // Handle filter changes (search/category)
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    
    setIsFilterChange(true);

    const timeoutId = setTimeout(() => {
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const handleLike = async (id: string) => {
    try {
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          liked: true,
          disliked: false
        }
      }));
      
      await upvotePrompt(id);
    } catch (error) {
      console.error('Failed to like prompt:', error);
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          liked: false,
          disliked: prev[id]?.disliked || false
        }
      }));
    }
  };

  const handleDislike = async (id: string) => {
    try {
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          liked: false,
          disliked: true
        }
      }));
      
      await downvotePrompt(id);
    } catch (error) {
      console.error('Failed to dislike prompt:', error);
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          liked: prev[id]?.liked || false,
          disliked: false
        }
      }));
    }
  };

  const handleFavorite = async (id: string) => {
    const currentFavorited = localInteractions[id]?.favorited;
    
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        favorited: !currentFavorited
      }
    }));

    try {
      await favoritePrompt(id);
      if (onFavorite) {
        onFavorite(id);
      }
    } catch (error) {
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          favorited: currentFavorited
        }
      }));
      console.error('Failed to favorite prompt:', error);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const prompt = allPrompts.find(p => p._id === id);
      if (!prompt) return;

      const content = `Prompt: ${prompt.title}\n\n${prompt.promptText}\n\nCategory: ${prompt.category}\nTags: ${prompt.tags?.join(', ')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prompt.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (onDownload) {
        onDownload(id);
      }
    } catch (error) {
      console.error('Failed to download prompt:', error);
    }
  };

  const handleCopy = async (id: string) => {
    try {
      const prompt = allPrompts.find(p => p._id === id);
      if (!prompt) return;

      await navigator.clipboard.writeText(prompt.promptText);
      
      if (onCopy) {
        onCopy(id);
      }

    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const handleView = async (id: string) => {
    try {
      await incrementPromptViews(id);
      
      if (onView) {
        onView(id);
      }
    } catch (error) {
      console.error('Failed to increment views:', error);
    }
  };

  const handleShare = async (id: string) => {
    try {
      const prompt = allPrompts.find(p => p._id === id);
      if (!prompt) return;

      if (navigator.share) {
        await navigator.share({
          title: prompt.title,
          text: prompt.description,
          url: `${window.location.origin}/dashboard/prompts/${id}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/dashboard/prompts/${id}`);
      }

      if (onShare) {
        onShare(id);
      }
    } catch (error) {
      console.error('Failed to share prompt:', error);
    }
  };

  // Calculate categories with proper counts
  const categories = useMemo(() => {
    const totalCount = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
    
    const uniqueCategoriesFromData = Array.from(new Set(allPrompts.map(prompt => prompt.category)))
      .filter(category => category && category.trim() !== '')
      .sort();

    const allCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...uniqueCategoriesFromData]))
      .sort();

    const categoryList = [
      { 
        name: 'All', 
        count: totalCount, 
        icon: null 
      }
    ];

    allCategories.forEach(category => {
      categoryList.push({
        name: category,
        count: categoryCounts[category] || 0,
        icon: null
      });
    });

    return categoryList;
  }, [allPrompts, categoryCounts]);

  const displayedPrompts = allPrompts;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLoadMore = async () => {
    if (!pagination || pagination.current >= pagination.total) {
      return;
    }
    
    try {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more prompts:', error);
    }
  };

  const hasMore = pagination && pagination.current < pagination.total;
  const showPaginationLoading = loading && displayedPrompts.length > 0;

  if (error && displayedPrompts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-15">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Prompts
            </h2>
            <p className="text-red-600">
              {error || 'Failed to load prompts. Please try again.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-15">
      <div className="max-w-7xl mx-auto">
        <LibraryHeader />

        <LibrarySearch
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {displayedPrompts.length} {displayedPrompts.length === 1 ? 'prompt' : 'prompts'} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {pagination?.totalRecords && ` of ${pagination.totalRecords}`}
            {showPaginationLoading && ' (loading more...)'}
          </p>
        </div>

        {/* Prompts Grid */}
        {displayedPrompts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {displayedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  onLike={() => handleLike(prompt._id)}
                  onDislike={() => handleDislike(prompt._id)}
                  onFavorite={() => handleFavorite(prompt._id)}
                  onDownload={() => handleDownload(prompt._id)}
                  onCopy={() => handleCopy(prompt._id)}
                  onView={() => handleView(prompt._id)}
                  onShare={() => handleShare(prompt._id)}
                  interactions={localInteractions[prompt._id]}
                />
              ))}
            </div>

            {hasMore && (
              <LoadMoreButton onClick={handleLoadMore} loading={showPaginationLoading} />
            )}
          </>
        ) : (
          <EmptyState 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onClearSearch={() => setSearchQuery('')}
            onClearCategory={() => setSelectedCategory('All')}
          />
        )}
      </div>
    </div>
  );
};

export default Library;