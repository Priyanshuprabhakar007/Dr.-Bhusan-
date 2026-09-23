import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Phone, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMediaUrl } from '../lib/cloudflareMedia';

interface NavLinkItem {
  id: string;
  label: string;
  path: string;
  sectionId: string;
}

export const Navbar: React.FC = () => {
  const { doctorProfile, practiceLocation, siteSettings, mediaAssets, getSlotMediaUrl, openAppointmentModal } = useData();
  const logoSrc = getSlotMediaUrl('slot-branding-logo', getMediaUrl(siteSettings.logoUrl, mediaAssets) || siteSettings.logoUrl);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [capsule, setCapsule] = useState({ x: 0, width: 0 });
  const [isReady, setIsReady] = useState(false);

  const isClickScrollingRef = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks: NavLinkItem[] = [
    { id: 'home', label: 'Home', path: '/', sectionId: 'home' },
    { id: 'about', label: 'About', path: '/about', sectionId: 'about' },
    { id: 'cancers', label: 'Cancer Care', path: '/cancer-care', sectionId: 'cancers' },
    { id: 'treatments', label: 'Treatments', path: '/treatments', sectionId: 'treatments' },
    { id: 'second-opinion', label: 'Second Opinion', path: '/second-opinion', sectionId: 'second-opinion' },
    { id: 'blogs', label: 'Blogs', path: '/blogs', sectionId: 'blogs' },
    { id: 'resources', label: 'Resources', path: '/resources', sectionId: 'resources' },
    { id: 'contact', label: 'Contact', path: '/contact', sectionId: 'contact' }
  ];

  // Helper to determine active nav from pathname
  const getNavFromPathname = (pathname: string): string => {
    if (pathname === '/blogs' || pathname.startsWith('/blogs/')) return 'blogs';
    if (pathname === '/contact' || pathname.startsWith('/contact/')) return 'contact';
    if (pathname === '/cancer-care' || pathname.startsWith('/cancer-care/')) return 'cancers';
    if (pathname === '/treatments' || pathname.startsWith('/treatments/')) return 'treatments';
    if (pathname.startsWith('/second-opinion')) return 'second-opinion';
    if (pathname.startsWith('/resources')) return 'resources';
    if (pathname.startsWith('/about')) return 'about';
    return 'home';
  };

  // Sync activeNav with location pathname when on subpages
  useEffect(() => {
    const matched = getNavFromPathname(location.pathname);
    if (location.pathname !== '/') {
      setActiveNav(matched);
    }
  }, [location.pathname]);

  // Measure capsule position relative ONLY to desktop nav container
  const updateCapsulePosition = (key: string) => {
    const container = navContainerRef.current;
    const item = itemRefs.current[key];
    if (!container || !item) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    if (containerRect.width === 0 || itemRect.width === 0) return;

    const x = itemRect.left - containerRect.left;
    const width = itemRect.width;

    setCapsule({ x, width });
    setIsReady(true);
  };

  // Re-measure position whenever activeNav or pathname changes
  useLayoutEffect(() => {
    updateCapsulePosition(activeNav);
  }, [activeNav, location.pathname]);

  useEffect(() => {
    const handleResize = () => updateCapsulePosition(activeNav);
    window.addEventListener('resize', handleResize);

    if (document.fonts) {
      document.fonts.ready.then(() => updateCapsulePosition(activeNav));
    }

    let observer: ResizeObserver | null = null;
    if (navContainerRef.current) {
      observer = new ResizeObserver(() => updateCapsulePosition(activeNav));
      observer.observe(navContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [activeNav, location.pathname]);

  // IntersectionObserver for scroll spy on home page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'about', 'cancers', 'treatments', 'second-opinion', 'blogs', 'resources', 'contact'];
    const elements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        if (isClickScrollingRef.current) return;

        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const sectionId = visible[0].target.id;
          setActiveNav(prev => (prev !== sectionId ? sectionId : prev));
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0.1
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (link: NavLinkItem) => {
    setMobileMenuOpen(false);
    setActiveNav(link.id);

    // Lock scroll spy briefly during smooth scroll
    isClickScrollingRef.current = true;
    setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);

    // Dedicated subpages
    if (link.id === 'blogs') {
      if (location.pathname !== '/blogs') {
        navigate('/blogs');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (link.id === 'contact') {
      if (location.pathname !== '/contact') {
        navigate('/contact');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Section links on Home page or cross-page navigation
    if (location.pathname === '/') {
      const el = document.getElementById(link.sectionId);
      if (el) {
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 90;
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: link.sectionId } });
    }
  };

  const cleanPhone = (practiceLocation?.phonePrimary || '+91 98765 43210').replace(/[^\d+]/g, '');

  return (
    <div className="relative w-full h-[70px] bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-full grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-8">
        
        {/* LEFT: Doctor Identity Block */}
        <button
          onClick={() => {
            setActiveNav('home');
            if (location.pathname !== '/') {
              navigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center space-x-3 text-left focus:outline-none group cursor-pointer shrink-0 h-full py-2"
        >
          {Boolean(logoSrc && logoSrc.trim()) && (
            <img
              src={logoSrc}
              alt={doctorProfile.name}
              className="h-10 w-auto max-w-[120px] object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="flex flex-col justify-center min-w-0">
            <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#073F3D] transition-colors font-heading leading-tight whitespace-nowrap">
              {doctorProfile.name}
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-teal-800 uppercase tracking-widest leading-tight whitespace-nowrap">
              Medical Oncology
            </div>
          </div>
        </button>

        {/* CENTER: Navigation Links with ONE Physical Absolute Capsule */}
        <nav
          ref={navContainerRef}
          className="relative hidden lg:flex items-center justify-center space-x-1 xl:space-x-1.5 text-sm font-medium text-slate-600"
        >
          {/* ONE Single Physical Capsule Element inside <nav> - NEVER unmounted, NEVER using layoutId */}
          <div
            className="absolute top-1/2 left-0 h-8 rounded-full bg-teal-50 border border-teal-200/80 pointer-events-none shadow-2xs z-0"
            style={{
              width: `${capsule.width}px`,
              transform: `translate3d(${capsule.x}px, -50%, 0)`,
              opacity: isReady && capsule.width > 0 ? 1 : 0,
              transition: isReady
                ? 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1), width 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease'
                : 'none'
            }}
          />

          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                ref={el => { itemRefs.current[link.id] = el; }}
                onClick={() => handleNavClick(link)}
                className={`relative z-10 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap select-none ${
                  isActive ? 'text-teal-950' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Phone + Book Appointment Button */}
        <div className="hidden sm:flex items-center justify-end space-x-3 sm:space-x-4 shrink-0">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-[#073F3D] transition-colors"
            title="Call for appointments"
          >
            <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-800">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="hidden xl:inline tracking-tight font-medium text-slate-600">
              {practiceLocation.phonePrimary}
            </span>
          </a>

          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={openAppointmentModal}
            id="navbar-book-btn"
            className="h-10 px-5 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold tracking-wide transition-all shadow-2xs hover:shadow-xs cursor-pointer shrink-0"
          >
            Book Appointment
          </motion.button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="lg:hidden flex items-center justify-end space-x-2 col-start-3">
          <button
            onClick={openAppointmentModal}
            className="sm:hidden text-xs font-semibold px-3 py-1.5 rounded-full bg-[#073F3D] text-white shadow-2xs"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-stone-100 focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-2 text-left shadow-lg absolute top-[70px] left-0 right-0 z-50">
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg cursor-pointer ${
                  isActive ? 'bg-teal-50 text-teal-950 font-bold' : 'text-slate-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <a
              href={`tel:${cleanPhone}`}
              className="text-xs font-semibold text-teal-800 flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{practiceLocation.phonePrimary}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAppointmentModal();
              }}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#073F3D] text-white"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
