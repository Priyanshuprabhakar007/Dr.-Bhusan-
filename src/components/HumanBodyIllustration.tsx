import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  LungIcon,
  BreastRibbonIcon,
  StomachIcon,
  HeadNeckIcon,
  BloodDropIcon,
  KidneyIcon,
  GynecologicalIcon
} from './CategoryIcons';

export type BodyRegionId =
  | 'chest-lung'
  | 'breast'
  | 'digestive'
  | 'head-neck'
  | 'blood-cancers'
  | 'genitourinary'
  | 'gynecological';

export interface HotspotMeta {
  id: BodyRegionId;
  name: string;
  cardTitle: string;
  cardSubtitle: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  cardTopPercent: number;
  connectorTargetX: number;
  connectorTargetY: number;
}

export const HOTSPOTS_DATA: HotspotMeta[] = [
  {
    id: 'head-neck',
    name: 'Head & Neck',
    cardTitle: 'Head & Neck Cancer Care',
    cardSubtitle: 'Oral, throat and laryngeal cancers',
    tag: 'HEAD & NECK CARE',
    icon: HeadNeckIcon,
    x: 225,
    y: 150,
    cardTopPercent: 12,
    connectorTargetX: 335,
    connectorTargetY: 135
  },
  {
    id: 'breast',
    name: 'Breast',
    cardTitle: 'Breast Cancer Care',
    cardSubtitle: 'Subtype-tailored systemic therapies',
    tag: 'BREAST CARE',
    icon: BreastRibbonIcon,
    x: 195,
    y: 224,
    cardTopPercent: 20,
    connectorTargetX: 335,
    connectorTargetY: 195
  },
  {
    id: 'chest-lung',
    name: 'Chest & Lung',
    cardTitle: 'Chest & Lung Cancer Care',
    cardSubtitle: 'Thoracic & precision biomarker care',
    tag: 'CHEST & LUNG CARE',
    icon: LungIcon,
    x: 225,
    y: 240,
    cardTopPercent: 26,
    connectorTargetX: 335,
    connectorTargetY: 235
  },
  {
    id: 'blood-cancers',
    name: 'Blood Cancers',
    cardTitle: 'Blood Cancer Care',
    cardSubtitle: 'Lymphoma, myeloma & leukemias',
    tag: 'BLOOD CANCER CARE',
    icon: BloodDropIcon,
    x: 225,
    y: 282,
    cardTopPercent: 32,
    connectorTargetX: 335,
    connectorTargetY: 280
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    cardTitle: 'Digestive System Care',
    cardSubtitle: 'Colorectal, gastric, liver & pancreas',
    tag: 'DIGESTIVE CARE',
    icon: StomachIcon,
    x: 233,
    y: 336,
    cardTopPercent: 40,
    connectorTargetX: 335,
    connectorTargetY: 340
  },
  {
    id: 'genitourinary',
    name: 'Genitourinary',
    cardTitle: 'Genitourinary Care',
    cardSubtitle: 'Prostate, kidney & bladder cancers',
    tag: 'GENITOURINARY CARE',
    icon: KidneyIcon,
    x: 205,
    y: 386,
    cardTopPercent: 48,
    connectorTargetX: 335,
    connectorTargetY: 400
  },
  {
    id: 'gynecological',
    name: 'Gynecological',
    cardTitle: 'Gynecological Care',
    cardSubtitle: 'Ovarian, cervical & uterine cancers',
    tag: 'GYNECOLOGICAL CARE',
    icon: GynecologicalIcon,
    x: 225,
    y: 424,
    cardTopPercent: 54,
    connectorTargetX: 335,
    connectorTargetY: 445
  }
];

