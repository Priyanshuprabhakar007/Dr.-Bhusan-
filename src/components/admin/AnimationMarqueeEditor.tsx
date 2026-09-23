import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GlobalAnimationSettings } from '../../types/admin';
import {
  Sparkles,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Gauge
} from 'lucide-react';

export const AnimationMarqueeEditor: React.FC = () => {
  const { globalAnimationSettings, updateGlobalAnimationSettings } = useData();

  const [form, setForm] = useState<GlobalAnimationSettings>(
    globalAnimationSettings || {
      enabled: true,
      intensity: 'subtle',
      pageTransitions: true,
      scrollAnimations: true,
      marquee: {
        enabled: true,
        phrases: ['Personalized Care', 'Precision Oncology', 'Compassionate Guidance'],
        speed: 'normal',
        direction: 'left',
        pauseOnHover: true
      }
    }
  );
  const [newPhrase, setNewPhrase] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const safeMarquee = form?.marquee || {
    enabled: true,
    phrases: ['Personalized Care', 'Precision Oncology', 'Compassionate Guidance'],
    speed: 'normal' as const,
    direction: 'left' as const,
    pauseOnHover: true
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalAnimationSettings(form);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleAddPhrase = () => {
    if (!newPhrase.trim()) return;
    setForm(prev => ({
      ...prev,
      marquee: {
        ...safeMarquee,
        phrases: [...safeMarquee.phrases, newPhrase.trim()]
      }
    }));
    setNewPhrase('');
  };

  const handleDeletePhrase = (index: number) => {
    setForm(prev => ({
      ...prev,
      marquee: {
        ...safeMarquee,
        phrases: safeMarquee.phrases.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Animation Rhythm & Marquee Ticker
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Control the editorial marquee headline strip, scroll animations, and motion pacing across the website.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4 text-[#18B8B4]" />
          <span>Save Animation Settings</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Motion settings saved and applied to public page transitions!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Motion Speed */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-[#149A96]" />
            <span>Site-wide Motion Dynamics</span>
          </h3>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Enable Smooth Scroll & Stagger Reveals
              </span>
              <span className="text-[11px] text-slate-500 block">
                Line-by-line editorial typography masks and portrait clip reveals.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={e => setForm(p => ({ ...p, enabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#073F3D]"></div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Animation Velocity & Intensity
            </label>
            <select
              value={form.intensity}
              onChange={e => setForm(p => ({ ...p, intensity: e.target.value as any }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
            >
              <option value="subtle">Subtle & Restrained (Recommended for clinical elegance)</option>
              <option value="standard">Standard Balanced Transitions</option>
              <option value="enhanced">Enhanced Editorial Depth</option>
            </select>
          </div>
        </div>

        {/* Marquee Configuration */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#071D2D] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#149A96]" />
              <span>Editorial Marquee Ticker</span>
            </h3>

            <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={safeMarquee.enabled}
                onChange={e =>
                  setForm(p => ({
                    ...p,
                    marquee: { ...safeMarquee, enabled: e.target.checked }
                  }))
                }
                className="rounded text-[#149A96]"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Scroll Speed
              </label>
              <select
                value={safeMarquee.speed}
                onChange={e =>
                  setForm(p => ({
                    ...p,
                    marquee: { ...safeMarquee, speed: e.target.value as any }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
              >
                <option value="slow">Slow (Gentle floating)</option>
                <option value="normal">Normal (Editorial rhythm)</option>
                <option value="fast">Fast</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Scroll Direction
              </label>
              <select
                value={safeMarquee.direction}
                onChange={e =>
                  setForm(p => ({
                    ...p,
                    marquee: { ...safeMarquee, direction: e.target.value as any }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
              >
                <option value="left">Scroll Left</option>
                <option value="right">Scroll Right</option>
              </select>
            </div>
          </div>

          {/* Marquee Phrases */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Ticker Phrases ({safeMarquee.phrases.length})
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {safeMarquee.phrases.map((phrase, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={phrase}
                    onChange={e => {
                      const updated = [...safeMarquee.phrases];
                      updated[idx] = e.target.value;
                      setForm(p => ({
                        ...p,
                        marquee: { ...safeMarquee, phrases: updated }
                      }));
                    }}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeletePhrase(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={newPhrase}
                onChange={e => setNewPhrase(e.target.value)}
                placeholder="Enter oncology milestone or phrase..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddPhrase}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5 text-[#149A96]" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
