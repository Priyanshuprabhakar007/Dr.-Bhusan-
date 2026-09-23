import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Calendar,
  FileCheck,
  MessageSquare,
  BookOpen,
  Activity,
  Layers,
  Clock,
  ArrowUpRight,
  Plus,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit,
  ExternalLink,
  Shield,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateSection: (sectionKey: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateSection }) => {
  const {
    currentAdminUser,
    adminRole,
    appointments,
    secondOpinions,
    contactEnquiries,
    blogPosts,
    cancerPages,
    treatments,
    activityLogs,
    updateAppointmentStatus,
    updateSecondOpinionStatus,
    navigateToPublic
  } = useData();

  // Metrics calculation safely
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const safeSecondOpinions = Array.isArray(secondOpinions) ? secondOpinions : [];
  const safeContactEnquiries = Array.isArray(contactEnquiries) ? contactEnquiries : [];
  const safeBlogPosts = Array.isArray(blogPosts) ? blogPosts : [];
  const safeCancerPages = Array.isArray(cancerPages) ? cancerPages : [];
  const safeTreatments = Array.isArray(treatments) ? treatments : [];

  const newAppointments = safeAppointments.filter(a => a.status === 'New').length;
  const pendingOpinions = safeSecondOpinions.filter(s => s.status === 'Pending Review').length;
  const newEnquiries = safeContactEnquiries.filter(e => e.status === 'New').length;
  const publishedBlogs = safeBlogPosts.length;
  const publishedCancers = safeCancerPages.length;
  const activeTreatments = safeTreatments.length;

  const roleLabel =
    adminRole === 'super_admin'
      ? 'Super Administrator'
      : adminRole === 'content_manager'
      ? 'Clinical Content Manager'
      : 'Patient Enquiry Coordinator';

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#071D2D] via-[#073F3D] to-[#149A96] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B8B4] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#18B8B4] animate-pulse" />
              <span>Live Practice System</span>
              <span>•</span>
              <span>{roleLabel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading">
              Welcome back, {currentAdminUser?.name || 'Administrator'}
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Real-time administrative control center for Dr. Bhushan Parmar's medical oncology practice. Manage clinical inquiries, cancer care pages, treatments, and media assets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateSection('appointments')}
              className="px-4 py-2.5 rounded-xl bg-white text-[#073F3D] hover:bg-slate-100 font-semibold text-xs sm:text-sm shadow-md flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#149A96]" />
              <span>View Inquiries ({newAppointments + pendingOpinions})</span>
            </button>
            <button
              onClick={navigateToPublic}
              className="px-4 py-2.5 rounded-xl bg-black/30 hover:bg-black/50 text-white border border-white/20 font-semibold text-xs sm:text-sm flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#18B8B4]" />
            </button>
          </div>
        </div>

        {/* Ambient overlay light */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Appointments Card */}
        <div
          onClick={() => onNavigateSection('appointments')}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#149A96] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            {newAppointments > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold animate-pulse">
                {newAppointments} New
              </span>
            )}
          </div>
          <div className="text-2xl font-extrabold text-[#071D2D] font-heading">
            {safeAppointments.length}
          </div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center justify-between">
            <span>Appointments</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Second Opinions Card */}
        <div
          onClick={() => onNavigateSection('second-opinions')}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#149A96] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            {pendingOpinions > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold animate-pulse">
                {pendingOpinions} Pending
              </span>
            )}
          </div>
          <div className="text-2xl font-extrabold text-[#071D2D] font-heading">
            {safeSecondOpinions.length}
          </div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center justify-between">
            <span>Second Opinions</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Contact Enquiries Card */}
        <div
          onClick={() => onNavigateSection('enquiries')}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#149A96] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            {newEnquiries > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                {newEnquiries} New
              </span>
            )}
          </div>
          <div className="text-2xl font-extrabold text-[#071D2D] font-heading">
            {safeContactEnquiries.length}
          </div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center justify-between">
            <span>Contact Leads</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Blog Articles Card */}
        <div
          onClick={() => onNavigateSection('blog')}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#149A96] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-purple-600">Active</span>
          </div>
          <div className="text-2xl font-extrabold text-[#071D2D] font-heading">
            {publishedBlogs}
          </div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center justify-between">
            <span>Patient Guides</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Cancer Care Pages Card */}
        <div
          onClick={() => onNavigateSection('cancers')}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#149A96] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-teal-600">Clinical</span>
          </div>
          <div className="text-2xl font-extrabold text-[#071D2D] font-heading">
            {publishedCancers}
          </div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center justify-between">
            <span>Cancer Pages</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Treatments Card */}
        <div
          onClick={() => onNavigateSection('treatments')}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#149A96] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-blue-600">Protocols</span>
          </div>
          <div className="text-2xl font-extrabold text-[#071D2D] font-heading">
            {activeTreatments}
          </div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center justify-between">
            <span>Treatments</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Actions Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Quick Administrative Actions
        </h3>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigateSection('blog')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071D2D] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#149A96]" />
            <span>Add New Blog Article</span>
          </button>
          <button
            onClick={() => onNavigateSection('homepage')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071D2D] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5 text-[#149A96]" />
            <span>Edit Homepage & Hero Banner</span>
          </button>
          <button
            onClick={() => onNavigateSection('body-explorer')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071D2D] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-[#149A96]" />
            <span>Tune Body Explorer Coordinates</span>
          </button>
          <button
            onClick={() => onNavigateSection('cancers')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071D2D] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#149A96]" />
            <span>Add Cancer Page</span>
          </button>
          <button
            onClick={() => onNavigateSection('doctor-profile')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071D2D] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5 text-[#149A96]" />
            <span>Update Doctor Qualifications</span>
          </button>
          <button
            onClick={() => onNavigateSection('media')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071D2D] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#149A96]" />
            <span>Manage Media Library</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split: Recent Inquiries & Recent Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Recent Enquiries Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#071D2D] font-heading">
                Recent Patient Enquiries & Leads
              </h3>
              <p className="text-xs text-slate-500">
                Latest submissions from appointment booking & second opinion desk
              </p>
            </div>
            <button
              onClick={() => onNavigateSection('appointments')}
              className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {safeAppointments.length === 0 && safeSecondOpinions.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No patient enquiries submitted yet. (Use the public website forms to submit test leads).
            </div>
          ) : (
            <div className="space-y-2.5">
              {/* Combine appointments and second opinions */}
              {[
                ...safeAppointments.slice(0, 4).map(a => ({
                  id: a.id,
                  type: 'Appointment' as const,
                  name: a.patientName,
                  phone: a.phone,
                  detail: a.cancerTypeOrConcern || a.consultationType,
                  date: a.submittedAt,
                  status: a.status
                })),
                ...safeSecondOpinions.slice(0, 3).map(s => ({
                  id: s.id,
                  type: 'Second Opinion' as const,
                  name: s.name,
                  phone: s.phone,
                  detail: s.cancerType,
                  date: s.submittedAt,
                  status: s.status
                }))
              ]
                .slice(0, 5)
                .map(item => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#071D2D]">
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            item.type === 'Second Opinion'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          {item.type}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            item.status === 'New' || item.status === 'Pending Review'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.detail} • {item.date}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <a
                        href={`tel:${item.phone}`}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium flex items-center space-x-1"
                        title="Call patient"
                      >
                        <Phone className="w-3 h-3 text-[#149A96]" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${(item?.phone || '').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
                        title="Message on WhatsApp"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* RIGHT: Audit Activity Logs & System Health */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#071D2D] font-heading">
                Recent Audit Trail
              </h3>
              <p className="text-xs text-slate-500">
                Logged administrative edits and security events
              </p>
            </div>
            <button
              onClick={() => onNavigateSection('activity-logs')}
              className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>View Logs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activityLogs.slice(0, 5).map((log, idx) => (
              <div
                key={`${log.id || 'log'}-${idx}`}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#071D2D]">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  {log.details || `Modified ${log.entityType}`}
                </div>
                <div className="text-[10px] text-[#149A96] font-medium">
                  By: {log.userName} ({log.userEmail})
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Database Integrity: Verified</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">v2.5.0-production</span>
          </div>
        </div>
      </div>
    </div>
  );
};
