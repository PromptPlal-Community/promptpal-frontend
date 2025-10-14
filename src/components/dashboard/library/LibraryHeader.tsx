import React from 'react';

const LibraryHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6 mt-2">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 pb-5">Promptpal Library</h1>
      <p className="text-gray-600 text-md max-w-3xl text-center mb-5">
        A growing hub of curated, ready-to-use prompts designed to boost creativity, speed up workflows, and deliver better results across writing, design, and productivity.
      </p>
    </div>
  );
};

export default LibraryHeader;