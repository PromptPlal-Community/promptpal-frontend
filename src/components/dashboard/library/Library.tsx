import React, { useState, useMemo, useEffect } from 'react';
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
  
  const { 
    prompts, 
    loading, 
    error, 
    getPublicPrompts,
    pagination, 
    upvotePrompt,
    downvotePrompt,
    favoritePrompt,
    incrementPromptViews 
  } = usePrompts();

  // Local state for tracking user interactions (for optimistic updates)
  const [localInteractions, setLocalInteractions] = useState<{
    [key: string]: {
      liked: boolean;
      favorited: boolean;
      disliked: boolean;
    }
  }>({});

  // Fetch all public prompts when component mounts or filters change
useEffect(() => {
  const loadPrompts = async () => {
    try {
      const filters: PromptFilters = {
        isPublic: true,  // Explicitly filter for public prompts
        limit: 12,
        page: currentPage,
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory !== 'All' && { category: selectedCategory })
      };
      
      console.log('Fetching public prompts with filters:', filters);
      await getPublicPrompts(filters);
    } catch (error) {
      console.error('Error fetching public prompts:', error);
    }
  };

    loadPrompts();
  }, [searchQuery, selectedCategory, currentPage, getPublicPrompts]); 

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const handleLike = async (id: string) => {
    try {
      await upvotePrompt(id);
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          liked: true,
          disliked: false
        }
      }));
    } catch (error) {
      console.error('Failed to like prompt:', error);
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          liked: false
        }
      }));
    }
  };

  const handleDislike = async (id: string) => {
    try {
      await downvotePrompt(id);
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          liked: false,
          disliked: true
        }
      }));
    } catch (error) {
      console.error('Failed to dislike prompt:', error);
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          disliked: false
        }
      }));
    }
  };

  // Handle favorite with optimistic update
  const handleFavorite = async (id: string) => {
    const currentFavorited = localInteractions[id]?.favorited;
    
    // Optimistic update
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        favorited: !currentFavorited
      }
    }));

    try {
      await favoritePrompt(id);
      // Call external handler if provided
      if (onFavorite) {
        onFavorite(id);
      }
    } catch (error) {
      // Revert optimistic update on error
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

  // Handle download
  const handleDownload = async (id: string) => {
    try {
      const prompt = prompts.find(p => p._id === id);
      if (!prompt) return;

      // Create a downloadable text file
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

      // Call external handler if provided
      if (onDownload) {
        onDownload(id);
      }
    } catch (error) {
      console.error('Failed to download prompt:', error);
    }
  };

  // Handle copy to clipboard
  const handleCopy = async (id: string) => {
    try {
      const prompt = prompts.find(p => p._id === id);
      if (!prompt) return;

      await navigator.clipboard.writeText(prompt.promptText);
      
      // Call external handler if provided
      if (onCopy) {
        onCopy(id);
      }

      // You could show a toast notification here
      console.log('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  // Handle view - this will be called when user clicks on the card to view details
  const handleView = async (id: string) => {
    try {
      await incrementPromptViews(id);
      
      // Call external handler if provided
      if (onView) {
        onView(id);
      }
    } catch (error) {
      console.error('Failed to increment views:', error);
    }
  };

  // Handle share
  const handleShare = async (id: string) => {
    try {
      const prompt = prompts.find(p => p._id === id);
      if (!prompt) return;

      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: prompt.title,
          text: prompt.description,
          url: `${window.location.origin}/dashboard/prompts/${id}`,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${window.location.origin}/dashboard/prompts/${id}`);
        console.log('Prompt link copied to clipboard!');
      }

      // Call external handler if provided
      if (onShare) {
        onShare(id);
      }
    } catch (error) {
      console.error('Failed to share prompt:', error);
    }
  };

  // Calculate categories dynamically from all prompts data
  const categories = useMemo(() => {
    if (!prompts || prompts.length === 0) {
      // Return default categories with 0 counts if no prompts
      return [
        { name: 'All', count: 0, icon: null },
        ...DEFAULT_CATEGORIES.map(category => ({
          name: category,
          count: 0,
          icon: null
        }))
      ];
    }

    // Get all unique categories from prompts
    const uniqueCategoriesFromData = Array.from(new Set(prompts.map(prompt => prompt.category)))
      .filter(category => category && category.trim() !== '') // Remove empty/null categories
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

  // Use the prompts directly from the API response
  const displayedPrompts = prompts || [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLoadMore = async () => {
    if (!pagination || pagination.current >= pagination.total) return;
    
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