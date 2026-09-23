import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { RedirectRule, SeoGlobalConfig } from '../../types/admin';
import {
  Globe,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const SeoRedirectsEditor: React.FC = () => {
  const {
    seoGlobalConfig = { defaultTitleFormat: '', defaultMetaDescription: '', defaultSocialImage: '' },
    updateSeoGlobalConfig,
    redirectRules = [],
    updateRedirectRules,
    cancerPages = [],
    blogPosts = []
  } = useData() as any;

  const [seoForm, setSeoForm] = useState<SeoGlobalConfig>(seoGlobalConfig);
  const [saveToast, setSaveToast] = useState(false);

  // SEO Audit calculation
  const missingMetaDesc = (cancerPages || []).filter((p: any) => !p.metaDescription || p.metaDescription.length < 20).length;

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoGlobalConfig(seoForm);
    triggerToast();
  };

  const handleAddRedirect = () => {
    const newRule: RedirectRule = {
      id: 'red-' + Date.now(),
      oldUrl: '/old-cancer-page',
      newUrl: '/cancers/lung-cancer',
      type: '301',
      enabled: true
    };
    updateRedirectRules([...(redirectRules || []), newRule]);
    triggerToast();
  };

  const handleUpdateRedirect = (id: string, partial: Partial<RedirectRule>) => {
    updateRedirectRules((redirectRules || []).map((r: RedirectRule) => (r.id === id ? { ...r, ...partial } : r)));
  };

  const handleDeleteRedirect = (id: string) => {
    updateRedirectRules((redirectRules || []).filter((r: RedirectRule) => r.id !== id));
    triggerToast();
  };

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            SEO & URL Redirects Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Control search engine indexing, social share preview cards, Schema.org Physician markup, and 301 redirects.
          </p>
        </div>

        {saveToast && (
          <div className="p-2.5 px-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>SEO configuration and redirect rules saved!</span>
          </div>
        )}
      </div>

      {/* SEO Health Audit Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>SEO Health Diagnostic</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-emerald-900">Schema.org JSON-LD</div>
              <div className="text-[11px] text-emerald-700">Physician & MedicalCondition active</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100 flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <div>
              <div className="text-xs font-bold text-[#073F3D]">Indexed Pages</div>
              <div className="text-[11px] text-[#149A96]">
                {(cancerPages || []).length + (blogPosts || []).length + 1} indexed URLs
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border flex items-center space-x-3 ${missingMetaDesc > 0 ? 'bg-amber-50 border-amber-100 text-amber-900' : 'bg-emerald-50 border-emerald-100 text-emerald-900'}`}>
            {missingMetaDesc > 0 ? (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            )}
            <div>
              <div className="text-xs font-bold">Meta Descriptions</div>
              <div className="text-[11px] opacity-80">
                {missingMetaDesc > 0 ? `${missingMetaDesc} page(s) need descriptions` : 'All pages optimized'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Meta Form */}
      <form onSubmit={handleSaveSeo} className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100">
          Global Meta Tags & Verification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Default Page Title Template
            </label>
            <input
              type="text"
              value={seoForm.defaultTitleFormat}
              onChange={e => setSeoForm(p => ({ ...p, defaultTitleFormat: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Search Console Verification Code
            </label>
            <input
              type="text"
              value={seoForm.googleSearchConsole || ''}
              onChange={e => setSeoForm(p => ({ ...p, googleSearchConsole: e.target.value }))}
              placeholder="google-site-verification=xxxx..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              value={seoForm.defaultMetaDescription}
              onChange={e => setSeoForm(p => ({ ...p, defaultMetaDescription: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Default OpenGraph Social Image URL
            </label>
            <input
              type="url"
              value={seoForm.defaultSocialImage}
              onChange={e => setSeoForm(p => ({ ...p, defaultSocialImage: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              value={seoForm.googleAnalyticsId || ''}
              onChange={e => setSeoForm(p => ({ ...p, googleAnalyticsId: e.target.value }))}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#18B8B4]" />
            <span>Save Global SEO</span>
          </button>
        </div>
      </form>

      {/* 301 / 302 Redirects Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-[#071D2D]">
              301 Permanent & 302 Temporary URL Redirects ({(redirectRules || []).length})
            </h3>
            <p className="text-xs text-slate-500">
              Preserve search rankings when renaming oncology service or blog URLs.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddRedirect}
            className="px-3.5 py-1.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#18B8B4]" />
            <span>Add Redirect Rule</span>
          </button>
        </div>

        <div className="space-y-2">
          {(redirectRules || []).map((rule: RedirectRule) => (
            <div
              key={rule.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="text"
                  value={rule.oldUrl}
                  onChange={e => handleUpdateRedirect(rule.id, { oldUrl: e.target.value })}
                  className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                  placeholder="/old-path"
                />
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={rule.newUrl}
                  onChange={e => handleUpdateRedirect(rule.id, { newUrl: e.target.value })}
                  className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                  placeholder="/new-path"
                />
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <select
                  value={rule.type}
                  onChange={e => handleUpdateRedirect(rule.id, { type: e.target.value as any })}
                  className="px-2 py-1 border border-slate-200 rounded-lg text-xs font-semibold"
                >
                  <option value="301">301 Permanent</option>
                  <option value="302">302 Temporary</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleUpdateRedirect(rule.id, { enabled: !(rule?.enabled ?? true) })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    (rule?.enabled ?? true) ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {(rule?.enabled ?? true) ? 'Active' : 'Disabled'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteRedirect(rule.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
