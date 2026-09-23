import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronRight, X, Dna, ShieldCheck, Target, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { motion, useInView } from 'motion/react';
import { MaskedHeading, EDITORIAL_EASE } from './MotionUtils';
import { CmsImage } from './common/CmsImage';
import { getMediaUrl } from '../lib/cloudflareMedia';

export const TreatmentsSection: React.FC = () => {
  const { treatments: cmsTreatments, mediaAssets, getSlotMediaUrl, openAppointmentModal } = useData();
  const [selectedTreatment, setSelectedTreatment] = useState<any | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  // Fallback map for treatment images if not explicitly customized
  const defaultTreatmentImages: Record<string, string> = {
    chemotherapy: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    immunotherapy: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80',
    'targeted-therapy': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    'precision-oncology': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80'
  };

  const treatments = cmsTreatments.map((t, idx) => {
    const slotKeyMap: Record<string, string> = {
      chemotherapy: 'slot-treatment-chemotherapy',
      'targeted-therapy': 'slot-treatment-targeted',
      immunotherapy: 'slot-treatment-immunotherapy',
      'precision-oncology': 'slot-treatment-precision'
    };
    const slotKey = slotKeyMap[t.id] || `slot-treatment-${t.id}`;
    const rawImg = t.featuredImage || t.cardImage || '';
    const fallbackUrl = getMediaUrl(rawImg, mediaAssets) || rawImg || defaultTreatmentImages[t.id] || defaultTreatmentImages.chemotherapy;
    const resolvedImg = getSlotMediaUrl(slotKey, fallbackUrl);

    return {
      id: t.id,
      title: t.title,
      subtitle: t.category ? `${t.category} Therapy` : 'Medical Oncology',
      icon: idx === 0 ? ShieldCheck : idx === 1 ? Sparkles : idx === 2 ? Target : Dna,
      desc: t.shortDesc,
      details: t.overview || t.howItWorks,
      image: resolvedImg,
      isFeatured: idx === 3 || t.id === 'precision-oncology'
    };
  });

  return (
    <section
      ref={sectionRef}
      id="treatments"
      className="py-20 sm:py-24 lg:py-28 bg-[#073F3D] text-white scroll-mt-16 relative overflow-hidden"
    >
      {/* Soft background ambient gradient */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, #18B8B4 0%, transparent 70%)'
        }}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-left mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
            className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#18B8B4] uppercase block mb-2"
          >
            MODERN ONCOLOGY TREATMENT
          </motion.span>

          <MaskedHeading
            lines={['Treatment guided by diagnosis, biology and individual needs']}
            as="h2"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.12] font-heading"
            delay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EDITORIAL_EASE }}
            className="text-stone-300 text-base sm:text-lg mt-3 max-w-2xl font-normal"
          >
            Care regimens are customized using molecular testing, tumor biology, and current international clinical guidelines.
          </motion.p>
        </div>

        {/* 4 Staggered Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Card 1, 2, 3: 4 cols each */}
          {treatments.slice(0, 3).map((treatment, idx) => {
            const Icon = treatment.icon;
            return (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + idx * 0.1,
                  ease: EDITORIAL_EASE
                }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTreatment(treatment)}
                className="lg:col-span-4 group rounded-3xl overflow-hidden bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-colors duration-300 flex flex-col cursor-pointer will-change-transform"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <CmsImage
                    src={treatment.image}
                    mediaAssets={mediaAssets}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#073F3D] via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#18B8B4] transition-transform duration-200 group-hover:translate-x-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-[#18B8B4]">
                        {treatment.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-heading mb-2 group-hover:text-[#18B8B4] transition-colors">
                      {treatment.title}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed mb-4 font-normal">
                      {treatment.desc}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#18B8B4] group-hover:text-white transition-colors">
                    <span>Explore Protocol Details</span>
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Card 4: Precision Oncology (FEATURED WIDE CARD - 12 cols) */}
          {treatments.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
              transition={{
                duration: 0.65,
                delay: 0.55,
                ease: EDITORIAL_EASE
              }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedTreatment(treatments[3])}
              className="lg:col-span-12 group rounded-3xl overflow-hidden bg-gradient-to-r from-white/10 to-white/5 hover:from-white/12 hover:to-white/8 border border-[#18B8B4]/40 hover:border-[#18B8B4] transition-colors duration-300 cursor-pointer will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-auto lg:h-full overflow-hidden bg-stone-900">
                  <CmsImage
                    src={treatments[3].image}
                    mediaAssets={mediaAssets}
                    alt={treatments[3].title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] opacity-90"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#18B8B4] text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                    Featured Modality
                  </span>
                </div>
                <div className="lg:col-span-7 p-6 sm:p-10 text-left">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#18B8B4] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Dna className="w-3.5 h-3.5 mr-1" />
                    Next-Gen Diagnostics
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2 group-hover:text-[#18B8B4] transition-colors">
                    {treatments[3].title}
                  </h3>
                  <p className="text-xs font-semibold text-[#18B8B4] mb-3">
                    {treatments[3].subtitle}
                  </p>
                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed mb-6 font-normal max-w-2xl">
                    {treatments[3].desc} {treatments[3].details}
                  </p>
                  <div className="flex items-center text-xs font-bold text-[#18B8B4] group-hover:text-white transition-colors">
                    <span>View NGS & Biomarker Details</span>
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* Modal for Treatment Details */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedTreatment(null)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 text-left text-slate-900">
            <button
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold tracking-wider text-teal-800 uppercase px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 inline-block mb-2">
              Clinical Protocol
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-1">
              {selectedTreatment.title}
            </h3>
            <p className="text-xs font-semibold text-teal-800 mb-4">
              {selectedTreatment.subtitle}
            </p>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-5 bg-stone-100">
              <CmsImage
                src={selectedTreatment.image}
                mediaAssets={mediaAssets}
                alt={selectedTreatment.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 mb-6">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Clinical Overview:
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedTreatment.desc}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedTreatment.details}
              </p>
            </div>

            <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-100 mb-6 text-xs text-teal-950 leading-relaxed">
              <strong>Personalized Consultation:</strong> Every protocol is formulated in accordance with NCCN and ESMO clinical guidelines, taking into account organ reserve, molecular markers, and quality-of-life goals.
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <button
                onClick={() => {
                  setSelectedTreatment(null);
                  openAppointmentModal();
                }}
                className="h-11 px-6 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Consult for {selectedTreatment.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedTreatment(null)}
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
