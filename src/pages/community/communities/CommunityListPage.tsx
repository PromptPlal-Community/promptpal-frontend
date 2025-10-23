// components/communities/CommunitiesList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Plus, TrendingUp, Hash } from 'lucide-react';
import { useCommunities } from '../../../hooks/useCommunity';
import { PageContainer } from '../../../components/layout/PageContainer';
import type { Community } from '../../../types/trend';

// Remove empty interface and use type alias instead
type CommunitiesListProps = Record<string, never>;

export const CommunitiesList: React.FC<CommunitiesListProps> = () => {
  const navigate = useNavigate();
  const { communities, getCommunities, loading } = useCommunities();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);

  useEffect(() => {
    getCommunities();
  }, [getCommunities]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = communities.filter(community =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.tags.some((tag: string) => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredCommunities(filtered);
    } else {
      setFilteredCommunities(communities);
    }
  }, [searchTerm, communities]);

  const handleCreateCommunity = () => {
    navigate('/dashboard/create-community');
  };
  
    const handleCreateTrend = () => {
    navigate('/dashboard/create-trends');
  };

  const handleCommunityClick = (communityId: string) => {
    navigate(`/dashboard/communities/${communityId}`);
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Communities
              </h1>
              <p className="text-gray-600 text-lg">
                Discover and join communities that match your interests
              </p>
            </div>
            <button
              onClick={handleCreateTrend}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Trends
            </button>
            
            <button
              onClick={handleCreateCommunity}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Community
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredCommunities.map((community) => (
                <div
                  key={community._id}
                  onClick={() => handleCommunityClick(community._id)}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {community.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {community.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {community.memberCount || 0} members
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {community.description}
                  </p>

                  {/* Tags */}
                  {community.tags && community.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {community.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          <Hash className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                      {community.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{community.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {community.trendCount || 0} trends
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      community.isPublic 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {community.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCommunities.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No communities found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Be the first to create a community'
                  }
                </p>
                <button
                  onClick={handleCreateCommunity}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Create Community
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default CommunitiesList;