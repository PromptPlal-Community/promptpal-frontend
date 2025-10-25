// hooks/useTrends.ts
import { useState, useEffect, useCallback } from 'react';
import { trendService, communityService, rewardService, authService } from '../services/trendService';
import type { 
  Trend, 
  Community,
  CreateTrendData, 
  CreateCommunityData,
  TrendsResponse, 
  TrendResponse,
  CreateTrendResponse,
  VoteResponse,
  CommentResponse,
  RewardResponse,
  RewardTrendData,
  CreateCommentData,
  Comment as TrendComment
} from '../types/trend';

interface AxiosError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message: string;
}

const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const useTrends = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [currentTrend, setCurrentTrend] = useState<Trend | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<TrendComment[]>([]);
    const [currentComment, setCurrentComment] = useState<TrendComment | null>(null);

  
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalRecords: 0,
  });

  const getTrends = useCallback(async (params?: {
    page?: number;
    limit?: number;
    community?: string;
    sortBy?: string;
  }): Promise<TrendsResponse> => { 
    try {
      setLoading(true);
      setError(null);
      
      const response: TrendsResponse = await trendService.getTrends(params);
      
      setTrends(response.trends || []);
      setPagination({
        current: response.currentPage || 1,
        total: response.totalPages || 1,
        count: (response.trends || []).length,
        totalRecords: response.totalTrends || 0,
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trends';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTrendById = useCallback(async (id: string): Promise<TrendResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: TrendResponse = await trendService.getTrendById(id);
      
      setCurrentTrend(response.trend);
      setComments(response.comments || []); // This should now work
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trend';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);


  const createTrend = useCallback(async (trendData: CreateTrendData): Promise<Trend | null> => {
    try {
      setLoading(true);
      setError(null);

      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to create a trend');
      }

      const response: CreateTrendResponse = await trendService.createTrend(trendData);
      setTrends(prev => [response.trend, ...prev]);
      return response.trend;
    } catch (err) {
      let errorMessage = 'Failed to create trend';
      
      if (isAxiosError(err) && err.response?.data?.error) {
        errorMessage = `Server error: ${err.response.data.error}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const upvoteTrend = useCallback(async (id: string): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to upvote');
      }

      const result: VoteResponse = await trendService.upvoteTrend(id);
      
      // Update local state
      setTrends(prev => prev.map(trend => 
        trend._id === id 
          ? { 
              ...trend, 
              upvotes: result.userVote === 'upvoted' 
                ? [...trend.upvotes, authService.getCurrentUserId() || ''] 
                : trend.upvotes.filter(uid => uid !== authService.getCurrentUserId()),
              downvotes: result.userVote === 'upvoted' 
                ? trend.downvotes.filter(uid => uid !== authService.getCurrentUserId())
                : trend.downvotes,
              voteScore: result.voteScore 
            } 
          : trend
      ));

      if (currentTrend?._id === id) {
        setCurrentTrend(prev => prev ? {
          ...prev,
          upvotes: result.userVote === 'upvoted' 
            ? [...prev.upvotes, authService.getCurrentUserId() || ''] 
            : prev.upvotes.filter(uid => uid !== authService.getCurrentUserId()),
          downvotes: result.userVote === 'upvoted' 
            ? prev.downvotes.filter(uid => uid !== authService.getCurrentUserId())
            : prev.downvotes,
          voteScore: result.voteScore 
        } : null);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to upvote trend');
    }
  }, [currentTrend]);

  const downvoteTrend = useCallback(async (id: string): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to downvote');
      }

      const result: VoteResponse = await trendService.downvoteTrend(id);
      
      // Update local state
      setTrends(prev => prev.map(trend => 
        trend._id === id 
          ? { 
              ...trend, 
              downvotes: result.userVote === 'downvoted' 
                ? [...trend.downvotes, authService.getCurrentUserId() || ''] 
                : trend.downvotes.filter(uid => uid !== authService.getCurrentUserId()),
              upvotes: result.userVote === 'downvoted' 
                ? trend.upvotes.filter(uid => uid !== authService.getCurrentUserId())
                : trend.upvotes,
              voteScore: result.voteScore 
            } 
          : trend
      ));

      if (currentTrend?._id === id) {
        setCurrentTrend(prev => prev ? {
          ...prev,
          downvotes: result.userVote === 'downvoted' 
            ? [...prev.downvotes, authService.getCurrentUserId() || ''] 
            : prev.downvotes.filter(uid => uid !== authService.getCurrentUserId()),
          upvotes: result.userVote === 'downvoted' 
            ? prev.upvotes.filter(uid => uid !== authService.getCurrentUserId())
            : prev.upvotes,
          voteScore: result.voteScore 
        } : null);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to downvote trend');
    }
  }, [currentTrend]);

  const addComment = useCallback(async (trendId: string, commentData: CreateCommentData): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to comment');
      }

      const result: CommentResponse = await trendService.addComment(trendId, commentData);
      
      // Update local state
      setTrends(prev => prev.map(trend => 
        trend._id === trendId 
          ? { 
              ...trend, 
              comments: [result.comment, ...trend.comments],
              commentCount: trend.commentCount + 1 
            } 
          : trend
      ));

      if (currentTrend?._id === trendId) {
        setCurrentTrend(prev => prev ? {
          ...prev,
          comments: [result.comment, ...prev.comments],
          commentCount: prev.commentCount + 1
        } : null);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add comment');
    }
  }, [currentTrend]);


const upvoteComment = useCallback(async (commentId: string): Promise<void> => {
  try {
    // Implement comment upvote logic
      const result: VoteResponse = await trendService.upvoteComment(commentId);
      setComments(prev => prev.map(comment => 
        comment._id === commentId 
          ? { 
              ...comment, 
              upvotes: result.userVote === 'upvoted' 
                ? [...comment.upvotes, authService.getCurrentUserId() || ''] 
                : comment.upvotes.filter(uid => uid !== authService.getCurrentUserId()),
              downvotes: result.userVote === 'upvoted' 
                ? comment.downvotes.filter(uid => uid !== authService.getCurrentUserId())
                : comment.downvotes,
              voteScore: result.voteScore 
            } 
          : comment
      ));

      if (currentTrend?._id === commentId) {
        setCurrentTrend(prev => prev ? {
          ...prev,
          upvotes: result.userVote === 'upvoted' 
            ? [...prev.upvotes, authService.getCurrentUserId() || ''] 
            : prev.upvotes.filter(uid => uid !== authService.getCurrentUserId()),
          downvotes: result.userVote === 'upvoted' 
            ? prev.downvotes.filter(uid => uid !== authService.getCurrentUserId())
            : prev.downvotes,
          voteScore: result.voteScore 
        } : null);
      }
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Failed to upvote comment');
  }
}, []);

const downvoteComment = useCallback(async (commentId: string): Promise<void> => {
  try {
    // Implement comment downvote logic
const result: VoteResponse = await trendService.downvoteComment(commentId);
      setComments(prev => prev.map(comment => 
        comment._id === commentId 
          ? { 
              ...comment, 
              downvotes: result.userVote === 'downvoted' 
                ? [...comment.downvotes, authService.getCurrentUserId() || ''] 
                : comment.downvotes.filter(uid => uid !== authService.getCurrentUserId()),
              upvotes: result.userVote === 'downvoted' 
                ? comment.upvotes.filter(uid => uid !== authService.getCurrentUserId())
                : comment.upvotes,
              voteScore: result.voteScore 
            } 
          : comment
      ));

      if (currentTrend?._id === commentId) {
        setCurrentTrend(prev => prev ? {
          ...prev,
          downvotes: result.userVote === 'downvoted' 
            ? [...prev.downvotes, authService.getCurrentUserId() || ''] 
            : prev.downvotes.filter(uid => uid !== authService.getCurrentUserId()),
          upvotes: result.userVote === 'downvoted' 
            ? prev.upvotes.filter(uid => uid !== authService.getCurrentUserId())
            : prev.upvotes,
          voteScore: result.voteScore 
        } : null);
      }  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Failed to downvote comment');
  }
}, []);

const rewardComment = useCallback(async (): Promise<void> => {
  try {
    // Implement comment reward logic
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Failed to reward comment');
  }
}, []);

  const rewardTrend = useCallback(async (trendId: string, rewardData: RewardTrendData): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to reward a trend');
      }

      const result: RewardResponse = await rewardService.rewardTrend(trendId, rewardData);
      
      // Update local state
      setTrends(prev => prev.map(trend => 
        trend._id === trendId ? result.updatedTrend : trend
      ));

      if (currentTrend?._id === trendId) {
        setCurrentTrend(result.updatedTrend);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to reward trend');
    }
  }, [currentTrend]);

  const deleteTrend = useCallback(async (id: string): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to delete a trend');
      }

      await trendService.deleteTrend(id);

      // Update local state
      setTrends(prev => prev.filter(trend => trend._id !== id));
      
      if (currentTrend?._id === id) {
        setCurrentTrend(null);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete trend');
    }
  }, [currentTrend]);

  const deleteComment = useCallback(async (id: string): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to delete a comment');
      }

      await trendService.deleteComment(id);

      // Update local state
      setComments(prev => prev.filter(comment => comment._id !== id));
      
      if (currentComment?._id === id) {
        setCurrentComment(null);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  }, [currentTrend]);

  const getTrendingRewards = useCallback(async (params?: {
    page?: number;
    limit?: number;
    timeFrame?: string;
  }): Promise<TrendsResponse> => { // Add return type
    try {
      setLoading(true);
      setError(null);
      
      const response: TrendsResponse = await trendService.getTrendingRewards(params);
      setTrends(response.trends || []);
      return response; // Return the response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trending rewards';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Only call getTrends on mount
  useEffect(() => {
    getTrends();
  }, [getTrends]);

 return {
    // State
    trends,
    currentTrend,
    comments,
    loading,
    error,
    pagination,
    
    // Actions
    getTrends,
    getTrendById,
    createTrend,
    upvoteTrend,
    downvoteTrend,
    addComment,
    rewardTrend,
    deleteTrend,
    getTrendingRewards,
    clearError,
    rewardComment,
    downvoteComment,
   upvoteComment,
    deleteComment
  };
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

  const getCommunities = useCallback(async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await communityService.getCommunities(params);
      
      setCommunities(response.communities || []);
      setPagination({
        current: response.currentPage || 1,
        total: response.totalPages || 1,
        count: (response.communities || []).length,
        totalRecords: response.totalCommunities || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch communities');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCommunityById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const community = await communityService.getCommunityById(id);
      
      setCurrentCommunity(community);
      return community;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch community');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCommunity = useCallback(async (communityData: CreateCommunityData): Promise<Community | null> => {
    try {
      setLoading(true);
      setError(null);

      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to create a community');
      }

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
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const joinCommunity = useCallback(async (id: string): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to join a community');
      }

      const updatedCommunity = await communityService.joinCommunity(id);
      
      // Update local state
      setCommunities(prev => prev.map(community => 
        community._id === id ? updatedCommunity : community
      ));

      if (currentCommunity?._id === id) {
        setCurrentCommunity(updatedCommunity);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to join community');
    }
  }, [currentCommunity]);

  const leaveCommunity = useCallback(async (id: string): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to leave a community');
      }

      const updatedCommunity = await communityService.leaveCommunity(id);
      
      // Update local state
      setCommunities(prev => prev.map(community => 
        community._id === id ? updatedCommunity : community
      ));

      if (currentCommunity?._id === id) {
        setCurrentCommunity(updatedCommunity);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to leave community');
    }
  }, [currentCommunity]);

  const deleteCommunity = useCallback(async (id: string): Promise<void> => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('You must be logged in to delete a community');
      }

      await communityService.deleteCommunity(id);

      // Update local state
      setCommunities(prev => prev.filter(community => community._id !== id));
      
      if (currentCommunity?._id === id) {
        setCurrentCommunity(null);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete community');
    }
  }, [currentCommunity]);

  const clearError = useCallback(() => {
    setError(null);
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
    joinCommunity,
    leaveCommunity,
    deleteCommunity,
    clearError,
  };
};

export const useRewards = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRewardTypes = useCallback(async (): Promise<unknown[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const rewardTypes = await rewardService.getRewardTypes();
      return rewardTypes;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reward types');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTrendRewardSummary = useCallback(async (trendId: string): Promise<unknown> => {
    try {
      setLoading(true);
      setError(null);
      
      const summary = await rewardService.getTrendRewardSummary(trendId);
      return summary;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trend reward summary');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserRewardStats = useCallback(async (): Promise<unknown> => {
    try {
      setLoading(true);
      setError(null);
      
      const stats = await rewardService.getUserRewardStats();
      return stats;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user reward stats');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMedalLeaderboards = useCallback(async (params?: {
    type?: string;
    medal?: string;
    limit?: number;
  }): Promise<unknown> => {
    try {
      setLoading(true);
      setError(null);
      
      const leaderboards = await rewardService.getMedalLeaderboards(params);
      return leaderboards;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch medal leaderboards');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    loading,
    error,
    
    // Actions
    getRewardTypes,
    getTrendRewardSummary,
    getUserRewardStats,
    getMedalLeaderboards,
    clearError,
  };
};

export const useTrendingRewards = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTrendingRewards = useCallback(async (params?: {
    page?: number;
    limit?: number;
    timeFrame?: string;
  }): Promise<TrendsResponse> => { 
    try {
      setLoading(true);
      setError(null);
      
      const response: TrendsResponse = await trendService.getTrendingRewards(params);
      setTrends(response.trends || []);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trending rewards';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTrendingRewards();
  }, [getTrendingRewards]);

  return {
    trends,
    loading,
    error,
    refetch: getTrendingRewards,
  };
};