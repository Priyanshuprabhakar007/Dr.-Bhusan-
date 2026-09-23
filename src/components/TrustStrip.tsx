import React from 'react';
import { Award, ShieldCheck, Stethoscope, HeartHandshake } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Award,
      title: '10+ Years Experience',
      subtitle: 'Dedicated Medical Oncology'
    },
    {
      icon: ShieldCheck,
      title: 'Evidence-Based Care',
      subtitle: 'International NCCN & ESMO Standards'
    },
    {
      icon: Stethoscope,
      title: 'Precision-Based Treatment',
      subtitle: 'Genomic & Targeted Therapies'
    },
    {
      icon: HeartHandshake,
      title: 'Patient-Centered Approach',
      subtitle: 'Compassionate & Transparent'
    }
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800/80 text-white py-6 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-3.5 group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
