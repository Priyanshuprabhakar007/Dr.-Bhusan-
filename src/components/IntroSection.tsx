import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { MaskedHeading, ClipRevealImage, EDITORIAL_EASE } from './MotionUtils';

export const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start']
  });
  // Subtle scroll-linked image motion (-15px to 15px) inside fixed container
  const imgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-stone-200/60"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12 lg:mb-16">
          
          {/* LEFT: Eyebrow + Masked Heading */}
          <div className="lg:col-span-6 space-y-3 text-left">
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-teal-800 uppercase block"
            >
              PERSONALIZED ONCOLOGY CARE
            </motion.span>

            <MaskedHeading
              lines={[
                'Cancer treatment begins with',
                'understanding the individual.'
              ]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.14] font-heading max-w-xl"
              delay={0.12}
            />
          </div>

          {/* RIGHT: 2 Paragraphs entering after heading */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{
              duration: 0.55,
              delay: 0.28,
              ease: EDITORIAL_EASE
            }}
            className="lg:col-span-6 space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed text-left lg:pt-6"
          >
            <p>
              Every cancer diagnosis carries a unique cellular signature, molecular profile, and personal story. Rather than applying generic protocols, modern medical oncology integrates precision genomic diagnostics with a deep appreciation of each patient’s physical resilience and life priorities.
            </p>
            <p>
              Dr. Bhushan Parmar works in close partnership with patients and their families, ensuring that every therapeutic decision—from targeted drugs and immunotherapy to supportive protocols—is transparently explained and grounded in the highest clinical evidence.
            </p>
          </motion.div>

        </div>

        {/* Wide Professional Consultation Photograph with Clip Reveal & Micro-Parallax */}
        <div
          ref={imgRef}
          className="rounded-3xl overflow-hidden border border-stone-200 shadow-xs relative aspect-[21/9] min-h-[280px] sm:min-h-[380px] bg-stone-100"
        >
          <motion.div
            style={{ y: imgY }}
            className="w-full h-[115%] -top-[7.5%] relative will-change-transform"
          >
            <ClipRevealImage
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1800&q=85"
              alt="Compassionate patient consultation and clinical review"
              direction="bottom"
              className="w-full h-full"
              duration={1.05}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-6 sm:bottom-8 sm:left-10 text-white text-left z-10">
            <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-teal-200">
              Evidence-Based Oncology
            </p>
            <p className="text-base sm:text-lg font-bold font-heading">
              Personalized Consultations & Multidisciplinary Case Review
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
