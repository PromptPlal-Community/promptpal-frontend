import axios, { AxiosError } from 'axios';
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
  CommunitiesResponse,
  RewardType,
  RewardSummary,
  UserRewardStats,
  MedalLeaderboardsResponse
} from '../types/trend';

const API_BASE_URL = 'https://promptpal-backend-j5gl.onrender.com/api';

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Create axios instance
const trendApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Add token to requests
trendApi.interceptors.request.use((config) => {
  const token = getCookie('token') || getCookie('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
trendApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ----------------- AUTH SERVICE -----------------
export const authService = {
  setToken: (token: string): void => {
    document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Strict; secure`;
  },

  getToken: (): string | null => getCookie('token') || getCookie('accessToken'),

  removeToken: (): void => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },

  isAuthenticated: (): boolean => !!(getCookie('token') || getCookie('accessToken')),

  getCurrentUserId: (): string | null => {
    const token = getCookie('token') || getCookie('accessToken');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload.userId || null;
    } catch {
      return null;
    }
  },

  getCurrentUser: (): Record<string, unknown> | null => {
    const userCookie = getCookie('user');
    return userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
  }
};

// ----------------- TREND SERVICE -----------------
export const trendService = {
  getTrends: async (params?: {
    page?: number;
    limit?: number;
    community?: string;
    sortBy?: string;
  }): Promise<TrendsResponse> => {
    const response = await trendApi.get('/trends', { params });
    return response.data;
  },

  getTrendById: async (id: string): Promise<TrendResponse> => {
    const response = await trendApi.get(`/trends/${id}`);
    return response.data;
  },

createTrend: async (trendData: CreateTrendData): Promise<CreateTrendResponse> => {
  try {
    const response = await trendApi.post('/trends', trendData);
    return response.data;
  } catch (error: unknown) {
    console.error('Error creating trend:', error);
        if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as {
        response?: {
          data?: unknown;
          status?: number;
        };
      };
      console.error('Error response:', axiosError.response?.data);
      console.error('Error status:', axiosError.response?.status);
    }
    
    throw error;
  }
},
  updateTrend: async (id: string, updateData: Partial<CreateTrendData>): Promise<Trend> => {
    const response = await trendApi.put(`/trends/${id}/delete`, updateData);
    return response.data;
  },

  deleteComment: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await trendApi.put(`/trends/${id}/comments/delete`);
    return response.data;
  },

  deleteTrend: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await trendApi.delete(`/trends/${id}`);
    return response.data;
  },

  upvoteTrend: async (id: string): Promise<VoteResponse> => {
    const response = await trendApi.post(`/trends/${id}/upvote`);
    return response.data;
  },

  downvoteTrend: async (id: string): Promise<VoteResponse> => {
    const response = await trendApi.post(`/trends/${id}/downvote`);
    return response.data;
  },

  upvoteComment: async (id: string): Promise<VoteResponse> => {
    const response = await trendApi.post(`/trends/${id}/upvote/comment`);
    return response.data;
  },

  downvoteComment: async (id: string): Promise<VoteResponse> => {
    const response = await trendApi.post(`/trends/${id}/downvote/comment`);
    return response.data;
  },

  addComment: async (trendId: string, commentData: CreateCommentData): Promise<CommentResponse> => {
    const response = await trendApi.post(`/trends/${trendId}/comments`, commentData);
    return response.data;
  },


  getTrendingRewards: async (params?: {
    page?: number;
    limit?: number;
    timeFrame?: string;
  }): Promise<TrendsResponse> => {
    const response = await trendApi.get('/trends/trending/rewards', { params });
    return response.data;
  },

  getLeaderboards: async (params?: {
    type?: string;
    medal?: string;
    limit?: number;
  }): Promise<MedalLeaderboardsResponse> => {
    const response = await trendApi.get('/trends/leaderboards/rewards', { params });
    return response.data;
  }
};

// ----------------- COMMUNITY SERVICE -----------------
export const communityService = {
  getCommunities: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CommunitiesResponse> => {
    const response = await trendApi.get('/communities', { params });
    return response.data;
  },

  getCommunityById: async (id: string): Promise<Community> => {
    const response = await trendApi.get(`/communities/${id}`);
    return response.data;
  },

  createCommunity: async (data: CreateCommunityData): Promise<Community> => {
    const response = await trendApi.post('/communities', data);
    return response.data;
  },

  updateCommunity: async (id: string, data: Partial<CreateCommunityData>): Promise<Community> => {
    const response = await trendApi.put(`/communities/${id}`, data);
    return response.data;
  },

  deleteCommunity: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await trendApi.delete(`/communities/${id}`);
    return response.data;
  },

  joinCommunity: async (id: string): Promise<Community> => {
    const response = await trendApi.post(`/communities/${id}/join`);
    return response.data;
  },

  leaveCommunity: async (id: string): Promise<Community> => {
    const response = await trendApi.post(`/communities/${id}/leave`);
    return response.data;
  }
};

// ----------------- REWARD SERVICE -----------------
export const rewardService = {
  rewardTrend: async (trendId: string, data: RewardTrendData): Promise<RewardResponse> => {
    const response = await trendApi.post(`/rewards/trends/${trendId}/reward`, data);
    return response.data;
  },

  getRewardTypes: async (): Promise<RewardType[]> => {
    const response = await trendApi.get('/rewards/reward-types');
    return response.data;
  },

  getTrendRewardSummary: async (trendId: string): Promise<RewardSummary> => {
    const response = await trendApi.get(`/rewards/trends/${trendId}/rewards/summary`);
    return response.data;
  },

  getUserRewardStats: async (): Promise<UserRewardStats> => {
    const response = await trendApi.get('/rewards/users/rewards/stats');
    return response.data;
  },

  getMedalLeaderboards: async (params?: {
    type?: string;
    medal?: string;
    limit?: number;
  }): Promise<MedalLeaderboardsResponse> => {
    const response = await trendApi.get('/rewards/leaderboards/medals', { params });
    return response.data;
  }
};

export default trendService;
