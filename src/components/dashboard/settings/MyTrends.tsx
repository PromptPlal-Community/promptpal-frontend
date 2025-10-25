// components/dashboard/MyTrends.tsx
import React from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar, Download, Filter } from 'lucide-react';

const MyTrends: React.FC = () => {
  const stats = {
    totalPrompts: 147,
    promptsThisMonth: 23,
    favoriteCategory: 'Writing',
    topPrompt: 'Content Strategy Generator',
    successRate: '92%'
  };

  const monthlyData = [
    { month: 'Jan', prompts: 45, usage: 120 },
    { month: 'Feb', prompts: 52, usage: 145 },
    { month: 'Mar', prompts: 48, usage: 138 },
    { month: 'Apr', prompts: 67, usage: 189 },
    { month: 'May', prompts: 73, usage: 210 },
    { month: 'Jun', prompts: 89, usage: 245 }
  ];

  const categoryData = [
    { category: 'Writing', count: 45, percentage: 30 },
    { category: 'Marketing', count: 32, percentage: 22 },
    { category: 'Development', count: 28, percentage: 19 },
    { category: 'Design', count: 25, percentage: 17 },
    { category: 'Other', count: 17, percentage: 12 }
  ];

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Trends & Analytics</h2>
          <p className="text-gray-600">Track your prompt usage and performance</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Total Prompts</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalPrompts}</div>
          <p className="text-sm text-gray-600">All time created</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">This Month</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.promptsThisMonth}</div>
          <p className="text-sm text-gray-600">Current month usage</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <PieChart className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">Top Category</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.favoriteCategory}</div>
          <p className="text-sm text-gray-600">Most used category</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold text-gray-900">Success Rate</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.successRate}</div>
          <p className="text-sm text-gray-600">Prompt effectiveness</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Usage Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Usage</h3>
            <span className="text-sm text-gray-500">Last 6 months</span>
          </div>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${(data.prompts / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {data.prompts}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Distribution</h3>
          <div className="space-y-4">
            {categoryData.map((data) => (
              <div key={data.category} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {data.category}
                </span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {data.count} ({data.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-200">
            {[
              { action: 'Created prompt', name: 'SEO Content Strategy', time: '2 hours ago' },
              { action: 'Updated prompt', name: 'Email Template Generator', time: '1 day ago' },
              { action: 'Shared prompt', name: 'Social Media Calendar', time: '2 days ago' },
              { action: 'Favorited prompt', name: 'API Documentation Helper', time: '3 days ago' }
            ].map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{activity.action}</span>
                    <span className="text-gray-600">: {activity.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrends;