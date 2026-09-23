import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BodyExplorerRegionConfig } from '../../types/admin';
import {
  Activity,
  Wind,
  HeartPulse,
  Layers,
  ShieldCheck,
  Sparkles,
  Droplet,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Eye,
  Sliders,
  Move
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Wind,
  Activity,
  HeartPulse,
  Layers,
  ShieldCheck,
  Sparkles,
  Droplet
};

export const BodyExplorerEditor: React.FC = () => {
  const {
    bodyExplorerRegions,
    updateBodyExplorerRegion,
    resetBodyExplorerRegions,
    navigateToPublic
  } = useData();

  const [selectedRegionId, setSelectedRegionId] = useState<string>(
    bodyExplorerRegions[0]?.id || 'chest-lung'
  );
  const [saveToast, setSaveToast] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const currentRegion =
    bodyExplorerRegions.find(r => r.id === selectedRegionId) || bodyExplorerRegions[0];

  const handleHotspotCoordinateChange = (axis: 'x' | 'y', value: number) => {
    if (!currentRegion) return;
    const currentHotspot = currentRegion.hotspot || { x: 50, y: 50 };
    updateBodyExplorerRegion(currentRegion.id, {
      hotspot: {
        ...currentHotspot,
        [axis]: value
      }
    });
  };

  const handleConnectorChange = (axis: 'dx' | 'dy', value: number) => {
    if (!currentRegion) return;
    updateBodyExplorerRegion(currentRegion.id, {
      connectorOffset: {
        ...currentRegion.connectorOffset,
        [axis]: value
      }
    });
  };

  const handleFieldChange = (field: keyof BodyExplorerRegionConfig, value: any) => {
    if (!currentRegion) return;
    updateBodyExplorerRegion(currentRegion.id, { [field]: value });
  };

  const handleAddCondition = () => {
    if (!currentRegion) return;
    const newConditions = [...currentRegion.conditions, 'New Clinical Condition'];
    updateBodyExplorerRegion(currentRegion.id, { conditions: newConditions });
  };

  const handleUpdateCondition = (index: number, val: string) => {
    if (!currentRegion) return;
    const newConditions = [...currentRegion.conditions];
    newConditions[index] = val;
    updateBodyExplorerRegion(currentRegion.id, { conditions: newConditions });
  };

  const handleDeleteCondition = (index: number) => {
    if (!currentRegion) return;
    const newConditions = currentRegion.conditions.filter((_, i) => i !== index);
    updateBodyExplorerRegion(currentRegion.id, { conditions: newConditions });
  };

  const handleAddTreatment = () => {
    if (!currentRegion) return;
    const newTreatments = [...currentRegion.treatments, 'New Systemic Protocol'];
    updateBodyExplorerRegion(currentRegion.id, { treatments: newTreatments });
  };

  const handleUpdateTreatment = (index: number, val: string) => {
    if (!currentRegion) return;
    const newTreatments = [...currentRegion.treatments];
    newTreatments[index] = val;
    updateBodyExplorerRegion(currentRegion.id, { treatments: newTreatments });
  };

  const handleDeleteTreatment = (index: number) => {
    if (!currentRegion) return;
    const newTreatments = currentRegion.treatments.filter((_, i) => i !== index);
    updateBodyExplorerRegion(currentRegion.id, { treatments: newTreatments });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentRegion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Bound between 5% and 95%
    const boundedX = Math.max(5, Math.min(95, xPct));
    const boundedY = Math.max(5, Math.min(95, yPct));

    updateBodyExplorerRegion(currentRegion.id, {
      hotspot: { x: boundedX, y: boundedY }
    });
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Body Area Explorer Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Interactive medical anatomy hotspot coordinates, organ highlights, conditions, and treatments.
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={resetBodyExplorerRegions}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Reset to recommended anatomical positions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Positions</span>
          </button>
          <button
            type="button"
            onClick={triggerSaveToast}
            className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#18B8B4]" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Body Explorer coordinates and clinical details saved! Instant live preview updated.</span>
        </div>
      )}

      {/* Region Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {bodyExplorerRegions.map(region => {
          const Icon = ICON_MAP[region.iconName] || Activity;
          const isSelected = region.id === selectedRegionId;
          return (
            <button
              key={region.id}
              onClick={() => setSelectedRegionId(region.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#073F3D] text-white shadow-md shadow-teal-950/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#18B8B4]' : 'text-slate-500'}`} />
              <span>{region.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {region.hotspot?.x ?? 50}%, {region.hotspot?.y ?? 50}%
              </span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Split: Visual Hotspot Canvas & Detailed Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Visual Hotspot Positioning Canvas */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Move className="w-4 h-4 text-[#149A96]" />
              <h3 className="text-sm font-bold text-[#071D2D]">
                Interactive Anatomy Canvas
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Click anywhere on the body to reposition hotspot
            </span>
          </div>

          {/* Canvas Wrapper */}
          <div
            onClick={handleCanvasClick}
            className="relative w-full aspect-[3/4] max-h-[540px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-[#0B2538] to-[#071D2D] border border-slate-700 shadow-inner cursor-crosshair select-none group"
          >
            {/* Background Medical Anatomy Illustration */}
            <img
              src="/assets/images/medical_anatomy_human_1789719428122.jpg"
              alt="Medical Anatomy Visualizer"
              className="w-full h-full object-contain pointer-events-none opacity-90 transition-opacity duration-300"
            />

            {/* Subtle Grid Overlay for precision */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:10%_10%] pointer-events-none" />

            {/* All Hotspots Rendered */}
            {bodyExplorerRegions.map(region => {
              const isCurrent = region.id === selectedRegionId;
              const Icon = ICON_MAP[region.iconName] || Activity;
              return (
                <div
                  key={region.id}
                  style={{
                    left: `${region.hotspot?.x ?? 50}%`,
                    top: `${region.hotspot?.y ?? 50}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedRegionId(region.id);
                  }}
                  className={`absolute z-20 cursor-pointer transition-all duration-200 ${
                    isCurrent ? 'scale-125 z-30' : 'opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                  title={`${region.label} (${region.hotspot?.x ?? 50}%, ${region.hotspot?.y ?? 50}%)`}
                >
                  {/* Pulse Ring for Active */}
                  {isCurrent && (
                    <span className="absolute -inset-2 rounded-full bg-[#18B8B4]/40 animate-ping" />
                  )}

                  {/* Hotspot Circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors ${
                      isCurrent
                        ? 'bg-[#18B8B4] border-white text-[#073F3D]'
                        : 'bg-[#073F3D]/90 border-[#18B8B4] text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Label badge */}
                  <div
                    className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-bold shadow-md transition-colors ${
                      isCurrent
                        ? 'bg-[#18B8B4] text-[#073F3D]'
                        : 'bg-black/80 text-white border border-white/20'
                    }`}
                  >
                    {region.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coordinate Sliders */}
          {currentRegion && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#149A96]" />
                  <span>Precision Coordinate Tuning: {currentRegion.label}</span>
                </span>
                <span className="text-[#149A96] font-mono">
                  X: {currentRegion.hotspot?.x ?? 50}% | Y: {currentRegion.hotspot?.y ?? 50}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Horizontal Position (X)</span>
                    <span>{currentRegion.hotspot?.x ?? 50}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={currentRegion.hotspot?.x ?? 50}
                    onChange={e => handleHotspotCoordinateChange('x', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#149A96]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Vertical Position (Y)</span>
                    <span>{currentRegion.hotspot?.y ?? 50}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={currentRegion.hotspot?.y ?? 50}
                    onChange={e => handleHotspotCoordinateChange('y', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#149A96]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Detailed Content & Clinical Form */}
        {currentRegion && (
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#071D2D] flex items-center space-x-2">
                <span>Clinical Region Data:</span>
                <span className="text-[#149A96]">{currentRegion.label}</span>
              </h3>
              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentRegion.active}
                  onChange={e => handleFieldChange('active', e.target.checked)}
                  className="w-4 h-4 rounded text-[#149A96] focus:ring-[#149A96]"
                />
                <span>Active on Public Website</span>
              </label>
            </div>

            {/* Region Title & Label */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pill Label (Short)
                </label>
                <input
                  type="text"
                  value={currentRegion.label}
                  onChange={e => handleFieldChange('label', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Section Title
                </label>
                <input
                  type="text"
                  value={currentRegion.title}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical Overview Description
              </label>
              <textarea
                rows={3}
                value={currentRegion.description}
                onChange={e => handleFieldChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            {/* CTA Label & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Action Button Label
                </label>
                <input
                  type="text"
                  value={currentRegion.ctaLabel}
                  onChange={e => handleFieldChange('ctaLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  value={currentRegion.ctaUrl}
                  onChange={e => handleFieldChange('ctaUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
              </div>
            </div>

            {/* Conditions Managed List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Targeted Cancers & Conditions ({(currentRegion.conditions || []).length})
                </label>
                <button
                  type="button"
                  onClick={handleAddCondition}
                  className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Condition</span>
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {(currentRegion.conditions || []).map((cond, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={cond}
                      onChange={e => handleUpdateCondition(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-[#149A96] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteCondition(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatments List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Medical Oncology Protocols Offered ({(currentRegion.treatments || []).length})
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
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {(currentRegion.treatments || []).map((treat, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={treat}
                      onChange={e => handleUpdateTreatment(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-[#149A96] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteTreatment(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
