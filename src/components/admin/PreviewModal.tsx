import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  ExternalLink,
  X
} from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePublic: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  onNavigatePublic
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(1);

  if (!isOpen) return null;

  const widthMap = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[375px] max-w-full'
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-md animate-in fade-in">
      {/* Top Preview Control Bar */}
      <div className="h-14 bg-[#071D2D] border-b border-slate-700 px-4 sm:px-6 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-[#18B8B4]">Live Website Preview</span>
          <span className="text-xs text-slate-400 hidden sm:inline">•</span>
          <span className="text-xs text-slate-400 hidden sm:inline">Reflects all saved CMS updates in real-time</span>
        </div>

        {/* Device Viewport Switcher */}
        <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700 space-x-1">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors ${
              device === 'desktop' ? 'bg-[#149A96] text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop View (1280px)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors ${
              device === 'tablet' ? 'bg-[#149A96] text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors ${
              device === 'mobile' ? 'bg-[#149A96] text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIframeKey(k => k + 1)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Refresh Preview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigatePublic();
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <span>Open Full Window</span>
            <ExternalLink className="w-3 h-3 text-[#18B8B4]" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-900/50">
        <div
          className={`${widthMap[device]} h-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700 transition-all duration-300 relative`}
        >
          <iframe
            key={iframeKey}
            src="/"
            title="Dr. Bhushan Parmar Website Preview"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
