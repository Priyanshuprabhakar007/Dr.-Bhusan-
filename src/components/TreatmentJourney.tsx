import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Calendar,
  FileCheck2,
  Dna,
  Sliders,
  Syringe,
  LineChart,
  HeartHandshake,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TreatmentJourney: React.FC = () => {
  const { openAppointmentModal } = useData();
  const [activeStep, setActiveStep] = useState(0);

  const journeyStages = [
    {
      num: '01',
      title: 'Consultation',
      subtitle: 'Comprehensive Assessment',
      icon: Calendar,
      description:
        'In-depth discussion reviewing your medical history, symptoms, previous treatments, and goals in an unhurried, reassuring environment.'
    },
    {
      num: '02',
      title: 'Report Review',
      subtitle: 'Diagnostic Audit',
      icon: FileCheck2,
      description:
        'Rigorous second-look review of histopathology slides, immunohistochemistry markers, and prior laboratory tests to confirm diagnostic accuracy.'
    },
    {
      num: '03',
      title: 'Diagnosis & Staging',
      subtitle: 'Precision Mapping',
      icon: Dna,
      description:
        'Whole-body PET-CT or MRI cross-sectional staging combined with Next-Generation Sequencing (NGS) to map the exact anatomic and molecular profile.'
    },
    {
      num: '04',
      title: 'Treatment Planning',
      subtitle: 'Evidence-Based Strategy',
      icon: Sliders,
      description:
        'Formulating an individualized regimen—chemotherapy, immunotherapy, targeted therapy, or multimodal sequencing—aligned with NCCN & ESMO guidelines.'
    },
    {
      num: '05',
      title: 'Treatment',
      subtitle: 'Safe Daycare Delivery',
      icon: Syringe,
      description:
        'Administered in a modern outpatient daycare suite with dedicated oncology nurses, premedications to eliminate nausea, and close hemodynamic monitoring.'
    },
    {
      num: '06',
      title: 'Response Monitoring',
      subtitle: 'Objective Tracking',
      icon: LineChart,
      description:
        'Periodic blood marker surveillance, symptom checks, and scheduled interim PET-CT scans to verify tumor shrinkage and make agile adjustments.'
    },
    {
      num: '07',
      title: 'Follow-Up',
      subtitle: 'Survivorship & Vigilance',
      icon: HeartHandshake,
      description:
        'Structured long-term survivorship care focusing on recurrence surveillance, organ health, nutritional recovery, and lifelong peace of mind.'
    }
  ];

  return (
    <section id="journey" className="py-20 lg:py-28 bg-stone-50/70 border-b border-stone-200/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-teal-700 mr-1" />
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase">
              Clear & Reassuring Roadmap
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Your Treatment Journey
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Knowing what to expect brings confidence. Here is how Dr. Bhushan Parmar guides patients through each clear, structured phase of care.
          </p>
        </div>

        {/* Desktop Horizontal Interactive Roadmap */}
        <div className="hidden lg:block">
          <div className="relative mb-12">
            {/* Connecting baseline line */}
            <div className="absolute top-6 left-12 right-12 h-0.5 bg-slate-200 -z-0" />

            <div className="grid grid-cols-7 gap-3 relative z-10">
              {journeyStages.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center text-center group focus:outline-none"
                  >
                    {/* Number Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-xs ${
                        isActive
                          ? 'bg-slate-900 text-teal-300 scale-110 shadow-lg ring-4 ring-teal-500/20'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-400 mt-3">
                      {stage.num}
                    </span>

                    <h3
                      className={`text-xs font-bold font-heading mt-1 transition-colors ${
                        isActive ? 'text-slate-900 font-extrabold' : 'text-slate-600 group-hover:text-slate-900'
                      }`}
                    >
                      {stage.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Highlight Card (Desktop) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md flex items-start space-x-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-700 flex items-center justify-center shrink-0">
                {React.createElement(journeyStages[activeStep].icon, { className: 'w-7 h-7' })}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2.5 mb-1">
                  <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    Stage {journeyStages[activeStep].num}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {journeyStages[activeStep].subtitle}
                  </span>
                </div>
                <h4 className="text-xl font-bold font-heading text-slate-900 mb-2">
                  {journeyStages[activeStep].title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {journeyStages[activeStep].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Vertical Connected Timeline */}
        <div className="lg:hidden space-y-6 relative">
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200 -z-0" />

          {journeyStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="relative z-10 flex items-start space-x-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-300 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      Stage {stage.num}
                    </span>
                    <span className="text-[11px] font-medium text-slate-600">
                      {stage.subtitle}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-slate-900 mt-1 mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Consultation Invitation */}
        <div className="mt-14 text-center">
          <button
            onClick={openAppointmentModal}
            className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <Calendar className="w-4 h-4 mr-2 text-teal-300" />
            <span>Begin Your Treatment Assessment</span>
          </button>
        </div>
      </div>
    </section>
  );
};
