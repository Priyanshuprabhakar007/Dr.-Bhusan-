import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, Award, Shield, Stethoscope, GraduationCap } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { AboutDoctorModal } from './AboutDoctorModal';
import { MaskedHeading, ClipRevealImage, EDITORIAL_EASE } from './MotionUtils';

const DEFAULT_ABOUT_DOCTOR_PHOTO =
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=85';

export const AboutSection: React.FC = () => {
  const { doctorProfile, aboutDoctorContent, getSlotMediaUrl } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const doctorPhoto = getSlotMediaUrl('slot-about-doctor', aboutDoctorContent.aboutDoctorImage || DEFAULT_ABOUT_DOCTOR_PHOTO);
  const mobileDoctorPhoto = getSlotMediaUrl('slot-about-doctor-mobile', aboutDoctorContent.aboutDoctorMobileImage || doctorPhoto);

  const focalPoint = aboutDoctorContent.aboutDoctorFocalPoint || '50% 20%';
  const doctorAltText =
    aboutDoctorContent.aboutDoctorAltText ||
    `${doctorProfile.name}, Senior Consultant Medical Oncology`;

  const credentials = [
    {
      degree: 'DrNB Medical Oncology',
      institution: 'Super-Specialty Doctorate (RGCI&RC Delhi)',
      icon: Award
    },
    {
      degree: 'PGIMER Senior Residency',
      institution: 'Apex Tertiary Medical Institute (PGIMER Chandigarh)',
      icon: Stethoscope
    },
    {
      degree: 'MD Clinical Oncology & Radiation Therapy',
      institution: 'Regional Cancer Centre (IGMC Shimla)',
      icon: GraduationCap
    },
    {
      degree: '10+ Years Oncology Experience',
      institution: 'Dedicated Solid Tumor & Blood Cancer Practice',
      icon: Shield
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-24 lg:py-28 bg-[#073F3D] text-white scroll-mt-16 relative overflow-hidden"
    >
      {/* Subtle background ambient graphic */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #18B8B4 0%, transparent 70%)'
        }}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: Large Professional Image of Dr. Bhushan Parmar with Clip Reveal */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-stone-900/50 aspect-[4/5] relative group">
              <ClipRevealImage
                src={doctorPhoto}
                mobileSrc={mobileDoctorPhoto}
                alt={doctorAltText}
                style={{ objectPosition: focalPoint }}
                direction="left"
                className="w-full h-full"
                duration={0.95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#073F3D]/90 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-20">
                <span className="text-xs font-bold text-[#18B8B4] tracking-widest uppercase block">
                  Senior Consultant
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-0.5">
                  {doctorProfile.name}
                </h3>
                <p className="text-xs text-stone-300">
                  Medical Oncology / Onco Sciences
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Biography & Key Credentials */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
                className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#18B8B4] uppercase block mb-2"
              >
                MEET YOUR ONCOLOGIST
              </motion.span>

              {/* Masked Heading */}
              <MaskedHeading
                lines={[
                  'Experience, evidence and',
                  'compassionate cancer care'
                ]}
                as="h2"
                className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.12] font-heading"
                delay={0.12}
              />
            </div>

            {/* Short Biography entering after heading */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{
                duration: 0.55,
                delay: 0.28,
                ease: EDITORIAL_EASE
              }}
              className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal"
            >
              Dr. Bhushan Parmar is a Senior Consultant in Medical Oncology with over a decade of high-volume tertiary cancer experience. Specializing in precision oncology, systemic chemotherapy, targeted therapy, and immunotherapy, his practice is dedicated to delivering transparent, evidence-guided treatment tailored to each patient’s clinical reality.
            </motion.p>

            {/* Key Credentials List with Stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-2xl">
              {credentials.map((cred, i) => {
                const Icon = cred.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.36 + i * 0.08,
                      ease: EDITORIAL_EASE
                    }}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#18B8B4] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {cred.degree}
                      </div>
                      <div className="text-[11px] text-stone-300 mt-0.5">
                        {cred.institution}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Button: Know More About Dr. Parmar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{
                duration: 0.5,
                delay: 0.65,
                ease: EDITORIAL_EASE
              }}
              className="pt-3"
            >
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                id="about-know-more-btn"
                className="h-12 px-7 rounded-full bg-[#18B8B4] hover:bg-[#15A6A2] text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2 cursor-pointer group"
              >
                <span>Know More About Dr. Parmar</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Modal for Detailed CV & Academic Timeline */}
      <AboutDoctorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
