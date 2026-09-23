import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CancerCategoryItem, CancerPageRecord } from '../../types/admin';
import {
  Activity,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Copy,
  ExternalLink,
  Search,
  Eye,
  Layers,
  HelpCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { ImagePickerField } from './ImagePickerField';

export const CancerCareEditor: React.FC = () => {
  const {
    cancerCategories = [],
    updateCancerCategories,
    cancerPages = [],
    updateCancerPage,
    addCancerPage,
    deleteCancerPage
  } = useData() as any;

  const safeCancerPages = Array.isArray(cancerPages) ? cancerPages : [];
  const safeCancerCategories = Array.isArray(cancerCategories) ? cancerCategories : [];

  const [activeTab, setActiveTab] = useState<'pages' | 'categories'>('pages');
  const [selectedPageId, setSelectedPageId] = useState<string>(() => safeCancerPages[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [saveToast, setSaveToast] = useState(false);

  const currentPage = safeCancerPages.find(p => p.id === selectedPageId) || safeCancerPages[0];

  const filteredPages = safeCancerPages.filter(page => {
    const matchSearch =
      (page.pageTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (page.urlSlug || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'all' || page.categoryId === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handlePageFieldChangeAll = (id: string, field: keyof CancerPageRecord, val: any) => {
    const updated = safeCancerPages.map((p: any) => (p.id === id ? { ...p, [field]: val } : p));
    updateCancerPage(updated);
  };

  const handleCategoryFieldChange = (id: string, field: string, val: any) => {
    const updated = safeCancerCategories.map((c: any) => (c.id === id ? { ...c, [field]: val } : c));
    updateCancerCategories(updated);
  };

  const handlePageFieldChange = (field: keyof CancerPageRecord, val: any) => {
    if (!currentPage) return;
    updateCancerPage(currentPage.id, { [field]: val });
  };

  const handleAddSymptom = () => {
    if (!currentPage) return;
    updateCancerPage(currentPage.id, {
      symptoms: [...currentPage.symptoms, 'New clinical symptom / presentation']
    });
  };

  const handleUpdateSymptom = (index: number, val: string) => {
    if (!currentPage) return;
    const updated = [...currentPage.symptoms];
    updated[index] = val;
    updateCancerPage(currentPage.id, { symptoms: updated });
  };

  const handleDeleteSymptom = (index: number) => {
    if (!currentPage) return;
    updateCancerPage(currentPage.id, {
      symptoms: currentPage.symptoms.filter((_: string, i: number) => i !== index)
    });
  };

  const handleAddDiagnosis = () => {
    if (!currentPage) return;
    updateCancerPage(currentPage.id, {
      diagnosis: [...currentPage.diagnosis, 'Diagnostic workup / NGS mutation testing']
    });
  };

  const handleUpdateDiagnosis = (index: number, val: string) => {
    if (!currentPage) return;
    const updated = [...currentPage.diagnosis];
    updated[index] = val;
    updateCancerPage(currentPage.id, { diagnosis: updated });
  };

  const handleDeleteDiagnosis = (index: number) => {
    if (!currentPage) return;
    updateCancerPage(currentPage.id, {
      diagnosis: currentPage.diagnosis.filter((_: string, i: number) => i !== index)
    });
  };

  const handleAddTreatment = () => {
    if (!currentPage) return;
    updateCancerPage(currentPage.id, {
      treatmentOptions: [...currentPage.treatmentOptions, 'Targeted therapy or immunotherapy protocol']
    });
  };

  const handleUpdateTreatment = (index: number, val: string) => {
    if (!currentPage) return;
    const updated = [...currentPage.treatmentOptions];
    updated[index] = val;
    updateCancerPage(currentPage.id, { treatmentOptions: updated });
  };

  const handleDeleteTreatment = (index: number) => {
    if (!currentPage) return;
    updateCancerPage(currentPage.id, {
      treatmentOptions: currentPage.treatmentOptions.filter((_: string, i: number) => i !== index)
    });
  };

  const handleCreateNewPage = () => {
    const newPage: CancerPageRecord = {
      id: 'cp-' + Date.now(),
      categoryId: safeCancerCategories[0]?.id || 'cat-lung',
      pageTitle: 'New Cancer Type Consultation Page',
      urlSlug: 'new-cancer-type-' + Date.now().toString().slice(-4),
      shortIntro: 'Evidence-based systemic medical oncology protocols customized to pathology and genetics.',
      overview: 'Comprehensive oncological care integrating precision biomarkers, targeted therapies, and empathetic supportive supervision.',
      symptoms: ['Unexplained persistent symptoms', 'Biopsy confirmation or localized swelling'],
      diagnosis: ['PET-CT whole body staging', 'Histopathology & NGS molecular profile'],
      treatmentOptions: ['Systemic chemotherapy', 'Targeted oral inhibitors', 'Next-gen immunotherapy'],
      whoShouldConsult: 'Newly diagnosed cancer patients or those seeking second opinions on systemic protocols.',
      faqs: [{ question: 'What is the first step after diagnosis?', answer: 'Comprehensive molecular staging.' }],
      featuredImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      ctaLabel: 'Schedule Consultation',
      ctaUrl: '#appointment',
      seoTitle: 'Cancer Care Specialist in Mohali | Dr. Bhushan Parmar',
      metaDescription: 'Consult Dr. Bhushan Parmar for advanced evidence-based cancer management.',
      canonicalUrl: 'https://drbhushanparmar.com/cancers/new-page',
      schemaType: 'MedicalCondition',
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0],
      updatedBy: 'Dr. Bhushan Parmar'
    };
    addCancerPage(newPage);
    setSelectedPageId(newPage.id);
    triggerToast();
  };

  const handleDuplicatePage = (page: CancerPageRecord) => {
    const dup: CancerPageRecord = {
      ...page,
      id: 'cp-' + Date.now(),
      pageTitle: `${page.pageTitle} (Copy)`,
      urlSlug: `${page.urlSlug}-copy`,
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    addCancerPage(dup);
    setSelectedPageId(dup.id);
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
            Cancer Care & Disease Catalog
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish and manage comprehensive clinical cancer care pages, symptom guides, and diagnostic workflows.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={handleCreateNewPage}
            className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#18B8B4]" />
            <span>Create Cancer Page</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Cancer care page saved! Updated in catalog and navigation.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'pages'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Individual Cancer Pages ({cancerPages.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Cancer Categories ({safeCancerCategories.length})
        </button>
      </div>

      {activeTab === 'pages' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Page List & Search */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search cancer pages..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredPages.map(page => {
                const isSelected = page.id === selectedPageId;
                const cat = safeCancerCategories.find(c => c.id === page.categoryId);
                return (
                  <div
                    key={page.id}
                    onClick={() => setSelectedPageId(page.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/70 border-[#149A96] ring-1 ring-[#149A96]'
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#071D2D] line-clamp-1">
                        {page.pageTitle}
                      </h4>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${
                          page.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {page.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Category: {cat?.shortName || 'General'} • /{page.urlSlug}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Page Details Editor */}
          {currentPage && (
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#071D2D]">
                    {currentPage.pageTitle}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Slug: drbhushanparmar.com/cancers/{currentPage.urlSlug}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleDuplicatePage(currentPage)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                    title="Duplicate Page"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {cancerPages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete "${currentPage.pageTitle}"?`)) {
                          deleteCancerPage(currentPage.id);
                          setSelectedPageId(cancerPages[0]?.id || '');
                        }
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Page"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={triggerToast}
                    className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#18B8B4]" />
                    <span>Save Page</span>
                  </button>
                </div>
              </div>

              {/* Title, Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Page Headline Title
                  </label>
                  <input
                    type="text"
                    value={currentPage.pageTitle}
                    onChange={e => handlePageFieldChange('pageTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={currentPage.status}
                    onChange={e => handlePageFieldChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent Category
                  </label>
                  <select
                    value={currentPage.categoryId}
                    onChange={e => handlePageFieldChange('categoryId', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                  >
                    {safeCancerCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={currentPage.urlSlug}
                    onChange={e => handlePageFieldChange('urlSlug', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>
              </div>

              {/* Short Intro & Overview */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Clinical Introduction
                </label>
                <textarea
                  rows={2}
                  value={currentPage.shortIntro}
                  onChange={e => handlePageFieldChange('shortIntro', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Comprehensive Overview & Oncology Protocols
                </label>
                <textarea
                  rows={4}
                  value={currentPage.overview}
                  onChange={e => handlePageFieldChange('overview', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>

              {/* Symptoms List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Warning Signs & Clinical Symptoms ({currentPage.symptoms.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSymptom}
                    className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Symptom</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {currentPage.symptoms.map((sym: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={sym}
                        onChange={e => handleUpdateSymptom(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteSymptom(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnostic Workup */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Diagnostic Evaluation Workup ({currentPage.diagnosis.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddDiagnosis}
                    className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Test</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {currentPage.diagnosis.map((diag: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={diag}
                        onChange={e => handleUpdateDiagnosis(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteDiagnosis(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Oncology Treatments */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Systemic Treatment Protocols ({currentPage.treatmentOptions.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddTreatment}
                    className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Treatment</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {currentPage.treatmentOptions.map((treat: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={treat}
                        onChange={e => handleUpdateTreatment(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteTreatment(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured / Card Image Upload */}
              <div className="pt-2">
                <ImagePickerField
                  label="Cancer Clinical / Card Image"
                  value={currentPage.featuredImage || ''}
                  onChange={(val) => handlePageFieldChange('featuredImage', val)}
                  category="Cancer Care"
                  usageContext={`Cancer Guide: ${currentPage.pageTitle}`}
                  recommendedDimensions="1200 × 800px"
                  aspectRatio="16:9"
                />
              </div>

              {/* SEO Title & Description */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Search Engine Optimization (SEO)
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Meta Title Tag
                  </label>
                  <input
                    type="text"
                    value={currentPage.seoTitle}
                    onChange={e => handlePageFieldChange('seoTitle', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Meta Description Tag
                  </label>
                  <input
                    type="text"
                    value={currentPage.metaDescription}
                    onChange={e => handlePageFieldChange('metaDescription', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#071D2D]">
              Clinical Cancer Categories
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeCancerCategories.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#071D2D]">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-[#073F3D] font-bold">
                    Order: {cat.displayOrder}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{cat.shortDesc}</p>
                <div className="text-[11px] text-slate-400">
                  Slug: /{cat.seoSlug} • Status: {cat.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
