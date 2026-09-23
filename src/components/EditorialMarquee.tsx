import React from 'react';

export const EditorialMarquee: React.FC = () => {
  const text =
    'Personalized Care ✦ Precision Oncology ✦ Compassion ✦ Clarity ✦ Advanced Treatment ✦ Evidence-Based Guidance ✦ ';

  return (
    <div
      className="relative w-full bg-[#073F3D] py-6 sm:py-8 overflow-hidden border-y border-teal-800/40 select-none"
      aria-hidden="true"
    >
      {/* Subtle edge fades for high-end cinematic framing */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#073F3D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#073F3D] to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit whitespace-nowrap marquee-track">
        <div className="flex shrink-0 items-center animate-marquee">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading uppercase tracking-[0.14em] text-[#18B8B4]/80 px-4">
            {text}
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading uppercase tracking-[0.14em] text-[#18B8B4]/80 px-4">
            {text}
          </span>
        </div>
        <div className="flex shrink-0 items-center animate-marquee">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading uppercase tracking-[0.14em] text-[#18B8B4]/80 px-4">
            {text}
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading uppercase tracking-[0.14em] text-[#18B8B4]/80 px-4">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};
