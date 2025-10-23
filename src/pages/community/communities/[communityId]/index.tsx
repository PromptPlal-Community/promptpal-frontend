// components/communities/CommunityDetails.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Plus, 
  FileText, 
  Calendar,
  TrendingUp,
  Shield,
  Hash,
  Eye,
  MessageCircle
} from 'lucide-react';
import { useCommunities } from '../../../../hooks/useCommunity';
import { useTrends } from '../../../../hooks/useTrends';
import { useAuth } from '../../../../hooks/useAuth';
import { PageContainer } from '../../../../components/layout/PageContainer';
import type { Community, Trend, User } from '../../../../types/trend';

type CommunityDetailsProps = Record<string, never>;

export const CommunityDetails: React.FC<CommunityDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCommunityById, joinCommunity, leaveCommunity } = useCommunities();
  const { getTrends } = useTrends();
  const { user } = useAuth();

  const [community, setCommunity] = useState<Community | null>(null);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trends' | 'about'>('trends');

  // Wrap the data loading in useCallback to avoid infinite re-renders
// In your CommunityDetails component, update the loadData function:
const loadData = useCallback(async () => {
  if (id) {
    try {
      setLoading(true);
      const [communityData, trendsResponse] = await Promise.all([
        getCommunityById(id),
        getTrends({ community: id })
      ]);
      
      setCommunity(communityData);
      setTrends(trendsResponse.trends || []); // Access trends from the response
      
      // Check if user is a member
      if (user && communityData) {
        const memberIds = communityData.members?.map((m: User) => m._id) || [];
        setIsMember(memberIds.includes(user.id));
      }
    } catch (error: unknown) {
      console.error('Error loading community:', error);
    } finally {
      setLoading(false);
    }
  }
}, [id, user, getCommunityById, getTrends]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleJoinCommunity = async () => {
    if (!user || !community) return;

    try {
      if (isMember) {
        await leaveCommunity(community._id);
        setIsMember(false);
      } else {
        await joinCommunity(community._id);
        setIsMember(true);
      }
    } catch (error: unknown) {
      console.error('Error toggling membership:', error);
    }
  };

  const handleCreateTrend = () => {
    navigate('/trends/create', { 
      state: { preSelectedCommunity: community?._id } 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </PageContainer>
    );
  }

  if (!community) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Community not found</h2>
          <button
            onClick={() => navigate('/communities')}
            className="mt-4 text-purple-600 hover:text-purple-700"
          >
            Back to Communities
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Community Header */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 h-32"></div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {community.name}
                    </h1>
                    <p className="text-gray-600 text-lg mb-4">
                      {community.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {community.memberCount || 0} members
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {community.trendCount || 0} trends
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Created {formatDate(community.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {user && (
                      <>
                        <button
                          onClick={handleJoinCommunity}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            isMember
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {isMember ? 'Joined' : 'Join Community'}
                        </button>
                        
                        <button
                          onClick={handleCreateTrend}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          New Trend
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('trends')}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeTab === 'trends'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Trends
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeTab === 'about'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    About
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'trends' && (
                  <div className="space-y-4">
                    {trends.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No trends yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Be the first to start a trend in this community
                        </p>
                        {user && (
                          <button
                            onClick={handleCreateTrend}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Create First Trend
                          </button>
                        )}
                      </div>
                    ) : (
                      trends.map((trend) => (
                        <div
                          key={trend._id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer"
                          onClick={() => navigate(`/trends/${trend._id}`)}
                        >
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {trend.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {trend.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {trend.views || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {trend.commentCount || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {trend.voteScore || 0}
                            </div>
                            <span>{formatDate(trend.createdAt)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="space-y-6">
                    {/* Rules */}
                    {community.rules && community.rules.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                          <Shield className="w-5 h-5" />
                          Community Rules
                        </h3>
                        <div className="space-y-3">
                          {community.rules.map((rule, index: number) => (
                            <div key={index} className="flex gap-3">
                              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                {index + 1}
                              </div>
                              <p className="text-gray-700">{rule.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {community.tags && community.tags.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                          <Hash className="w-5 h-5" />
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {community.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Moderators */}
                    {community.moderators && community.moderators.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Moderators
                        </h3>
                        <div className="space-y-2">
                          {community.moderators.map((mod: User) => (
                            <div key={mod._id} className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-sm font-semibold">
                                  {mod.username?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-gray-700">{mod.username}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              {/* Quick Stats */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Members</span>
                    <span className="font-semibold text-gray-900">
                      {community.memberCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trends</span>
                    <span className="font-semibold text-gray-900">
                      {community.trendCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Created</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(community.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Join Button for Mobile */}
              {user && (
                <button
                  onClick={handleJoinCommunity}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors mb-4 ${
                    isMember
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isMember ? 'Leave Community' : 'Join Community'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CommunityDetails;