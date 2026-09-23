import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AppointmentsManager } from './admin/AppointmentsManager';
import { SecondOpinionsManager } from './admin/SecondOpinionsManager';
import { EnquiriesManager } from './admin/EnquiriesManager';
import { BodyExplorerEditor } from './admin/BodyExplorerEditor';
import { CancerCareEditor } from './admin/CancerCareEditor';
import { TreatmentsEditor } from './admin/TreatmentsEditor';
import { DoctorProfileEditor } from './admin/DoctorProfileEditor';
import { LocationsEditor } from './admin/LocationsEditor';
import { BlogsEditor } from './admin/BlogsEditor';
import { HomepageEditor } from './admin/HomepageEditor';
import { AnimationMarqueeEditor } from './admin/AnimationMarqueeEditor';
import { ResourcesEditor } from './admin/ResourcesEditor';
import { FaqReviewsEditor } from './admin/FaqReviewsEditor';
import { NavigationFooterEditor } from './admin/NavigationFooterEditor';
import { MediaAndImagesManager } from './admin/MediaAndImagesManager';
import { FormBuilderEditor } from './admin/FormBuilderEditor';
import { SeoRedirectsEditor } from './admin/SeoRedirectsEditor';
import { SiteSettingsEditor } from './admin/SiteSettingsEditor';
import { AdminUsersManager } from './admin/AdminUsersManager';
import { ActivityLogViewer } from './admin/ActivityLogViewer';
import { PreviewModal } from './admin/PreviewModal';

import {
  LayoutDashboard,
  Calendar,
  FileCheck,
  MessageSquare,
  Crosshair,
  Activity,
  Syringe,
  UserCheck,
  Building2,
  Home,
  Sparkles,
  BookOpen,
  HelpCircle,
  Menu as MenuIcon,
  Image as ImageIcon,
  Sliders,
  Globe,
  Settings,
  Users,
  Clock,
  LogOut,
  ExternalLink,
  Shield,
  X,
  Menu,
  LucideIcon
} from 'lucide-react';

