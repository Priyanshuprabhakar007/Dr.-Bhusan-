import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FooterConfig, NavigationMenuItem } from '../../types/admin';
import {
  Menu,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Layout,
  ExternalLink,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export const NavigationFooterEditor: React.FC = () => {
  const {
    navigationMenu = [],
    updateNavigationMenu,
    footerConfig = {} as any,
    updateFooterConfig
  } = useData() as any;

  const [activeTab, setActiveTab] = useState<'navbar' | 'footer'>('navbar');
  const [navItems, setNavItems] = useState<NavigationMenuItem[]>(() => navigationMenu || []);
  const [footerForm, setFooterForm] = useState<FooterConfig>(() => footerConfig || {} as FooterConfig);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'navbar') {
      updateNavigationMenu(navItems);
    } else {
      updateFooterConfig(footerForm);
    }
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleAddNavItem = () => {
    const newItem: NavigationMenuItem = {
      id: 'nav-' + Date.now(),
      label: 'New Section',
      url: '#new-section',
      isExternal: false,
      order: (navItems || []).length + 1,
      isVisible: true,
      openInNewTab: false
    };
    setNavItems([...(navItems || []), newItem]);
  };

  const handleUpdateNavItem = (id: string, partial: Partial<NavigationMenuItem>) => {
    setNavItems((navItems || []).map(item => (item.id === id ? { ...item, ...partial } : item)));
  };

  const handleDeleteNavItem = (id: string) => {
    setNavItems((navItems || []).filter(item => item.id !== id));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Navigation Menu & Footer Configuration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Control header navigation links, footer clinic details, social handles, and medical disclaimers.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4 text-[#18B8B4]" />
          <span>Save Configuration</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Navigation and footer settings updated across website!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('navbar')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === 'navbar'
              ? 'border-[#073F3D] text-[#073F3D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Menu className="w-4 h-4 text-[#149A96]" />
          <span>Header Navigation Links ({(navItems || []).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === 'footer'
              ? 'border-[#073F3D] text-[#073F3D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layout className="w-4 h-4 text-[#149A96]" />
          <span>Footer Details & Disclaimers</span>
        </button>
      </div>

      {/* Navbar Panel */}
      {activeTab === 'navbar' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#071D2D]">
              Header Navigation Links
            </h3>
            <button
              type="button"
              onClick={handleAddNavItem}
              className="px-3.5 py-1.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#18B8B4]" />
              <span>Add Link</span>
            </button>
          </div>

          <div className="space-y-3">
            {navItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-slate-400 font-mono text-[11px] w-6">
                    #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item.label}
                    onChange={e => handleUpdateNavItem(item.id, { label: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold"
                    placeholder="Link Label"
                  />
                  <input
                    type="text"
                    value={item.url}
                    onChange={e => handleUpdateNavItem(item.id, { url: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                    placeholder="#section or /url"
                  />
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleUpdateNavItem(item.id, { isVisible: !item.isVisible })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      item.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.isVisible ? 'Visible' : 'Hidden'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteNavItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Panel */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100">
              Practice Contact & Summary
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctor Footer Positioning Statement
              </label>
              <textarea
                rows={2}
                value={footerForm.doctorDescription}
                onChange={e => setFooterForm(p => ({ ...p, doctorDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={footerForm.phone}
                  onChange={e => setFooterForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Support
                </label>
                <input
                  type="text"
                  value={footerForm.whatsapp}
                  onChange={e => setFooterForm(p => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinical Email
                </label>
                <input
                  type="email"
                  value={footerForm.email}
                  onChange={e => setFooterForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                OPD Clinic Address
              </label>
              <input
                type="text"
                value={footerForm.address}
                onChange={e => setFooterForm(p => ({ ...p, address: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Copyright Line
              </label>
              <input
                type="text"
                value={footerForm.copyright}
                onChange={e => setFooterForm(p => ({ ...p, copyright: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100">
              Medical Disclaimer Text
            </h3>
            <textarea
              rows={3}
              value={footerForm.medicalDisclaimer}
              onChange={e => setFooterForm(p => ({ ...p, medicalDisclaimer: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
            />
          </div>
        </div>
      )}
    </form>
  );
};
