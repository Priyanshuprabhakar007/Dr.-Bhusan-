import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MaskedHeading, EDITORIAL_EASE } from './MotionUtils';

export const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const steps = [
    {
      num: '01',
      title: 'Consultation',
      desc: 'In-depth clinical history, symptom evaluation, and physical examination.'
    },
    {
      num: '02',
      title: 'Report Review',
      desc: 'Meticulous appraisal of biopsy, histology, and diagnostic lab work.'
    },
    {
      num: '03',
      title: 'Diagnosis & Staging',
      desc: 'PET/CT scans and molecular genetic profiling.'
    },
    {
      num: '04',
      title: 'Treatment Planning',
      desc: 'Tailored protocol selection with multidisciplinary tumor board consensus.'
    },
    {
      num: '05',
      title: 'Treatment Delivery',
      desc: 'Delivery of systemic therapy with strict antiemetic and organ-protective care.'
    },
    {
      num: '06',
      title: 'Response Monitoring',
      desc: 'Serial clinical evaluation and interim diagnostic imaging.'
    },
    {
      num: '07',
      title: 'Follow-Up & Care',
      desc: 'Long-term surveillance, recovery optimization, and survivorship planning.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-stone-200/60 scroll-mt-20"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-left mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
            className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-teal-800 uppercase block mb-2"
          >
            YOUR CARE JOURNEY
          </motion.span>

          <MaskedHeading
            lines={['Clear guidance at every step']}
            as="h2"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.12] font-heading"
            delay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EDITORIAL_EASE }}
            className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl"
          >
            A structured, transparent pathway ensuring you and your family always understand the clinical rationale, expectations, and next milestones.
          </motion.p>
        </div>

        {/* DESKTOP: Line-Draw Horizontal Timeline with Milestone Nodes */}
        <div className="hidden lg:block relative">
          
          {/* Base Track */}
          <div className="absolute top-7 left-8 right-8 h-[2px] bg-stone-200 -z-0" />
          
          {/* Animated Line Draw filling from left to right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EDITORIAL_EASE }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-7 left-8 right-8 h-[2px] bg-[#18B8B4] z-0"
          />

          <div className="grid grid-cols-7 gap-4 relative z-10 text-left">
            {steps.map((step, idx) => (
              <div key={step.num} className="group">
                {/* Milestone Indicator Node: scales up 0.6 -> 1 when the line reaches it */}
                <div className="flex items-center space-x-2 mb-4">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.25 + idx * 0.12,
                      ease: EDITORIAL_EASE
                    }}
                    className="w-14 h-14 rounded-full bg-white border-2 border-stone-200 group-hover:border-[#18B8B4] flex items-center justify-center transition-colors shadow-2xs group-hover:shadow-md"
                  >
                    <span className="text-sm font-extrabold text-[#073F3D] font-heading">
                      {step.num}
                    </span>
                  </motion.div>
                </div>

                {/* Step Details with stagger */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.35 + idx * 0.12,
                    ease: EDITORIAL_EASE
                  }}
                >
                  <h3 className="text-base font-bold text-slate-900 font-heading mb-1.5 group-hover:text-teal-800 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE & TABLET: Vertical Animated Line-Draw Timeline */}
        <div className="lg:hidden relative pl-6 space-y-8 text-left max-w-md">
          {/* Base Vertical Line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-stone-200" />
          
          {/* Animated Vertical Line Draw */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: EDITORIAL_EASE }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-[#18B8B4]"
          />

          {steps.map((step, idx) => (
            <div key={step.num} className="relative group">
              {/* Dot marker */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.25 + idx * 0.1,
                  ease: EDITORIAL_EASE
                }}
                className="absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#073F3D] flex items-center justify-center shadow-xs z-10"
              >
                <span className="text-[11px] font-extrabold text-[#073F3D]">
                  {step.num}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{
                  duration: 0.45,
                  delay: 0.3 + idx * 0.1,
                  ease: EDITORIAL_EASE
                }}
                className="pl-2"
              >
                <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
