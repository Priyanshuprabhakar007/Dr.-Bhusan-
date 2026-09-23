import React, { useRef } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, FileText } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { EDITORIAL_EASE } from './MotionUtils';
import { CmsImage } from './common/CmsImage';

export const FinalCtaSection: React.FC = () => {
  const { finalCtaContent, doctorProfile, mediaAssets, getSlotMediaUrl, openAppointmentModal, openSecondOpinionModal } = useData();

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // 1. RESOLVE DEDICATED IMAGE FROM CMS SLOT REGISTRY
  const desktopPhotoSrc = getSlotMediaUrl('slot-final-cta-doc', finalCtaContent.finalCtaImage);
  const mobilePhotoSrc = getSlotMediaUrl('slot-final-cta-mobile', finalCtaContent.finalCtaMobileImage) || desktopPhotoSrc;

  // 3. LOG THE CURRENT IMAGE VALUE & RESOLVED URL FOR DEBUGGING
  console.log("Final CTA slotKey: slot-final-cta-doc");
  console.log("Final CTA desktop image src resolved:", desktopPhotoSrc);
  console.log("Final CTA mobile image src resolved:", mobilePhotoSrc);

  const focalX = finalCtaContent.finalCtaImagePositionX ?? 50;
  const focalY = finalCtaContent.finalCtaImagePositionY ?? 30;
  const mobileFocalX = finalCtaContent.finalCtaMobileImagePositionX ?? focalX;
  const mobileFocalY = finalCtaContent.finalCtaMobileImagePositionY ?? focalY;

  const altText = finalCtaContent.finalCtaAltText || 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-20 lg:py-28 bg-[#FCFDFE] overflow-hidden scroll-mt-20"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Turquoise / Deep-Teal Banner with Doctor Image */}
        <div className="relative rounded-[24px] sm:rounded-[32px] lg:rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-[#073F3D] via-[#094744] to-[#0D5B57] text-white shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content Area (Order 1 on mobile, lg:col-span-7 on desktop) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 text-left space-y-5 sm:space-y-6 order-1">
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
                className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#18B8B4] uppercase block"
              >
                {finalCtaContent.smallLabel || 'SPECIALIST MEDICAL ONCOLOGY'}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EDITORIAL_EASE }}
                className="text-[clamp(32px,5vw,58px)] font-extrabold text-white tracking-tight leading-[1.1] font-heading"
              >
                {finalCtaContent.mainHeading || 'Need guidance about your cancer treatment?'}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.5, delay: 0.22, ease: EDITORIAL_EASE }}
                className="text-stone-200 text-base sm:text-lg leading-relaxed max-w-[560px] font-normal"
              >
                {finalCtaContent.description || 'Schedule a consultation or request a second opinion. Receive thoughtful, evidence-based recommendations tailored to your diagnosis.'}
              </motion.p>

              {/* Exactly TWO CTAs: Stacked vertically on small mobile, side-by-side on sm+ */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.35, ease: EDITORIAL_EASE }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                {/* Primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openAppointmentModal}
                  id="final-cta-book-btn"
                  className="h-[52px] px-8 rounded-full bg-[#18B8B4] hover:bg-[#15A6A2] text-slate-950 font-bold text-xs tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>{finalCtaContent.primaryCtaLabel || 'Book Consultation'}</span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openSecondOpinionModal}
                  id="final-cta-second-opinion-btn"
                  className="h-[52px] px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/30 backdrop-blur-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#18B8B4] shrink-0" />
                  <span>{finalCtaContent.secondaryCtaLabel || 'Get Second Opinion'}</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Doctor Portrait Area (Order 2 on mobile, lg:col-span-5 on desktop) */}
            <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] lg:h-[520px] flex items-end justify-center overflow-hidden order-2">
              {/* Mobile Image (rendered below 768px if mobile photo exists or desktop photo) */}
              <div className="block sm:hidden w-full h-full relative">
                <CmsImage
                  src={mobilePhotoSrc}
                  mediaAssets={mediaAssets}
                  alt={altText}
                  focalPoint={`${mobileFocalX}% ${mobileFocalY}%`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Desktop Image (rendered on sm and above) */}
              <div className="hidden sm:block w-full h-full relative">
                <CmsImage
                  src={desktopPhotoSrc}
                  mediaAssets={mediaAssets}
                  alt={altText}
                  focalPoint={`${focalX}% ${focalY}%`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Gradient Overlay for seamless blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#073F3D]/80 via-transparent to-transparent pointer-events-none z-10" />

              {/* Doctor Label Card */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200/80 shadow-lg text-slate-900 text-left z-20 max-w-[240px]">
                <div className="text-xs font-bold font-heading truncate">
                  {doctorProfile.name}
                </div>
                <div className="text-[10px] text-teal-800 font-semibold truncate">
                  Senior Consultant • Medical Oncology
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
