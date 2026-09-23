import React, { useState, useMemo } from 'react';
import {
  Image as ImageIcon,
  User,
  Layout,
  Activity,
  Sparkles,
  Layers,
  BookOpen,
  MapPin,
  Shield,
  Share2,
  FolderOpen,
  Search,
  Check,
  AlertTriangle,
  Eye,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Stethoscope
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ImagePickerField } from './ImagePickerField';
import { MediaAsset } from '../../types/admin';
import { MEDIA_SLOT_REGISTRY, MediaSlotDefinition } from '../../data/mediaSlotRegistry';

export const MediaAndImagesManager: React.FC = () => {
  const {
    doctorProfile,
    heroContent,
    aboutDoctorContent,
    secondOpinionContent,
    finalCtaContent,
    siteSettings,
    howCanWeHelp,
    cancerCategories,
    treatments,
    blogPosts,
    locations,
    mediaAssets,
    deleteMediaAsset,
    seoGlobalConfig,
    logActivity,
    mediaSlots,
    saveSlotDraft,
    publishAllSlots
  } = useData();

  const [isPublishingAll, setIsPublishingAll] = useState(false);
  const [saveAlert, setSaveAlert] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyProblems, setShowOnlyProblems] = useState(false);
  const [deleteWarningModal, setDeleteWarningModal] = useState<{ asset: MediaAsset; usages: string[] } | null>(null);

  const pendingDraftsCount = Object.values(mediaSlots || {}).filter(
    (s: any) => s.status !== 'published' || (s.draftValue && s.draftValue !== s.publishedValue)
  ).length;

  const showSaved = (msg = 'Changes saved successfully') => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handlePublishAllClick = async () => {
    setIsPublishingAll(true);
    const success = await publishAllSlots();
    setIsPublishingAll(false);
    if (success) {
      showSaved('All media slot assignments published to live website!');
    }
  };

  type SubTab =
    | 'website_images'
    | 'doctor_images'
    | 'homepage_images'
    | 'patient_care'
    | 'cancer_images'
    | 'treatment_images'
    | 'body_explorer'
    | 'second_opinion'
    | 'blog_images'
    | 'locations_images'
    | 'branding_images'
    | 'seo_images'
    | 'media_library';

  const [activeSubTab, setActiveSubTab] = useState<SubTab>('website_images');

  // Compute usage count across all slots for repeated imagery detection
  const usageMap = useMemo(() => {
    const map: Record<string, number> = {};
    MEDIA_SLOT_REGISTRY.forEach((slot) => {
      const slotRec = mediaSlots?.[slot.slotKey];
      const val = slotRec?.draftValue || slotRec?.publishedValue || '';
      if (val && val.trim()) {
        map[val.trim()] = (map[val.trim()] || 0) + 1;
      }
    });
    return map;
  }, [mediaSlots]);

  // Compute Media Slot Health Metrics
  const healthMetrics = useMemo(() => {
    let published = 0;
    let draft = 0;
    let missing = 0;
    let broken = 0;
    let repeated = 0;

    MEDIA_SLOT_REGISTRY.forEach((slot) => {
      const slotRec = mediaSlots?.[slot.slotKey];
      const val = slotRec?.draftValue || slotRec?.publishedValue || '';

      if (!val || !val.trim()) {
        missing++;
      } else {
        if (slotRec?.status === 'broken') {
          broken++;
        }
        if (slotRec?.draftValue && slotRec.draftValue !== slotRec.publishedValue) {
          draft++;
        } else if (slotRec?.status === 'published' || val) {
          published++;
        }

        if ((usageMap[val.trim()] || 0) > 1) {
          repeated++;
        }
      }
    });

    return {
      total: MEDIA_SLOT_REGISTRY.length,
      published,
      draft,
      missing,
      broken,
      repeated
    };
  }, [mediaSlots, usageMap]);

  // Filter slots based on active tab, search query, and "problems only" mode
  const filteredSlots = useMemo(() => {
    return MEDIA_SLOT_REGISTRY.filter((slot) => {
      // 1. SubTab Category Filtering
      let matchesTab = true;
      if (activeSubTab === 'doctor_images') {
        matchesTab = slot.category === 'Doctor Photos';
      } else if (activeSubTab === 'homepage_images') {
        matchesTab = slot.page === 'Homepage';
      } else if (activeSubTab === 'patient_care') {
        matchesTab = slot.category === 'Patient Care';
      } else if (activeSubTab === 'cancer_images') {
        matchesTab = slot.category === 'Cancer Care';
      } else if (activeSubTab === 'treatment_images') {
        matchesTab = slot.category === 'Treatments';
      } else if (activeSubTab === 'body_explorer') {
        matchesTab = slot.category === 'Body Explorer';
      } else if (activeSubTab === 'second_opinion') {
        matchesTab = slot.category === 'Second Opinion' || slot.slotKey.includes('second-opinion');
      } else if (activeSubTab === 'blog_images') {
        matchesTab = slot.category === 'Blogs / Resources';
      } else if (activeSubTab === 'locations_images') {
        matchesTab = slot.category === 'Locations';
      } else if (activeSubTab === 'branding_images') {
        matchesTab = slot.category === 'Branding';
      } else if (activeSubTab === 'seo_images') {
        matchesTab = slot.category === 'SEO / Social';
      }

      if (!matchesTab) return false;

      // 2. Search Query Filtering
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          slot.label.toLowerCase().includes(q) ||
          slot.slotKey.toLowerCase().includes(q) ||
          slot.category.toLowerCase().includes(q) ||
          slot.section.toLowerCase().includes(q) ||
          slot.page.toLowerCase().includes(q) ||
          slot.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 3. Show Only Problems Mode
      if (showOnlyProblems) {
        const slotRec = mediaSlots?.[slot.slotKey];
        const val = slotRec?.draftValue || slotRec?.publishedValue || '';
        const isMissing = !val || !val.trim();
        const isBroken = slotRec?.status === 'broken';
        const isUnsaved = Boolean(slotRec?.draftValue && slotRec.draftValue !== slotRec.publishedValue);
        const isRepeated = val && (usageMap[val.trim()] || 0) > 1;

        if (!isMissing && !isBroken && !isUnsaved && !isRepeated) {
          return false;
        }
      }

      return true;
    });
  }, [activeSubTab, searchQuery, showOnlyProblems, mediaSlots, usageMap]);

  // Find where any image URL is referenced across legacy fields
  const findImageUsages = (url: string): string[] => {
    if (!url || !url.trim()) return [];
    const usages: string[] = [];

    if (heroContent.doctorHeroImage === url) usages.push('Homepage Hero Doctor Photo');
    if (aboutDoctorContent.aboutDoctorImage === url) usages.push('About Section Doctor Photo');
    if (secondOpinionContent.secondOpinionImage === url) usages.push('Second Opinion Doctor Desk Photo');
    if (finalCtaContent.finalCtaImage === url) usages.push('Final Consultation CTA Doctor Portrait');
    if (doctorProfile.photoUrl === url) usages.push('Doctor Profile Primary Photo');
    if (siteSettings.logoUrl === url) usages.push('Website Logo');

    howCanWeHelp.forEach((item) => {
      if (item.image === url) usages.push(`How Can We Help: "${item.title}"`);
    });
    cancerCategories.forEach((cat) => {
      if (cat.featuredImage === url) usages.push(`Cancer Category: "${cat.name}"`);
    });
    treatments.forEach((t) => {
      if (t.featuredImage === url) usages.push(`Treatment Card: "${t.title}"`);
    });
    blogPosts.forEach((b: any) => {
      if ((b.featuredImage || b.featuredImageUrl) === url) usages.push(`Patient Guide: "${b.title}"`);
    });
    locations.forEach((loc) => {
      if (loc.locationImage === url) usages.push(`Location: "${loc.hospitalName}"`);
    });

    return usages;
  };

  const handleDeleteAssetRequest = (asset: MediaAsset) => {
    const usages = findImageUsages(asset.url);
    if (usages.length > 0) {
      setDeleteWarningModal({ asset, usages });
    } else {
      if (confirm(`Delete asset "${asset.title}" from media library?`)) {
        deleteMediaAsset(asset.id);
        logActivity('Deleted Media Asset', 'Media', asset.id, `Removed ${asset.title}`);
        showSaved('Image deleted from Media Library');
      }
    }
  };

  const subTabs = [
    { id: 'website_images', label: 'Website Images', icon: ImageIcon, count: MEDIA_SLOT_REGISTRY.length },
    { id: 'doctor_images', label: 'Doctor Images', icon: User, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Doctor Photos').length },
    { id: 'homepage_images', label: 'Homepage Images', icon: Layout, count: MEDIA_SLOT_REGISTRY.filter(s => s.page === 'Homepage').length },
    { id: 'patient_care', label: 'Patient Care', icon: Stethoscope, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Patient Care').length },
    { id: 'cancer_images', label: 'Cancer Care', icon: Activity, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Cancer Care').length },
    { id: 'treatment_images', label: 'Treatments', icon: Sparkles, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Treatments').length },
    { id: 'body_explorer', label: 'Body Explorer', icon: Layers, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Body Explorer').length },
    { id: 'second_opinion', label: 'Second Opinion', icon: HelpCircle, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Second Opinion' || s.slotKey.includes('second-opinion')).length },
    { id: 'blog_images', label: 'Blog / Guides', icon: BookOpen, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Blogs / Resources').length },
    { id: 'locations_images', label: 'Locations', icon: MapPin, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Locations').length },
    { id: 'branding_images', label: 'Branding', icon: Shield, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'Branding').length },
    { id: 'seo_images', label: 'SEO & Social', icon: Share2, count: MEDIA_SLOT_REGISTRY.filter(s => s.category === 'SEO / Social').length },
    { id: 'media_library', label: 'Media Library', icon: FolderOpen, count: (mediaAssets || []).length }
  ];

  const isMediaUrlEnvMissing = !import.meta.env.VITE_PUBLIC_MEDIA_URL;

  return (
    <div className="space-y-6 text-left pb-24 relative">
      {/* ENV WARNING BANNER IF R2 PUBLIC URL MISSING */}
      {isMediaUrlEnvMissing && (
        <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/60 text-amber-200 text-xs flex items-start space-x-3 shadow-lg">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-300 text-sm">
              Configuration Notice: VITE_PUBLIC_MEDIA_URL is not configured
            </h4>
            <p className="text-amber-200/90 leading-relaxed">
              Cloudflare R2 public media domain is not set in environment variables. Uploaded image keys will use local relative paths or direct R2 key fallbacks.
            </p>
          </div>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#073F3D] to-[#0D5B57] p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#18B8B4] text-xs font-bold uppercase tracking-widest mb-2 border border-white/10">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Central Media Slot Registry CMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Media & Images Manager
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Control every doctor portrait, pathway card, treatment visual, anatomy illustration, and branding asset across the entire website with 1-to-1 dedicated slots.
          </p>
        </div>

        {saveAlert && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveAlert}</span>
          </div>
        )}
      </div>

      {/* MEDIA SLOT HEALTH SUMMARY BAR */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#18B8B4]" />
              <span>Media Slot Health Overview</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live audit of all 31 website image slots, draft state, and duplicate image assignments
            </p>
          </div>

          <div className="flex items-center space-x-2.5 w-full lg:w-auto justify-end">
            <button
              type="button"
              onClick={() => window.open('/?preview=draft', '_blank')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Draft Site</span>
            </button>

            <button
              type="button"
              onClick={handlePublishAllClick}
              disabled={isPublishingAll || pendingDraftsCount === 0}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold border flex items-center space-x-1.5 transition-all cursor-pointer ${
                pendingDraftsCount > 0
                  ? 'bg-[#18B8B4] hover:bg-[#15A09D] text-slate-950 border-[#18B8B4] shadow-md shadow-[#18B8B4]/20'
                  : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-60'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isPublishingAll ? 'Publishing All...' : 'Publish All Changes to Website'}</span>
            </button>
          </div>
        </div>

        {/* Health Metrics Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-slate-400 text-[11px] font-medium block">Total Slots</span>
            <span className="text-xl font-black text-white">{healthMetrics.total}</span>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-2xl p-3 text-center">
            <span className="text-emerald-400 text-[11px] font-medium flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Published</span>
            </span>
            <span className="text-xl font-black text-emerald-300">{healthMetrics.published}</span>
          </div>

          <div className="bg-sky-950/40 border border-sky-900/60 rounded-2xl p-3 text-center">
            <span className="text-sky-400 text-[11px] font-medium flex items-center justify-center space-x-1">
              <Eye className="w-3 h-3 text-sky-400" />
              <span>Pending Draft</span>
            </span>
            <span className="text-xl font-black text-sky-300">{healthMetrics.draft}</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-700/60 rounded-2xl p-3 text-center">
            <span className="text-slate-400 text-[11px] font-medium flex items-center justify-center space-x-1">
              <AlertCircle className="w-3 h-3 text-slate-400" />
              <span>Missing</span>
            </span>
            <span className="text-xl font-black text-slate-300">{healthMetrics.missing}</span>
          </div>

          <div className="bg-rose-950/40 border border-rose-900/60 rounded-2xl p-3 text-center">
            <span className="text-rose-400 text-[11px] font-medium flex items-center justify-center space-x-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              <span>Broken</span>
            </span>
            <span className="text-xl font-black text-rose-300">{healthMetrics.broken}</span>
          </div>

          <div className="bg-amber-950/40 border border-amber-900/60 rounded-2xl p-3 text-center">
            <span className="text-amber-400 text-[11px] font-medium flex items-center justify-center space-x-1">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Repeated (Review)</span>
            </span>
            <span className="text-xl font-black text-amber-300">{healthMetrics.repeated}</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as SubTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap flex items-center space-x-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#18B8B4] text-slate-950 font-bold shadow-md shadow-[#18B8B4]/20'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-[#18B8B4]'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-slate-950 text-[#18B8B4]' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search and Filters Bar */}
      {activeSubTab !== 'media_library' && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search image slots by title, slotKey, page..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#18B8B4]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowOnlyProblems((prev) => !prev)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all cursor-pointer ${
                showOnlyProblems
                  ? 'bg-amber-600 text-slate-950 border-amber-400 font-extrabold shadow-sm'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Show Only Problems ({healthMetrics.missing + healthMetrics.broken + healthMetrics.draft + healthMetrics.repeated})</span>
            </button>
          </div>
        </div>
      )}

      {/* RENDER MEDIA SLOT CARDS */}
      {activeSubTab !== 'media_library' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredSlots.length}</strong> slot(s)
              {searchQuery && ` matching "${searchQuery}"`}
              {showOnlyProblems && ' (filtered to problems only)'}
            </span>
          </div>

          {filteredSlots.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-3">
              <ImageIcon className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-300">No media slots match your filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing search or toggling off "Show Only Problems" to view all available image slots.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowOnlyProblems(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-teal-400 border border-slate-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
              {filteredSlots.map((slot) => {
                const slotRecord = mediaSlots?.[slot.slotKey];
                const currentSlotValue = slotRecord?.draftValue || slotRecord?.publishedValue || '';

                return (
                  <ImagePickerField
                    key={slot.slotKey}
                    slotKey={slot.slotKey}
                    label={slot.label}
                    usageContext={`${slot.page} → ${slot.section}`}
                    category={slot.category as any}
                    recommendedDimensions={slot.recommendedDimensions}
                    aspectRatio={
                      slot.ratio === 'Square'
                        ? '1:1'
                        : slot.ratio === 'Portrait'
                        ? '4:5'
                        : slot.ratio === 'Wide Banner'
                        ? 'hero'
                        : '16:9'
                    }
                    value={currentSlotValue}
                    onChange={(newUrl) => {
                      saveSlotDraft(slot.slotKey, newUrl);
                    }}
                    required={slot.required}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MEDIA LIBRARY GALLERY TAB */}
      {activeSubTab === 'media_library' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <FolderOpen className="w-5 h-5 text-[#18B8B4]" />
                <span>Cloudflare R2 Asset Library ({(mediaAssets || []).length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                All raw uploaded assets stored in Cloudflare R2 bucket
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(mediaAssets || []).map((asset) => (
              <div
                key={asset.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-2.5 space-y-2 group hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="aspect-square rounded-xl bg-slate-900 overflow-hidden relative border border-slate-800/80">
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] font-bold text-slate-300 border border-slate-800">
                    {asset.category}
                  </span>
                </div>

                <div className="space-y-1 text-left">
                  <h4 className="text-xs font-bold text-white truncate" title={asset.title}>
                    {asset.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono truncate">{asset.dimensions || 'Image'}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteAssetRequest(asset)}
                  className="w-full py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 text-[11px] font-bold border border-rose-900/60 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Delete Asset</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Warning Modal */}
      {deleteWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-left">
            <div className="flex items-center space-x-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Cannot Delete Asset</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The image <strong>"{deleteWarningModal.asset.title}"</strong> is currently used in the following website locations:
            </p>
            <ul className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-amber-300 space-y-1 list-disc pl-5 max-h-40 overflow-y-auto">
              {deleteWarningModal.usages.map((u, idx) => (
                <li key={idx}>{u}</li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-400">
              Please replace or remove this image from these slots before deleting it from the media library.
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setDeleteWarningModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
