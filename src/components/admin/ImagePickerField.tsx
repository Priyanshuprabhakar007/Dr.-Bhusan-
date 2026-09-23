import React, { useState, useRef, DragEvent, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Trash2,
  FolderOpen,
  Eye,
  Sliders,
  Smartphone,
  Info,
  Maximize2,
  Crosshair,
  Sparkles,
  AlertTriangle,
  Shield,
  Globe
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { MediaAsset } from '../../types/admin';
import {
  uploadMediaToCloudflareR2,
  getMediaUrl,
  resolveMediaUrl,
  focalPointToCss,
  findImageUsagesAcrossSite
} from '../../lib/cloudflareMedia';

export interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (urlOrKey: string) => void;
  altText?: string;
  onAltTextChange?: (alt: string) => void;
  mobileValue?: string;
  onMobileValueChange?: (urlOrKey: string) => void;
  focalPoint?: string;
  onFocalPointChange?: (focal: string) => void;
  recommendedDimensions?: string;
  aspectRatio?: '1:1' | '4:5' | '16:9' | 'hero' | 'auto';
  category?: MediaAsset['category'];
  usageContext?: string;
  required?: boolean;
  slotKey?: string;
  slotName?: string;
  sectionName?: string;
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  value,
  onChange,
  altText = '',
  onAltTextChange,
  mobileValue,
  onMobileValueChange,
  focalPoint = '50% 50%',
  onFocalPointChange,
  recommendedDimensions = '1200 × 800px or larger',
  aspectRatio = 'auto',
  category = 'Doctor Photos',
  usageContext,
  required = false,
  slotKey,
  slotName,
  sectionName
}) => {
  const {
    mediaAssets,
    addMediaAsset,
    logActivity,
    doctorProfile,
    heroContent,
    siteSettings,
    treatments,
    cancerCategories,
    cancers,
    bloodCancers,
    blogPosts,
    locations,
    howCanWeHelp,
    mediaSlots,
    saveSlotDraft,
    publishSlot
  } = useData();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const imagePreviewRef = useRef<HTMLDivElement>(null);

  // Auto-generate slot key if not explicitly passed
  const activeSlotKey = slotKey || `slot-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  // Slot CMS Record from D1
  const slotRecord = mediaSlots?.[activeSlotKey];

  // Local draft image value state
  const [currentValue, setCurrentValue] = useState<string>(slotRecord?.draftValue || value);
  const [currentAltText, setCurrentAltText] = useState<string>(altText);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  // Reset broken state when currentValue or value changes
  useEffect(() => {
    setIsBroken(false);
  }, [currentValue, value]);

  // Sync if external value changes initially
  useEffect(() => {
    if (slotRecord?.draftValue) {
      setCurrentValue(slotRecord.draftValue);
    } else if (value) {
      setCurrentValue(value);
    }
  }, [value, slotRecord?.draftValue]);

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [libraryTarget, setLibraryTarget] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showMobileField, setShowMobileField] = useState(Boolean(mobileValue));
  const [showFocalPointEditor, setShowFocalPointEditor] = useState(false);
  const [isDecorative, setIsDecorative] = useState(altText === '');
  const [previewZoomOpen, setPreviewZoomOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Status Computations
  const publishedValue = slotRecord?.publishedValue || value;
  const draftValueInD1 = slotRecord?.draftValue || value;

  // Calculate if this image is used across other media slots
  const otherUsagesCount = React.useMemo(() => {
    if (!currentValue || !currentValue.trim()) return 0;
    let count = 0;
    Object.entries(mediaSlots || {}).forEach(([k, slot]: [string, any]) => {
      if (k !== activeSlotKey) {
        const val = slot?.draftValue || slot?.publishedValue || '';
        if (val && val.trim() === currentValue.trim()) {
          count++;
        }
      }
    });
    return count;
  }, [currentValue, mediaSlots, activeSlotKey]);

  const hasUnsavedLocalChanges = currentValue !== draftValueInD1 || (currentAltText !== altText && altText !== '');
  const isDraftSavedUnpublished = !hasUnsavedLocalChanges && draftValueInD1 !== publishedValue;
  const isFullyPublished = !hasUnsavedLocalChanges && currentValue === publishedValue && draftValueInD1 === publishedValue;

  const isLogoSlot = activeSlotKey.includes('logo') || label.toLowerCase().includes('logo');
  const isFaviconSlot = activeSlotKey.includes('favicon') || label.toLowerCase().includes('favicon');

  const updateLocalImage = (newUrl: string) => {
    setCurrentValue(newUrl);
    // Notify parent immediately so local form context holds it
    onChange(newUrl);
  };

  const handleAltTextChangeLocal = (newAlt: string) => {
    setCurrentAltText(newAlt);
    if (onAltTextChange) onAltTextChange(newAlt);
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    const success = await saveSlotDraft(activeSlotKey, currentValue, {
      altText: currentAltText,
      focalPoint,
      mobileValue,
      slotName: slotName || label,
      section: sectionName || usageContext || category
    });
    setIsSavingDraft(false);
    if (success) {
      showNotification('Draft image assignment saved in D1');
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    // First ensure latest draft is in D1
    await saveSlotDraft(activeSlotKey, currentValue, {
      altText: currentAltText,
      focalPoint,
      mobileValue,
      slotName: slotName || label,
      section: sectionName || usageContext || category
    });
    const success = await publishSlot(activeSlotKey);
    setIsPublishing(false);
    if (success) {
      onChange(currentValue);
      showNotification('Published to live website!');
    }
  };

  const handlePreviewDraft = () => {
    window.open('/?preview=draft', '_blank');
  };

  // Parse focal point percentage
  const parseFocalPoint = (focal: string) => {
    const parts = focal.split(' ');
    if (parts.length === 2) {
      const x = parseFloat(parts[0]) || 50;
      const y = parseFloat(parts[1]) || 50;
      return { x, y };
    }
    return { x: 50, y: 50 };
  };

  const currentFocal = parseFocalPoint(focalPoint);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 3500);
  };

  // Direct Upload handler using Cloudflare R2 & D1 Pipeline
  const processUpload = async (file: File, isMobile = false) => {
    if (!file) return;

    // Validate size (< 25MB)
    if (file.size > 25 * 1024 * 1024) {
      alert('The chosen image exceeds 25MB. Please select an image under 25MB.');
      return;
    }

    // Validate mime type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'image/gif'];
    if (!validMimes.includes(file.type)) {
      alert('Unsupported file format. Please upload a JPG, PNG, WebP, AVIF, or SVG file from your computer.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      const result = await uploadMediaToCloudflareR2(file, {
        category,
        altText: altText || `${label} - Dr. Bhushan Parmar Oncology`,
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        isDecorative,
        focalPoint,
        onProgress: (p) => setUploadProgress(p)
      });

      if (result.success && result.media) {
        const origName = result.media?.original_name || file.name || 'image';
        const storedAsset: MediaAsset = {
          id: result.media.id,
          title: origName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          url: result.media.public_url || getMediaUrl(result.media.storage_key),
          category: (result.media.category as any) || category,
          dimensions: result.media.width && result.media.height ? `${result.media.width} x ${result.media.height}` : undefined,
          size: result.media.file_size,
          mimeType: result.media.mime_type,
          altText: result.media.alt_text || altText || `${label} - Dr. Bhushan Parmar`,
          uploadedAt: (result.media?.created_at || '').split('T')[0] || new Date().toISOString().split('T')[0]
        };

        addMediaAsset(storedAsset);
        logActivity('Uploaded Image to Cloudflare R2', 'Media', result.media.id, `Uploaded ${file.name} for ${label}`);

        const publicUrl = result.media.public_url || getMediaUrl(result.media.storage_key);

        if (isMobile && onMobileValueChange) {
          onMobileValueChange(publicUrl);
        } else {
          onChange(publicUrl);
        }

        setIsUploading(false);
        setUploadProgress(100);
        showNotification('Image uploaded from PC to Cloudflare R2 successfully!');
      } else {
        throw new Error(result.error || 'Failed to upload');
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setIsUploading(false);
      alert('Failed to upload image. Please check your network connection and try again.');
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>, isMobile = false) => {
    const file = e.target.files?.[0];
    if (file) {
      processUpload(file, isMobile);
    }
    e.target.value = '';
  };

  // Drag and Drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processUpload(file, false);
    }
  };

  // Click on image to dynamically position focal point
  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showFocalPointEditor || !onFocalPointChange || !imagePreviewRef.current) return;
    const rect = imagePreviewRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    onFocalPointChange(`${clampedX}% ${clampedY}%`);
    showNotification(`Focal point set to ${clampedX}% horizontal, ${clampedY}% vertical`);
  };

  const handleSelectFromLibrary = (asset: MediaAsset) => {
    if (libraryTarget === 'mobile' && onMobileValueChange) {
      onMobileValueChange(asset.url);
    } else {
      onChange(asset.url);
      if (onAltTextChange && asset.altText && !altText) {
        onAltTextChange(asset.altText);
      }
    }
    setIsLibraryOpen(false);
    showNotification('Image selected from Cloudflare Media Library');
  };

  const handleRemove = (isMobile = false) => {
    if (isMobile && onMobileValueChange) {
      onMobileValueChange('');
      showNotification('Mobile image override removed');
    } else {
      if (required) {
        alert('This image is required by the website layout. Please upload or choose a replacement image.');
        return;
      }
      onChange('');
      showNotification('Image removed');
    }
  };

  const focalPresets = [
    { label: 'Top Left', val: '0% 0%' },
    { label: 'Top Center', val: '50% 0%' },
    { label: 'Top Right', val: '100% 0%' },
    { label: 'Center Left', val: '0% 50%' },
    { label: 'Center', val: '50% 50%' },
    { label: 'Center Right', val: '100% 50%' },
    { label: 'Bottom Left', val: '0% 100%' },
    { label: 'Bottom Center', val: '50% 100%' },
    { label: 'Bottom Right', val: '100% 100%' }
  ];

  // Filter Media Library items
  const filteredLibrary = mediaAssets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.altText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const aspectClassMap = {
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    '16:9': 'aspect-video',
    'hero': 'aspect-[16/7]',
    'auto': 'aspect-[16/10] max-h-56'
  };

  const resolvedImageUrl = resolveMediaUrl(currentValue || value, mediaAssets);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 text-left shadow-sm w-full min-w-0">
      {/* Hidden Native File Inputs for Operating System File Dialog */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileSelected(e, false)}
        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml,image/x-icon"
        className="hidden"
      />
      <input
        type="file"
        ref={mobileFileInputRef}
        onChange={(e) => handleFileSelected(e, true)}
        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml,image/x-icon"
        className="hidden"
      />

      {/* Header Info with Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <label className="text-sm font-bold text-white flex items-center space-x-1.5">
              <span>{label}</span>
              {required && <span className="text-rose-400 text-xs">*</span>}
            </label>

            {/* STATUS BADGE */}
            {isBroken ? (
              <span className="px-2 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-600/60 text-[10px] font-bold flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                <span>BROKEN</span>
              </span>
            ) : !currentValue && !value ? (
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold">
                <span>MISSING</span>
              </span>
            ) : hasUnsavedLocalChanges ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-600/60 text-[10px] font-bold flex items-center space-x-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>UNSAVED</span>
              </span>
            ) : isDraftSavedUnpublished ? (
              <span className="px-2 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-600/60 text-[10px] font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>DRAFT</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 text-[10px] font-bold flex items-center space-x-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>PUBLISHED</span>
              </span>
            )}
            {/* REPEATED / USAGE WARNING BADGE */}
            {otherUsagesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-600/60 text-[10px] font-bold flex items-center space-x-1" title={`This image asset is reused in ${otherUsagesCount} other slot(s)`}>
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>REPEATED ({otherUsagesCount})</span>
              </span>
            )}
          </div>

          {usageContext && (
            <p className="text-[11px] text-slate-400 mt-0.5">
              <span className="text-[#18B8B4]">Used on:</span> {usageContext}
            </p>
          )}

          {otherUsagesCount > 0 && (
            <p className="text-[11px] text-amber-400/90 font-medium mt-0.5 flex items-center space-x-1">
              <span>⚠️ This image is already used in {otherUsagesCount} other slot{otherUsagesCount > 1 ? 's' : ''}.</span>
            </p>
          )}
        </div>
        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300 border border-slate-700/80 self-start sm:self-auto">
          Rec: {recommendedDimensions}
        </div>
      </div>

      {statusMessage && (
        <div className="p-2.5 rounded-xl bg-teal-950/80 border border-teal-500/50 text-teal-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-[#18B8B4]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Image Preview & Controls Grid */}
      <div className="media-slot-main grid grid-cols-1 lg:grid-cols-12 gap-4 items-start w-full">
        {/* Preview Frame */}
        <div className="lg:col-span-5 w-full">
          {isFaviconSlot ? (
            /* Dedicated Favicon Box */
            <div className="favicon-preview w-20 h-20 bg-[#081524] rounded-2xl border border-slate-800 flex items-center justify-center mx-auto my-2 shadow-inner relative overflow-hidden">
              {resolvedImageUrl && !isBroken ? (
                <img
                  src={resolvedImageUrl}
                  alt={currentAltText || 'Website favicon'}
                  onError={() => setIsBroken(true)}
                  className="max-w-12 max-h-12 object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2 text-slate-500">
                  <Globe className="w-6 h-6 mb-1 text-slate-600" />
                  <span className="text-[10px] font-bold text-slate-400">Favicon unavailable</span>
                </div>
              )}
            </div>
          ) : isLogoSlot ? (
            /* Dedicated Logo Box */
            <div className="w-full min-h-[110px] bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
              {resolvedImageUrl && !isBroken ? (
                <img
                  src={resolvedImageUrl}
                  alt={currentAltText || (siteSettings?.websiteName ? `${siteSettings.websiteName} logo` : 'Website primary logo')}
                  onError={() => setIsBroken(true)}
                  className="max-h-20 max-w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2 text-slate-400">
                  <Shield className="w-8 h-8 mb-1 text-slate-600" />
                  <span className="text-xs font-bold text-slate-300">Logo unavailable</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Please upload or choose a logo</span>
                </div>
              )}
            </div>
          ) : (
            /* Standard Image Slot Frame with Drag & Drop */
            <div
              ref={imagePreviewRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handlePreviewClick}
              className={`relative group rounded-2xl overflow-hidden bg-slate-950 border transition-all duration-200 flex items-center justify-center w-full ${
                isDraggingOver
                  ? 'border-[#18B8B4] ring-2 ring-[#18B8B4]/50 scale-[1.02]'
                  : 'border-slate-800 hover:border-slate-700'
              } ${showFocalPointEditor && value ? 'cursor-crosshair' : ''}`}
            >
              {resolvedImageUrl && !isBroken ? (
                <div className={`w-full ${aspectClassMap[aspectRatio]} relative overflow-hidden bg-slate-950`}>
                  <img
                    src={resolvedImageUrl}
                    alt={currentAltText || label}
                    onError={() => setIsBroken(true)}
                    style={{ objectPosition: focalPointToCss(focalPoint) }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Interactive Focal Point Marker Overlay */}
                  {showFocalPointEditor && (
                    <div
                      className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-[#18B8B4] bg-[#18B8B4]/40 flex items-center justify-center pointer-events-none shadow-lg animate-pulse"
                      style={{ left: `${currentFocal.x}%`, top: `${currentFocal.y}%` }}
                    >
                      <Crosshair className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewZoomOpen(true);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                    title="Zoom Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full ${aspectClassMap[aspectRatio]} flex flex-col items-center justify-center p-6 text-slate-400 hover:text-slate-200 cursor-pointer border-2 border-dashed border-slate-800 hover:border-[#18B8B4]/60 rounded-2xl transition-colors bg-slate-950`}
                >
                  <Upload className="w-8 h-8 mb-2 text-[#18B8B4]" />
                  <span className="text-xs font-bold text-white">
                    {isBroken ? 'Image unavailable (click to replace)' : 'Drag an image here'}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    or <strong className="text-[#18B8B4] underline">Browse Computer</strong>
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">PNG, JPG, WebP, AVIF, SVG, ICO</span>
                </div>
              )}

              {/* Upload Progress Bar Overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white z-20">
                  <div className="w-full max-w-[160px] bg-slate-700 rounded-full h-2 mb-2 overflow-hidden">
                    <div
                      className="bg-[#18B8B4] h-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#18B8B4]">Uploading ({uploadProgress}%)...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls & Inputs Column */}
        <div className="lg:col-span-7 space-y-3 w-full min-w-0">
          {/* Main Slot Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3 py-2 rounded-xl bg-[#073F3D] hover:bg-[#0B4F4D] text-[#18B8B4] text-xs font-bold border border-[#18B8B4]/40 hover:border-[#18B8B4] flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs whitespace-nowrap min-w-0"
            >
              <Upload className="w-3.5 h-3.5 shrink-0" />
              <span>{currentValue ? 'Replace Image' : 'Upload Image'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLibraryTarget('desktop');
                setIsLibraryOpen(true);
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-w-0"
            >
              <FolderOpen className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Choose From Library</span>
            </button>

            {onFocalPointChange && currentValue && !isFaviconSlot && !isLogoSlot && (
              <button
                type="button"
                onClick={() => setShowFocalPointEditor(!showFocalPointEditor)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
                  showFocalPointEditor
                    ? 'bg-[#18B8B4] text-slate-950 border-[#18B8B4] font-bold shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Focal Point & Object Position"
              >
                <Sliders className="w-3.5 h-3.5 shrink-0" />
                <span>Image Position</span>
              </button>
            )}

            {currentValue && (
              <button
                type="button"
                onClick={() => handleRemove(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer"
                title="Remove image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Focal Point Visual Selector */}
          {showFocalPointEditor && onFocalPointChange && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 animate-in fade-in">
              <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>Click preview on left or select preset:</span>
                <span className="font-mono text-[#18B8B4] text-[10px]">
                  X: {currentFocal.x}%, Y: {currentFocal.y}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 max-w-[240px]">
                {focalPresets.map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => onFocalPointChange(p.val)}
                    className={`py-1 px-1.5 text-[10px] rounded border transition-colors cursor-pointer text-center ${
                      focalPoint === p.val
                        ? 'bg-[#18B8B4] text-slate-950 border-[#18B8B4] font-bold'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Alt Text Input */}
          {onAltTextChange && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Image Alt Text (SEO & Accessibility)
                </label>
                <label className="flex items-center space-x-1.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDecorative}
                    onChange={(e) => {
                      setIsDecorative(e.target.checked);
                      if (e.target.checked) {
                        onAltTextChange('');
                      }
                    }}
                    className="rounded border-slate-700 text-[#18B8B4] focus:ring-0 cursor-pointer"
                  />
                  <span>Mark as decorative</span>
                </label>
              </div>
              {!isDecorative ? (
                <input
                  type="text"
                  value={currentAltText}
                  onChange={(e) => handleAltTextChangeLocal(e.target.value)}
                  placeholder="Describe context of this photo..."
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#18B8B4]"
                />
              ) : (
                <div className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  Image marked as decorative (screen readers will skip).
                </div>
              )}
            </div>
          )}

          {/* Mobile Specific Image Override Toggle */}
          {onMobileValueChange && (
            <div className="pt-1">
              {!showMobileField ? (
                <button
                  type="button"
                  onClick={() => setShowMobileField(true)}
                  className="text-[11px] font-semibold text-[#18B8B4] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>+ Add Mobile-Specific Image Override (Optional)</span>
                </button>
              ) : (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#18B8B4]" />
                      <span>Mobile Image Override</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMobileField(false);
                        onMobileValueChange('');
                      }}
                      className="text-slate-400 hover:text-slate-200 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {mobileValue ? (
                    <div className="flex items-center space-x-3">
                      <img
                        src={resolveMediaUrl(mobileValue, mediaAssets)}
                        alt="Mobile override"
                        className="w-12 h-12 object-cover rounded-lg border border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-emerald-400 font-medium truncate">
                          Custom Mobile Image Active
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            type="button"
                            onClick={() => mobileFileInputRef.current?.click()}
                            className="text-[10px] text-[#18B8B4] hover:underline"
                          >
                            Replace
                          </button>
                          <span className="text-slate-600">•</span>
                          <button
                            type="button"
                            onClick={() => handleRemove(true)}
                            className="text-[10px] text-rose-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => mobileFileInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center space-x-1"
                      >
                        <Upload className="w-3 h-3 text-[#18B8B4]" />
                        <span>Upload Mobile File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLibraryTarget('mobile');
                          setIsLibraryOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 flex items-center space-x-1"
                      >
                        <FolderOpen className="w-3 h-3 text-teal-400" />
                        <span>From Library</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Slot Metadata Key & Card Action Footer */}
          <div className="pt-3 border-t border-slate-800 space-y-3 w-full">
            <div className="text-[11px] text-slate-400 font-mono break-all overflow-wrap-anywhere">
              Slot Key: <span className="text-teal-300">{activeSlotKey}</span>
            </div>

            {/* Media Card Action Footer Grid */}
            <div className="media-card-footer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full pt-1">
              {/* Save Draft */}
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className={`w-full min-w-0 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-center whitespace-normal break-words leading-tight ${
                  hasUnsavedLocalChanges
                    ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <span>{isSavingDraft ? 'Saving...' : 'Save Draft'}</span>
              </button>

              {/* Preview */}
              <button
                type="button"
                onClick={handlePreviewDraft}
                className="w-full min-w-0 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 text-xs font-bold border border-slate-700 flex items-center justify-center space-x-1.5 cursor-pointer text-center whitespace-normal break-words leading-tight"
                title="Preview draft site in new tab"
              >
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span>Preview</span>
              </button>

              {/* Publish */}
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className={`publish-button w-full min-w-0 py-2 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-center whitespace-normal break-words leading-tight sm:col-span-2 lg:col-span-1 ${
                  isDraftSavedUnpublished || hasUnsavedLocalChanges
                    ? 'bg-[#18B8B4] hover:bg-[#15A09D] text-slate-950 border-[#18B8B4] shadow-md shadow-[#18B8B4]/20'
                    : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border-emerald-700'
                }`}
              >
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Library Modal Picker */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FolderOpen className="w-5 h-5 text-[#18B8B4]" />
                  <span>Choose from Cloudflare R2 Media Library</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select an existing Cloudflare R2 asset for {label} ({libraryTarget === 'mobile' ? 'Mobile' : 'Desktop'})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Filters */}
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media by name or alt text..."
                className="w-full sm:w-72 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#18B8B4]"
              />

              <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['all', 'Doctor Photos', 'Cancer Care', 'Treatments', 'Body Explorer', 'Blog', 'Branding'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#18B8B4] text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All Assets' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Asset Grid */}
            <div className="p-5 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredLibrary.length > 0 ? (
                filteredLibrary.map((asset) => {
                  const usages = findImageUsagesAcrossSite(asset.url, {
                    doctorProfile,
                    heroContent,
                    siteSettings,
                    treatments,
                    cancerCategories,
                    cancers,
                    bloodCancers,
                    blogPosts,
                    locations,
                    howCanWeHelp
                  });

                  return (
                    <div
                      key={asset.id}
                      onClick={() => handleSelectFromLibrary(asset)}
                      className="group relative bg-slate-950 border border-slate-800 hover:border-[#18B8B4] rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all hover:scale-[1.02] shadow-sm"
                    >
                      <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                        <img
                          src={getMediaUrl(asset.url)?.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'}
                          alt={asset.altText}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {usages.length > 0 && (
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#073F3D]/90 text-[#18B8B4] text-[9px] font-bold border border-[#18B8B4]/40 backdrop-blur-xs">
                            Used in {usages.length} {usages.length === 1 ? 'place' : 'places'}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-lg bg-[#18B8B4] text-slate-950 text-xs font-bold shadow-md">
                            Select Asset
                          </span>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <div className="text-xs font-bold text-white truncate">{asset.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                          <span>{asset.category}</span>
                          {asset.dimensions && <span>{asset.dimensions}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-slate-500">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-semibold text-slate-400">No media assets found</p>
                  <p className="text-xs text-slate-600 mt-1">Upload an image from your PC to add it to Cloudflare R2</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-[#073F3D] hover:bg-[#0B4F4D] text-[#18B8B4] text-xs font-bold border border-[#18B8B4]/40 flex items-center space-x-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New File From PC</span>
              </button>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal Preview */}
      {previewZoomOpen && value && (
        <div
          onClick={() => setPreviewZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-pointer"
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={resolvedImageUrl?.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'}
              alt={altText}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-black">
              <X className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
