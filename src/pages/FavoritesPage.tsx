// pages/FavoritesPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent } from '../components/layout/Grid';

const FavoritesPage: React.FC = () => {
  return (
    <PageContainer>
      <Section 
        title="Favorites"
        description="Your collection of favorite prompts for quick access."
      >
        <Grid cols={1}>
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Favorites Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start liking prompts to add them to your favorites.
                </p>
                <button 
                  onClick={() => window.location.href = '#library'}
                  className="bg-[#270450] text-white px-6 py-2 rounded-lg hover:bg-[#270450]/90 transition-colors"
                >
                  Browse Library
                </button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Section>
    </PageContainer>
  );
};

export default FavoritesPage;