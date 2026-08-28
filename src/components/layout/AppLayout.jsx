import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { PageTransition } from '../animations/PageTransition';
import { DataParticlesBG } from '../3d/DataParticlesBG';

export const AppLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-bg-main text-text-primary relative overflow-x-hidden font-sans">
      {/* Background 3D Particles */}
      <DataParticlesBG className="fixed inset-0 pointer-events-none z-0 opacity-25" />

      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Topbar onOpenMobileMenu={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
