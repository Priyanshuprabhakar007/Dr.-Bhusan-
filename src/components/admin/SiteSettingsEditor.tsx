import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SiteSettingsConfig } from '../../types/admin';
import {
  Settings,
  Save,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Image as ImageIcon
} from 'lucide-react';
import { ImagePickerField } from './ImagePickerField';

export const SiteSettingsEditor: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useData();

  const [form, setForm] = useState<SiteSettingsConfig>(siteSettings);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(form);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Site Settings & Notices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Emergency announcements, maintenance mode, clinic notification bar, and practice branding.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4 text-[#18B8B4]" />
          <span>Save Site Settings</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Site settings updated! Announcements and banners refreshed on the live site.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Practice Identity */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
            <Settings className="w-4 h-4 text-[#149A96]" />
            <span>Practice Identity & Domains</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Website Name
            </label>
            <input
              type="text"
              value={form.websiteName}
              onChange={e => setForm(p => ({ ...p, websiteName: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Site URL
            </label>
            <input
              type="url"
              value={form.siteUrl}
              onChange={e => setForm(p => ({ ...p, siteUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Header Logo Text
              </label>
              <input
                type="text"
                value={form.logoText}
                onChange={e => setForm(p => ({ ...p, logoText: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctor Sub-Title
              </label>
              <input
                type="text"
                value={form.doctorTitle}
                onChange={e => setForm(p => ({ ...p, doctorTitle: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Emergency Notice & Maintenance */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Emergency Notice Banner</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Emergency Notice Text (Leave blank to disable banner)
            </label>
            <textarea
              rows={3}
              value={form.emergencyNotice}
              onChange={e => setForm(p => ({ ...p, emergencyNotice: e.target.value }))}
              placeholder="e.g. Urgent Notice: For urgent after-hours oncological support or emergency admissions, please call..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
            />
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#071D2D] flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[#149A96]" />
              <span>Top Announcement Bar</span>
            </h3>

            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.announcementBar?.enabled ?? false}
                onChange={e =>
                  setForm(p => ({
                    ...p,
                    announcementBar: {
                      ...p.announcementBar,
                      enabled: e.target.checked
                    }
                  }))
                }
                className="rounded text-[#149A96] focus:ring-[#149A96]"
              />
              <span>Enable Announcement Bar</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={form.announcementBar?.text ?? ''}
                onChange={e =>
                  setForm(p => ({
                    ...p,
                    announcementBar: {
                      ...p.announcementBar,
                      text: e.target.value
                    }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Call to Action Link (e.g. #second-opinion)
              </label>
              <input
                type="text"
                value={form.announcementBar?.ctaUrl ?? ''}
                onChange={e =>
                  setForm(p => ({
                    ...p,
                    announcementBar: {
                      ...p.announcementBar,
                      ctaUrl: e.target.value
                    }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Practice Branding & Favicon Media */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImagePickerField
            label="Practice Logo Graphic"
            value={(form as any).logoImage || ''}
            onChange={(val) => setForm(p => ({ ...p, logoImage: val } as any))}
            category="Branding"
            usageContext="Header Navigation, Footer & Official Prescriptions"
            recommendedDimensions="400 × 120px (Transparent PNG or SVG)"
            aspectRatio="auto"
          />

          <ImagePickerField
            label="Social Share & OpenGraph Image"
            value={(form as any).ogImage || ''}
            onChange={(val) => setForm(p => ({ ...p, ogImage: val } as any))}
            category="Branding"
            usageContext="WhatsApp, Facebook, Twitter, LinkedIn Preview Card"
            recommendedDimensions="1200 × 630px"
            aspectRatio="16:9"
          />
        </div>
      </div>
    </form>
  );
};
