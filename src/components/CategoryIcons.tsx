import React from 'react';

interface IconProps {
  className?: string;
}

// 1. Chest & Lung: Elegant minimal lung contour
export const LungIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Trachea */}
    <path d="M12 3v6" />
    {/* Left Bronchus & Left Lung */}
    <path d="M12 9c-2 1-3.5 3-4.5 4.5C6.2 15.4 6 17.5 6.5 19c.6 1.8 2.2 2 4 1.5 1.5-.4 2-1.5 2.5-3" />
    {/* Right Bronchus & Right Lung */}
    <path d="M12 9c2 1 3.5 3 4.5 4.5 1.3 1.9 1.5 4 1 5.5-.6 1.8-2.2 2-4 1.5-1.5-.4-2-1.5-2.5-3" />
  </svg>
);

// 2. Breast: Minimal cancer awareness ribbon / care contour
export const BreastRibbonIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Awareness ribbon loop */}
    <path d="M12 4a3.5 3.5 0 0 0-3.5 3.5c0 1.6.8 3.2 2 4.5L15 17l2 4" />
    <path d="M12 4a3.5 3.5 0 0 1 3.5 3.5c0 1.6-.8 3.2-2 4.5L9 17l-2 4" />
  </svg>
);

// 3. Digestive: Minimal stomach contour
export const StomachIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Esophagus & stomach curvature */}
    <path d="M10 3v4c0 1.5-1 2.5-2.5 3.5C5.5 12 5 14.5 6 17c1.2 3 4 4 7 4 3.5 0 6-2 6-5.5 0-3.5-2-5-4.5-6L14 3" />
  </svg>
);

// 4. Head & Neck: Profile / Head contour
export const HeadNeckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Head profile and cervical spine curve */}
    <path d="M7 19v-2c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M12 11v2" />
  </svg>
);

// 5. Blood Cancers: Droplet contour
export const BloodDropIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    {/* Inner fluid shine */}
    <path d="M12 7c2 2 2.5 4 1.5 5.5" strokeOpacity="0.6" />
  </svg>
);

// 6. Genitourinary: Minimal kidney / renal contour
export const KidneyIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Bean-shaped renal organ curve */}
    <path d="M8 5c-3 1.5-4 5-3.5 8.5.5 3.5 3 6.5 6.5 6.5 4 0 7-3 7-7.5C18 7.5 15 4 11.5 4c-1 0-1.8.3-2.5.8" />
    <path d="M11 11.5c-1 .5-1.5 1.5-1 2.5" />
  </svg>
);

// 7. Gynecological: Minimal feminine / pelvic reproductive care icon
export const GynecologicalIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Elegant lotus/pelvic symmetry contour */}
    <path d="M12 4c-2.5 3-5 5.5-5 8.5a5 5 0 0 0 10 0c0-3-2.5-5.5-5-8.5z" />
    <path d="M7 15c-2.5-1-4-3-4-5 2.5 0 5 1.5 6 3" />
    <path d="M17 15c2.5-1 4-3 4-5-2.5 0-5 1.5-6 3" />
  </svg>
);
