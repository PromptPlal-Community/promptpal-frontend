// pages/SettingsPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import SettingsDashboard from '../components/dashboard/settings/SettingsDashboard';

const SettingsPage: React.FC = () => {
  return (
    <PageContainer>
      <Section title="Settings">
        <SettingsDashboard/>
      </Section>
    </PageContainer>
  );
};

export default SettingsPage;