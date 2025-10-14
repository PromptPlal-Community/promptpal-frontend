export interface User {
  name: string;
userName?: string;
  email: string;
  avatar?: string;
}

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  key: string;
}

export interface StatItem {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  iconColor?: string;
}

export interface PromptCardProps {
  category: string;
  title: string;
  views: number;
  likes: number;
  timeAgo: string;
  status: 'published' | 'draft';
  categoryColor: 'purple' | 'yellow' | 'blue';
}

export interface QuickAction {
  label: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

export interface Category {
  name: string;
  color: 'purple' | 'yellow' | 'blue' | 'pink';
}


export interface PromptFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: 'published' | 'draft' | 'private' | 'all';
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}