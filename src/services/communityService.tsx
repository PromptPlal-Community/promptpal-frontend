import axios, { AxiosError } from 'axios';
import type { 
  Community,
  CreateCommunityData,
  CommunitiesResponse,
  CommunityFilters,
  CommunityMembersResponse,
  CommunityStats,
  MembershipStatus
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

// Create axios instance for communities
const communityApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Add token to requests
communityApi.interceptors.request.use((config) => {
  const token = getCookie('token') || getCookie('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
communityApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ----------------- COMMUNITY SERVICE -----------------
export const communityService = {
  /**
   * Get all communities with optional filtering and pagination
   */
  getCommunities: async (params?: CommunityFilters): Promise<CommunitiesResponse> => {
    try {
      const response = await communityApi.get('/communities', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching communities:', error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to fetch communities'
          : 'Failed to fetch communities'
      );
    }
  },

  /**
   * Get community by ID
   */
  getCommunityById: async (id: string): Promise<Community> => {
    try {
      const response = await communityApi.get(`/communities/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching community ${id}:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to fetch community'
          : 'Failed to fetch community'
      );
    }
  },

  /**
   * Create a new community
   */
  createCommunity: async (data: CreateCommunityData): Promise<Community> => {
    try {
      const response = await communityApi.post('/communities', data);
      return response.data;
    } catch (error) {
      console.error('Error creating community:', error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to create community'
          : 'Failed to create community'
      );
    }
  },

  /**
   * Update an existing community
   */
  updateCommunity: async (id: string, data: Partial<CreateCommunityData>): Promise<Community> => {
    try {
      const response = await communityApi.put(`/communities/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating community ${id}:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to update community'
          : 'Failed to update community'
      );
    }
  },

  /**
   * Delete a community
   */
  deleteCommunity: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await communityApi.delete(`/communities/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting community ${id}:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to delete community'
          : 'Failed to delete community'
      );
    }
  },

  /**
   * Join a community
   */
  joinCommunity: async (id: string): Promise<Community> => {
    try {
      const response = await communityApi.post(`/communities/${id}/join`);
      return response.data;
    } catch (error) {
      console.error(`Error joining community ${id}:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to join community'
          : 'Failed to join community'
      );
    }
  },

  /**
   * Leave a community
   */
  leaveCommunity: async (id: string): Promise<Community> => {
    try {
      const response = await communityApi.post(`/communities/${id}/leave`);
      return response.data;
    } catch (error) {
      console.error(`Error leaving community ${id}:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to leave community'
          : 'Failed to leave community'
      );
    }
  },

  /**
   * Get communities by user ID
   */
  getUserCommunities: async (userId: string, params?: CommunityFilters): Promise<CommunitiesResponse> => {
    try {
      const response = await communityApi.get(`/communities/user/${userId}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${userId} communities:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to fetch user communities'
          : 'Failed to fetch user communities'
      );
    }
  },

  /**
   * Get popular communities
   */
  getPopularCommunities: async (params?: CommunityFilters): Promise<CommunitiesResponse> => {
    try {
      const response = await communityApi.get('/communities/popular', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular communities:', error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to fetch popular communities'
          : 'Failed to fetch popular communities'
      );
    }
  },

  /**
   * Search communities
   */
  searchCommunities: async (query: string, params?: CommunityFilters): Promise<CommunitiesResponse> => {
    try {
      const response = await communityApi.get('/communities/search', { 
        params: { q: query, ...params } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching communities with query "${query}":`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to search communities'
          : 'Failed to search communities'
      );
    }
  },

  /**
   * Get community members
   */
  getCommunityMembers: async (id: string, params?: CommunityFilters): Promise<CommunityMembersResponse> => {
    try {
      const response = await communityApi.get(`/communities/${id}/members`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching community ${id} members:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to fetch community members'
          : 'Failed to fetch community members'
      );
    }
  },

  /**
   * Check if user is member of community
   */
  checkMembership: async (id: string): Promise<MembershipStatus> => {
    try {
      const response = await communityApi.get(`/communities/${id}/membership`);
      return response.data;
    } catch (error) {
      console.error(`Error checking membership for community ${id}:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to check membership'
          : 'Failed to check membership'
      );
    }
  },

  /**
   * Get community statistics
   */
  getCommunityStats: async (id: string): Promise<CommunityStats> => {
    try {
      const response = await communityApi.get(`/communities/${id}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching community ${id} stats:`, error);
      throw new Error(
        error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to fetch community statistics'
          : 'Failed to fetch community statistics'
      );
    }
  }
};

export default communityService;