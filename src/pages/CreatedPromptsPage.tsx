import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent } from '../components/layout/Grid';
import RecentCard from '../components/dashboard/RecentPrompts/RecentCard';
import { Link } from 'react-router-dom';
import { usePrompts } from '../hooks/usePrompts';
import SearchBar from '../components/dashboard/SearchBar';

interface RecentPromptsProps {
  onViewAll?: () => void;
}

const CreatedPromptsPage: React.FC<RecentPromptsProps> = () => {
  const { prompts, loading, error } = usePrompts({
    limit: 10, // Fetch more prompts for the library view
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
    
  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleCreatePrompt = () => {
    console.log('Create prompt clicked');
  };

  if (loading) {
    return (
      <PageContainer>
        <Section 
          title="Created Prompts"
          description="Manage and view all the prompts you've created."
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
          title="Created Prompts"
          description="Manage and view all the prompts you've created."
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
    <Section className='pl-8 pr-8 mt-5'>
    <SearchBar
        onSearch={handleSearch} 
        onCreatePrompt={handleCreatePrompt}    
    />
    </Section>
      <Section className='p-5'
        title="My Prompts"
        description="Your personal library to save, organize, and track the performance of every prompt you create."
      >
        <Grid cols={1}>
            <CardContent>
              <div className="lg:col-span-2 rounded-lg ">
                <div className="space-y-4 mb-6">
                  {prompts.map((prompt) => (
                    <RecentCard
                      key={prompt._id}
                      prompt={prompt}
                    />
                  ))}
                </div>

                {prompts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No Prompts Created Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start creating your first prompt to see it here.
                    </p>
                    <Link   
                      to={"/dashboard/create-prompt"}
                      className="bg-[#270450] text-white px-6 py-2 rounded-lg hover:bg-[#270450]/90 transition-colors"
                    >
                      Create Your First Prompt
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
        </Grid>
      </Section>
    </PageContainer>
  );
};

export default CreatedPromptsPage;