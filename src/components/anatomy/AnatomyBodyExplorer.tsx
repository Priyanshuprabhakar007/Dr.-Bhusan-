import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BodyCancerArea, CANCER_AREAS } from '../../data/cancerAreas';

interface AnatomyBodyExplorerProps {
  selectedAreaId: string;
  hoveredAreaId: string | null;
  setSelectedAreaId: (id: string) => void;
  setHoveredAreaId: (id: string | null) => void;
  mouseOffset: { x: number; y: number };
}

export const AnatomyBodyExplorer: React.FC<AnatomyBodyExplorerProps> = ({
  selectedAreaId,
  hoveredAreaId,
  setSelectedAreaId,
  setHoveredAreaId,
  mouseOffset
}) => {
  const activeArea = CANCER_AREAS.find((a) => a.id === selectedAreaId) || CANCER_AREAS[0];
  const displayedHighlightId = hoveredAreaId || selectedAreaId;
  const ActiveIcon = activeArea?.icon;

  return (
    <div 
      className="anatomy-panel relative w-full h-full flex items-center justify-center select-none rounded-3xl border border-stone-200/80 shadow-inner overflow-visible"
      style={{
        background: `radial-gradient(
          circle at 50% 42%,
          rgba(70, 220, 210, 0.20) 0%,
          rgba(195, 246, 241, 0.22) 34%,
          rgba(239, 250, 249, 0.72) 72%,
          rgba(247, 250, 250, 0.96) 100%
        )`,
        zIndex: 0
      }}
    >
      {/* 2. STAGE MUST MATCH THE ACTUAL IMAGE AREA */}
      <div 
        className="anatomy-stage relative z-10 overflow-visible"
        style={{
          width: 'min(78%, 330px)',
          aspectRatio: '848 / 1264',
          margin: '0 auto',
        }}
      >
        {/* Subtle body glow (z-index 1) */}
        <div 
          className="absolute pointer-events-none"
          style={{
            inset: '14% 8%',
            borderRadius: '50%',
            background: `radial-gradient(
              ellipse,
              rgba(46, 201, 193, 0.18),
              transparent 68%
            )`,
            filter: 'blur(18px)',
            zIndex: 1
          }}
        />

        {/* 3. Transparent Anatomy body visual (z-index 2) */}
        <img
          src="/assets/images/body-anterior.png"
          alt="Translucent Human Anatomy"
          referrerPolicy="no-referrer"
          className="anatomy-body absolute inset-0 w-full h-full object-contain pointer-events-none select-none filter transition-opacity duration-300"
          style={{
            background: 'transparent',
            zIndex: 2
          }}
        />

        {/* Organ Overlays SVG (Rendered directly on top of body with z-index 2) */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 2 }}
        >
          <defs>
            {/* Soft Teal Radial Glow Filter */}
            <filter id="organGlowBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.8" />
            </filter>

            {/* Radial Gradients for Organ Illumination */}
            <radialGradient id="tealOrganGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#18B8B4" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#149A96" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#18B8B4" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="softTealVascular" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#0D9488" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="marrowLinearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#18B8B4" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#18B8B4" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#18B8B4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#18B8B4" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* =======================================================
              SOFT GLOWING ORGAN ILLUMINATION OVERLAYS (Based on selection)
              ======================================================= */}
          
          {/* 1. Chest & Lung: Bilateral lungs illuminate softly */}
          <g
            className="transition-opacity duration-300 ease-out"
            style={{ opacity: displayedHighlightId === 'chest-lung' ? 1 : 0 }}
          >
            <ellipse cx="44.5" cy="25" rx="5.5" ry="7" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="55.5" cy="25" rx="5.5" ry="7" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
          </g>

          {/* 2. Head & Neck: Throat / thyroid region illumination */}
          <g
            className="transition-opacity duration-300 ease-out"
            style={{ opacity: displayedHighlightId === 'head-neck' ? 1 : 0 }}
          >
            <ellipse cx="50" cy="15" rx="4.5" ry="5" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
          </g>

          {/* 3. Breast: Symmetrical breast tissue illumination */}
          <g
            className="transition-opacity duration-300 ease-out"
            style={{ opacity: displayedHighlightId === 'breast' ? 1 : 0 }}
          >
            <ellipse cx="44" cy="31" rx="4.2" ry="4.2" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="56" cy="31" rx="4.2" ry="4.2" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
          </g>

          {/* 4. Gastrointestinal / Digestive: Translucent stomach/gut illumination */}
          <g
            className="transition-opacity duration-300 ease-out"
            style={{ opacity: displayedHighlightId === 'gastrointestinal' ? 1 : 0 }}
          >
            <ellipse cx="48.5" cy="41" rx="6.5" ry="4.5" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="50" cy="45" rx="7.5" ry="5.5" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
          </g>

          {/* 5. Genitourinary: Kidneys & urinary tract illumination */}
          <g
            className="transition-opacity duration-300 ease-out"
            style={{ opacity: displayedHighlightId === 'genitourinary' ? 1 : 0 }}
          >
            <ellipse cx="43.5" cy="49" rx="4" ry="4.2" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="56.5" cy="49" rx="4" ry="4.2" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="50" cy="52" rx="4.8" ry="3.5" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
          </g>

          {/* 6. Gynecological: Pelvic uterus & ovaries region illumination */}
          <g
            className="transition-opacity duration-300 ease-out"
            style={{ opacity: displayedHighlightId === 'gynecological' ? 1 : 0 }}
          >
            <ellipse cx="50" cy="56" rx="7" ry="4.5" fill="url(#tealOrganGlow)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
          </g>

          {/* 7. Blood Cancers: Circulatory & marrow-wide soft clinical glow */}
          <g
            className="transition-opacity duration-300 ease-out"
            style={{ opacity: displayedHighlightId === 'blood-cancers' ? 1 : 0 }}
          >
            <line x1="50" y1="12" x2="50" y2="70" stroke="url(#marrowLinearGrad)" strokeWidth="3.5" strokeLinecap="round" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="50" cy="31" rx="9" ry="11" fill="url(#softTealVascular)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="50" cy="54" rx="8" ry="8" fill="url(#softTealVascular)" filter="url(#organGlowBlur)" style={{ mixBlendMode: 'screen' }} />
          </g>
        </svg>

        {/* 10. CONNECTOR MUST BE GENERATED FROM SAME DATA (z-index 3) */}
        <svg 
          className="anatomy-connectors absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 3 }}
        >
          <g className="hidden sm:block">
            <line
              x1={`${activeArea?.hotspot?.x ?? 50}%`}
              y1={`${activeArea?.hotspot?.y ?? 50}%`}
              x2={`${activeArea?.labelPosition?.x ?? 80}%`}
              y2={`${activeArea?.labelPosition?.y ?? 50}%`}
              stroke="#18B8B4"
              strokeWidth="1.2"
              strokeDasharray="2.5 2.5"
              className="opacity-90"
              style={{
                transition: 'x1 300ms cubic-bezier(.16,1,.3,1), y1 300ms cubic-bezier(.16,1,.3,1), x2 300ms cubic-bezier(.16,1,.3,1), y2 300ms cubic-bezier(.16,1,.3,1)'
              }}
            />
          </g>
        </svg>

        {/* 11. FLOATING LABEL POSITION (z-index 6) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArea.id}
            initial={{ opacity: 0, scale: 0.9, x: 4 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 4 }}
            transition={{ duration: 0.2 }}
            style={{
              left: `${activeArea?.labelPosition?.x ?? 80}%`,
              top: `${activeArea?.labelPosition?.y ?? 50}%`,
              transform: "translate(6px, -50%)",
              zIndex: 6
            }}
            className="selected-region-label absolute z-30 hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-teal-600/30 shadow-md text-slate-900 pointer-events-none whitespace-nowrap"
          >
            {ActiveIcon && <ActiveIcon className="w-3.5 h-3.5 text-[#073F3D]" />}
            <span className="text-[11px] font-bold whitespace-nowrap font-heading text-slate-900">
              {activeArea?.label || ''}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* =======================================================
            HOTSPOT BUTTONS OVERLAID ACCORDING TO DATA (z-index 4 & 5)
            ======================================================= */}
        <div className="anatomy-hotspots">
          {CANCER_AREAS.map((area) => {
            const isSelected = area.id === selectedAreaId;
            const isHovered = area.id === hoveredAreaId;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                onMouseEnter={() => setHoveredAreaId(area.id)}
                onMouseLeave={() => setHoveredAreaId(null)}
                style={{ 
                  left: `${area?.hotspot?.x ?? 50}%`, 
                  top: `${area?.hotspot?.y ?? 50}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isSelected ? 5 : 4
                }}
                className="absolute w-11 h-11 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 rounded-full group transition-all duration-300 touch-manipulation"
                aria-label={`Explore ${area.label} Cancer Care`}
                aria-pressed={isSelected}
              >
                {/* Outer soft pulsing ripple (ONLY active hotspot pulses) */}
                {isSelected && (
                  <span className="absolute inset-0 rounded-full bg-teal-400/30 animate-ping" />
                )}
                
                {/* Inner expand visual halo */}
                <span className={`absolute w-7 h-7 rounded-full bg-teal-500/10 border border-teal-400/20 transition-all duration-300 ${
                  isSelected ? 'scale-110 border-teal-400/60 bg-teal-500/25' : 'scale-90 group-hover:scale-100 group-hover:border-teal-400/40 group-hover:bg-teal-500/15'
                }`} />
                
                {/* Hotspot Center Core */}
                <div className={`rounded-full transition-all duration-300 shadow-xs flex items-center justify-center ${
                  isSelected
                    ? 'w-4 h-4 bg-[#18B8B4] border-2 border-white ring-2 ring-teal-500/30 shadow-[0_0_12px_rgba(24,184,180,0.7)] scale-110'
                    : isHovered
                    ? 'w-3.5 h-3.5 bg-white border-2 border-[#18B8B4] scale-110 shadow-sm'
                    : 'w-3 h-3 bg-white border border-slate-300/80 shadow-xs'
                }`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
