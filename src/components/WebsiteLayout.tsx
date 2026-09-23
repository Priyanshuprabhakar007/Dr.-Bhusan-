import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AlertTriangle, Bell } from 'lucide-react';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';

export const WebsiteLayout: React.FC = () => {
  const { siteSettings } = useData();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(70);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [siteSettings]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFE] text-slate-900 selection:bg-teal-800 selection:text-white font-sans antialiased">
      {/* 1. PERSISTENT FIXED SITE HEADER WRAPPER */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white border-b border-stone-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
      >
        {/* Layer 1: Emergency Clinic Notice Banner */}
        {siteSettings?.emergencyNotice && siteSettings.emergencyNotice.trim() !== '' && (
          <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-center space-x-2 text-center border-b border-amber-600/20 relative z-10 min-h-[36px]">
            <AlertTriangle className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="truncate max-w-[1200px]">{siteSettings.emergencyNotice}</span>
          </div>
        )}

        {/* Layer 2: Top Announcement Bar */}
        {siteSettings?.announcementBar?.enabled && (
          <div className="bg-[#071D2D] text-slate-200 px-4 py-2 text-xs flex items-center justify-center space-x-2 text-center border-b border-white/10 relative z-10 min-h-[34px]">
            <Bell className="w-3.5 h-3.5 text-[#18B8B4] shrink-0" />
            <span className="truncate">{siteSettings.announcementBar.text}</span>
            {siteSettings.announcementBar.ctaUrl && (
              <a
                href={siteSettings.announcementBar.ctaUrl}
                className="text-[#18B8B4] hover:underline font-semibold ml-1 inline-flex items-center space-x-0.5 shrink-0"
              >
                <span>{siteSettings.announcementBar.ctaText || 'Learn more'}</span>
              </a>
            )}
          </div>
        )}

        {/* Layer 3: Main Navigation Bar */}
        <Navbar />
      </header>

      {/* 2. Main Content with exact top offset */}
      <main className="flex-1" style={{ paddingTop: `${headerHeight}px` }}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};
