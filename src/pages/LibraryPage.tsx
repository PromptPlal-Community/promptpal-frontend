// pages/LibraryPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Library } from '../components/dashboard/library';
import { usePrompts } from '../hooks/usePrompts';

const LibraryPage: React.FC = () => {
  const { prompts, incrementPromptViews, upvotePrompt, fetchPrompts } = usePrompts();

  // onView logic from usePrompts
  const handleView = (id: string) => {
    incrementPromptViews(id);
  };

  const handleUpvote = (id: string) => {
    upvotePrompt(id);
  };

  const handleFetch = () => {
    fetchPrompts();
  };

  return (
    <PageContainer padding="none">
        <Library
          prompts={prompts}
          onSearch={() => handleFetch()}
          onLike={(id) => handleUpvote(id)}
          onCopy={(id) => {
            const prompt = prompts.find(p => p._id === id);
            if (prompt) {
              navigator.clipboard.writeText(prompt.promptText);
            }
          }}
          onView={(id) => handleView(id)}
        />
    </PageContainer>
  );
};

export default LibraryPage;