import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wind,
  HeartPulse,
  Layers,
  Activity,
  Droplet,
  ShieldCheck,
  Sparkles,
  Check,
  ArrowRight,
  FileText
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { AnatomyBodyExplorer } from './anatomy/AnatomyBodyExplorer';

import { BodyCancerArea, CANCER_AREAS } from '../data/cancerAreas';

export const BodyAreaExplorer: React.FC = () => {
  const { openAppointmentModal, openSecondOpinionModal } = useData();

  // Default selection is Chest & Lung
  const [selectedAreaId, setSelectedAreaId] = useState<string>('chest-lung');
  const [hoveredAreaId, setHoveredAreaId] = useState<string | null>(null);

  // Background glow mouse parallax (desktop only, max 3-5px)
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const anatomyContainerRef = useRef<HTMLDivElement>(null);

  const activeArea =
    CANCER_AREAS.find((a) => a.id === selectedAreaId) || CANCER_AREAS[0];
  const displayedHighlightId = hoveredAreaId || selectedAreaId;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!anatomyContainerRef.current) return;
    const rect = anatomyContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // max ~4px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredAreaId(null);
  };

  const ActiveIcon = activeArea.icon;

  return (
    <div className="pt-10 border-t border-stone-200/80">
      
      {/* Header & Patient-Friendly Subtitle */}
      <div className="text-left mb-8 sm:mb-10">
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-teal-800 uppercase block mb-1.5">
          ANATOMICAL DIRECTORY
        </span>
        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
          Explore Cancer Care by Body Area
        </h3>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Select a body area to explore cancers commonly treated by medical oncology and learn about available care options.
        </p>
      </div>

      {/* Interactive Category Navigation Pills */}
      <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
          {CANCER_AREAS.map((area) => {
            const isSelected = area.id === selectedAreaId;
            const Icon = area.icon;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                onMouseEnter={() => setHoveredAreaId(area.id)}
                onMouseLeave={() => setHoveredAreaId(null)}
                className={`h-9 px-3.5 sm:px-4 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#073F3D] text-white border-[#073F3D] shadow-xs'
                    : 'bg-white text-slate-700 border-stone-200 hover:border-teal-600/50 hover:bg-stone-50'
                }`}
                aria-pressed={isSelected}
                aria-label={`Select ${area.label} Cancer Care`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    isSelected ? 'text-[#18B8B4]' : 'text-teal-700'
                  }`}
                />
                <span>{area.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Balanced Panel: Left Anatomy (approx 40%), Right Information (approx 60%) */}
      <div className="bg-white rounded-3xl lg:rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT: Interactive Medical Anatomy Area */}
        <div
          ref={anatomyContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="md:col-span-5 lg:col-span-5 flex flex-col items-center justify-center relative select-none w-full"
        >
          {/* Anatomy Stage Container with overflow-visible to ensure floating labels never get clipped */}
          <div className="relative w-full max-w-[360px] sm:max-w-[390px] lg:max-w-[420px] h-[480px] sm:h-[530px] lg:h-[560px] flex items-center justify-center p-3">
            <AnatomyBodyExplorer
              selectedAreaId={selectedAreaId}
              hoveredAreaId={hoveredAreaId}
              setSelectedAreaId={setSelectedAreaId}
              setHoveredAreaId={setHoveredAreaId}
              mouseOffset={mouseOffset}
            />
          </div>

          {/* Mobile Region Indicator Label below anatomy */}
          <div className="sm:hidden mt-3 text-center">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-bold">
              <ActiveIcon className="w-3.5 h-3.5 text-teal-700" />
              <span>{activeArea.label}</span>
            </span>
          </div>
        </div>

        {/* RIGHT: Selected Cancer-Care Information Area (approx 60%) */}
        <div className="md:col-span-7 lg:col-span-7 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Selected Care Area Tag */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
                <ActiveIcon className="w-3.5 h-3.5" />
                <span>SELECTED CARE AREA</span>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading leading-tight mb-3">
                  {activeArea.title}
                </h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  {activeArea.description}
                </p>
              </div>

              {/* Common Conditions */}
              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  COMMON CONDITIONS
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeArea.conditions.map((cond, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/70"
                    >
                      <div className="w-4 h-4 rounded-full bg-teal-100/90 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-medium text-slate-700 leading-snug">
                        {cond}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Options */}
              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  TREATMENT MAY INCLUDE
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeArea.treatments.map((tx, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-teal-50/60 border border-teal-200/70 text-slate-800 text-xs font-medium"
                    >
                      {tx}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={openAppointmentModal}
                  className="h-11 px-6 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>Explore {activeArea.label} Care</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={openSecondOpinionModal}
                  className="h-11 px-6 rounded-full bg-white hover:bg-stone-50 text-slate-800 font-semibold text-xs border border-stone-300 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-teal-800" />
                  <span>Get a Second Opinion</span>
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
