import React from 'react';

interface LoadMoreButtonProps {
  onClick?: () => void;
  loading?: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, loading = false }) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-6 py-3 bg-[#6B46C1] text-white cursor-pointer rounded-lg font-medium hover:bg-[#5a3aa3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Load more prompt'}
      </button>
    </div>
  );
};

export default LoadMoreButton;
