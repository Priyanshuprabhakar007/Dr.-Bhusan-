import React from 'react';
import { Quote } from 'lucide-react';
import { useData } from '../context/DataContext';

export const DoctorPhilosophy: React.FC = () => {
  const { doctorProfile } = useData();

  return (
    <section className="py-24 bg-gradient-to-b from-white via-stone-50/50 to-white relative overflow-hidden border-y border-stone-200/60">
      {/* Subtle organic radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 mb-8 shadow-xs">
          <Quote className="w-5 h-5" />
        </div>

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading leading-tight tracking-tight max-w-4xl mx-auto">
          “Cancer treatment is not only about choosing a therapy. It is about choosing{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-sky-800 to-slate-900">
            the right treatment for the right patient
          </span>
          .”
        </blockquote>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Every clinical decision must integrate cancer biology, disease stage, overall physical health, and patient goals. True precision oncology honors the science of the disease and the humanity of the person.
        </p>

        <div className="mt-8 pt-6 border-t border-slate-200/70 inline-flex flex-col items-center">
          <span className="text-sm font-bold text-slate-900 font-heading">
            {doctorProfile.name}
          </span>
          <span className="text-xs text-teal-800 font-medium mt-0.5">
            Senior Consultant – Medical Oncology
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5">
            DrNB (RGCI Delhi) • Senior Residency (PGIMER Chandigarh) • MD (IGMC Shimla)
          </span>
        </div>
      </div>
    </section>
  );
};
