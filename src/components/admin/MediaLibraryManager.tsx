import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { MediaAsset } from '../../types/admin';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Trash2,
  CheckCircle2,
  Search,
  Eye,
  X,
  AlertTriangle,
  RefreshCw,
  Info
} from 'lucide-react';

export const MediaLibraryManager: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useData();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const [usageCheck, setUsageCheck] = useState<{ count: number; usages: string[] } | null>(null);
  const [isCheckingUsage, setIsCheckingUsage] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [localAssets, setLocalAssets] = useState<MediaAsset[]>(mediaAssets);

  useEffect(() => {
    fetchMediaFromCloudflare();
  }, []);

  const fetchMediaFromCloudflare = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const json = await res.json();
        if (json.media) {
          const mapped: MediaAsset[] = json.media.map((m: any) => ({
            id: m.id,
            title: m.original_name ? m.original_name.replace(/\.[^/.]+$/, '') : m.id,
            url: m.public_url || `/uploads/${m.storage_key}`,
            category: m.category || 'Doctor Photos',
            dimensions: `${m.width || 1200} x ${m.height || 800}`,
            size: m.file_size || 250000,
            mimeType: m.mime_type || 'image/webp',
            altText: m.alt_text || '',
            uploadedAt: m.created_at ? new Date(m.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
          }));
          setLocalAssets(mapped);
        }
      }
    } catch (err) {
      console.warn('Unable to fetch live media assets from Cloudflare, using state assets:', err);
      setLocalAssets(mediaAssets);
    }
  };

  const filteredAssets = localAssets.filter(asset => {
    const matchSearch =
      (asset.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.altText || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'all' || asset.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Direct File Upload from PC to Cloudflare Worker R2 Bucket
  const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress('Uploading image file to Cloudflare R2...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', categoryFilter === 'all' ? 'Doctor Photos' : categoryFilter);
      formData.append('alt_text', `${file.name.replace(/\.[^/.]+$/, '')} - Dr. Bhushan Parmar`);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Upload to Cloudflare R2 failed');
      }

      const json = await res.json();
      if (json.media) {
        const newAsset: MediaAsset = {
          id: json.media.id,
          title: file.name.replace(/\.[^/.]+$/, ''),
          url: json.media.public_url,
          category: json.media.category,
          dimensions: `${json.media.width} x ${json.media.height}`,
          size: file.size,
          mimeType: file.type,
          altText: json.media.alt_text,
          uploadedAt: new Date().toISOString().split('T')[0]
        };

        addMediaAsset(newAsset);
        await fetchMediaFromCloudflare();
        setSelectedAsset(newAsset);
      }
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  // Check usage across D1 database before safe delete
  const checkAssetUsage = async (assetId: string) => {
    setIsCheckingUsage(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/admin/media/usage/${assetId}`);
      if (res.ok) {
        const json = await res.json();
        setUsageCheck({ count: json.usageCount, usages: json.usages || [] });
      } else {
        setUsageCheck({ count: 0, usages: [] });
      }
    } catch {
      setUsageCheck({ count: 0, usages: [] });
    } finally {
      setIsCheckingUsage(false);
    }
  };

  const handleSelectAsset = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setDeleteError(null);
    checkAssetUsage(asset.id);
  };

  const handleDeleteAsset = async () => {
    if (!selectedAsset) return;

    if (usageCheck && usageCheck.count > 0) {
      setDeleteError(`Cannot delete this image. It is currently referenced in ${usageCheck.count} place(s): ${usageCheck.usages.join(', ')}.`);
      return;
    }

    try {
      const res = await fetch(`/api/admin/media/${selectedAsset.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errJson = await res.json();
        setDeleteError(errJson.error || 'Deletion failed');
        return;
      }
      deleteMediaAsset(selectedAsset.id);
      setLocalAssets(prev => prev.filter(a => a.id !== selectedAsset.id));
      setSelectedAsset(null);
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete media asset');
    }
  };

  const formatBytes = (bytes: number) => {
    if (!bytes) return '250 KB';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Cloudflare R2 & D1 Media Assets
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Upload images from local PC directly to Cloudflare R2 bucket. All media references are tracked in D1 database.
          </p>
        </div>

        <label className="px-4 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm transition-colors cursor-pointer shrink-0">
          <Upload className="w-4 h-4 text-[#18B8B4]" />
          <span>{isUploading ? 'Uploading to R2...' : 'Upload Image from PC'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleDirectFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {uploadProgress && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-xs flex items-center space-x-2 animate-pulse">
          <RefreshCw className="w-4 h-4 spin text-[#149A96]" />
          <span>{uploadProgress}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'Doctor Photos', 'Cancer Care', 'Treatments', 'Blog', 'Backgrounds'].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#073F3D] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? `All (${localAssets.length})` : cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search media IDs or alt text..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAssets.map(asset => (
          <div
            key={asset.id}
            onClick={() => handleSelectAsset(asset)}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#149A96] transition-all cursor-pointer flex flex-col group"
          >
            <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
              <img
                src={asset.url?.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'}
                alt={asset.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleCopy(asset.id);
                  }}
                  className="p-1.5 rounded-lg bg-white/90 text-slate-800 hover:bg-white text-[10px] font-mono font-bold"
                  title="Copy Media ID"
                >
                  <Copy className="w-3.5 h-3.5 inline mr-1" />
                  ID
                </button>
                <div className="p-1.5 rounded-lg bg-white/90 text-slate-800">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="p-2.5 flex-1 flex flex-col justify-between space-y-1">
              <h4 className="text-xs font-bold text-[#071D2D] line-clamp-1">
                {asset.title}
              </h4>
              <div className="text-[10px] font-mono text-teal-700 font-semibold truncate bg-teal-50 px-1.5 py-0.5 rounded">
                ID: {asset.id}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>{asset.category}</span>
                <span>{formatBytes(asset.size)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Inspection Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-[#149A96]" />
                <h3 className="text-base font-bold text-[#071D2D] line-clamp-1">
                  {selectedAsset.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center relative">
              <img
                src={selectedAsset.url?.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'}
                alt={selectedAsset.altText}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700">Cloudflare Media ID</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    readOnly
                    value={selectedAsset.id}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 font-mono font-bold text-teal-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedAsset.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#073F3D] hover:bg-[#071D2D] text-white font-semibold flex items-center space-x-1 shrink-0"
                  >
                    {copiedUrl === selectedAsset.id ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#18B8B4]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedUrl === selectedAsset.id ? 'Copied ID' : 'Copy ID'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Public CDN URL</label>
                <input
                  type="text"
                  readOnly
                  value={selectedAsset.url}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs mt-1 bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={selectedAsset.altText}
                  readOnly
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs mt-1 bg-slate-50"
                />
              </div>

              {/* Usage Protection Alert */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                  <Info className="w-4 h-4 text-[#149A96]" />
                  <span>Website Section Usage Tracker</span>
                </div>
                {isCheckingUsage ? (
                  <p className="text-[11px] text-slate-500 animate-pulse">Checking D1 database references...</p>
                ) : usageCheck && usageCheck.count > 0 ? (
                  <div className="text-[11px] text-amber-800 space-y-0.5">
                    <p className="font-semibold text-amber-900">
                      In use by {usageCheck.count} section(s):
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 pl-1">
                      {usageCheck.usages.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    Not currently referenced in any website section. Safe to delete.
                  </p>
                )}
              </div>

              {deleteError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{deleteError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDeleteAsset}
                disabled={isCheckingUsage || (usageCheck ? usageCheck.count > 0 : false)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition-colors ${
                  usageCheck && usageCheck.count > 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-600'
                }`}
                title={usageCheck && usageCheck.count > 0 ? 'Cannot delete image in active use' : 'Safe delete image'}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
