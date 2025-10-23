import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent } from '../components/layout/Grid';
import { useNavigate } from 'react-router-dom';
import { usePrompts } from '../hooks/usePrompts';
import FavouritesCard from '../components/dashboard/Favourites/FavouritesCard';

interface FavoritesPromptsProps {
  onViewAll?: () => void;
  userId?: string;
}

const FavoritesPage: React.FC<FavoritesPromptsProps> = ({ userId }) => {
  const { prompts, loading, error, getFavoritedPrompts } = usePrompts();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch favorited prompts when component mounts
    if (userId) {
      getFavoritedPrompts(userId);
    }
  }, [userId, getFavoritedPrompts]);


  if (loading) {
    return (
      <PageContainer>
        <Section 
          title="Favourites Prompts"
          description="Your collection of favorite prompts for quick access."
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
          title="Favourites Prompts"
          description="Your collection of favorite prompts for quick access."
        >
          <Grid cols={1}>
            <Card>
              <CardContent>
                <div className="lg:col-span-2 shadow rounded-lg p-5 bg-white">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">⚠️</div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Error Loading Prompts
                    </h3>
                    <p className="text-red-600 mb-4">
                      {error}
                    </p>
                    <button 
                      onClick={() => window.location.reload()}
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
        title="Favorites"
        description="Your collection of favorite prompts for quick access."
      >
        <Grid cols={1}>
          <CardContent>
            <div className="lg:col-span-2 rounded-lg">  
              <div className="mb-6">
                <div className="space-y-4">
                  {prompts.map((prompt) => (
                    <FavouritesCard
                      key={prompt._id}
                      prompt={prompt}
                    />
                  ))}
                </div>
              </div>

              {/* Empty State */}
              {prompts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Favourite Prompts Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start favoriting prompts to see them here for quick access.
                  </p>
                  <button 
                    onClick={() => navigate('/dashboard/promptpal-library')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Prompts
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Grid>
      </Section>
    </PageContainer>
  );
};

export default FavoritesPage;