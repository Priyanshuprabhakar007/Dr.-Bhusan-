import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CmsImage } from './common/CmsImage';
import { getMediaUrl } from '../lib/cloudflareMedia';
import {
  Activity,
  ShieldCheck,
  Dna,
  HeartPulse,
  Calendar,
  CheckCircle2,
  FileSearch,
  Sparkles,
  Info
} from 'lucide-react';

export const BloodCancerSection: React.FC = () => {
  const { bloodCancers, mediaAssets, openAppointmentModal } = useData();
  const [selectedTabId, setSelectedTabId] = useState<string>('lymphoma-detail');

  const currentDetail = bloodCancers.find(b => b.id === selectedTabId) || bloodCancers[0];

  return (
    <section id="blood-cancers" className="py-16 lg:py-24 bg-slate-900 text-white scroll-mt-20 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-medical-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full mb-3 border border-white/10">
            <Activity className="w-3.5 h-3.5 mr-1" />
            Specialized Hematologic Oncology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Hematologic Cancers & Blood Malignancies
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Malignancies of the blood and lymphatic system require rapid subtyping, cytogenetic risk stratification, and targeted systemic regimens. Dr. Bhushan Parmar brings extensive tertiary expertise from PGIMER Chandigarh and Rajiv Gandhi Cancer Institute.
          </p>
        </div>

        {/* 3 Prominent Selectable Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {bloodCancers.map(item => {
            const isSelected = item.id === selectedTabId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedTabId(item.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-sky-950/80 border-sky-400/80 text-white shadow-lg shadow-sky-950/50 scale-[1.02]'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  Hematology Focus
                </span>
                <h3 className="text-lg font-bold font-heading text-white">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Presentation Card */}
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {currentDetail.featuredImage && (
                <CmsImage
                  src={getMediaUrl(currentDetail.featuredImage, mediaAssets) || currentDetail.featuredImage}
                  mediaAssets={mediaAssets}
                  alt={currentDetail.name}
                  className="w-full md:w-48 h-36 rounded-xl object-cover border border-slate-700 shrink-0"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  {currentDetail.name} – {currentDetail.subtitle}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {currentDetail.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-700">
              {/* Pillar 1: Diagnosis & Workup */}
              <div className="space-y-3 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                  <FileSearch className="w-4 h-4" />
                  <span>1. Diagnostic Workup</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentDetail.diagnosticWorkup.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 2: Personalized Systemic Therapies */}
              <div className="space-y-3 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                  <Dna className="w-4 h-4" />
                  <span>2. Systemic Therapies</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentDetail.systemicTherapies.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 3: Monitoring & Supportive Care */}
              <div className="space-y-3 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <HeartPulse className="w-4 h-4" />
                  <span>3. Monitoring & Safety</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentDetail.monitoringProtocols.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Medical Transparency Note */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical Notice:</strong> Blood cancer response varies significantly based on molecular genetics, cytogenetic staging, and organ tolerance. Systemic therapy is monitored carefully to safeguard immune defense and bone marrow recovery.
                </span>
              </div>
              <button
                onClick={openAppointmentModal}
                className="shrink-0 text-xs font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 px-4 py-2.5 rounded-xl transition-colors shadow"
              >
                Schedule Hematology Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
