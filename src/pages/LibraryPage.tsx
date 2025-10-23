// pages/LibraryPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Library } from '../components/dashboard/library';

const LibraryPage: React.FC = () => {
  return (
    <PageContainer padding="none">
      <Library />
    </PageContainer>
  );
};

export default LibraryPage;