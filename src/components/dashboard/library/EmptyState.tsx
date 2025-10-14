// components/dashboard/library/EmptyState.tsx
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">📚</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
      <p className="text-gray-500">
        Try adjusting your search criteria or browse a different category.
      </p>
    </div>
  );
};

export default EmptyState;