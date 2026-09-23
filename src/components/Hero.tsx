import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, Award, Shield, Stethoscope, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { EDITORIAL_EASE, CountUp } from './MotionUtils';

const DEFAULT_DOCTOR_PHOTO =
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1600&q=85';

export const Hero: React.FC = () => {
  const { doctorProfile, heroContent, getSlotMediaUrl, openAppointmentModal, openSecondOpinionModal } = useData();
  const heroContainerRef = useRef<HTMLDivElement>(null);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: relX * 10, y: relY * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const { scrollY } = useScroll();
  const doctorScrollY = useTransform(scrollY, [0, 500], [0, isDesktop ? 14 : 0]);
  const gradientScrollY = useTransform(scrollY, [0, 500], [0, isDesktop ? 25 : 0]);
  const textScrollY = useTransform(scrollY, [0, 500], [0, isDesktop ? 5 : 0]);

  // Read directly from D1/CMS Slot Registry
  const doctorPhoto = getSlotMediaUrl('slot-hero-doctor', heroContent.doctorHeroImage || DEFAULT_DOCTOR_PHOTO);
  const mobileDoctorPhoto = getSlotMediaUrl('slot-hero-doctor-mobile', heroContent.mobileDoctorHeroImage || doctorPhoto);
  const heroBgPhoto = getSlotMediaUrl('slot-hero-bg', heroContent.heroBackgroundImage);

  const focalPoint = heroContent.doctorHeroFocalPoint || '70% 25%';
  const doctorAltText = heroContent.doctorHeroAltText || `${doctorProfile.name}, Senior Consultant Medical Oncology`;

  const trustTiles = [
    {
      id: 'exp',
      isCount: true,
      countTarget: 10,
      suffix: '+ Years',
      label: 'Oncology Experience',
      icon: Shield
    },
    {
      id: 'drnb',
      isCount: false,
      highlight: 'DrNB',
      label: 'Medical Oncology',
      icon: Award
    },
    {
      id: 'pgimer',
      isCount: false,
      highlight: 'PGIMER',
      label: 'Senior Residency',
      icon: Stethoscope
    },
    {
      id: 'md',
      isCount: false,
      highlight: 'MD',
      label: 'Clinical Oncology',
      icon: GraduationCap
    }
  ];

  return (
    <section
      id="home"
      className="relative bg-[#FCFDFE] pt-2 sm:pt-4 pb-14 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1360px] mx-auto">
        
        {/* ==================== MOBILE LAYOUT (< 1024px) ==================== */}
        <div className="block lg:hidden rounded-3xl overflow-hidden bg-[#073F3D] shadow-xl">
          {/* Part 1: Top Doctor Image Area */}
          <div className="relative w-full h-[clamp(320px,48vh,420px)] overflow-hidden bg-[#052E2D]">
            <img
              src={(mobileDoctorPhoto && mobileDoctorPhoto.trim()) || (doctorPhoto && doctorPhoto.trim()) || DEFAULT_DOCTOR_PHOTO}
              alt={doctorAltText}
              style={{ objectPosition: focalPoint }}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Subtle bottom gradient fade into content panel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#073F3D] via-[#073F3D]/30 to-transparent pointer-events-none" />
          </div>

          {/* Part 2: Dark Content Panel Below Image */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 space-y-5 text-left bg-[#073F3D]">
            {/* Small specialty line (clean inline text instead of large pill) */}
            <div className="flex items-center space-x-2 text-[#18B8B4] text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase">
              <span>—</span>
              <span>MEDICAL ONCOLOGY • PERSONALIZED CANCER CARE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(34px,7.5vw,46px)] font-extrabold text-white tracking-tight leading-[1.08] font-heading">
              <span className="block">Personalized Cancer Care.</span>
              <span className="block text-[#18B8B4] mt-1">Clear Guidance at Every Step.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-normal">
              Evidence-based medical oncology care for solid tumors and blood cancers, with treatment planning tailored to each patient's diagnosis and clinical needs.
            </p>

            {/* Doctor Identity Block */}
            <div className="pt-2 pb-1 border-t border-white/15 flex items-center space-x-3">
              <div>
                <div className="text-sm font-bold text-white font-heading">{doctorProfile.name}</div>
                <div className="text-xs text-[#18B8B4] font-medium">Senior Consultant – Medical Oncology</div>
              </div>
            </div>

            {/* CTA Buttons (Stacked) */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={openAppointmentModal}
                id="mobile-hero-book-btn"
                className="w-full h-[50px] rounded-full bg-[#18B8B4] hover:bg-[#15A6A2] text-slate-950 font-bold text-sm tracking-wide shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <button
                onClick={openSecondOpinionModal}
                id="mobile-hero-second-opinion-btn"
                className="w-full h-[50px] rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/30 backdrop-blur-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Get a Second Opinion</span>
                <ArrowRight className="w-4 h-4 ml-1 text-[#18B8B4]" />
              </button>
            </div>

            {/* Trust Tiles for Mobile */}
            <div className="pt-4 border-t border-white/15">
              <div className="grid grid-cols-2 gap-3">
                {trustTiles.map((tile) => {
                  const Icon = tile.icon;
                  return (
                    <div
                      key={tile.id}
                      className="bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/40 text-left flex items-center space-x-2.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 leading-tight">
                          {tile.isCount ? (
                            <CountUp target={tile.countTarget ?? 10} suffix="+" />
                          ) : (
                            tile.highlight
                          )}
                        </div>
                        <div className="text-[10px] font-medium text-slate-600 leading-tight">
                          {tile.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== DESKTOP LAYOUT (>= 1024px) ==================== */}
        <div
          ref={heroContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hidden lg:flex relative rounded-[2.5rem] overflow-hidden bg-[#073F3D] shadow-xl min-h-[760px] items-center"
        >
          {/* BACKGROUND: Doctor Photo with Clip-Path Reveal */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Optional CMS Hero Background Image */}
            {Boolean(heroContent.heroBackgroundImage?.trim()) && (
              <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none">
                <img
                  src={heroContent.heroBackgroundImage.trim()}
                  alt="Hero Background"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Ambient Background Gradient layer with micro-parallax & subtle cursor offset */}
            <motion.div
              style={{
                y: gradientScrollY,
                x: mouseOffset.x * 0.6
              }}
              className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    'radial-gradient(circle at 65% 35%, rgba(24, 184, 180, 0.18) 0%, transparent 60%)'
                }}
              />
            </motion.div>

            {/* Doctor Photo placed right of center with requested entry animation */}
            <motion.div
              initial={{
                scale: 1.06,
                x: 35,
                opacity: 0,
                clipPath: 'inset(0 0 0 100%)'
              }}
              animate={{
                scale: 1,
                x: 0,
                opacity: 1,
                clipPath: 'inset(0 0 0 0%)'
              }}
              transition={{
                duration: 0.85,
                delay: 0.35,
                ease: EDITORIAL_EASE
              }}
              style={{ y: doctorScrollY }}
              className="absolute inset-0 will-change-transform"
            >
              <img
                src={doctorPhoto?.trim() || DEFAULT_DOCTOR_PHOTO}
                alt={doctorAltText}
                style={{ objectPosition: focalPoint }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* LEFT OVERLAY: Subtle deep-teal gradient overlay so text is pristine & readable */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #073F3D 0%, rgba(7, 63, 61, 0.96) 42%, rgba(7, 63, 61, 0.82) 58%, rgba(7, 63, 61, 0.25) 82%, transparent 100%)'
              }}
            />
          </div>

          {/* HERO CONTENT: Left Editorial Overlay */}
          <div className="relative z-10 w-full px-16 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Side Content */}
              <motion.div
                style={{ y: textScrollY }}
                className="lg:col-span-7 space-y-7 text-left max-w-2xl"
              >
                {/* 1. Small Label */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B8B4]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#18B8B4]" />
                  <span className="text-xs font-bold tracking-[0.18em] uppercase">
                    MEDICAL ONCOLOGY • PERSONALIZED CANCER CARE
                  </span>
                </motion.div>

                {/* 2. Main Heading: LINE-BY-LINE OVERFLOW-HIDDEN MASK REVEAL */}
                <h1 className="text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold text-white tracking-tight leading-[1.08] font-heading">
                  <span className="block overflow-hidden pb-1">
                    <motion.span
                      className="block"
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 0.75,
                        delay: 0.2,
                        ease: EDITORIAL_EASE
                      }}
                    >
                      Personalized Cancer Care.
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-1">
                    <motion.span
                      className="block text-[#18B8B4]"
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 0.75,
                        delay: 0.3,
                        ease: EDITORIAL_EASE
                      }}
                    >
                      Clear Guidance at Every Step.
                    </motion.span>
                  </span>
                </h1>

                {/* 3. Supporting Paragraph: Fades upward */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.4,
                    ease: EDITORIAL_EASE
                  }}
                  className="text-lg text-stone-200 font-normal leading-relaxed max-w-[560px]"
                >
                  Evidence-based medical oncology care for solid tumors and blood cancers, with treatment planning tailored to each patient's diagnosis and clinical needs.
                </motion.p>

                {/* 4. CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.48,
                    ease: EDITORIAL_EASE
                  }}
                  className="flex items-center gap-3.5 pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openAppointmentModal}
                    id="desktop-hero-book-consultation-btn"
                    className="h-[52px] px-8 rounded-full bg-[#18B8B4] hover:bg-[#15A6A2] text-slate-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 group flex items-center justify-center cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openSecondOpinionModal}
                    id="desktop-hero-second-opinion-btn"
                    className="h-[52px] px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/30 backdrop-blur-xs transition-all duration-200 group flex items-center justify-center cursor-pointer"
                  >
                    <span>Get a Second Opinion</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-[#18B8B4] transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right empty spacer for desktop image */}
              <div className="lg:col-span-5 relative h-full pointer-events-none" />

            </div>

            {/* 5. HERO TRUST TILES */}
            <div className="mt-16 pt-8 border-t border-white/15">
              <div className="grid grid-cols-4 gap-4 max-w-4xl ml-auto">
                {trustTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <motion.div
                      key={tile.id}
                      initial={{ opacity: 0, y: 18, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.6 + index * 0.09,
                        ease: EDITORIAL_EASE
                      }}
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-xs text-left flex items-center space-x-3 group hover:bg-white transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-base font-extrabold text-slate-900 leading-tight">
                          {tile.isCount ? (
                            <CountUp target={tile.countTarget ?? 10} suffix="+" />
                          ) : (
                            tile.highlight
                          )}
                        </div>
                        <div className="text-[11px] font-medium text-slate-600 leading-tight">
                          {tile.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