interface AdminPanelProps {
  onNavigatePublic?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number | null;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigatePublic }) => {
  const {
    isAdminLoggedIn,
    adminRole,
    currentAdminUser,
    adminLogout,
    appointments,
    secondOpinions,
    contactEnquiries
  } = useData();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  // If not authenticated, render Login view
  if (!isAdminLoggedIn) {
    return <AdminLogin onSuccess={() => setActiveTab('dashboard')} />;
  }

  // Pending counts safely calculated
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const safeSecondOpinions = Array.isArray(secondOpinions) ? secondOpinions : [];
  const safeContactEnquiries = Array.isArray(contactEnquiries) ? contactEnquiries : [];

  const pendingAppointments = safeAppointments.filter(a => a.status === 'New').length;
  const pendingSecondOpinions = safeSecondOpinions.filter(s => s.status === 'Pending Review').length;
  const newEnquiries = safeContactEnquiries.filter(e => e.status === 'New').length;

  const navigationGroups: NavGroup[] = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'activity_log', label: 'Activity Audit Log', icon: Clock }
      ]
    },
    {
      group: 'Patient Enquiries',
      items: [
        {
          id: 'appointments',
          label: 'Appointments',
          icon: Calendar,
          badge: pendingAppointments > 0 ? pendingAppointments : null,
          badgeColor: 'bg-teal-500 text-white'
        },
        {
          id: 'second_opinions',
          label: 'Second Opinions',
          icon: FileCheck,
          badge: pendingSecondOpinions > 0 ? pendingSecondOpinions : null,
          badgeColor: 'bg-amber-500 text-white'
        },
        {
          id: 'enquiries',
          label: 'General Enquiries',
          icon: MessageSquare,
          badge: newEnquiries > 0 ? newEnquiries : null,
          badgeColor: 'bg-sky-500 text-white'
        }
      ]
    },
    {
      group: 'Clinical Content CMS',
      items: [
        { id: 'body_explorer', label: 'Anatomy Visualizer', icon: Crosshair },
        { id: 'cancer_care', label: 'Cancer Care Catalog', icon: Activity },
        { id: 'treatments', label: 'Medical Treatments', icon: Syringe },
        { id: 'doctor_profile', label: 'Doctor Profile & Credentials', icon: UserCheck },
        { id: 'locations', label: 'Contact & Locations', icon: Building2 },
        { id: 'blogs', label: 'Blogs & Articles', icon: BookOpen },
        { id: 'resources', label: 'Patient Guides (Legacy)', icon: BookOpen },
        { id: 'faq_reviews', label: 'FAQs & Reviews', icon: HelpCircle }
      ]
    },
    {
      group: 'Layout & Presentation',
      items: [
        { id: 'homepage', label: 'Homepage & Hero', icon: Home },
        { id: 'marquee', label: 'Editorial Ticker', icon: Sparkles },
        { id: 'navigation_footer', label: 'Navigation & Footer', icon: MenuIcon },
        { id: 'media_library', label: 'Media & Images', icon: ImageIcon },
        { id: 'forms', label: 'Form Builder', icon: Sliders }
      ]
    },
    {
      group: 'System & Security',
      items: [
        { id: 'seo', label: 'SEO & Redirects', icon: Globe },
        { id: 'site_settings', label: 'Site Settings & Notices', icon: Settings },
        { id: 'users', label: 'Admin Team & Roles', icon: Users }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 antialiased font-sans selection:bg-[#073F3D] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-[1000] bg-[#071D2D] border-b border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6 shadow-md">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 lg:hidden transition-colors cursor-pointer"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-[#18B8B4] to-[#073F3D] flex items-center justify-center text-white shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                Dr. Bhushan Parmar
              </span>
              <span className="text-[10px] text-teal-400 font-medium block">
                Oncology CMS & Practice Administration
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Preview */}
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-[#18B8B4] border border-teal-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <span>Preview Site</span>
          </button>

          {/* Public Website Back Link */}
          <button
            type="button"
            onClick={onNavigatePublic}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Public Site</span>
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          {/* Current User Info */}
          <div className="hidden sm:flex items-center space-x-2 text-right">
            <div>
              <div className="text-xs font-bold text-white">
                {currentAdminUser?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-teal-300 capitalize">
                {adminRole ? adminRole.replace('_', ' ') : 'Administrator'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={adminLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
            title="Sign Out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex relative">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-6">
            {navigationGroups.map(group => (
              <div key={group.group} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                  {group.group}
                </div>
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#073F3D] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#071D2D]'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-[#18B8B4]' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge !== null && item.badge !== undefined && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-20 lg:hidden"
          />
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              onNavigateSection={sec => setActiveTab(sec)}
            />
          )}
          {activeTab === 'appointments' && <AppointmentsManager />}
          {activeTab === 'second_opinions' && <SecondOpinionsManager />}
          {activeTab === 'enquiries' && <EnquiriesManager />}
          {activeTab === 'body_explorer' && <BodyExplorerEditor />}
          {activeTab === 'cancer_care' && <CancerCareEditor />}
          {activeTab === 'treatments' && <TreatmentsEditor />}
          {activeTab === 'blogs' && <BlogsEditor />}
          {activeTab === 'doctor_profile' && <DoctorProfileEditor />}
          {activeTab === 'locations' && <LocationsEditor />}
          {activeTab === 'homepage' && <HomepageEditor />}
          {activeTab === 'marquee' && <AnimationMarqueeEditor />}
          {activeTab === 'resources' && <ResourcesEditor />}
          {activeTab === 'faq_reviews' && <FaqReviewsEditor />}
          {activeTab === 'navigation_footer' && <NavigationFooterEditor />}
          {activeTab === 'media_library' && <MediaAndImagesManager />}
          {activeTab === 'forms' && <FormBuilderEditor />}
          {activeTab === 'seo' && <SeoRedirectsEditor />}
          {activeTab === 'site_settings' && <SiteSettingsEditor />}
          {activeTab === 'users' && <AdminUsersManager />}
          {activeTab === 'activity_log' && <ActivityLogViewer />}
        </main>
      </div>

      {/* Live Site Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onNavigatePublic={onNavigatePublic || (() => {})}
      />
    </div>
  );
};
