import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent } from '../components/layout/Grid';
import SearchBar from '../components/dashboard/SearchBar';
import StatsCards from '../components/dashboard/StatsCards';
import RecentPrompts from '../components/dashboard/RecentPrompts';
import QuickActions from '../components/dashboard/QuickActions';

const WorkspacePage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleCreatePrompt = () => {
    console.log('Create prompt clicked');
  };

  const handleViewAllPrompts = () => {
    console.log('View all prompts');
  };

  return (
    <PageContainer className='m-5'>
      <SearchBar 
        onSearch={handleSearch} 
        onCreatePrompt={handleCreatePrompt}
      />
      
      <Section
        title="My Workspace"
        description="Your personalized hub for creation and management. Access, organize, and track all your projects and ideas from one central control panel."
      >
        <StatsCards />
      </Section>

      <Section>
        <Grid cols={2} gap="lg">
            <CardContent>
              <RecentPrompts 
              onViewAll={handleViewAllPrompts} />
            </CardContent>
        <CardContent>
          <Card hover className='h-173'>
              <QuickActions
              />
          </Card>
        </CardContent>
        </Grid>
      </Section>
    </PageContainer>
  );
};

export default WorkspacePage;