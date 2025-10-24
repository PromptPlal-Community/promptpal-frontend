import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent } from '../components/layout/Grid';
import RecentCard from '../components/dashboard/RecentPrompts/RecentCard';
import { Link, useNavigate } from 'react-router-dom';
import { usePrompts } from '../hooks/usePrompts';
import SearchBar from '../components/dashboard/SearchBar';
import toast from 'react-hot-toast';

interface RecentPromptsProps {
  onViewAll?: () => void;
}

const CreatedPromptsPage: React.FC<RecentPromptsProps> = () => {
  const { prompts, loading, error, fetchUserPrompts, updatePrompt, deletePrompt } = usePrompts();
    
  const navigate = useNavigate();
    
  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // Implement search functionality here
  };

  const handleCreatePrompt = () => {
    navigate('/dashboard/create-new-prompt');
  };

  // Handle edit prompt - navigate to edit form
  const handleEdit = (id: string) => {
    navigate(`/dashboard/prompts/edit/${id}`);
  };

  // Handle publish prompt using updatePrompt
  const handlePublish = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("isPublic", "true");
      formData.append("isDraft", "false");

      await updatePrompt(id, formData);
      toast.success('Prompt published successfully!');
      
      // Refresh the prompts to update the status
      fetchUserPrompts();
    } catch (error) {
      console.error('Failed to publish prompt:', error);
      toast.error('Failed to publish prompt');
    }
  };

  // Handle unpublish prompt using updatePrompt to set as draft
  const handleUnpublish = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("isPublic", "false");
      formData.append("isDraft", "true");
      
      await updatePrompt(id, formData);
      toast.success('Prompt moved to drafts!');
      
      // Refresh the prompts to update the status
      fetchUserPrompts();
    } catch (error) {
      console.error('Failed to unpublish prompt:', error);
      toast.error('Failed to unpublish prompt');
    }
  };

  // Handle delete prompt
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this prompt? This action cannot be undone.')) {
      try {
        await deletePrompt(id);
        toast.success('Prompt deleted successfully!');
        
        // Refresh the prompts to update the list
        fetchUserPrompts();
      } catch (error) {
        console.error('Failed to delete prompt:', error);
        toast.error('Failed to delete prompt');
      }
    }
  };

  // Filter prompts by status for better organization
  const publishedPrompts = prompts.filter(prompt => prompt.isPublic);
  const draftPrompts = prompts.filter(prompt => prompt.isDraft);

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
            <div className="lg:col-span-2 rounded-lg">  
              
              {/* Published Prompts Section */}
              {publishedPrompts.length > 0 && (
                <div className="mb-">
                  <div className="flex items-center justify-between mb-4">
              {/* Stats Summary */}
              {prompts.length > 0 && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span>{publishedPrompts.length} Published</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                      <span>{draftPrompts.length} Drafts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                      <span>{prompts.length} Total</span>
                    </div>
                  </div>
                </div>
              )}
                  </div>
                  <div className="space-y-4">
                    {publishedPrompts.map((prompt) => (
                      <RecentCard
                        key={prompt._id}
                        prompt={prompt}
                        onEdit={handleEdit}
                        onUnpublish={handleUnpublish}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Draft Prompts Section */}
              {draftPrompts.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                    </h3>
                    <span className="text-sm text-gray-500">
                      Work in progress
                    </span>
                  </div>
                  <div className="space-y-4">
                    {draftPrompts.map((prompt) => (
                      <RecentCard
                        key={prompt._id}
                        prompt={prompt}
                        onEdit={handleEdit}
                        onPublish={handlePublish}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
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
                    to={"/dashboard/create-new-prompt"}
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