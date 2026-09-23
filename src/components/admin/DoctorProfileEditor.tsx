import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  GraduationCap,
  Award,
  Stethoscope,
  Image as ImageIcon
} from 'lucide-react';
import { ImagePickerField } from './ImagePickerField';

export const DoctorProfileEditor: React.FC = () => {
  const { doctorProfile, updateDoctorProfile } = useData();

  const [form, setForm] = useState(doctorProfile);
  const [saveToast, setSaveToast] = useState(false);

  const handleChange = (field: keyof typeof doctorProfile, val: any) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorProfile(form);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Bio paragraphs
  const handleBioChange = (index: number, val: string) => {
    const updatedBio = [...form.fullBio];
    updatedBio[index] = val;
    setForm(prev => ({ ...prev, fullBio: updatedBio }));
  };

  const handleAddBioParagraph = () => {
    setForm(prev => ({ ...prev, fullBio: [...prev.fullBio, ''] }));
  };

  const handleDeleteBioParagraph = (index: number) => {
    setForm(prev => ({ ...prev, fullBio: prev.fullBio.filter((_, i) => i !== index) }));
  };

  // Qualifications repeater
  const handleAddQual = () => {
    const newQual = {
      degree: 'Specialist Degree / Fellowship',
      institution: 'Premier Oncology Institute',
      period: '2024',
      description: 'Advanced clinical oncology training'
    };
    setForm(prev => ({ ...prev, qualifications: [...prev.qualifications, newQual] }));
  };

  const handleUpdateQual = (index: number, field: string, val: string) => {
    const updated = [...form.qualifications];
    updated[index] = { ...updated[index], [field]: val };
    setForm(prev => ({ ...prev, qualifications: updated }));
  };

  const handleDeleteQual = (index: number) => {
    setForm(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  // Expertise items
  const handleAddExpertise = () => {
    setForm(prev => ({
      ...prev,
      coreExpertise: [...prev.coreExpertise, 'New Clinical Specialization']
    }));
  };

  const handleUpdateExpertise = (index: number, val: string) => {
    const updated = [...form.coreExpertise];
    updated[index] = val;
    setForm(prev => ({ ...prev, coreExpertise: updated }));
  };

  const handleDeleteExpertise = (index: number) => {
    setForm(prev => ({
      ...prev,
      coreExpertise: prev.coreExpertise.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Doctor Profile & Credentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage Dr. Bhushan Parmar's qualifications, institutional appointments, biography, and photos.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4 text-[#18B8B4]" />
          <span>Save Profile Changes</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Doctor profile updated! Changes are live across the public website.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Core Identity */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100">
              Basic Clinical Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Doctor Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={form.experienceYears}
                  onChange={e => handleChange('experienceYears', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Medical Specialty Title
              </label>
              <input
                type="text"
                value={form.speciality}
                onChange={e => handleChange('speciality', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Professional Positioning Statement
              </label>
              <input
                type="text"
                value={form.positioning}
                onChange={e => handleChange('positioning', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Bio Summary (Intro Card)
              </label>
              <textarea
                rows={3}
                value={form.bioSummary}
                onChange={e => handleChange('bioSummary', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>
          </div>

          {/* Full Biography Paragraphs */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#071D2D]">
                Detailed Biography Paragraphs ({(form?.fullBio || []).length})
              </h3>
              <button
                type="button"
                onClick={handleAddBioParagraph}
                className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Paragraph</span>
              </button>
            </div>

            <div className="space-y-3">
              {(form?.fullBio || []).map((paragraph, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-xs font-bold text-slate-400 mt-2">
                    P{idx + 1}
                  </span>
                  <textarea
                    rows={3}
                    value={paragraph}
                    onChange={e => handleBioChange(idx, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteBioParagraph(idx)}
                    className="text-slate-400 hover:text-rose-600 p-2 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Qualifications & Photos */}
        <div className="lg:col-span-5 space-y-6">
          {/* Doctor Portrait Upload */}
          <ImagePickerField
            label="Doctor Portrait Photo"
            value={form.photoUrl}
            onChange={(val) => handleChange('photoUrl', val)}
            mobileValue={form.mobilePhoto}
            onMobileValueChange={(val) => handleChange('mobilePhoto', val)}
            focalPoint="50% 30%"
            category="Doctor Photos"
            usageContext="Doctor Profile, About Section, Modals"
            recommendedDimensions="800 × 1000px (Portrait)"
            aspectRatio="4:5"
          />

          {/* Repeatable Qualifications */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#071D2D] flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-[#149A96]" />
                <span>Degrees & Training ({(form?.qualifications || []).length})</span>
              </h3>
              <button
                type="button"
                onClick={handleAddQual}
                className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {(form?.qualifications || []).map((qual, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#071D2D]">Qualification #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteQual(idx)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Degree / Fellowship</span>
                    <input
                      type="text"
                      value={qual.degree}
                      onChange={e => handleUpdateQual(idx, 'degree', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Institution / Hospital</span>
                    <input
                      type="text"
                      value={qual.institution}
                      onChange={e => handleUpdateQual(idx, 'institution', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Expertise Chips */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#071D2D]">
                Core Clinical Expertise ({(form?.coreExpertise || []).length})
              </h3>
              <button
                type="button"
                onClick={handleAddExpertise}
                className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {(form?.coreExpertise || []).map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={e => handleUpdateExpertise(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteExpertise(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
