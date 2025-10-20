import React from 'react';
import { PageContainer } from '../../../../components/layout/PageContainer';
import { Section } from '../../../../components/layout/Section';
import EditPrompt from '../../../../components/dashboard/Prompt/EditPrompt';

const EditPromptPage: React.FC = () => {
  return (
    <PageContainer>
      <Section>
        <EditPrompt/>
      </Section>
    </PageContainer>
  );
};

export default EditPromptPage;