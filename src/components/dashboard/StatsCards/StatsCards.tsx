import React from 'react';
import { FaBook, FaRegEye, FaHeart, FaStar } from 'react-icons/fa';
import { useDashboardStats } from '../../../hooks/usePrompts';

const StatsCards: React.FC = () => {
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-700">Error loading stats: {error}</p>
      </div>
    );
  }

  const statItems = [
    {
      title: 'Created Prompts',
      value: stats?.stats.totalPrompts.toString() || '0',
      trend: '+3 this week',
      icon: <FaBook size={12} />,
    },
    {
      title: 'Total Views', 
      value: stats?.stats.totalViews.toString() || '0',
      trend: '+12% this month',
      icon: <FaRegEye size={15} />,
    },
    {
      title: 'Total Upvotes',
      value: stats?.stats.totalUpvotes.toString() || '0', 
      trend: '+5 this month',
      icon: <FaHeart size={12} />,
    },
    {
      title: 'Average Rating',
      value: stats?.stats.averageRating.toFixed(1) || '0.0',
      trend: '+20% this month',
      icon: <FaStar size={12} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-7 mb-6">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <div style={{ color: "#270450" }}>{stat.icon}</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">{stat.value}</h2>
          <span className="text-xs text-[#270450]/70">{stat.trend}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;