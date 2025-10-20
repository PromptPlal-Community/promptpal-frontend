import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecentCard from './RecentCard';
import { usePrompts } from '../../../hooks/usePrompts';
import { useMessage } from '../../../hooks/useMessage';

// Define the props interface for RecentPrompts
interface RecentPromptsProps {
  onViewAll?: () => void;
}

const RecentPrompts: React.FC<RecentPromptsProps> = () => {
  const { 
    prompts, 
    loading, 
    error, 
    fetchPrompts, 
    updatePrompt,
    deletePrompt 
  } = usePrompts();
  
  const navigate = useNavigate();
  const { showMessage } = useMessage();


  // Fetch prompts when component mounts
  useEffect(() => {
    fetchPrompts({
      limit: 3,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  }, []);

  // Get only the first 3 prompts
  const displayedPrompts = prompts.slice(0, 3);
  // Handle edit prompt - navigate to edit form
  const handleEdit = (id: string) => {
    navigate(`/dashboard/prompts/edit/${id}`);
  };

  // Handle publish prompt using updatePrompt
  const handlePublish = async (promptId: string) => {
    try {
      const formData = new FormData();
      formData.append("isPublic", "true");
      formData.append("isDraft", "false");
      
      await updatePrompt(promptId, formData);
       showMessage('Prompt published successfully!', 'success');
      
      // Refresh the prompts to update the status
      fetchPrompts({
        limit: 3,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
    } catch (error) {
      console.error('Failed to publish prompt:', error);
      showMessage('Failed to publish prompt', 'error');
    }
  };

  // Handle unpublish prompt using updatePrompt to set as draft
  const handleUnpublish = async (promptId: string) => {
    try {
      const formData = new FormData();
      formData.append("isPublic", "false");
      formData.append("isDraft", "true");
      
      await updatePrompt(promptId, formData);
      showMessage('Prompt moved to drafts!', 'success');
      
      // Refresh the prompts to update the status
      fetchPrompts({
        limit: 3,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
    } catch (error) {
      console.error('Failed to unpublish prompt:', error);
      showMessage('Failed to unpublish prompt', 'error');
    }
  };

  // Handle delete prompt
  const handleDelete = async (promptId: string) => {
    // showMessage does not return a boolean; use a confirmation dialog instead
    if (window.confirm('Are you sure you want to delete this prompt? This action cannot be undone.')) {
      try {
        await deletePrompt(promptId);
        showMessage('Prompt deleted successfully!', 'success');
        
        // Refresh the prompts to update the list
        fetchPrompts({
          limit: 3,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
      } catch (error) {
        console.error('Failed to delete prompt:', error);
        showMessage('Failed to delete prompt', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="lg:col-span-2 shadow rounded-lg p-5 bg-white">
        <h2 className="text-lg font-bold text-gray-700 mb-3">Recent Prompts</h2>
        <p className='mb-5'>Your latest prompt creations and their performance</p>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 shadow rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:col-span-2 shadow rounded-lg p-5 bg-white">
        <h2 className="text-lg font-bold text-gray-700 mb-3">Recent Prompts</h2>
        <p className='mb-5'>Your latest prompt creations and their performance</p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">Error loading prompts: {error}</p>
          <button 
            onClick={() => fetchPrompts({ limit: 3, sortBy: 'createdAt', sortOrder: 'desc' })}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 shadow rounded-lg p-5 bg-white">
      <h2 className="text-lg font-bold text-gray-700 mb-3">Recent Prompts</h2>
      <p className='mb-5'>Your latest prompt creations and their performance</p>
      
      <div className="space-y-4 mb-4">
        {displayedPrompts.map((prompt) => (
          <RecentCard
            key={prompt._id}
            prompt={prompt}
            onEdit={handleEdit}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onDelete={handleDelete}
          />
        ))}
        
        {displayedPrompts.length === 0 && (
          <div className="bg-white p-8 text-center rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No prompts created yet</p>
            <Link
              to={"/dashboard/create-new-prompt"}
              className="mt-2 text-[#270450] hover:underline">
              Create your first prompt
            </Link>
          </div>
        )}
      </div>

      {displayedPrompts.length > 0 && (
        <Link 
          to="/dashboard/library"
          className="flex items-center justify-center w-full p-4 py-2 bg-[#270450] text-white rounded-lg hover:bg-[#270450]/80"
        >
          View all prompts
        </Link>
      )}
    </div>
  );
};

export default RecentPrompts;