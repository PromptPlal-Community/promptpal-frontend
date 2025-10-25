import { useState, useEffect, useCallback } from 'react';
import { promptService, dashboardService } from '../services/promptService';
import type { Prompt, DashboardStats, PromptFilters } from '../types/prompt';

// Define a proper error type for axios errors
interface AxiosError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message: string;
}

// Type guard to check if error is an AxiosError
const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalRecords: 0,
  });

  const fetchUserPrompts = useCallback(async (filters: PromptFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await promptService.getUserPrompts(filters);
      
      setPrompts(response.prompts || []);
      setPagination(response.pagination || {
        current: response.current || 1,
        total: response.totalPages || 1,
        count: (response.prompts || []).length,
        totalRecords: response.totalRecords || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllPrompts = useCallback(async (newFilters?: PromptFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await promptService.getAllPrompts(newFilters || {});
      
      setPrompts(response.prompts || response.data || []);
      setPagination(response.pagination || {
        current: response.current || 1,
        count: (response.prompts || response.data || []).length,
        totalRecords: response.totalRecords || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  }, []);

// hooks/usePrompts.ts
const getPublicPrompts = useCallback(async (filters = {}) => {
  setLoading(true);
  setError(null);
  try {
    const response = await promptService.getPublicPrompts(filters);
    
    // Return the response but don't set prompts in the hook state
    return response;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch public prompts';
    setError(errorMessage);
    throw err;
  } finally {
    setLoading(false);
  }
}, [setLoading, setError]);

  // Only call fetchUserPrompts on mount
  useEffect(() => {
    fetchUserPrompts();
  }, [fetchUserPrompts]);

  const createPrompt = async (formData: FormData): Promise<Prompt> => {
    try {
      const newPrompt = await promptService.createPrompt(formData);
      setPrompts(prev => [newPrompt, ...prev]);
      return newPrompt;
    } catch (err) {
      let errorMessage = 'Failed to create prompt';
      
      if (isAxiosError(err) && err.response?.data?.error) {
        errorMessage = `Server error: ${err.response.data.error}`;
      } else if (err instanceof Error && err.message.includes('uploader')) {
        errorMessage = 'Image upload service configuration error. Please try without images.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const updatePrompt = async (id: string, updateData: FormData): Promise<Prompt> => {
    try {
      const updatedPrompt = await promptService.updatePrompt(id, updateData);
      setPrompts(prev => prev.map(prompt => 
        prompt._id === id ? updatedPrompt : prompt
      ));
      return updatedPrompt;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update prompt');
    }
  };

  const deletePrompt = async (id: string): Promise<void> => {
    try {
      await promptService.deletePrompt(id);
      setPrompts(prev => prev.filter(prompt => prompt._id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete prompt');
    }
  };

  const incrementPromptViews = async (id: string): Promise<void> => {
    try {
      await promptService.incrementPromptViews(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to increment prompt views');
    }
  };

  const upvotePrompt = async (id: string): Promise<void> => {
    try {
      const result = await promptService.upvotePrompt(id);
      setPrompts(prev => prev.map(prompt => 
        prompt._id === id ? { 
          ...prompt, 
          upvotes: result.upvotes,
        } : prompt
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to upvote prompt');
    }
  };

  const downvotePrompt = async (id: string): Promise<void> => {
    try {
      const result = await promptService.downvotePrompt(id);
      setPrompts(prev => prev.map(prompt => 
        prompt._id === id ? { 
          ...prompt, 
          upvotes: result.upvotes,
          downvotes: result.downvotes,
        } : prompt
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to downvote prompt');
    }
  };

  const favoritePrompt = async (id: string): Promise<void> => {
    try {
      await promptService.favoritePrompt(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to favorite prompt');
    }
  };

  const getFavoritedPrompts = async (userId: string): Promise<Prompt[]> => {
    try {
      const response = await promptService.getUserFavoritePrompts(userId);
      return response.prompts || [];
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to get favorited prompts');
    }
  };

  const removePromptFromFavorites = async (id: string): Promise<void> => {
    try {
      await promptService.removePromptFromFavorites(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to remove prompt from favorites');
    }
  };

  const ratePrompt = async (id: string, rating: number): Promise<void> => {
    try {
      const result = await promptService.ratePrompt(id, rating);
      setPrompts(prev => prev.map(prompt => 
        prompt._id === id ? { 
          ...prompt, 
          rating: {
            ...prompt.rating,
            average: result.averageRating
          }
        } : prompt
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to rate prompt');
    }
  };

  const getPromptRating = async (id: string): Promise<{ averageRating: number; userRating?: number }> => {
    try {
      return await promptService.getPromptRating(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to get prompt rating');
    }
  };

  const getPromptById = async (id: string): Promise<Prompt> => {
    try {
      const response = await promptService.getPromptById(id);
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get prompt by ID');
    }
  };

  const getUserPrompt = async (id: string): Promise<Prompt> => {
    try {
      const response = await promptService.getUserPrompt(id);
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get user prompt');
    }
  };

  return {
    prompts,
    loading,
    error,
    pagination,
    fetchUserPrompts,
    getAllPrompts,
    getPublicPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    upvotePrompt,
    downvotePrompt,
    favoritePrompt,
    incrementPromptViews,
    getPromptById,
    getUserPrompt,
    getFavoritedPrompts,
    removePromptFromFavorites,
    ratePrompt,
    getPromptRating,
  };
};

// ... rest of your hooks remain the same
export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardStats = await dashboardService.getDashboardStats();
      setStats(dashboardStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

export const useSearchPrompts = () => {
  const [results, setResults] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPrompts = async (query: string, filters: PromptFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promptService.searchPrompts(query, filters);
      setResults(response.prompts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search prompts');
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    searchPrompts,
  };
};

export const useFavoritePrompts = (userId: string) => {
  const [favorites, setFavorites] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async (filters: PromptFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promptService.getUserFavoritePrompts(userId, filters);
      setFavorites(response.prompts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [fetchFavorites, userId]);

  const addFavorite = async (promptId: string) => {
    try {
      await promptService.favoritePrompt(promptId);
      await fetchFavorites();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add favorite');
    }
  };

  const removeFavorite = async (promptId: string) => {
    try {
      await promptService.removePromptFromFavorites(promptId);
      setFavorites(prev => prev.filter(prompt => prompt._id !== promptId));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to remove favorite');
    }
  };

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
  };
};