import axios from 'axios';
import type { 
  Prompt,  
  DashboardStats, 
  PaginatedResponse,
  PromptFilters 
} from '../types/prompt';

const API_BASE_URL = 'https://promptpal-backend-j5gl.onrender.com/api';

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
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
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
  getUserPrompts: async (filters: PromptFilters = {}): Promise<PaginatedResponse<Prompt>> => {
    const response = await promptApi.get('/prompts', { params: filters });
    return response.data;
  },

  // Get all prompts with filtering
  getAllPrompts: async (filters: PromptFilters = {}): Promise<PaginatedResponse<Prompt>> => {
    const response = await promptApi.get('/prompts/filtered', { params: filters });
    return response.data;
  },

  // Get prompt by ID
  getPromptById: async (id: string): Promise<Prompt> => {
    const response = await promptApi.get(`/prompts/${id}`);
    return response.data;
  },

  // Create new prompt - accepts FormData directly
createPrompt: async (formData: FormData): Promise<Prompt> => {
  // For debugging - log what's being sent
  console.log('Sending FormData:');
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await promptApi.post('/prompts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
},


  // Update prompt
  updatePrompt: async (id: string, updateData: FormData, images?: File[]): Promise<Prompt> => {
    const formData = new FormData();
    
    // Append update data as individual fields (not as JSON)
    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // For arrays like tags, join them as comma-separated string
          formData.append(key, value.join(','));
        } else if (typeof value === 'boolean') {
          // For booleans, convert to string
          formData.append(key, value.toString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    
    // Append images if any
    if (images) {
      images.forEach(file => {
        formData.append('images', file);
      });
    }

    const response = await promptApi.put(`/prompts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

// Delete prompt
deletePrompt: async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await promptApi.delete(`/prompts/${id}`);
    console.log('Delete response:', response.data);
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
  upvotePrompt: async (id: string): Promise<{ upvotes: number }> => {
    const response = await promptApi.post(`/prompts/${id}/upvote`);
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
};

// Dashboard service remains the same
export const dashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const currentUserId = authService.getCurrentUserId();
      
      if (!currentUserId) {
        throw new Error('User not authenticated');
      }
      
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
        // Try multiple possible property locations for category
        const category = prompt.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = { count: 0, totalViews: 0 };
        }
        acc[category].count++;
        // Try multiple possible property locations for views
        acc[category].totalViews += (prompt.views || prompt.views || 0);
        return acc;
      }, {});

      const categories = Object.entries(categoryStats).map(([category, data]) => ({
        _id: category,
        count: data.count,
        totalViews: data.totalViews
      }));

      return {
        stats,
        categories,
        recentPrompts: userPrompts.slice(0, 5),
        weeklyTrend: []
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
export default promptService;