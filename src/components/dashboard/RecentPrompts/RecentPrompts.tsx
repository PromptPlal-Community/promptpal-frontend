import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecentCard from './RecentCard';
import { usePrompts } from '../../../hooks/usePrompts';

// Define the props interface for RecentPrompts
interface RecentPromptsProps {
  onViewAll?: () => void;
}

const RecentPrompts: React.FC<RecentPromptsProps> = () => {
  const { prompts, loading, error, fetchPrompts } = usePrompts();

  // Fetch prompts when component mounts - use empty dependency array
  useEffect(() => {
    fetchPrompts({
      limit: 3,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  }, []);

  // Get only the first 3 prompts
  const displayedPrompts = prompts.slice(0, 3);

  console.log('RecentPrompts state:', { loading, error, promptsCount: prompts.length, displayedPromptsCount: displayedPrompts.length });

  if (loading) {
    console.log('RecentPrompts: Showing loading state');
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

  console.log('RecentPrompts: Showing data state with', displayedPrompts.length, 'prompts');
  return (
    <div className="lg:col-span-2 shadow rounded-lg p-5 bg-white">
      <h2 className="text-lg font-bold text-gray-700 mb-3">Recent Prompts</h2>
      <p className='mb-5'>Your latest prompt creations and their performance</p>
      
      <div className="space-y-4 mb-4">
        {displayedPrompts.map((prompt) => (
          <RecentCard
            key={prompt._id}
            prompt={prompt}
          />
        ))}
        
        {displayedPrompts.length === 0 && (
          <div className="bg-white p-8 text-center rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No prompts created yet</p>
            <Link
              to={"/dashboard/create-prompt"}
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