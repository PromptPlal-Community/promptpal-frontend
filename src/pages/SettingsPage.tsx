// pages/SettingsPage.tsx
import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Grid, Card, CardContent, CardHeader } from '../components/layout/Grid';

const SettingsPage: React.FC = () => {
  return (
    <PageContainer>
      <Section title="Settings">
        <Grid cols={2} gap="lg">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Profile Settings</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Preferences</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email notifications</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Dark mode</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Section>
    </PageContainer>
  );
};

export default SettingsPage;