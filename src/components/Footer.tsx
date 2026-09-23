import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { getMediaUrl } from '../lib/cloudflareMedia';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { doctorProfile, practiceLocation, siteSettings, mediaAssets, openAppointmentModal, openSecondOpinionModal } = useData();
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -76;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const cleanPhone = (practiceLocation?.phonePrimary || '+91 98765 43210').replace(/[^\d+]/g, '');
  const rawFooterLogo = siteSettings.footerLogoUrl || siteSettings.darkLogoUrl || siteSettings.logoUrl;
  const footerLogo = getMediaUrl(rawFooterLogo, mediaAssets) || rawFooterLogo || '';

  return (
    <footer id="contact" className="relative bg-[#073F3D] text-stone-300 pt-20 pb-12 overflow-hidden border-t border-white/10">
      
      {/* Large Low-Opacity Typography in Footer Background: "Oncology" */}
      <div className="absolute -bottom-10 right-4 lg:right-16 text-[clamp(5rem,14vw,14rem)] font-extrabold text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none font-heading">
        Oncology
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 Spacious Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10 text-left">
          
          {/* Col 1: Doctor Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {Boolean(footerLogo.trim()) && (
              <img
                src={footerLogo.trim()}
                alt={doctorProfile.name}
                className="h-10 w-auto max-w-[140px] object-contain mb-2 filter brightness-110"
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
                {doctorProfile.name}
              </h3>
              <p className="text-xs font-semibold text-[#18B8B4] uppercase tracking-widest mt-0.5">
                Senior Consultant • Medical Oncology
              </p>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed font-normal max-w-sm">
              Evidence-based medical oncology care for solid tumors and hematological cancers, prioritizing genomic precision, patient clarity, and compassionate treatment planning.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-[#18B8B4]" />
              <span>DrNB • PGIMER • MD • 10+ Years Oncology</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Dr. Parmar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('cancers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cancer Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('treatments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Treatments
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('resources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Patient Resources
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Patient Support (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Patient Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={openSecondOpinionModal}
                  className="hover:text-[#18B8B4] transition-colors flex items-center space-x-1.5 cursor-pointer text-left"
                >
                  <span>Second Opinion Review</span>
                  <ArrowRight className="w-3 h-3 text-[#18B8B4]" />
                </button>
              </li>
              <li>
                <button
                  onClick={openAppointmentModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Book Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-stone-400 hover:text-stone-200 text-xs transition-colors"
                >
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Clinic Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Consultation & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-start space-x-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#18B8B4] shrink-0 mt-0.5" />
                <span>{practiceLocation.phonePrimary}</span>
              </a>

              <a
                href={`mailto:${practiceLocation.emailContact}`}
                className="flex items-start space-x-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#18B8B4] shrink-0 mt-0.5" />
                <span>{practiceLocation.emailContact}</span>
              </a>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#18B8B4] shrink-0 mt-0.5" />
                <span>{practiceLocation.hospitalName}, {practiceLocation.city}</span>
              </div>

              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#18B8B4] shrink-0 mt-0.5" />
                <span>{practiceLocation.consultationTimings}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Dr. Bhushan Parmar. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center space-x-5 text-xs">
            <button
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModalType('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModalType('disclaimer')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Medical Disclaimer
            </button>
          </div>
        </div>

      </div>

      {/* Legal Information Modal */}
      {legalModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setLegalModalType(null)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 text-left">
            <h3 className="text-xl font-bold font-heading mb-3 text-slate-900 capitalize">
              {legalModalType === 'privacy' && 'Privacy Policy'}
              {legalModalType === 'terms' && 'Terms of Use'}
              {legalModalType === 'disclaimer' && 'Medical Disclaimer'}
            </h3>
            
            <div className="text-xs text-slate-600 leading-relaxed space-y-3 mb-6">
              {legalModalType === 'privacy' && (
                <p>
                  We treat all patient contact requests, consultation details, and medical records submitted through this portal with strict confidentiality in accordance with medical ethics and applicable data protection regulations. Data is used solely for clinical scheduling and oncology review.
                </p>
              )}
              {legalModalType === 'terms' && (
                <p>
                  Use of this website does not automatically constitute a formal doctor-patient relationship. Formal relationships are established during in-person consultations or official second opinion tele-consultations following identity verification and clinical intake.
                </p>
              )}
              {legalModalType === 'disclaimer' && (
                <p>
                  The content provided on this website is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified medical oncologist regarding individual medical concerns.
                </p>
              )}
            </div>

            <button
              onClick={() => setLegalModalType(null)}
              className="h-10 px-5 rounded-full bg-[#073F3D] text-white text-xs font-semibold"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
