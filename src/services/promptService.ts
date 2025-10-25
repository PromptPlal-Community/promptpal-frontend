import axios from 'axios';
import type { 
  Prompt,  
  DashboardStats, 
  PaginatedResponse,
  PromptFilters 
} from '../types/prompt';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://promptpal-backend-j5gl.onrender.com/api';

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Create axios instance with auth interceptor
const promptApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests from cookie
promptApi.interceptors.request.use((config) => {
  const token = getCookie('token') || getCookie('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
promptApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// Auth service functions
export const authService = {
  setToken: (token: string): void => {
    document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Strict; secure`;
  },

  getToken: (): string | null => {
    return getCookie('token') || getCookie('accessToken');
  },

  removeToken: (): void => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },

  isAuthenticated: (): boolean => {
    return !!(getCookie('token') || getCookie('accessToken'));
  },

  // Helper function to get current user ID from token
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

  // Get current user from cookies (if stored)
  getCurrentUser: () => {
    const userCookie = getCookie('user');
    return userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
  }
};

export const promptService = {
  // Get user's prompts
  getUserPrompts: async (filters = {}) => {
    const response = await promptApi.get('/prompts', { 
      params: filters 
    });
    return response.data;
  },

 getUserPrompt: async (id: string) => {
    const response = await promptApi.get(`/prompts/${id}`);
    return response.data;
  },
 
   getPublicPrompts: async (filters = {}) => {
    const response = await promptApi.get('/prompts/public', { 
      params: filters 
    });
    return response.data;
  },
 
  // Get all prompts with filtering
  getAllPrompts: async (filters: PromptFilters = {}): Promise<PaginatedResponse<Prompt>> => {
    const response = await promptApi.get('/prompts/filtered', { params: filters });
    return response.data;
  },

  // Get prompt by ID
  getPromptById: async (id: string) => {
    const response = await promptApi.get(`/prompts/${id}`);
    return response.data;
  },

  // Create new prompt - accepts FormData directly
createPrompt: async (formData: FormData): Promise<Prompt> => {
  const response = await promptApi.post('/prompts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
},


  // Update prompt
updatePrompt: async (id: string, updateData: FormData): Promise<Prompt> => {

  try {
    const response = await promptApi.put(`/prompts/${id}`, updateData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data; // Return the prompt data directly
  } catch (error: unknown) {
    console.error(' Update failed:', error);
    
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as { 
        response?: { 
          data?: unknown;
          status?: number;
          statusText?: string;
        } 
      };
      console.error(' Error details:', axiosError.response?.data);
      console.error(' Error status:', axiosError.response?.status);
    }
    
    throw error;
  }
},

// Delete prompt
deletePrompt: async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await promptApi.delete(`/prompts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete prompt service error:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response data:', error.response?.data);
      const message =
        (error.response?.data && ((error.response.data).message || (error.response.data).error)) ||
        error.message ||
        'Failed to delete prompt';
      throw new Error(message);
    } else {
      console.error('Non-Axios error:', error);
      throw new Error((error as Error)?.message || 'Failed to delete prompt');
    }
  }
},

  // Search prompts
  searchPrompts: async (query: string, filters: PromptFilters = {}): Promise<PaginatedResponse<Prompt>> => {
    const response = await promptApi.get('/prompts/search', { 
      params: { q: query, ...filters } 
    });
    return response.data;
  },

// Upvote prompt
upvotePrompt: async (id: string): Promise<{ 
  upvotes: number; 
  userVote: string;
}> => {
  const userId = authService.getCurrentUserId();
  if (!userId) {
    throw new Error('User must be logged in to vote');
  }

  const response = await promptApi.post(`/prompts/${id}/upvote`, { userId });
  return response.data;
},

// Downvote prompt
downvotePrompt: async (id: string): Promise<{ 
  upvotes: number; 
  downvotes: number;
  userVote: string;
}> => {
  const userId = authService.getCurrentUserId();
  if (!userId) {
    throw new Error('User must be logged in to vote');
  }

  const response = await promptApi.post(`/prompts/${id}/downvote`, { userId });
  return response.data;
},

  // Favorite prompt
  favoritePrompt: async (id: string): Promise<void> => {
    await promptApi.post(`/prompts/${id}/favorite`);
  },

  // Remove from favorites
  removePromptFromFavorites: async (id: string): Promise<void> => {
    await promptApi.delete(`/prompts/${id}/favorite`);
  },

  // Get user favorites
  getUserFavoritePrompts: async (userId: string, filters: PromptFilters = {}): Promise<PaginatedResponse<Prompt>> => {
    const response = await promptApi.get(`/prompts/favorites/user/${userId}`, { params: filters });
    return response.data;
  },

  // Get popular prompts
  getPopularPrompts: async (filters: PromptFilters = {}): Promise<PaginatedResponse<Prompt>> => {
    const response = await promptApi.get('/prompts/popular', { params: filters });
    return response.data;
  },

  // Increment views
  incrementPromptViews: async (id: string): Promise<{ views: number }> => {
    const response = await promptApi.post(`/prompts/${id}/views`);
    return response.data;
  },

  // get increment promt views
  getPromptViews: async (id: string): Promise<{ views: number }> => {
    const response = await promptApi.get(`/prompts/${id}/views`);
    return response.data;
  },

  // Rate prompt
  ratePrompt: async (id: string, rating: number): Promise<{ averageRating: number }> => {
    const response = await promptApi.post(`/prompts/${id}/rate`, { rating });
    return response.data;
  },

  // Get prompt rating
  getPromptRating: async (id: string): Promise<{ averageRating: number; userRating?: number }> => {
    const response = await promptApi.get(`/prompts/${id}/rating`);
    return response.data;
  },


};

// Dashboard service remains the same
export const dashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const currentUserId = authService.getCurrentUserId();
      
      if (!currentUserId) {
        throw new Error('User not authenticated');
      }
      
      // ✅ FIX: Use getUserPrompts instead of getAllPrompts to get only user's prompts
      const userPromptsResponse = await promptService.getUserPrompts({ limit: 100 });
      const userPrompts = userPromptsResponse.prompts || [];
      const pagination = userPromptsResponse.pagination || { totalRecords: userPrompts.length };

      
      // Use safe access with optional chaining and default values
      const stats = {
        totalPrompts: pagination.totalRecords,
        totalViews: userPrompts.reduce((sum: number, prompt: Prompt) => sum + (prompt.views || 0), 0),
        totalUpvotes: userPrompts.reduce((sum: number, prompt: Prompt) => sum + (prompt.upvotes || 0), 0),
        totalDownloads: userPrompts.reduce((sum: number, prompt: Prompt) => sum + (prompt.downloads || 0), 0),
        averageRating: userPrompts.length > 0
          ? userPrompts.reduce((sum: number, prompt: Prompt) => sum + (prompt.rating?.average || 0), 0) / userPrompts.length
          : 0
      };

      const categoryStats = userPrompts.reduce((acc: Record<string, { count: number; totalViews: number }>, prompt: Prompt) => {
        const category = prompt.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = { count: 0, totalViews: 0 };
        }
        acc[category].count++;
        acc[category].totalViews += (prompt.views || 0);
        return acc;
      }, {});

      const categories = (Object.entries(categoryStats) as [string, { count: number; totalViews: number }][]).map(([category, data]) => ({
        _id: category,
        count: data.count,
        totalViews: data.totalViews
      }));

      // Sort recent prompts by creation date (newest first)
      const recentPrompts = [...userPrompts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      // Calculate weekly trend (last 7 days)
      const weeklyTrend = calculateWeeklyTrend(userPrompts);

      return {
        stats,
        categories,
        recentPrompts,
        weeklyTrend
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      return {
        stats: {
          totalPrompts: 0,
          totalViews: 0,
          totalUpvotes: 0,
          totalDownloads: 0,
          averageRating: 0
        },
        categories: [],
        recentPrompts: [],
        weeklyTrend: []
      };
    }
  },
};

// Helper function to calculate weekly trend
const calculateWeeklyTrend = (prompts: Prompt[]) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  }).reverse();

  return last7Days.map(date => {
    const dayPrompts = prompts.filter(prompt => {
      const promptDate = new Date(prompt.createdAt).toISOString().split('T')[0];
      return promptDate === date;
    });

    const count = dayPrompts.length;
    const views = dayPrompts.reduce((sum, prompt) => sum + (prompt.views || 0), 0);
    const upvotes = dayPrompts.reduce((sum, prompt) => sum + (prompt.upvotes || 0), 0);
    
    return {
      _id: date,
      count,
      date,
      prompts: count,
      views,
      upvotes
    };
  });
};
export default promptService;