import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Plus,
  Trash2,
  Sliders,
  Sparkles,
  Image as ImageIcon,
  Shield,
  Award,
  Stethoscope,
  GraduationCap,
  UserCheck,
  FileCheck,
  Calendar
} from 'lucide-react';
import { CredentialItem } from '../../types/admin';
import { ImagePickerField } from './ImagePickerField';

export const HomepageEditor: React.FC = () => {
  const {
    heroContent,
    updateHeroContent,
    aboutDoctorContent,
    updateAboutDoctorContent,
    secondOpinionContent,
    updateSecondOpinionContent,
    finalCtaContent,
    updateFinalCtaContent,
    heroAnimationSettings,
    updateHeroAnimationSettings,
    homepageSections,
    updateHomepageSections
  } = useData();

  const [saveToast, setSaveToast] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<
    'hero' | 'about' | 'second-opinion' | 'final-cta' | 'sections' | 'animations'
  >('hero');

  // Form local state
  const [heroForm, setHeroForm] = useState(heroContent);
  const [aboutForm, setAboutForm] = useState(aboutDoctorContent);
  const [secondOpinionForm, setSecondOpinionForm] = useState(secondOpinionContent);
  const [finalCtaForm, setFinalCtaForm] = useState(finalCtaContent);
  const [animForm, setAnimForm] = useState(heroAnimationSettings);

  const handleHeroChange = (field: keyof typeof heroContent, val: any) => {
    setHeroForm(prev => ({ ...prev, [field]: val }));
  };

  const handleAboutChange = (field: keyof typeof aboutDoctorContent, val: any) => {
    setAboutForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSecondOpinionChange = (field: keyof typeof secondOpinionContent, val: any) => {
    setSecondOpinionForm(prev => ({ ...prev, [field]: val }));
  };

  const handleFinalCtaChange = (field: keyof typeof finalCtaContent, val: any) => {
    setFinalCtaForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroContent(heroForm);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutDoctorContent(aboutForm);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSaveSecondOpinion = (e: React.FormEvent) => {
    e.preventDefault();
    updateSecondOpinionContent(secondOpinionForm);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSaveFinalCta = (e: React.FormEvent) => {
    e.preventDefault();
    updateFinalCtaContent(finalCtaForm);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSaveAnimations = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroAnimationSettings(animForm);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Section visibility and reordering
  const handleToggleSectionVisibility = (id: string) => {
    const updated = homepageSections.map(sec =>
      sec.id === id ? { ...sec, visible: !sec.visible } : sec
    );
    updateHomepageSections(updated);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= homepageSections.length) return;

    const reordered = [...homepageSections];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    // Update order numbers
    const finalOrder = reordered.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    updateHomepageSections(finalOrder);
  };

  // Credential items
  const handleAddCredential = () => {
    const newCred: CredentialItem = {
      id: 'cred-' + Date.now(),
      isCount: false,
      highlight: 'AIIMS',
      label: 'Specialized Oncology Training',
      iconName: 'Award',
      enabled: true,
      order: heroForm.credentials.length + 1
    };
    const updated = {
      ...heroForm,
      credentials: [...heroForm.credentials, newCred]
    };
    setHeroForm(updated);
    updateHeroContent(updated);
  };

  const handleUpdateCredential = (id: string, partial: Partial<CredentialItem>) => {
    const updated = {
      ...heroForm,
      credentials: heroForm.credentials.map(c => (c.id === id ? { ...c, ...partial } : c))
    };
    setHeroForm(updated);
  };

  const handleDeleteCredential = (id: string) => {
    const updated = {
      ...heroForm,
      credentials: heroForm.credentials.filter(c => c.id !== id)
    };
    setHeroForm(updated);
    updateHeroContent(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Homepage & Section Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Control the 3 independent doctor & banner images (Hero, About, Second Opinion), section sequence, and animations.
          </p>
        </div>

        {saveToast && (
          <div className="p-2.5 px-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Updated successfully! Live public website refreshed.</span>
          </div>
        )}
      </div>

      {/* Sub-tab navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
            activeSubTab === 'hero'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#18B8B4]" />
          <span>1. Hero Doctor Image & Banner</span>
        </button>

        <button
          onClick={() => setActiveSubTab('about')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
            activeSubTab === 'about'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 text-[#18B8B4]" />
          <span>2. About / Meet Doctor Image</span>
        </button>

        <button
          onClick={() => setActiveSubTab('second-opinion')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
            activeSubTab === 'second-opinion'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-[#18B8B4]" />
          <span>3. Second Opinion Banner Image</span>
        </button>

        <button
          onClick={() => setActiveSubTab('final-cta')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
            activeSubTab === 'final-cta'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#18B8B4]" />
          <span>Final Consultation CTA</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sections')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'sections'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Layout & Ordering ({homepageSections.length})
        </button>

        <button
          onClick={() => setActiveSubTab('animations')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'animations'
              ? 'bg-[#073F3D] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Hero Animations
        </button>
      </div>

      {/* 1. HERO CONTENT TAB */}
      {activeSubTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4 text-xs text-teal-900 flex items-start space-x-3">
            <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Hero Section Isolation Note:</span>
              The hero doctor image configured here only controls the topmost Hero container. It is completely isolated from the About Doctor and Second Opinion sections.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Typography & Headings */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100">
                Hero Typography & Messaging
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Small Eyebrow Label
                </label>
                <input
                  type="text"
                  value={heroForm.smallLabel}
                  onChange={e => handleHeroChange('smallLabel', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Heading (First Line)
                </label>
                <input
                  type="text"
                  value={heroForm.mainHeading}
                  onChange={e => handleHeroChange('mainHeading', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Highlighted Heading (Teal Colored Line)
                </label>
                <input
                  type="text"
                  value={heroForm.highlightedHeading}
                  onChange={e => handleHeroChange('highlightedHeading', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sub-Heading (Third Line)
                </label>
                <input
                  type="text"
                  value={heroForm.subHeading}
                  onChange={e => handleHeroChange('subHeading', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinical Description Text
                </label>
                <textarea
                  rows={4}
                  value={heroForm.description}
                  onChange={e => handleHeroChange('description', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={heroForm.primaryCtaLabel}
                    onChange={e => handleHeroChange('primaryCtaLabel', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary CTA Link
                  </label>
                  <input
                    type="text"
                    value={heroForm.primaryCtaUrl}
                    onChange={e => handleHeroChange('primaryCtaUrl', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary CTA Label
                  </label>
                  <input
                    type="text"
                    value={heroForm.secondaryCtaLabel}
                    onChange={e => handleHeroChange('secondaryCtaLabel', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary CTA Link
                  </label>
                  <input
                    type="text"
                    value={heroForm.secondaryCtaUrl}
                    onChange={e => handleHeroChange('secondaryCtaUrl', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Images & Overlay Strength */}
            <div className="lg:col-span-5 space-y-6">
              {/* Doctor Hero Image Upload Control */}
              <ImagePickerField
                label="Hero Doctor Standing Portrait (Hero Only)"
                value={heroForm.doctorHeroImage}
                onChange={(val) => handleHeroChange('doctorHeroImage', val)}
                mobileValue={heroForm.mobileDoctorHeroImage}
                onMobileValueChange={(val) => handleHeroChange('mobileDoctorHeroImage', val)}
                focalPoint={heroForm.doctorHeroFocalPoint || '70% 25%'}
                onFocalPointChange={(val) => handleHeroChange('doctorHeroFocalPoint', val)}
                altText={heroForm.doctorHeroAltText || 'Dr. Bhushan Parmar - Standing Professional Oncologist Hero'}
                onAltTextChange={(val) => handleHeroChange('doctorHeroAltText', val)}
                category="Doctor Photos"
                usageContext="Homepage Hero (Primary Screen ONLY)"
                recommendedDimensions="1200 × 1400px (Desktop)"
                aspectRatio="hero"
                required
              />

              {/* Hero Background Image Upload */}
              <ImagePickerField
                label="Hero Ambient Background Texture"
                value={heroForm.heroBackgroundImage}
                onChange={(val) => handleHeroChange('heroBackgroundImage', val)}
                category="Backgrounds"
                usageContext="Homepage Hero Canvas Atmosphere"
                recommendedDimensions="1920 × 1080px"
                aspectRatio="16:9"
              />

              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#149A96]" />
                  <span>Atmospheric Contrast Control</span>
                </h3>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Gradient Overlay Strength</span>
                    <span>{heroForm.heroOverlayStrength}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={heroForm.heroOverlayStrength}
                    onChange={e => handleHeroChange('heroOverlayStrength', Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#149A96]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Adjusts darkness behind text for WCAG AAA contrast against photo.
                  </p>
                </div>
              </div>

              {/* Repeatable Credentials */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-[#071D2D]">
                    Hero Credentials Strip ({heroForm.credentials.length})
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddCredential}
                    className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Credential</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {(heroForm.credentials || []).map(cred => (
                    <div
                      key={cred.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cred?.enabled ?? true}
                            onChange={e => handleUpdateCredential(cred.id, { enabled: e.target.checked })}
                            className="rounded text-[#149A96] focus:ring-[#149A96]"
                          />
                          <span>Active</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleDeleteCredential(cred.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-500">Badge Text/Highlight</span>
                          <input
                            type="text"
                            value={cred.highlight || ''}
                            placeholder="DrNB / PGIMER"
                            onChange={e => handleUpdateCredential(cred.id, { highlight: e.target.value })}
                            className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500">Credential Label</span>
                          <input
                            type="text"
                            value={cred.label}
                            onChange={e => handleUpdateCredential(cred.id, { label: e.target.value })}
                            className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#18B8B4]" />
              <span>Update Hero Banner Content</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. ABOUT DOCTOR TAB */}
      {activeSubTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="space-y-6">
          <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4 text-xs text-teal-900 flex items-start space-x-3">
            <UserCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">About Section Isolation Note:</span>
              The image below controls the <strong>Meet Your Oncologist / About Section</strong> ONLY. It has its own focal point, alt text, and optional mobile asset, and will never automatically inherit or overwrite the Hero photo.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: About Doctor Content */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100">
                About Section Messaging & Copy
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={aboutForm.smallLabel}
                  onChange={e => handleAboutChange('smallLabel', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={aboutForm.mainHeading}
                  onChange={e => handleAboutChange('mainHeading', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sub-Heading
                </label>
                <input
                  type="text"
                  value={aboutForm.subHeading}
                  onChange={e => handleAboutChange('subHeading', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Doctor Quote / Clinical Philosophy
                </label>
                <textarea
                  rows={3}
                  value={aboutForm.quote}
                  onChange={e => handleAboutChange('quote', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Modal CTA Button Label
                </label>
                <input
                  type="text"
                  value={aboutForm.ctaLabel}
                  onChange={e => handleAboutChange('ctaLabel', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>
            </div>

            {/* Right: Independent Image Picker */}
            <div className="lg:col-span-5 space-y-6">
              <ImagePickerField
                label="About Section Doctor Image (Clinical Portrait)"
                value={aboutForm.aboutDoctorImage}
                onChange={(val) => handleAboutChange('aboutDoctorImage', val)}
                mobileValue={aboutForm.aboutDoctorMobileImage}
                onMobileValueChange={(val) => handleAboutChange('aboutDoctorMobileImage', val)}
                focalPoint={aboutForm.aboutDoctorFocalPoint || '50% 20%'}
                onFocalPointChange={(val) => handleAboutChange('aboutDoctorFocalPoint', val)}
                altText={aboutForm.aboutDoctorAltText || 'Dr. Bhushan Parmar in consultation coat - About Section'}
                onAltTextChange={(val) => handleAboutChange('aboutDoctorAltText', val)}
                category="Doctor Photos"
                usageContext="About Section / Meet Your Oncologist ONLY"
                recommendedDimensions="1200 × 1500px (4:5 Ratio)"
                aspectRatio="4:5"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#18B8B4]" />
              <span>Update About Doctor Section</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. SECOND OPINION TAB */}
      {activeSubTab === 'second-opinion' && (
        <form onSubmit={handleSaveSecondOpinion} className="space-y-6">
          <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4 text-xs text-teal-900 flex items-start space-x-3">
            <FileCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Second Opinion Section Isolation Note:</span>
              The image below controls the <strong>Second Opinion Banner Container</strong> ONLY. Recommended to use a clinical report review / scan consultation image.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Messaging */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100">
                Second Opinion Banner Messaging
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Small Eyebrow Label
                </label>
                <input
                  type="text"
                  value={secondOpinionForm.smallLabel}
                  onChange={e => handleSecondOpinionChange('smallLabel', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={secondOpinionForm.mainHeading}
                  onChange={e => handleSecondOpinionChange('mainHeading', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Section Description
                </label>
                <textarea
                  rows={4}
                  value={secondOpinionForm.description}
                  onChange={e => handleSecondOpinionChange('description', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={secondOpinionForm.primaryCtaLabel}
                    onChange={e => handleSecondOpinionChange('primaryCtaLabel', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={secondOpinionForm.secondaryCtaLabel}
                    onChange={e => handleSecondOpinionChange('secondaryCtaLabel', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Independent Image Picker & Overlay */}
            <div className="lg:col-span-5 space-y-6">
              <ImagePickerField
                label="Second Opinion Consultation / Report Image"
                value={secondOpinionForm.secondOpinionImage}
                onChange={(val) => handleSecondOpinionChange('secondOpinionImage', val)}
                mobileValue={secondOpinionForm.secondOpinionMobileImage}
                onMobileValueChange={(val) => handleSecondOpinionChange('secondOpinionMobileImage', val)}
                focalPoint={secondOpinionForm.secondOpinionFocalPoint || '60% 45%'}
                onFocalPointChange={(val) => handleSecondOpinionChange('secondOpinionFocalPoint', val)}
                altText={secondOpinionForm.secondOpinionAltText || 'Physician examining diagnostic scans and medical reports'}
                onAltTextChange={(val) => handleSecondOpinionChange('secondOpinionAltText', val)}
                category="Doctor Photos"
                usageContext="Second Opinion Banner Section ONLY"
                recommendedDimensions="1600 × 900px (16:9 Banner)"
                aspectRatio="16:9"
                required
              />

              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#149A96]" />
                  <span>Teal Overlay Darkness</span>
                </h3>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Overlay Opacity</span>
                    <span>{secondOpinionForm.secondOpinionOverlayStrength}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={secondOpinionForm.secondOpinionOverlayStrength}
                    onChange={e => handleSecondOpinionChange('secondOpinionOverlayStrength', Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#149A96]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Ensures text legibility against background clinical photography.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#18B8B4]" />
              <span>Update Second Opinion Section</span>
            </button>
          </div>
        </form>
      )}

      {/* FINAL CONSULTATION CTA TAB */}
      {activeSubTab === 'final-cta' && (
        <form onSubmit={handleSaveFinalCta} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#071D2D]">
                Final Consultation CTA Section
              </h3>
              <p className="text-xs text-slate-500">
                Admin → Homepage → Final Consultation CTA. Dedicated independent image and content for the "Need guidance about your cancer treatment?" section.
              </p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#18B8B4]" />
              <span>Save Final CTA</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Small Eyebrow Label
                </label>
                <input
                  type="text"
                  value={finalCtaForm.smallLabel}
                  onChange={e => handleFinalCtaChange('smallLabel', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#18B8B4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={finalCtaForm.mainHeading}
                  onChange={e => handleFinalCtaChange('mainHeading', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#18B8B4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Section Description
                </label>
                <textarea
                  rows={4}
                  value={finalCtaForm.description}
                  onChange={e => handleFinalCtaChange('description', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#18B8B4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={finalCtaForm.primaryCtaLabel}
                    onChange={e => handleFinalCtaChange('primaryCtaLabel', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#18B8B4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={finalCtaForm.secondaryCtaLabel}
                    onChange={e => handleFinalCtaChange('secondaryCtaLabel', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#18B8B4]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <ImagePickerField
                label="Final Consultation CTA Doctor Portrait"
                value={finalCtaForm.finalCtaImage}
                onChange={(val) => handleFinalCtaChange('finalCtaImage', val)}
                mobileValue={finalCtaForm.finalCtaMobileImage}
                onMobileValueChange={(val) => handleFinalCtaChange('finalCtaMobileImage', val)}
                focalPoint={`${finalCtaForm.finalCtaImagePositionX ?? 50}% ${finalCtaForm.finalCtaImagePositionY ?? 30}%`}
                onFocalPointChange={(val) => {
                  const parts = val.split(' ');
                  if (parts.length === 2) {
                    const x = parseFloat(parts[0]) || 50;
                    const y = parseFloat(parts[1]) || 30;
                    setFinalCtaForm(prev => ({ ...prev, finalCtaImagePositionX: x, finalCtaImagePositionY: y }));
                  }
                }}
                altText={finalCtaForm.finalCtaAltText}
                onAltTextChange={(val) => handleFinalCtaChange('finalCtaAltText', val)}
                category="Doctor Photos"
                usageContext="Homepage Final Consultation CTA Section ONLY"
                recommendedDimensions="1200 × 800px or larger"
                aspectRatio="auto"
                required
              />

              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#18B8B4]" />
                  <span>Focal Point Coordinates (X% / Y%)</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Horizontal ({finalCtaForm.finalCtaImagePositionX}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={finalCtaForm.finalCtaImagePositionX ?? 50}
                      onChange={e => handleFinalCtaChange('finalCtaImagePositionX', Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#18B8B4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Vertical ({finalCtaForm.finalCtaImagePositionY}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={finalCtaForm.finalCtaImagePositionY ?? 30}
                      onChange={e => handleFinalCtaChange('finalCtaImagePositionY', Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#18B8B4]"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Controls desktop <code className="bg-slate-100 px-1 py-0.5 rounded">object-position: X% Y%;</code>.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#18B8B4]" />
                  <span>Mobile Focal Point (X% / Y%)</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Horizontal ({finalCtaForm.finalCtaMobileImagePositionX ?? 50}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={finalCtaForm.finalCtaMobileImagePositionX ?? 50}
                      onChange={e => handleFinalCtaChange('finalCtaMobileImagePositionX', Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#18B8B4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Vertical ({finalCtaForm.finalCtaMobileImagePositionY ?? 30}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={finalCtaForm.finalCtaMobileImagePositionY ?? 30}
                      onChange={e => handleFinalCtaChange('finalCtaMobileImagePositionY', Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#18B8B4]"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Controls mobile <code className="bg-slate-100 px-1 py-0.5 rounded">object-position: X% Y%;</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#18B8B4]" />
              <span>Save Final CTA Section</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. SECTION LAYOUT & ORDERING TAB */}
      {activeSubTab === 'sections' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#071D2D]">
                Homepage Section Sequence & Visibility
              </h3>
              <p className="text-xs text-slate-500">
                Reorder sections up/down or toggle visibility. The public homepage reflects changes instantly.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {homepageSections.map((sec, idx) => (
              <div
                key={sec.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                  sec.visible
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-100/60 border-dashed border-slate-300 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#071D2D]">
                      {sec.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      ID: {sec.id} • Theme: {sec.theme || 'light'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleMoveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 transition-colors"
                    title="Move up"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveSection(idx, 'down')}
                    disabled={idx === homepageSections.length - 1}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 transition-colors"
                    title="Move down"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleSectionVisibility(sec.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                      sec.visible
                        ? 'bg-teal-50 text-[#149A96] hover:bg-teal-100'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {sec.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{sec.visible ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. HERO ANIMATIONS TAB */}
      {activeSubTab === 'animations' && (
        <form onSubmit={handleSaveAnimations} className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#071D2D]">
                Hero Motion & Entrance Animations
              </h3>
              <p className="text-xs text-slate-500">
                Configure line-by-line reveal effects, doctor clip-path reveals, and pace.
              </p>
            </div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={animForm.enableHeroAnimations}
                onChange={e => setAnimForm(p => ({ ...p, enableHeroAnimations: e.target.checked }))}
                className="w-4 h-4 rounded text-[#149A96] focus:ring-[#149A96]"
              />
              <span>Enable Hero Animations</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Heading Entrance Animation
              </label>
              <select
                value={animForm.headingAnimation}
                onChange={e => setAnimForm(p => ({ ...p, headingAnimation: e.target.value as any }))}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              >
                <option value="mask">Editorial Mask Reveal (Line-by-Line)</option>
                <option value="fade-up">Fade Up</option>
                <option value="slide">Slide In Left</option>
                <option value="none">None (Instant Display)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctor Portrait Entrance Animation
              </label>
              <select
                value={animForm.doctorImageAnimation}
                onChange={e => setAnimForm(p => ({ ...p, doctorImageAnimation: e.target.value as any }))}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              >
                <option value="clip">Clip-Path Wipe Reveal (inset 0 0 0 100%)</option>
                <option value="fade">Smooth Fade In</option>
                <option value="slide-right">Slide Right</option>
                <option value="none">None (Instant Display)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Trust Badges / Credential Animation
              </label>
              <select
                value={animForm.credentialAnimation}
                onChange={e => setAnimForm(p => ({ ...p, credentialAnimation: e.target.value as any }))}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              >
                <option value="stagger">Staggered Node Pop</option>
                <option value="fade">Subtle Fade In</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Global Animation Speed
              </label>
              <select
                value={animForm.globalSpeed}
                onChange={e => setAnimForm(p => ({ ...p, globalSpeed: e.target.value as any }))}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              >
                <option value="normal">Normal (0.85s)</option>
                <option value="fast">Fast (0.45s)</option>
                <option value="slow">Slow & Cinematic (1.2s)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#18B8B4]" />
              <span>Save Animation Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