const BODY_SILHOUETTE_PATH = "M 225 55 C 241 55 258 68 258 90 C 258 108 252 122 243 132 C 237 137 233 142 233 148 C 233 156 235 166 241 173 C 255 176 283 184 311 194 C 323 200 333 214 333 230 C 333 252 329 280 325 310 C 323 325 321 340 319 355 C 317 375 313 410 309 440 C 307 452 305 465 303 475 C 301 485 298 502 293 514 C 289 524 284 524 282 516 C 280 506 283 488 285 475 C 287 462 291 430 295 395 C 297 365 299 335 297 305 C 295 275 291 248 281 232 C 277 245 273 268 269 290 C 265 308 263 325 265 342 C 267 356 273 372 275 390 C 277 405 277 422 275 440 C 271 475 265 520 260 560 C 256 582 254 600 252 615 C 250 632 248 655 244 680 C 241 700 239 720 238 735 C 237 745 241 752 243 756 C 244 760 237 762 231 762 C 226 762 226 756 227 748 C 228 738 230 720 231 700 C 232 675 234 645 234 615 C 234 595 233 575 232 555 C 231 525 230 485 229 445 C 228 425 226 412 225 408 C 224 412 222 425 221 445 C 220 485 219 525 218 555 C 217 575 216 595 216 615 C 216 645 218 675 219 700 C 220 720 222 738 223 748 C 224 756 224 762 219 762 C 213 762 206 760 207 756 C 209 752 213 745 212 735 C 211 720 209 700 206 680 C 202 655 200 632 198 615 C 196 600 194 582 190 560 C 185 520 179 475 175 440 C 173 422 173 405 175 390 C 177 372 183 356 185 342 C 187 325 185 308 181 290 C 177 268 173 245 169 232 C 159 248 155 275 153 305 C 151 335 153 365 155 395 C 159 430 163 462 165 475 C 167 488 170 506 168 516 C 166 524 161 524 157 514 C 152 502 149 485 147 475 C 145 465 143 452 141 440 C 137 410 133 375 131 355 C 129 340 127 325 125 310 C 121 280 117 252 117 230 C 117 214 127 200 139 194 C 167 184 195 176 209 173 C 215 166 217 156 217 148 C 217 142 213 137 207 132 C 198 122 192 108 192 90 C 192 68 209 55 225 55 Z";

interface HumanBodyIllustrationProps {
  activeRegion: BodyRegionId;
  onSelectRegion: (id: BodyRegionId) => void;
  hoveredRegion: BodyRegionId | null;
  onHoverRegion: (id: BodyRegionId | null) => void;
  onOpenCardDetail?: () => void;
}

