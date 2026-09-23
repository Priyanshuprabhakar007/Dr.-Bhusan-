import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, FileCheck, HelpCircle } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { ReportsChecklistModal } from './ReportsChecklistModal';
import { MaskedHeading, ClipRevealImage, EDITORIAL_EASE } from './MotionUtils';

const DEFAULT_SECOND_OPINION_IMAGE =
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85';

export const SecondOpinionSection: React.FC = () => {
  const { secondOpinionContent, getSlotMediaUrl, openSecondOpinionModal } = useData();
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const bannerImage = getSlotMediaUrl('slot-second-opinion-doctor', secondOpinionContent.secondOpinionImage || DEFAULT_SECOND_OPINION_IMAGE);
  const mobileBannerImage = getSlotMediaUrl('slot-second-opinion-banner', secondOpinionContent.secondOpinionMobileImage || bannerImage);

  const focalPoint = secondOpinionContent.secondOpinionFocalPoint || '60% 45%';
  const altText =
    secondOpinionContent.secondOpinionAltText ||
    'Physician examining diagnostic scans, pathology reports and second opinion oncology documentation';

  const overlayOpacity = ((secondOpinionContent.secondOpinionOverlayStrength ?? 85) / 100);

  return (
    <section
      ref={sectionRef}
      id="second-opinion"
      className="py-20 sm:py-24 lg:py-28 bg-white scroll-mt-16"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Image-Led Banner with Deep Teal Overlay */}
        <div className="relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden bg-[#073F3D] min-h-[460px] sm:min-h-[500px] flex items-center shadow-xl">
          
          {/* Background Consultation / Reports Image with Clip Reveal */}
          <div className="absolute inset-0 z-0">
            <ClipRevealImage
              src={bannerImage}
              mobileSrc={mobileBannerImage}
              alt={altText}
              style={{ objectPosition: focalPoint }}
              direction="right"
              duration={1.1}
              className="w-full h-full"
            />
            {/* Deep Teal Overlay */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(90deg, rgba(7, 63, 61, ${overlayOpacity}) 0%, rgba(7, 63, 61, ${Math.min(overlayOpacity * 0.94, 0.95)}) 50%, rgba(7, 63, 61, ${Math.min(overlayOpacity * 0.85, 0.85)}) 100%)`
              }}
            />
          </div>

          {/* Banner Content with Masked Heading & Staggered Reveal */}
          <div className="relative z-20 p-8 sm:p-12 lg:p-16 max-w-2xl text-left text-white space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B8B4]"
            >
              <FileCheck className="w-4 h-4" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
                {secondOpinionContent.smallLabel || 'EXPERT ONCOLOGY REVIEW'}
              </span>
            </motion.div>

            <MaskedHeading
              lines={[secondOpinionContent.mainHeading || 'A second opinion can bring clarity']}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] font-heading text-white"
              delay={0.1}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EDITORIAL_EASE }}
              className="text-stone-200 text-base sm:text-lg leading-relaxed font-normal"
            >
              {secondOpinionContent.description ||
                'If you already have a diagnosis or treatment plan, you can request a review of your reports before deciding your next step. Confirm your staging, explore molecular therapies, and gain peace of mind.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EDITORIAL_EASE }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={openSecondOpinionModal}
                id="second-opinion-section-btn"
                className="h-[50px] px-8 rounded-full bg-[#18B8B4] hover:bg-[#15A6A2] text-slate-950 font-bold text-xs tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>{secondOpinionContent.primaryCtaLabel || 'Get a Second Opinion'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsChecklistOpen(true)}
                id="second-opinion-checklist-btn"
                className="h-[50px] px-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/30 backdrop-blur-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#18B8B4]" />
                <span>{secondOpinionContent.secondaryCtaLabel || 'What Reports Do I Need?'}</span>
              </motion.button>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Reports Checklist Modal */}
      <ReportsChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </section>
  );
};
