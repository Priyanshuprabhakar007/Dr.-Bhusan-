import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface OversizedScrollTypographyProps {
  phrase?: string;
  tagline?: string;
}

export const OversizedScrollTypography: React.FC<OversizedScrollTypographyProps> = ({
  phrase = 'Precision Oncology.',
  tagline = 'Dedicated to individualized biomarker profiling and targeted cancer care'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Scroll-linked translation: 8vw -> -10vw on desktop
  const x = useTransform(scrollYProgress, [0, 1], ['8vw', '-10vw']);
  // Opacity: 0.35 -> 1.0 -> 0.35
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.35]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-[#FCFDFE] border-y border-stone-200/50 select-none"
      aria-label="Editorial Brand Statement"
    >
      {/* Editorial Tagline Foreground */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-2 sm:mb-4">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-[2px] bg-teal-800" />
          <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-teal-900 font-heading">
            {tagline}
          </p>
        </div>
      </div>

      {/* Massive Scroll-Linked Typography */}
      <div className="relative overflow-hidden w-full whitespace-nowrap py-2 sm:py-4">
        <motion.div
          style={{ x, opacity }}
          className="inline-block text-[clamp(70px,14vw,240px)] font-extrabold font-heading text-teal-800/[0.12] tracking-tighter leading-none will-change-transform"
        >
          {phrase}
        </motion.div>
      </div>
    </section>
  );
};
