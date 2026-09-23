import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Treatment } from '../../types';
import {
  Syringe,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Search,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { ImagePickerField } from './ImagePickerField';

export const TreatmentsEditor: React.FC = () => {
  const {
    treatments = [],
    updateTreatment,
    addTreatment,
    deleteTreatment
  } = useData() as any;

  const safeTreatments = Array.isArray(treatments) ? treatments : [];

  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(() => safeTreatments[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const currentTreatment = safeTreatments.find(t => t.id === selectedTreatmentId) || safeTreatments[0];

  const filteredTreatments = safeTreatments.filter(t =>
    (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFieldChange = (field: keyof Treatment, value: any) => {
    if (!currentTreatment) return;
    updateTreatment(currentTreatment.id, { [field]: value });
  };

  const handleAddBenefit = () => {
    if (!currentTreatment) return;
    const updated = [...currentTreatment.keyBenefits, 'New therapeutic benefit'];
    updateTreatment(currentTreatment.id, { keyBenefits: updated });
  };

  const handleUpdateBenefit = (index: number, val: string) => {
    if (!currentTreatment) return;
    const updated = [...currentTreatment.keyBenefits];
    updated[index] = val;
    updateTreatment(currentTreatment.id, { keyBenefits: updated });
  };

  const handleDeleteBenefit = (index: number) => {
    if (!currentTreatment) return;
    updateTreatment(currentTreatment.id, {
      keyBenefits: currentTreatment.keyBenefits.filter((_: string, i: number) => i !== index)
    });
  };

  const handleCreateTreatment = () => {
    const newTreat: Treatment = {
      id: 'treat-' + Date.now(),
      title: 'New Specialized Oncology Therapy',
      category: 'Systemic',
      shortDesc: 'Next-generation targeted systemic protocol designed to minimize toxicity while maximizing tumor response.',
      overview: 'Evidence-based administration protocols adhering strictly to international clinical practice guidelines.',
      howItWorks: 'Utilizes precision mechanisms to interfere with cancer cell division pathways.',
      keyBenefits: ['Biomarker-guided delivery', 'Reduced off-target side effects', 'Continuous clinical monitoring'],
      indications: ['Solid tumors', 'Selected hematologic conditions'],
      whatToExpect: 'Administered in comfortable day-care suites with comprehensive supportive anti-emetic premedications.',
      iconName: 'Sparkles'
    };
    addTreatment(newTreat);
    setSelectedTreatmentId(newTreat.id);
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
            Oncology Treatments & Protocols Catalog
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure systemic chemotherapy, targeted therapy, immunotherapy, and supportive oncology programs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateTreatment}
          className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#18B8B4]" />
          <span>Add Treatment Protocol</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Treatment protocol updated successfully and synchronized to live website!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Treatment Sidebar List */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search treatments..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTreatments.map(t => {
              const isSelected = t.id === selectedTreatmentId;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTreatmentId(t.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/70 border-[#149A96] ring-1 ring-[#149A96]'
                      : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-[#071D2D] line-clamp-1">
                      {t.title}
                    </h4>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 bg-teal-100 text-teal-800">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                    {t.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Treatment Editor */}
        {currentTreatment && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#071D2D]">
                  {currentTreatment.title}
                </h3>
                <span className="text-xs text-slate-400">
                  Category: {currentTreatment.category}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {safeTreatments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete treatment "${currentTreatment.title}"?`)) {
                        deleteTreatment(currentTreatment.id);
                        setSelectedTreatmentId(safeTreatments[0]?.id || '');
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
                  <span>Save Treatment</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Treatment Title
                </label>
                <input
                  type="text"
                  value={currentTreatment.title}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#149A96] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Treatment Category
                </label>
                <select
                  value={currentTreatment.category}
                  onChange={e => handleFieldChange('category', e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                >
                  <option value="Systemic">Systemic</option>
                  <option value="Targeted">Targeted</option>
                  <option value="Cellular">Cellular</option>
                  <option value="Preventive">Preventive</option>
                  <option value="Supportive">Supportive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Summary (Card Preview)
              </label>
              <textarea
                rows={2}
                value={currentTreatment.shortDesc}
                onChange={e => handleFieldChange('shortDesc', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical Overview & Mechanism
              </label>
              <textarea
                rows={3}
                value={currentTreatment.overview}
                onChange={e => handleFieldChange('overview', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                How It Works
              </label>
              <textarea
                rows={2}
                value={currentTreatment.howItWorks}
                onChange={e => handleFieldChange('howItWorks', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            {/* Key Benefits */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Key Clinical Benefits & Advantages
              </label>
              <div className="space-y-2">
                {currentTreatment.keyBenefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={e => handleUpdateBenefit(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteBenefit(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Benefit</span>
                </button>
              </div>
            </div>

            {/* Treatment Card Image Upload */}
            <div className="pt-2">
              <ImagePickerField
                label="Treatment Visual / Card Image"
                value={(currentTreatment as any).featuredImage || (currentTreatment as any).image || ''}
                onChange={(val) => handleFieldChange('image' as any, val)}
                category="Treatments"
                usageContext={`Treatment Protocol: ${currentTreatment.title}`}
                recommendedDimensions="1200 × 800px"
                aspectRatio="16:9"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                What to Expect During Administration
              </label>
              <textarea
                rows={2}
                value={currentTreatment.whatToExpect}
                onChange={e => handleFieldChange('whatToExpect', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
