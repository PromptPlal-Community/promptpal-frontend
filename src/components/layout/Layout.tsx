// components/layout/Layout.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import MobileNav from '../dashboard/MobileNav';
import type { User } from '../../types/auth';

interface LayoutProps {
  children: React.ReactNode;
  getCurrentUser?: () => Promise<User | null> | User | null;
  activePage?: string;
  onPageChange?: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  getCurrentUser,
  activePage = 'workspace',
  onPageChange
}) => {
  const [currentPage, setCurrentPage] = useState(activePage);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar - Fixed position */}
      <Sidebar 
        getCurrentUser={getCurrentUser}
        activeItem={currentPage}
        onItemClick={handlePageChange}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Mobile Navigation - Only show on mobile */}
        <div className="lg:hidden mb-10">
          <MobileNav 
            getCurrentUser={getCurrentUser}
            activeItem={currentPage}
            onItemClick={handlePageChange}
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;