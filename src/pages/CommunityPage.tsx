// pages/CommunityPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent, CardHeader } from '../components/layout/Grid';

const CommunityPage: React.FC = () => {
  return (
    <PageContainer>
      <Section 
        title="Community"
        description="Connect with other prompt creators and discover trending content."
      >
        <Grid cols={2} gap="lg">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">Trending Prompts</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center py-8">
                Community features coming soon!
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">Top Creators</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center py-8">
                Discover amazing prompt creators.
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Section>
    </PageContainer>
  );
};

export default CommunityPage;