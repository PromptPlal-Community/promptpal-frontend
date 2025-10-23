import React, { useEffect, useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent } from '../components/layout/Grid';
import { useNavigate } from 'react-router-dom';
import { useTrends } from '../hooks/useTrends';
import { useCommunities } from '../hooks/useCommunity'; // Uncomment this
import TrendCard from '../components/dashboard/community/trends/TrendCard';
import { Search, Plus, Filter } from 'lucide-react';
import type { Community } from '../types/trend'; // Import the type

interface CommunityPageProps {
  onViewAll?: () => void;
  userId?: string;
}

const CommunityPage: React.FC<CommunityPageProps> = () => {
  const { trends, loading, error, getTrends } = useTrends();
  const { communities } = useCommunities(); // Uncomment this
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [sortBy, setSortBy] = useState('hot');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch trends when component mounts
    getTrends({ 
      sortBy,
      community: selectedCommunity || undefined
    });
  }, [getTrends, sortBy, selectedCommunity]);

  const handleViewTrend = (trendId: string) => {
    navigate(`/dashboard/trends/${trendId}`);
  };

  const handleUpvote = async (trendId: string) => {
    console.log('Upvoting trend:', trendId);
  };

  const handleComment = (trendId: string) => {
    navigate(`/trends/${trendId}#comments`);
  };

  const handleCreateTrend = () => {
    navigate('/dashboard/create-trends');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const filteredTrends = trends.filter(trend => 
    searchQuery === '' || 
    trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trend.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trend.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Find community name for display
  const getCommunityName = (communityId: string): string => {
    const community = communities.find((c: Community) => c._id === communityId);
    return community?.name || 'Unknown Community';
  };

  if (loading) {
    return (
      <PageContainer>
        <Section 
          title="Community Field"
          description="Create and discover trends."
        >
          <Grid cols={1}>
            <Card>
              <CardContent>
                <div className="lg:col-span-2 shadow rounded-lg p-5 bg-white">
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-white p-4 shadow rounded-lg animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Section 
          title="Community Field"
          description="Create and discover trends."
        >
          <Grid cols={1}>
            <Card>
              <CardContent>
                <div className="lg:col-span-2 shadow rounded-lg p-5 bg-white">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">⚠️</div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Error Loading Trends
                    </h3>
                    <p className="text-red-600 mb-4">
                      {error}
                    </p>
                    <button 
                      onClick={() => getTrends()}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>      
      <Section className='p-5'
        title="Community Field"
        description="Create and discover trends."
      >
        {/* Header with Search and Create Button */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search trends, tags, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* Create Trend Button */}
              <button
                onClick={handleCreateTrend}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Trend
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Community Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Community
                  </label>
                  <select
                    value={selectedCommunity}
                    onChange={(e) => setSelectedCommunity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Communities</option>
                    {communities.map((community: Community) => (
                      <option key={community._id} value={community._id}>
                        {community.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="hot">🔥 Hot</option>
                    <option value="new">🆕 New</option>
                    <option value="top">🏆 Top</option>
                    <option value="trending">📈 Trending</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedCommunity('');
                      setSortBy('hot');
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Grid cols={1}>
              <div className="lg:col-span-2 rounded-lg">  
                {/* Trends Count */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Found {filteredTrends.length} {filteredTrends.length === 1 ? 'Trend' : 'Trends'}
                  </h3>
                  
                  {/* Active Filters Badge */}
                  {(selectedCommunity || searchQuery) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Active filters:</span>
                      {selectedCommunity && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          Community: {getCommunityName(selectedCommunity)}
                        </span>
                      )}
                      {searchQuery && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          Search: "{searchQuery}"
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Trends List */}
                <div className="space-y-6">
                  {filteredTrends.map((trend) => (
                    <TrendCard
                      key={trend._id}
                      trend={trend}
                      onViewTrend={handleViewTrend}
                      onUpvote={handleUpvote}
                      onComment={handleComment}
                      showCommunity={true}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {filteredTrends.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {searchQuery || selectedCommunity ? 'No Matching Trends Found' : 'No Trends Yet'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery || selectedCommunity 
                        ? 'Try adjusting your search criteria or filters to find more trends.'
                        : 'Be the first to create a trend and start the conversation!'
                      }
                    </p>
                    <div className="flex gap-4 justify-center">
                      {searchQuery || selectedCommunity ? (
                        <button 
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCommunity('');
                          }}
                          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Clear Search
                        </button>
                      ) : (
                        <button 
                          onClick={handleCreateTrend}
                          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Create First Trend
                        </button>
                      )}
                      <button 
                        onClick={() => navigate('/communities')}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Browse Communities
                      </button>
                    </div>
                  </div>
                )}
              </div>
        </Grid>
      </Section>
    </PageContainer>
  );
};

export default CommunityPage;