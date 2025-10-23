// components/trends/RewardSection.tsx
import React from 'react';
import { Award, Crown, Star, Gem } from 'lucide-react';
import type { Reward, RewardType } from '../../../../types/trend';

interface RewardSectionProps {
  rewards: Reward[];
  totalRewards: number;
}

const RewardSection: React.FC<RewardSectionProps> = ({ rewards, totalRewards }) => {
  const getRewardIcon = (rewardType: RewardType) => {
    switch (rewardType.tier) { // Use tier instead of type
      case 'legendary': return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'epic': return <Gem className="w-4 h-4 text-purple-500" />;
      case 'rare': return <Award className="w-4 h-4 text-blue-500" />;
      case 'common': 
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTierDisplayName = (rewardType: RewardType): string => {
    return rewardType.displayName || rewardType.name;
  };

  return (
    <div className="space-y-6">
      {/* Total Rewards Summary */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-1">
              Total Rewards
            </h3>
            <p className="text-3xl font-bold text-yellow-900">
              {totalRewards} points
            </p>
          </div>
          <Award className="w-12 h-12 text-yellow-600" />
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">Recent Rewards</h4>
        {rewards.map((reward) => (
          <div key={reward._id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {reward.user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">
                    {reward.user.username}
                  </span>
                  {getRewardIcon(reward.rewardType)}
                  <span className="text-sm text-gray-600">
                    {getTierDisplayName(reward.rewardType)}
                  </span>
                </div>
                {reward.message && (
                  <p className="text-sm text-gray-600 mt-1">{reward.message}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-yellow-700">
                +{reward.amount}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(reward.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
        
        {rewards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No rewards yet. Be the first to reward this trend!
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardSection;