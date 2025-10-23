import { useState, useEffect, useCallback } from 'react';
import { communityService } from '../services/communityService';
import type { Community, CreateCommunityData, CommunityFilters } from '../types/trend';

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

export const useCommunities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [currentCommunity, setCurrentCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalRecords: 0,
  });

  const getCommunities = useCallback(async (filters: CommunityFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await communityService.getCommunities(filters);
      console.log('Communities response:', response);
      
      setCommunities(response.communities || []);
      setPagination({
        current: response.currentPage || 1,
        total: response.totalPages || 1,
        count: (response.communities || []).length,
        totalRecords: response.totalCommunities || 0,
      });
      
      return response; // Return the response to fix the void error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch communities');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCommunityById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const community = await communityService.getCommunityById(id);
      console.log('Community by ID response:', community);
      
      setCurrentCommunity(community);
      return community;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch community');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCommunity = useCallback(async (communityData: CreateCommunityData): Promise<Community> => {
    try {
      setLoading(true);
      setError(null);

      const newCommunity = await communityService.createCommunity(communityData);
      setCommunities(prev => [newCommunity, ...prev]);
      return newCommunity;
    } catch (err) {
      let errorMessage = 'Failed to create community';
      
      if (isAxiosError(err) && err.response?.data?.error) {
        errorMessage = `Server error: ${err.response.data.error}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCommunity = useCallback(async (id: string, updateData: Partial<CreateCommunityData>): Promise<Community> => {
    try {
      setLoading(true);
      setError(null);

      const updatedCommunity = await communityService.updateCommunity(id, updateData);
      
      // Update in communities list
      setCommunities(prev => prev.map(community => 
        community._id === id ? updatedCommunity : community
      ));
      
      // Update current community if it's the one being updated
      if (currentCommunity?._id === id) {
        setCurrentCommunity(updatedCommunity);
      }
      
      return updatedCommunity;
    } catch (err) {
      let errorMessage = 'Failed to update community';
      
      if (isAxiosError(err) && err.response?.data?.error) {
        errorMessage = `Server error: ${err.response.data.error}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentCommunity]);

  const deleteCommunity = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await communityService.deleteCommunity(id);
      
      // Remove from communities list
      setCommunities(prev => prev.filter(community => community._id !== id));
      
      // Clear current community if it's the one being deleted
      if (currentCommunity?._id === id) {
        setCurrentCommunity(null);
      }
    } catch (err) {
      let errorMessage = 'Failed to delete community';
      
      if (isAxiosError(err) && err.response?.data?.error) {
        errorMessage = `Server error: ${err.response.data.error}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentCommunity]);

  const joinCommunity = useCallback(async (id: string): Promise<Community> => {
    try {
      setLoading(true);
      setError(null);

      const updatedCommunity = await communityService.joinCommunity(id);
      
      // Update in communities list
      setCommunities(prev => prev.map(community => 
        community._id === id ? updatedCommunity : community
      ));
      
      // Update current community if it's the one being joined
      if (currentCommunity?._id === id) {
        setCurrentCommunity(updatedCommunity);
      }
      
      return updatedCommunity;
    } catch (err) {
      let errorMessage = 'Failed to join community';
      
      if (isAxiosError(err) && err.response?.data?.error) {
        errorMessage = `Server error: ${err.response.data.error}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentCommunity]);

  const leaveCommunity = useCallback(async (id: string): Promise<Community> => {
    try {
      setLoading(true);
      setError(null);

      const updatedCommunity = await communityService.leaveCommunity(id);
      
      // Update in communities list
      setCommunities(prev => prev.map(community => 
        community._id === id ? updatedCommunity : community
      ));
      
      // Update current community if it's the one being left
      if (currentCommunity?._id === id) {
        setCurrentCommunity(updatedCommunity);
      }
      
      return updatedCommunity;
    } catch (err) {
      let errorMessage = 'Failed to leave community';
      
      if (isAxiosError(err) && err.response?.data?.error) {
        errorMessage = `Server error: ${err.response.data.error}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentCommunity]);

  const searchCommunities = useCallback(async (query: string, filters: CommunityFilters = {}): Promise<Community[]> => {
    try {
      setLoading(true);
      setError(null);

      const response = await communityService.searchCommunities(query, filters);
      return response.communities || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search communities');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPopularCommunities = useCallback(async (filters: CommunityFilters = {}): Promise<Community[]> => {
    try {
      setLoading(true);
      setError(null);

      const response = await communityService.getPopularCommunities(filters);
      return response.communities || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch popular communities');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCurrentCommunity = useCallback(() => {
    setCurrentCommunity(null);
  }, []);

  // Only call getCommunities on mount
  useEffect(() => {
    getCommunities();
  }, [getCommunities]);

  return {
    // State
    communities,
    currentCommunity,
    loading,
    error,
    pagination,
    
    // Actions
    getCommunities,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    joinCommunity,
    leaveCommunity,
    searchCommunities,
    getPopularCommunities,
    clearError,
    clearCurrentCommunity,
  };
};