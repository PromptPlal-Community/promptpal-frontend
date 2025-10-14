// pages/LibraryPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Library } from '../components/dashboard/library';
import { mockPrompts } from '../types/mockPrompts';

const LibraryPage: React.FC = () => {

  return (
    <PageContainer padding="none">
        <Library
          prompts={mockPrompts}
          loading={false}
          onSearch={(filters) => console.log('Search filters:', filters)}
          onLike={(id) => console.log('Like prompt:', id)}
          onCopy={(id) => {
            const prompt = mockPrompts.find(p => p._id === id);
            if (prompt) {
              navigator.clipboard.writeText(prompt.promptText);
              console.log('Prompt copied to clipboard');
            }
          }}
          onView={(id) => console.log('View prompt:', id)}
        />
    </PageContainer>
  );
};

export default LibraryPage;