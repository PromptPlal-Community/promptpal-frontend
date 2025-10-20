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

export const usePrompts = (filters: PromptFilters = {}) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalRecords: 0,
  });

  // Use useCallback with proper dependencies - stringify filters for comparison
  const fetchPrompts = useCallback(async (newFilters?: PromptFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Merge the default filters with any new filters passed
      const mergedFilters = { ...filters, ...newFilters };
      
      const response = await promptService.getUserPrompts(mergedFilters);
      
      setPrompts(response.prompts || []);
      setPagination(response.pagination || {
        current: 1,
        total: 1,
        count: 0,
        totalRecords: 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // Stringify filters to prevent unnecessary recreations

  // Auto-fetch only when filters change, not fetchPrompts
  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const createPrompt = async (formData: FormData): Promise<Prompt> => {
    try {
      const newPrompt = await promptService.createPrompt(formData);
      setPrompts(prev => [newPrompt, ...prev]);
      return newPrompt;
    } catch (err) {
      // Provide more detailed error information
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

  const updatePrompt = async (id: string, updateData: FormData, images?: File[]): Promise<Prompt> => {
    try {
      const updatedPrompt = await promptService.updatePrompt(id, updateData, images);
      setPrompts(prev => prev.map(prompt => 
        prompt._id === id ? updatedPrompt : prompt
      ));
      return updatedPrompt;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update prompt');
    }
  };

  const deletePrompt = async (id: string): Promise<void> => {
    console.log('Deleting prompt with id:', id);
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
        prompt._id === id ? { ...prompt, upvotes: result.upvotes } : prompt
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to upvote prompt');
    }
  };

  const favoritePrompt = async (id: string): Promise<void> => {
    try {
      await promptService.favoritePrompt(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to favorite prompt');
    }
  };

  const getPromptById = async (id: string): Promise<Prompt | undefined> => {
    try {
      return await promptService.getPromptById(id);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get prompt by ID');
    }
  };

  return {
    prompts,
    loading,
    error,
    pagination,
    fetchPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    upvotePrompt,
    favoritePrompt,
    incrementPromptViews,
    getPromptById,
  };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Wrap fetchStats in useCallback
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
  }, [fetchStats]); // Now fetchStats is stable due to useCallback

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

// Hook for searching prompts
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

// Hook for favorite prompts
export const useFavoritePrompts = (userId: string) => {
  const [favorites, setFavorites] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Wrap fetchFavorites in useCallback
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
  }, [userId]); // Add userId as dependency

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]); // Now fetchFavorites is stable due to useCallback

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