export const HumanBodyIllustration: React.FC<HumanBodyIllustrationProps> = ({
  activeRegion,
  onSelectRegion,
  hoveredRegion,
  onHoverRegion,
  onOpenCardDetail
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const activeHotspot = HOTSPOTS_DATA.find((h) => h.id === activeRegion) || HOTSPOTS_DATA[0];
  const highlightedRegion = hoveredRegion || activeRegion;
  const ActiveIcon = activeHotspot.icon;

  // Build curved connector path from selected hotspot to card anchor dot
  const connectorPath = `M ${activeHotspot.x} ${activeHotspot.y} C ${activeHotspot.x + 38} ${activeHotspot.y} ${activeHotspot.connectorTargetX - 25} ${activeHotspot.connectorTargetY} ${activeHotspot.connectorTargetX} ${activeHotspot.connectorTargetY}`;

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => onHoverRegion(null)}
      className="relative w-full h-full flex flex-col items-center justify-between"
      role="region"
      aria-label="Interactive Human Anatomy Cancer Care Explorer"
    >
      {/* SVG Medical Anatomy Canvas */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[340px] sm:min-h-[420px] lg:min-h-[520px]">
        <svg
          viewBox="0 0 540 800"
          className="w-full h-full max-h-[640px] select-none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Layered Medical Backdrop Radial Glow behind Torso */}
            <radialGradient id="torsoBackdropGlow" cx="42%" cy="40%" r="48%">
              <stop offset="0%" stopColor="#CCFBF1" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#E0F2FE" stopOpacity="0.30" />
              <stop offset="85%" stopColor="#F0FDFA" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#F0FDFA" stopOpacity="0" />
            </radialGradient>

            {/* Upper Aura Glow behind Head & Shoulders */}
            <radialGradient id="headBackdropGlow" cx="42%" cy="18%" r="28%">
              <stop offset="0%" stopColor="#F0FDFA" stopOpacity="0.70" />
              <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
            </radialGradient>

            {/* Visible Medical Blue-Grey Silhouette Gradient (78% Opacity) */}
            <linearGradient id="bodySilhouetteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ADC3D6" stopOpacity="0.84" />
              <stop offset="25%" stopColor="#99B3C9" stopOpacity="0.82" />
              <stop offset="60%" stopColor="#87A3BB" stopOpacity="0.80" />
              <stop offset="100%" stopColor="#7693AC" stopOpacity="0.78" />
            </linearGradient>

            {/* Pulmonary Lung Medical Gradient */}
            <linearGradient id="lungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.45" />
            </linearGradient>

            {/* Soft Blur Glow for Active Region Highlights */}
            <filter id="subtleOrganGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Selected Hotspot Halo Filter */}
            <filter id="hotspotBeaconGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. SOFT LAYERED MEDICAL BACKDROP */}
          <g id="backdrop-layers" opacity="0.95">
            {/* Abstract curved backdrop shapes creating calm medical depth */}
            <ellipse cx="225" cy="330" rx="175" ry="240" fill="url(#torsoBackdropGlow)" />
            <ellipse cx="225" cy="140" rx="120" ry="90" fill="url(#headBackdropGlow)" />
            <path
              d="M 120 280 C 130 180 180 110 280 100 C 340 95 380 140 370 220 C 360 300 320 380 250 420 C 180 460 110 380 120 280 Z"
              fill="#E6F4F1"
              fillOpacity="0.25"
            />
          </g>

          {/* 2. MAIN PROPORTIONAL HUMAN BODY SILHOUETTE */}
          <g id="human-body-silhouette">
            {/* Main Solid Silhouette (Contrast & Visibility) */}
            <path
              d={BODY_SILHOUETTE_PATH}
              fill="url(#bodySilhouetteGrad)"
              stroke="#4A657E"
              strokeWidth="1.5"
              strokeOpacity="0.75"
              strokeLinejoin="round"
            />

            {/* Subtle Interior Anatomical White Rim / Edge Highlight */}
            <path
              d={BODY_SILHOUETTE_PATH}
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.28"
              strokeLinejoin="round"
            />
          </g>

          {/* 3. CALM MEDICAL ANATOMICAL INTERNAL STRUCTURES */}
          <g id="internal-anatomy" opacity="0.88">
            {/* Skull / Facial Plane contours */}
            <g id="skull-cervical" stroke="white" strokeOpacity="0.32" fill="none">
              <path d="M 213 82 C 218 80 225 80 237 82" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 215 110 C 220 116 230 116 235 110" strokeWidth="1" strokeLinecap="round" />
              <path d="M 210 128 C 218 136 232 136 240 128" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Neck / Sternocleidomastoid & Thyroid Prominence */}
            <g id="neck-structures">
              <path
                d="M 219 142 C 214 154 210 166 204 174"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.35"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 231 142 C 236 154 240 166 246 174"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.35"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="225" cy="148" r="2.5" fill="white" fillOpacity="0.4" />
            </g>

            {/* Collarbones / Clavicles (Elegant Bilateral S-Curves) */}
            <g id="clavicles">
              <path
                d="M 219 176 C 200 173 172 178 152 184"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 231 176 C 250 173 278 178 298 184"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 219 176 C 200 173 172 178 152 184"
                stroke="#475569"
                strokeWidth="0.8"
                strokeOpacity="0.45"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 231 176 C 250 173 278 178 298 184"
                stroke="#475569"
                strokeWidth="0.8"
                strokeOpacity="0.45"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Sternum Plate & Sternal Body */}
            <g id="sternum">
              <path
                d="M 221 177 L 229 177 L 227 194 L 223 194 Z"
                fill="white"
                fillOpacity="0.45"
                stroke="#475569"
                strokeWidth="0.75"
              />
              <line
                x1="225"
                y1="194"
                x2="225"
                y2="252"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
              <line
                x1="225"
                y1="252"
                x2="225"
                y2="260"
                stroke="#475569"
                strokeWidth="1.2"
                strokeOpacity="0.45"
                strokeLinecap="round"
              />
            </g>

            {/* Ribcage Arches (6 Pairs of Curving Thoracic Ribs) */}
            <g id="ribcage" stroke="white" strokeWidth="1.2" strokeOpacity="0.32" fill="none" strokeLinecap="round">
              {/* Rib 1 */}
              <path d="M 218 192 C 198 190 180 196 172 208" />
              <path d="M 232 192 C 252 190 270 196 278 208" />
              {/* Rib 2 */}
              <path d="M 218 204 C 195 202 175 210 166 224" />
              <path d="M 232 204 C 255 202 275 210 284 224" />
              {/* Rib 3 */}
              <path d="M 218 216 C 194 214 172 224 164 242" />
              <path d="M 232 216 C 256 214 278 224 286 242" />
              {/* Rib 4 */}
              <path d="M 218 228 C 193 226 170 238 165 258" />
              <path d="M 232 228 C 257 226 280 238 285 258" />
              {/* Rib 5 */}
              <path d="M 218 240 C 194 240 173 254 169 272" />
              <path d="M 232 240 C 256 240 277 254 281 272" />
              {/* Rib 6 */}
              <path d="M 219 252 C 198 254 180 268 174 284" />
              <path d="M 231 252 C 252 254 270 268 276 284" />
            </g>

            {/* Spine axis (Midline Vertebrae) */}
            <g id="spine-axis" stroke="white" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 4">
              <line x1="225" y1="262" x2="225" y2="390" />
            </g>

            {/* Pelvic Basin & Iliac Girdle */}
            <g id="pelvic-girdle" stroke="white" strokeWidth="1.3" strokeOpacity="0.35" fill="none" strokeLinecap="round">
              <path d="M 180 372 C 192 364 212 374 225 386 C 238 374 258 364 270 372" />
              <path d="M 195 388 C 210 398 240 398 255 388" strokeOpacity="0.25" />
            </g>

            {/* Limbs Joint Accents (Knees & Shins) */}
            <g id="limbs-joints" stroke="white" strokeOpacity="0.32" fill="none">
              {/* Knees Patellae */}
              <circle cx="203" cy="590" r="5" strokeWidth="1" />
              <circle cx="247" cy="590" r="5" strokeWidth="1" />
              {/* Shin Tibial lines */}
              <line x1="203" y1="610" x2="208" y2="690" strokeWidth="0.8" strokeOpacity="0.25" />
              <line x1="247" y1="610" x2="242" y2="690" strokeWidth="0.8" strokeOpacity="0.25" />
              {/* Malleoli / Ankles */}
              <ellipse cx="206" cy="710" rx="3" ry="2" strokeWidth="0.8" />
              <ellipse cx="244" cy="710" rx="3" ry="2" strokeWidth="0.8" />
            </g>
          </g>

          {/* 4. SOFT TRANSLUCENT INTERNAL ORGANS WITH ACTIVE HIGHLIGHTS */}
          <g id="organs-layer">
            {/* (A) PULMONARY LUNGS (Chest & Lung Oncology) */}
            <g
              id="pulmonary-lungs"
              className="transition-all duration-300 ease-out"
              opacity={highlightedRegion === 'chest-lung' ? 0.95 : 0.38}
              filter={highlightedRegion === 'chest-lung' ? 'url(#subtleOrganGlow)' : undefined}
            >
              {/* Left Lung (Viewer Left) */}
              <path
                d="M 212 194 C 200 190 182 198 174 218 C 170 236 174 256 180 268 C 190 266 202 262 210 248 C 212 232 213 210 212 194 Z"
                fill="url(#lungGrad)"
                stroke="#0F766E"
                strokeWidth={highlightedRegion === 'chest-lung' ? 1.5 : 0.75}
              />
              {/* Right Lung (Viewer Right) */}
              <path
                d="M 238 194 C 250 190 268 198 276 218 C 280 236 276 256 270 268 C 260 266 248 262 240 248 C 238 232 237 210 238 194 Z"
                fill="url(#lungGrad)"
                stroke="#0F766E"
                strokeWidth={highlightedRegion === 'chest-lung' ? 1.5 : 0.75}
              />
              {/* Delicate Bronchiole branches */}
              <path
                d="M 221 210 L 205 225 M 205 225 L 194 240 M 205 225 L 200 245"
                stroke="white"
                strokeWidth="0.8"
                strokeOpacity="0.4"
                fill="none"
              />
              <path
                d="M 229 210 L 245 225 M 245 225 L 256 240 M 245 225 L 250 245"
                stroke="white"
                strokeWidth="0.8"
                strokeOpacity="0.4"
                fill="none"
              />
            </g>

            {/* (B) BREAST / PECTORAL CARE REGION */}
            <g
              id="breast-region"
              className="transition-all duration-300 ease-out"
              opacity={highlightedRegion === 'breast' ? 0.95 : 0.28}
            >
              {/* Bilateral Pectoral / Breast Contours */}
              <path
                d="M 215 214 C 200 208 178 216 172 230 C 180 244 200 245 215 234"
                fill={highlightedRegion === 'breast' ? '#F472B6' : 'white'}
                fillOpacity={highlightedRegion === 'breast' ? 0.45 : 0.15}
                stroke={highlightedRegion === 'breast' ? '#DB2777' : 'white'}
                strokeWidth={highlightedRegion === 'breast' ? 1.5 : 0.8}
                strokeOpacity={highlightedRegion === 'breast' ? 0.9 : 0.4}
              />
              <path
                d="M 235 214 C 250 208 272 216 278 230 C 270 244 250 245 235 234"
                fill={highlightedRegion === 'breast' ? '#F472B6' : 'white'}
                fillOpacity={highlightedRegion === 'breast' ? 0.45 : 0.15}
                stroke={highlightedRegion === 'breast' ? '#DB2777' : 'white'}
                strokeWidth={highlightedRegion === 'breast' ? 1.5 : 0.8}
                strokeOpacity={highlightedRegion === 'breast' ? 0.9 : 0.4}
              />
            </g>

            {/* (C) HEAD & NECK / CERVICAL CARE REGION */}
            <g
              id="head-neck-region"
              className="transition-all duration-300 ease-out"
              opacity={highlightedRegion === 'head-neck' ? 0.95 : 0.3}
            >
              <ellipse
                cx="225"
                cy="150"
                rx="18"
                ry="14"
                fill={highlightedRegion === 'head-neck' ? '#0D9488' : '#94A3B8'}
                fillOpacity={highlightedRegion === 'head-neck' ? 0.35 : 0.12}
                stroke={highlightedRegion === 'head-neck' ? '#0F766E' : '#64748B'}
                strokeWidth={highlightedRegion === 'head-neck' ? 1.5 : 0.75}
              />
            </g>

            {/* (D) DIGESTIVE SYSTEM (Stomach, Liver, Viscera) */}
            <g
              id="digestive-system"
              className="transition-all duration-300 ease-out"
              opacity={highlightedRegion === 'digestive' ? 0.95 : 0.35}
              filter={highlightedRegion === 'digestive' ? 'url(#subtleOrganGlow)' : undefined}
            >
              {/* Diaphragmatic contour */}
              <path
                d="M 178 270 C 200 262 250 262 272 270"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.4"
                fill="none"
              />
              {/* Liver wedge (Viewer Left) */}
              <path
                d="M 218 270 C 200 268 180 274 176 288 C 178 304 196 308 214 304 Z"
                fill="#D97706"
                fillOpacity={highlightedRegion === 'digestive' ? 0.45 : 0.18}
                stroke="#B45309"
                strokeWidth={highlightedRegion === 'digestive' ? 1.2 : 0.6}
              />
              {/* J-shaped Stomach (Viewer Right) */}
              <path
                d="M 228 273 C 242 271 258 278 262 294 C 264 310 250 320 236 318 C 224 316 226 300 228 273 Z"
                fill="#F59E0B"
                fillOpacity={highlightedRegion === 'digestive' ? 0.5 : 0.2}
                stroke="#D97706"
                strokeWidth={highlightedRegion === 'digestive' ? 1.2 : 0.6}
              />
              {/* Intestinal Loops (Mid Abdomen) */}
              <g
                stroke={highlightedRegion === 'digestive' ? '#0D9488' : '#64748B'}
                strokeWidth={highlightedRegion === 'digestive' ? 1.2 : 0.75}
                strokeOpacity="0.6"
                fill="none"
                strokeLinecap="round"
              >
                <path d="M 205 328 C 215 324 235 324 245 328" />
                <path d="M 200 338 C 212 344 238 344 250 338" />
                <path d="M 205 348 C 218 354 232 354 245 348" />
              </g>
            </g>

            {/* (E) GENITOURINARY CARE (Kidneys & Bladder) */}
            <g
              id="genitourinary-system"
              className="transition-all duration-300 ease-out"
              opacity={highlightedRegion === 'genitourinary' ? 0.95 : 0.35}
              filter={highlightedRegion === 'genitourinary' ? 'url(#subtleOrganGlow)' : undefined}
            >
              {/* Bilateral Kidneys */}
              <path
                d="M 194 330 C 184 336 183 354 192 360 C 198 356 200 342 194 330 Z"
                fill="#0284C7"
                fillOpacity={highlightedRegion === 'genitourinary' ? 0.6 : 0.22}
                stroke="#0369A1"
                strokeWidth={highlightedRegion === 'genitourinary' ? 1.2 : 0.6}
              />
              <path
                d="M 256 330 C 266 336 267 354 258 360 C 252 356 250 342 256 330 Z"
                fill="#0284C7"
                fillOpacity={highlightedRegion === 'genitourinary' ? 0.6 : 0.22}
                stroke="#0369A1"
                strokeWidth={highlightedRegion === 'genitourinary' ? 1.2 : 0.6}
              />
              {/* Urinary Bladder */}
              <path
                d="M 215 418 C 213 428 237 428 235 418 C 230 414 220 414 215 418 Z"
                fill="#0EA5E9"
                fillOpacity={highlightedRegion === 'genitourinary' ? 0.5 : 0.18}
                stroke="#0284C7"
                strokeWidth={highlightedRegion === 'genitourinary' ? 1.2 : 0.6}
              />
            </g>

            {/* (F) GYNECOLOGICAL CARE (Pelvic Basin / Reproductive zone) */}
            <g
              id="gynecological-system"
              className="transition-all duration-300 ease-out"
              opacity={highlightedRegion === 'gynecological' ? 0.95 : 0.3}
              filter={highlightedRegion === 'gynecological' ? 'url(#subtleOrganGlow)' : undefined}
            >
              <ellipse
                cx="225"
                cy="424"
                rx="22"
                ry="15"
                fill="#F472B6"
                fillOpacity={highlightedRegion === 'gynecological' ? 0.45 : 0.12}
                stroke="#DB2777"
                strokeWidth={highlightedRegion === 'gynecological' ? 1.4 : 0.6}
              />
            </g>

            {/* (G) BLOOD CANCERS (Systemic Vascular & Marrow Axis) */}
            <g
              id="blood-cancers-system"
              className="transition-all duration-300 ease-out"
              opacity={highlightedRegion === 'blood-cancers' ? 0.95 : 0.35}
            >
              {/* Central sternal marrow vascular canal */}
              <line
                x1="225"
                y1="190"
                x2="225"
                y2="380"
                stroke={highlightedRegion === 'blood-cancers' ? '#E11D48' : '#94A3B8'}
                strokeWidth={highlightedRegion === 'blood-cancers' ? 2 : 1}
                strokeDasharray={highlightedRegion === 'blood-cancers' ? '4 3' : '2 4'}
              />
              {/* Radiant systemic pulse rings when selected */}
              {highlightedRegion === 'blood-cancers' && (
                <g>
                  <circle cx="225" cy="282" r="26" stroke="#E11D48" strokeWidth="1" strokeOpacity="0.4" fill="none" className="animate-ping origin-center" style={{ transformOrigin: '225px 282px' }} />
                  <circle cx="225" cy="282" r="16" stroke="#0F766E" strokeWidth="1" strokeOpacity="0.6" fill="none" />
                </g>
              )}
            </g>
          </g>

          {/* 5. SUBTLE 1PX TEAL CONNECTOR LINE & ENDPOINT (DESKTOP ONLY) */}
          <g id="desktop-connector" className="hidden lg:block">
            {/* Smooth curved connector line from selected hotspot to card anchor */}
            <path
              d={connectorPath}
              stroke="#0F766E"
              strokeWidth="1"
              strokeOpacity="0.70"
              fill="none"
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
            {/* Endpoint dot at card left edge */}
            <circle
              cx={activeHotspot.connectorTargetX}
              cy={activeHotspot.connectorTargetY}
              r="3.5"
              fill="#0F766E"
              className="transition-all duration-300 ease-out"
            />
          </g>

          {/* 6. HOTSPOTS DIRECTLY ON ANATOMY */}
          <g id="hotspots-layer">
            {HOTSPOTS_DATA.map((hotspot) => {
              const isSelected = activeRegion === hotspot.id;
              const isHovered = hoveredRegion === hotspot.id;

              return (
                <g
                  key={hotspot.id}
                  onClick={() => onSelectRegion(hotspot.id)}
                  onMouseEnter={() => onHoverRegion(hotspot.id)}
                  className="cursor-pointer group focus:outline-none"
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${hotspot.name} Oncology Care`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectRegion(hotspot.id);
                    }
                  }}
                >
                  {/* Generous 48x48px invisible touch/click hit area for accessibility */}
                  <circle cx={hotspot.x} cy={hotspot.y} r="24" fill="transparent" />

                  {/* Selected Beacon Halo Pulse */}
                  {isSelected && (
                    <circle
                      cx={hotspot.x}
                      cy={hotspot.y}
                      r="16"
                      fill="#0D9488"
                      fillOpacity="0.25"
                      className={!prefersReducedMotion ? 'animate-pulse' : undefined}
                      filter="url(#hotspotBeaconGlow)"
                    />
                  )}

                  {/* Outer ring */}
                  <circle
                    cx={hotspot.x}
                    cy={hotspot.y}
                    r={isSelected ? 8.5 : isHovered ? 7.5 : 6}
                    fill="white"
                    stroke={isSelected ? '#0F766E' : isHovered ? '#14B8A6' : '#94A3B8'}
                    strokeWidth={isSelected ? 2 : 1.5}
                    className="transition-all duration-200"
                    style={{ filter: 'drop-shadow(0px 1px 2px rgba(15, 23, 42, 0.12))' }}
                  />

                  {/* Center core dot: deep teal when selected, slate/navy when default */}
                  <circle
                    cx={hotspot.x}
                    cy={hotspot.y}
                    r={isSelected ? 4 : 3}
                    fill={isSelected ? '#0F766E' : isHovered ? '#0D9488' : '#334155'}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* DESKTOP COMPACT FLOATING INFORMATION CARD (POSITIONED BESIDE BODY) */}
        <div
          className="hidden lg:block absolute right-1 xl:right-3 w-[225px] xl:w-[240px] pointer-events-auto transition-all duration-300 ease-out z-20"
          style={{
            top: `${activeHotspot.cardTopPercent}%`,
            transform: 'translateY(-12%)'
          }}
        >
          <div
            onClick={onOpenCardDetail}
            className="bg-white/95 backdrop-blur-xs rounded-[18px] p-3.5 border border-teal-600/25 shadow-md shadow-slate-900/5 hover:border-teal-600/50 hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            {/* Category Tag & Icon */}
            <div className="flex items-center space-x-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700 shrink-0 group-hover:scale-105 transition-transform">
                <ActiveIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-teal-800 uppercase line-clamp-1">
                {activeHotspot.tag}
              </span>
            </div>

            {/* Card Title */}
            <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-teal-800 transition-colors">
              {activeHotspot.cardTitle}
            </h4>

            {/* Card Subtitle */}
            <p className="text-[11px] text-slate-600 leading-snug mt-1 line-clamp-2">
              {activeHotspot.cardSubtitle}
            </p>

            {/* Arrow Action Link */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-teal-700 group-hover:text-teal-900 pt-2 mt-2 border-t border-slate-100">
              <span>Explore care & therapies</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ANCHORED CARD DOCKED BELOW ANATOMY (NEVER COVERS FACE, CHEST, OR ABDOMEN) */}
      <div className="lg:hidden w-full max-w-[340px] mt-2 px-1 z-20 shrink-0">
        <div
          onClick={onOpenCardDetail}
          className="bg-white/95 rounded-[18px] p-3.5 border border-teal-600/20 shadow-sm flex items-center justify-between space-x-3 cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="flex items-start space-x-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold tracking-wider text-teal-800 uppercase block leading-none mb-1">
                {activeHotspot.tag}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                {activeHotspot.cardTitle}
              </h4>
              <p className="text-[11px] text-slate-500 leading-tight truncate mt-0.5">
                {activeHotspot.cardSubtitle}
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
