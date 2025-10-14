// pages/CommunityPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { PromptForm } from '../components/dashboard/Prompt';

const CreateNewPromptPage: React.FC = () => {
  return (
    <PageContainer>
      <Section>
        <PromptForm/>
      </Section>
    </PageContainer>
  );
};

export default CreateNewPromptPage;