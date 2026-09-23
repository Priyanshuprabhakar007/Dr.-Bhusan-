import React, { useState } from 'react';
import {
  FileSearch,
  Sparkles,
  GitPullRequest,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface PathwayModalData {
  title: string;
  badge: string;
  description: string;
  checklist: string[];
  ctaLabel: string;
  actionType: 'appointment' | 'second-opinion' | 'treatments' | 'cancers';
}

export const PatientFirstNav: React.FC = () => {
  const { openAppointmentModal, setActiveSection } = useData();
  const [activePathway, setActivePathway] = useState<PathwayModalData | null>(null);

  const pathways = [
    {
      id: 'new-diagnosis',
      badge: 'Step 01',
      title: 'I have a new diagnosis',
      subtitle: 'Guiding you through crucial initial assessments with clarity.',
      icon: FileSearch,
      accent: 'from-sky-500/10 to-teal-500/10 text-sky-600 border-sky-200',
      tagColor: 'bg-sky-50 text-sky-800 border-sky-200',
      bullets: [
        'What diagnostic tests to perform first',
        'Understanding tumor stages & TNM classification',
        'Formulating a multidisciplinary treatment plan'
      ],
      modalData: {
        title: 'Guiding Your New Cancer Diagnosis',
        badge: 'Newly Diagnosed Pathway',
        description:
          'Receiving a cancer diagnosis can be overwhelming. The first and most critical priority is verifying the pathology, determining the precise clinical stage through cross-sectional imaging (PET-CT or MRI), and establishing clear therapeutic goals before initiating any aggressive intervention.',
        checklist: [
          'Bring all pathology slides and blocks for expert second-look review',
          'Ensure recent high-resolution cross-sectional imaging (PET-CT or contrast CT)',
          'Assess molecular biomarker eligibility (IHC, NGS, liquid biopsy)',
          'Formulate an evidence-based roadmap with Dr. Bhushan Parmar'
        ],
        ctaLabel: 'Book Initial Consultation',
        actionType: 'appointment' as const
      }
    },
    {
      id: 'second-opinion',
      badge: 'Step 02',
      title: 'I need a second opinion',
      subtitle: 'Expert validation before committing to intensive therapy.',
      icon: GitPullRequest,
      accent: 'from-teal-500/10 to-emerald-500/10 text-teal-600 border-teal-200',
      tagColor: 'bg-teal-50 text-teal-800 border-teal-200',
      bullets: [
        'Confirming your initial biopsy & pathology findings',
        'Detailed audit of PET-CT, CT, and MRI scans',
        'Exploring modern targeted & immunotherapy alternatives'
      ],
      modalData: {
        title: 'Comprehensive Cancer Second Opinion',
        badge: 'Second Opinion Pathway',
        description:
          'A second opinion is standard international medical practice. It provides peace of mind, verifies that staging is rigorous, and evaluates whether newer precision or immunotherapy options exist that may avoid unnecessary traditional toxicities.',
        checklist: [
          'Independent review of histopathology and immunohistochemistry markers',
          'Re-evaluation of staging accuracy and tumor response metrics',
          'Assessment of whether chemotherapy can be safely avoided or modified',
          'Written evaluation and personalized treatment recommendations'
        ],
        ctaLabel: 'Request Second Opinion Review',
        actionType: 'second-opinion' as const
      }
    },
    {
      id: 'treatment-options',
      badge: 'Step 03',
      title: 'I am exploring treatment options',
      subtitle: 'Personalized therapies tailored to your tumor biology.',
      icon: Sparkles,
      accent: 'from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-200',
      tagColor: 'bg-blue-50 text-blue-800 border-blue-200',
      bullets: [
        'Modern systemic chemotherapy & daycare protocols',
        'Immunotherapy & checkpoint inhibitor therapy',
        'Targeted oral kinase inhibitors & precision oncology'
      ],
      modalData: {
        title: 'Exploring Advanced Oncology Therapies',
        badge: 'Treatment Options Pathway',
        description:
          'Cancer treatment has advanced from uniform chemotherapy to tailored systemic care. Depending on your tumor’s genetic profile and clinical stage, your regimen may combine chemotherapy, immunotherapy, or targeted daily oral inhibitors.',
        checklist: [
          'Biomarker matching (EGFR, ALK, HER2, PD-L1, BRCA, MSI-H)',
          'Outpatient daycare infusion protocols designed for rapid recovery',
          'Next-Generation Sequencing (NGS) to discover actionable mutations',
          'Personalized side-effect prophylaxis'
        ],
        ctaLabel: 'View Treatments & Protocols',
        actionType: 'treatments' as const
      }
    },
    {
      id: 'ongoing-care',
      badge: 'Step 04',
      title: 'I need ongoing cancer care',
      subtitle: 'Supportive oncology, side-effect relief & vigilant monitoring.',
      icon: HeartPulse,
      accent: 'from-cyan-500/10 to-teal-500/10 text-cyan-600 border-cyan-200',
      tagColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      bullets: [
        'Comfortable outpatient chemotherapy administration',
        'Proactive side-effect prevention & supportive care',
        'Interim scan tracking & longitudinal response monitoring'
      ],
      modalData: {
        title: 'Comprehensive Ongoing Cancer Management',
        badge: 'Ongoing Care Pathway',
        description:
          'Continuing your treatment requires consistent clinical oversight, laboratory surveillance, proactive supportive care, and mid-therapy imaging to ensure treatments are working while protecting your quality of life.',
        checklist: [
          'Dedicated daycare chemotherapy with multi-drug anti-nausea premedication',
          'Routine hematology and organ function verification before each cycle',
          '24/7 symptom guidance and prompt management of fever or infections',
          'Serial response evaluation via interim PET-CT or circulating tumor markers'
        ],
        ctaLabel: 'Schedule Ongoing Care Consultation',
        actionType: 'appointment' as const
      }
    }
  ];

  const handlePathwayClick = (pathway: (typeof pathways)[0]) => {
    setActivePathway(pathway.modalData);
  };

  const handleModalAction = (actionType: PathwayModalData['actionType']) => {
    setActivePathway(null);
    if (actionType === 'appointment') {
      openAppointmentModal();
    } else if (actionType === 'second-opinion') {
      setActiveSection('second-opinion');
      const el = document.getElementById('second-opinion');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'treatments') {
      setActiveSection('treatments');
      const el = document.getElementById('treatments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'cancers') {
      setActiveSection('cancers');
      const el = document.getElementById('cancers');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="patient-pathways" className="py-20 bg-stone-50/70 relative border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Patient-First Navigation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            How Can We Help You?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Find immediate guidance based on where you and your family are in your cancer care journey.
          </p>
        </div>

        {/* 4 Large Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => handlePathwayClick(p)}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.accent} border flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.tagColor}`}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-2 group-hover:text-teal-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                    {p.subtitle}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {p.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-xs text-slate-600 leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-2 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
                  <span>Explore Guidance</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pathway Modal / Drawer */}
      {activePathway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActivePathway(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-3">
              <span className="text-xs font-semibold text-teal-800">
                {activePathway.badge}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 font-heading mb-3">
              {activePathway.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {activePathway.description}
            </p>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Key Recommended Steps
              </h4>
              <ul className="space-y-2.5">
                {activePathway.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleModalAction(activePathway.actionType)}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-teal-700 to-slate-900 hover:from-teal-800 hover:to-black text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {activePathway.ctaLabel}
              </button>
              <button
                onClick={() => setActivePathway(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
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
