
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  rewardPoints?: number;
  rewardTier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalRewardsGiven?: number;
  totalRewardsReceived?: number;
}

export interface Community {
  _id: string;
  name: string;
  description: string;
  creator: User;
  moderators: User[];
  members: User[];
  memberCount: number;
  trendCount: number;
  rules: CommunityRule[];
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
    sortBy: string;
    communities: string[]
}

export interface CommunityRule {
  title: string;
  description: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  trend: string;
  parentComment?: string;
  replies: Comment[];
  isEdited: boolean;
  upvotes: string[];
  downvotes: string[];
  voteScore: number;
  depth: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Reward {
  _id: string;
  user: User;
  rewardType: RewardType;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  medal: {
    name: string;
    tier: string;
    color: string;
    icon: string;
  };
  createdAt: string;
}

export interface RewardType {
  _id: string;
  name: string;
  displayName: string;
  tier: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  color: string;
  icon: string;
  description: string;
  isActive: boolean;
  dailyLimit?: number;
  cooldown: number;
}

export interface Trend {
  _id: string;
  title: string;
  content: string;
  author: User;
  community: Community;
  category: 'Art' | 'Writing' | 'Code' | 'Marketing' | 'Design' | 'Education' | 'Other';
  upvotes: string[];
  downvotes: string[];
  voteScore: number;
  comments: Comment[];
  commentCount: number;
  rewards: Reward[];
  totalRewards: number;
  rewardCount: number;
  medalSummary: {
    gold: number;
    silver: number;
    bronze: number;
    platinum: number;
    diamond: number;
    other: number;
  };
  topRewards?: {
    user: User;
    amount: number;
    medal: string;
  }[];
  featuredMedals: {
    rewardType: RewardType;
    count: number;
    lastGiven: string;
  }[];
  tags: string[];
  isActive: boolean;
  views: number;
  lastRewardAt?: string;
  rewardStreak: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrendData {
  title: string;
  content: string;
  communityId: string;
  tags: string[];
}

export interface UpdateTrendData {
  title?: string;
  content?: string;
  tags?: string[];
  isActive?: boolean;
}

export interface CreateCommentData {
  content: string;
  parentComment?: string;
}

export interface RewardTrendData {
  rewardTypeId: string;
  message?: string;
  isAnonymous?: boolean;
}

// API Response Types
export interface TrendsResponse {
  trends: Trend[];
  comments: Comment[];
  currentPage: number;
  totalPages: number;
  totalTrends: number;
}

export interface TrendResponse {
  trend: Trend;
  comments: Comment[];
}

export interface CreateTrendResponse {
  trend: Trend;
  message: string;
}

export interface VoteResponse {
  voteScore: number;
  userVote: 'upvoted' | 'downvoted' | 'none';
}

export interface CommentResponse {
  comment: Comment;
  message: string;
}

export interface RewardResponse {
  reward: Reward;
  updatedTrend: Trend;
  userPoints: number;
  message: string;
}


export interface RewardSummary {
  totalRewards: number;
  totalAmount: number;
  topRewarders: Array<{
    userId: string;
    username: string;
    amount: number;
  }>;
  rewardBreakdown?: Record<string, number>;
}

export interface UserRewardStats {
  totalGiven: number;
  totalReceived: number;
  rank?: number;
  medals?: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  totalPoints: number;
  medal?: string;
}

export interface MedalLeaderboardsResponse {
  leaderboard: LeaderboardEntry[];
  total: number;
  type?: string;
}


export interface CreateCommunityData {
  name: string;
  description: string;
  image?: string; 
  category?: string;
  isPrivate?: boolean;
  isPublic: boolean;
  rules: CommunityRule[];
  tags: string[];
}



export interface CommunityFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  category?: string;
}

export interface CommunitiesResponse {
  communities: Community[];
  currentPage: number;
  totalPages: number;
  totalCommunities: number;
  pagination?: {
    current: number;
    total: number;
    count: number;
    totalRecords: number;
  };
}

export interface CommunityMembersResponse {
  users: User[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface CommunityStats {
  memberCount: number;
  trendCount: number;
  activeMembers: number;
  growthRate: number;
  topContributors: User[];
}

export interface MembershipStatus {
  isMember: boolean;
  isModerator: boolean;
}