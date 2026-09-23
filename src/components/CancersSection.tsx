import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronRight, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { motion, useInView } from 'motion/react';
import { MaskedHeading, EDITORIAL_EASE } from './MotionUtils';
import { BodyAreaExplorer } from './BodyAreaExplorer';
import { CmsImage } from './common/CmsImage';
import { getMediaUrl } from '../lib/cloudflareMedia';

export const CancersSection: React.FC = () => {
  const { cancerCategories, mediaAssets, getSlotMediaUrl, openAppointmentModal } = useData();
  const [activeModalCancer, setActiveModalCancer] = useState<any | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  // Map CMS categories to UI display
  const displayCategories = cancerCategories.map((cat, idx) => {
    const slotKey = cat.id === 'solid-tumors' || idx === 0 ? 'slot-cancer-solid-tumors' : 'slot-cancer-blood-malignancies';
    const defaultFallback = getMediaUrl(cat.featuredImage, mediaAssets) || cat.featuredImage || 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=900&q=80';
    const resolvedImg = getSlotMediaUrl(slotKey, defaultFallback);

    return {
      id: cat.id,
      title: cat.name,
      subtitle: cat.shortDesc,
      desc: cat.longDesc,
      subtypes: [cat.shortName, 'Biomarker Directed', 'Systemic Protocols'],
      image: resolvedImg,
      mediaId: cat.featuredImage,
      tag: cat.shortName || 'Oncology'
    };
  });

  return (
    <section
      ref={sectionRef}
      id="cancers"
      className="py-20 sm:py-24 lg:py-28 bg-[#F0F7F7] scroll-mt-16"
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
            CANCERS WE TREAT
          </motion.span>

          <MaskedHeading
            lines={['Comprehensive medical oncology care']}
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
            Specialized treatment planning and clinical management across solid tumors and hematological malignancies, guided by staging and molecular genetics.
          </motion.p>
        </div>

        {/* Staggered Image-Led Categories Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {displayCategories.map((cancer, idx) => {
            const colSpan = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <motion.div
                key={cancer.id}
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.98 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + idx * 0.07,
                  ease: EDITORIAL_EASE
                }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveModalCancer(cancer)}
                className={`${colSpan} group rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer will-change-transform`}
              >
                {/* Image Container with hover scale */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <CmsImage
                    src={cancer.image}
                    mediaAssets={mediaAssets}
                    alt={cancer.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-teal-900 uppercase">
                    {cancer.tag}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-1 group-hover:text-teal-800 transition-colors">
                      {cancer.title}
                    </h3>
                    <p className="text-xs font-semibold text-teal-800 mb-2">
                      {cancer.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {cancer.desc}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-teal-800 group-hover:text-teal-950">
                    <span>View Care Details</span>
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BODY EXPLORER: Premium Full-Body Medical Anatomy & Interactive Navigation */}
        <BodyAreaExplorer />

      </div>

      {/* Cancer Detail Modal */}
      {activeModalCancer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setActiveModalCancer(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 text-left">
            <button
              onClick={() => setActiveModalCancer(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold tracking-wider text-teal-800 uppercase px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 inline-block mb-2">
              {activeModalCancer.tag}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-1">
              {activeModalCancer.title}
            </h3>
            <p className="text-xs font-semibold text-teal-800 mb-4">
              {activeModalCancer.subtitle}
            </p>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-5 bg-stone-100">
              <CmsImage
                src={activeModalCancer.image}
                mediaAssets={mediaAssets}
                alt={activeModalCancer.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {activeModalCancer.desc}
            </p>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 mb-6">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Evaluated Malignancies & Subtypes:
              </h5>
              <div className="flex flex-wrap gap-2">
                {activeModalCancer.subtypes.map((sub: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-lg bg-white border border-stone-200 text-slate-700"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <button
                onClick={() => {
                  setActiveModalCancer(null);
                  openAppointmentModal();
                }}
                className="h-11 px-6 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Book Consultation for {activeModalCancer.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveModalCancer(null)}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
