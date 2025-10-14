import React from 'react';

// Define transformation types for Cloudinary
export interface ImageTransformation {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'thumb' | 'scale';
  quality?: 'auto' | number;
  format?: 'jpg' | 'png' | 'webp' | 'avif';
  effect?: string;
  [key: string]: string | number | undefined;
}

export interface ResponsiveImage {
  width: number;
  url: string;
}

export interface PromptImage {
  public_id: string;
  url: string;
  thumbnail_url?: string;
  optimized_url?: string;
  responsive_urls?: ResponsiveImage[];
  caption?: string;
  format?: 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'avif';
  width?: number;
  height?: number;
  bytes?: number;
  isPrimary: boolean;
  transformation?: ImageTransformation;
  uploadedAt?: string;
}

export interface CommentRating {
  user: string;
  value: number;
  createdAt: string;
}

export interface PromptComment {
  _id: string;
  user: {
    _id: string;
    username: string;
    avatar?: string;
  };
  text: string;
  ratings?: CommentRating[];
  createdAt: string;
}

export interface PromptMetadata {
  language: string;
  wordCount: number;
  characterCount: number;
  hasImages: boolean;
  hasCode: boolean;
  imageCount: number;
}

export interface PromptRating {
  average: number;
  count: number;
}

export interface PromptAuthor {
  _id: string;
  username: string;
  avatar?: string;
  level: 'Newbie' | 'Contributor' | 'Pro' | 'Expert';
}

export interface Community {
  _id: string;
  name: string;
  description?: string;
}

// Main Prompt interface
export interface Prompt {
  _id: string;
  title: string;
  description: string;
  promptText: string;
  resultText?: string;
  images: PromptImage[];
  aiTool: 'ChatGPT' | 'Claude' | 'Bard' | 'Midjourney' | 'DALL-E' | 'Stable Diffusion' | 'Other';
  tags: string[];
  author: PromptAuthor;
  community?: Community;
  isPublic: boolean;
  isDraft: boolean;
  requiresLevel: 'Newbie' | 'Contributor' | 'Pro' | 'Expert';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Art' | 'Writing' | 'Code' | 'Marketing' | 'Design' | 'Education' | 'Other';
  estimatedTokens: number;
  upvotes: number;
  upvotedBy: string[];
  downloads: number;
  views: number;
  rating: PromptRating;
  comments: PromptComment[];
  version: number;
  parentPrompt?: string;
  metadata: PromptMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePromptData {
  title: string;
  description: string;
  promptText: string;
  resultText?: string;
  aiTool: 'ChatGPT' | 'Claude' | 'Bard' | 'Midjourney' | 'DALL-E' | 'Stable Diffusion' | 'Other';
  tags: string[];
  category: 'Art' | 'Writing' | 'Code' | 'Marketing' | 'Design' | 'Education' | 'Other';
  isPublic: boolean;
  community?: string;
  estimatedTokens?: number;
}

export interface UpdatePromptData extends Partial<CreatePromptData> {
  updatedAt?: string;
  isDraft?: boolean;
  version?: number;
}

// Dashboard related types
export interface CategoryStats {
  _id: string;
  count: number;
  totalViews: number;
}

export interface WeeklyTrend {
  _id: string; // date or week identifier
  count: number;
  views: number;
  upvotes: number;
}

export interface DashboardStatsData {
  totalPrompts: number;
  totalViews: number;
  totalUpvotes: number;
  totalDownloads: number;
  averageRating: number;
}

export interface DashboardStats {
  stats: DashboardStatsData;
  categories: CategoryStats[];
  recentPrompts: Prompt[];
  weeklyTrend: WeeklyTrend[];
}

// API Response types
export interface PaginationInfo {
  current: number;
  total: number;
  count: number;
  totalRecords: number;
}

export interface PaginatedResponse<T> {
  prompts: T[];
  pagination: PaginationInfo;
}

export interface PromptFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: 'published' | 'draft' | 'private' | 'all';
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  aiTool?: string;
  difficulty?: string;
  requiresLevel?: string;
  tags?: string[];
}

// User types
export interface Subscription {
  planId?: string;
  status: 'active' | 'inactive' | 'canceled';
  currentPeriodEnd?: string;
}

export interface UserUsage {
  storageUsed: number;
  promptsCreated: number;
  promptsRemaining: number;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  profession?: string;
  level: 'Newbie' | 'Contributor' | 'Pro' | 'Expert';
  isVerified?: boolean;
  isEmailVerified?: boolean;
  subscription?: Subscription;
  usage?: UserUsage;
  createdAt: string;
  updatedAt: string;
}

// UI types
export interface NavItem {
  name: string;
  icon: React.ReactNode;
  key: string;
  path?: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ImageUploadResponse {
  public_id: string;
  url: string;
  thumbnail_url?: string;
  optimized_url?: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

// Action response types
export interface UpvoteResponse {
  upvotes: number;
  upvoted: boolean;
}

export interface RatingResponse {
  average: number;
  count: number;
  userRating?: number;
}

export interface FavoriteResponse {
  favorited: boolean;
  favoritesCount: number;
}

// Cloudinary transformation types for better type safety
export interface CloudinaryTransformationOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'thumb' | 'scale' | 'crop' | 'pad';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  quality?: 'auto' | 'good' | 'best' | 'eco' | 'low' | number;
  format?: 'jpg' | 'png' | 'webp' | 'avif' | 'gif';
  effect?: string;
  radius?: number;
  background?: string;
  opacity?: number;
  border?: string;
}

// Search and filter types
export interface SearchFilters {
  query: string;
  category?: string;
  aiTool?: string;
  difficulty?: string;
  sortBy?: 'recent' | 'popular' | 'rating' | 'views';
  sortOrder?: 'asc' | 'desc';
}

// Form data types for creating/updating prompts
export interface PromptFormData {
  title: string;
  description: string;
  promptText: string;
  resultText?: string;
  aiTool: string;
  tags: string[];
  category: string;
  difficulty: string;
  isPublic: boolean;
  requiresLevel: string;
  community?: string;
}

// Component-specific types
export interface UploadedImage extends Omit<PromptImage, 'transformation'> {
  file?: File;
  name?: string;
}

export interface ImageUploadProps {
  onImageUpload?: (images: UploadedImage[]) => void;
  images?: UploadedImage[];
  onRemoveImage?: (index: number) => void;
}

export interface FormPromptData {
  title: string;
  description: string;
  promptText: string;
  resultText: string;
  aiTool: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  isDraft: boolean;
  community: string;
  estimatedTokens: number;
  images: UploadedImage[];
}