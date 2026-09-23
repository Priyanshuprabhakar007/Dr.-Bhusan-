import React, { useRef } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { MaskedHeading, EDITORIAL_EASE } from './MotionUtils';
import { CmsImage } from './common/CmsImage';
import { getMediaUrl } from '../lib/cloudflareMedia';

export const HowCanWeHelp: React.FC = () => {
  const { howCanWeHelp, mediaAssets, getSlotMediaUrl, openAppointmentModal, openSecondOpinionModal } = useData();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getActionForCard = (id: string, ctaLink?: string) => {
    if (id === 'help-2' || id === 'second-opinion' || ctaLink === '#second-opinion') {
      return openSecondOpinionModal;
    }
    if (id === 'help-1' || id === 'diagnosis' || ctaLink === '#cancers') {
      return () => handleScrollToSection('cancers');
    }
    return openAppointmentModal;
  };

  const activeCards = howCanWeHelp.filter((item) => item.show !== false);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-stone-200/60"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-left mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
            className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-teal-800 uppercase block mb-2"
          >
            PATIENT CARE PATHWAYS
          </motion.span>

          <MaskedHeading
            lines={['Start with what you need today']}
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
            Direct, specialized guidance tailored to your current stage—whether newly diagnosed, reviewing reports, or evaluating next-line treatment options.
          </motion.p>
        </div>

        {/* Dynamic Patient-Oriented Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8">
          {activeCards.map((card, idx) => {
            const action = getActionForCard(card.id, card.ctaLink);
            const pathwaySlotKey = idx === 0 ? 'slot-pathway-consultation' : idx === 1 ? 'slot-pathway-systemic' : 'slot-pathway-second-opinion';
            const fallbackImg = getMediaUrl(card.image, mediaAssets) || card.image;
            const cardImgSrc = getSlotMediaUrl(pathwaySlotKey, fallbackImg);
            return (
              <motion.div
                key={card.id}
                initial={{ y: 28, opacity: 0, scale: 0.97 }}
                animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 28, opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.65,
                  delay: 0.25 + idx * 0.11,
                  ease: EDITORIAL_EASE
                }}
                whileHover={{ y: -4 }}
                className="group rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col will-change-transform"
              >
                {/* Large Image with smooth 1 -> 1.035 scale on hover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <CmsImage
                    src={cardImgSrc}
                    mediaAssets={mediaAssets}
                    alt={(card as any).altText || card.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-2 group-hover:text-teal-800 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={action}
                      className="h-11 px-6 rounded-full bg-stone-100 hover:bg-[#073F3D] text-slate-800 hover:text-white font-semibold text-xs transition-all duration-200 flex items-center space-x-2 group-hover:bg-[#073F3D] group-hover:text-white cursor-pointer"
                    >
                      <span>{card.ctaLabel || 'Explore Option'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
