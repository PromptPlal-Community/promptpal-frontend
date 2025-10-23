// pages/DashboardRouter.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import WorkspacePage from './WorkspacePage';
import LibraryPage from './LibraryPage';
import CreatedPromptsPage from './CreatedPromptsPage';
import CreateNewPromptPage from './CreateNewPromptPage'
import FavoritesPage from './FavoritesPage';
import CommunityPage from './CommunityPage';
import SettingsPage from './SettingsPage';
import { useAuth } from '../hooks/useAuth';
import PromptDetailsPage from './prompts/[id]';
import PromptEditPage from './prompts/edit/[id]';
import CreateTrendsPage from './community/CreateTrendsPage'
import CreateCommunityPage from './community/CreateCommunityPage'
import TrendDetailsPage from './community/trends/[trendId]';
import CommunitiesList from './community/communities/CommunityListPage';
import CommunityDetails from './community/communities/[communityId]';
const DashboardRouter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const { getCurrentUser } = useAuth();
  const [activePage, setActivePage] = useState<string>('workspace');

  // Extract page from URL
  useEffect(() => {
    const path = location.pathname;
    const page = path.split('/dashboard/workspace')[1] || 'workspace';
    setActivePage(page);
  }, [location.pathname]);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    navigate(`/dashboard/${page}`);
  };

  return (
    <Layout 
      getCurrentUser={getCurrentUser}
      activePage={activePage}
      onPageChange={handlePageChange}
    >
      <Routes>
        <Route path="/" element={<WorkspacePage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/promptpal-library" element={<LibraryPage />} />
        <Route path="/created-prompt" element={<CreatedPromptsPage />} />
        <Route path="/create-new-prompt" element={<CreateNewPromptPage/>}/>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path='/prompts/:id' element={<PromptDetailsPage />} />
        <Route path='/prompts/edit/:id' element={<PromptEditPage />} />
        <Route path='/create-trends' element={<CreateTrendsPage />} />
        <Route path='/create-community' element={<CreateCommunityPage />} />
        <Route path="/trends/:id" element={<TrendDetailsPage />} />
        <Route path="/communities" element={<CommunitiesList />} />
        <Route path="/communities/:id" element={<CommunityDetails />} />
        {/* Fallback route */}
        <Route path="*" element={<WorkspacePage />} />
      </Routes>
    </Layout>
  );
};

export default DashboardRouter;