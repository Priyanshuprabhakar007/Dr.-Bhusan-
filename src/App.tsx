import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { WebsiteLayout } from './components/WebsiteLayout';
import { Hero } from './components/Hero';
import { EditorialMarquee } from './components/EditorialMarquee';
import { IntroSection } from './components/IntroSection';
import { AboutSection } from './components/AboutSection';
import { HowCanWeHelp } from './components/HowCanWeHelp';
import { CancersSection } from './components/CancersSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { OversizedScrollTypography } from './components/OversizedScrollTypography';
import { JourneySection } from './components/JourneySection';
import { SecondOpinionSection } from './components/SecondOpinionSection';
import { BlogSection } from './components/BlogSection';
import { LatestInsights } from './components/LatestInsights';
import { FAQSection } from './components/FAQSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { AdminPanel } from './components/AdminPanel';
import { BlogsPage } from './components/BlogsPage';
import { ContactPage } from './components/ContactPage';
import { AppointmentModal } from './components/AppointmentModal';
import { SecondOpinionDrawer } from './components/SecondOpinionDrawer';
import { DesktopFloatingControls } from './components/DesktopFloatingControls';
import { MobileBottomBar } from './components/MobileBottomBar';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let targetId = '';
    if (path === '/about') targetId = 'about';
    else if (path.startsWith('/cancer-care')) targetId = 'cancers';
    else if (path.startsWith('/treatments')) targetId = 'treatments';
    else if (path.startsWith('/second-opinion')) targetId = 'second-opinion';
    else if (path.startsWith('/resources')) targetId = 'resources';
    else if (location.state?.scrollTo) targetId = location.state.scrollTo;

    if (targetId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.state]);

  return (
    <>
      <Hero />
      <EditorialMarquee />
      <IntroSection />
      <AboutSection />
      <HowCanWeHelp />
      <CancersSection />
      <TreatmentsSection />
      <OversizedScrollTypography phrase="Precision Oncology." tagline="Dedicated to individualized biomarker profiling and targeted cancer care" />
      <JourneySection />
      <SecondOpinionSection />
      <BlogSection />
      <LatestInsights />
      <FAQSection />
      <FinalCtaSection />
    </>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/cancer-care" element={<HomePage />} />
        <Route path="/cancer-care/:slug" element={<HomePage />} />
        <Route path="/treatments" element={<HomePage />} />
        <Route path="/treatments/:slug" element={<HomePage />} />
        <Route path="/second-opinion" element={<HomePage />} />
        <Route path="/resources" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

const PublicFloatingActions: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) return null;

  return (
    <>
      <DesktopFloatingControls />
      <MobileBottomBar />
    </>
  );
};

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppRoutes />
        <AppointmentModal />
        <SecondOpinionDrawer />
        <PublicFloatingActions />
      </BrowserRouter>
    </DataProvider>
  );
}
