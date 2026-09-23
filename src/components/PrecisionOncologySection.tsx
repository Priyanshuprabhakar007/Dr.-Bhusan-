import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Dna,
  Microscope,
  CheckCircle2,
  Activity,
  Sliders,
  LineChart,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BiomarkerNode {
  id: string;
  name: string;
  category: string;
  cancers: string;
  therapy: string;
  impact: string;
}

export const PrecisionOncologySection: React.FC = () => {
  const { openAppointmentModal } = useData();

  const biomarkerNodes: BiomarkerNode[] = [
    {
      id: 'egfr',
      name: 'EGFR Mutation',
      category: 'Driver Mutation',
      cancers: 'Non-Small Cell Lung Cancer (NSCLC)',
      therapy: '3rd Generation TKIs (e.g., Osimertinib)',
      impact: 'Dramatically blocks epidermal growth factor signals, providing deep tumor responses while sparing non-cancerous cells.'
    },
    {
      id: 'her2',
      name: 'HER2 Amplification',
      category: 'Cell Surface Receptor',
      cancers: 'Breast, Stomach & Esophageal Cancers',
      therapy: 'Monoclonal Antibodies & ADCs (Trastuzumab, T-DXd)',
      impact: 'Specifically flags overexpressed HER2 receptors for immune attack and delivers payload toxins directly inside malignant cells.'
    },
    {
      id: 'pdl1',
      name: 'PD-L1 Expression',
      category: 'Immune Checkpoint',
      cancers: 'Lung, Head & Neck, Bladder, Triple-Negative Breast',
      therapy: 'Immune Checkpoint Inhibitors (Pembrolizumab, Nivolumab)',
      impact: 'Unmasks cancer cells hiding behind PD-L1 shield, allowing the patient’s own CD8+ T-lymphocytes to destroy the tumor.'
    },
    {
      id: 'alk',
      name: 'ALK Translocation',
      category: 'Gene Fusion',
      cancers: 'Adenocarcinoma of Lung',
      therapy: 'Next-Gen ALK Inhibitors (Alectinib, Brigatinib)',
      impact: 'Suppresses aberrant tyrosine kinase signaling caused by EML4-ALK rearrangement with high central nervous system penetration.'
    },
    {
      id: 'brca',
      name: 'BRCA 1/2 Alteration',
      category: 'DNA Damage Repair',
      cancers: 'Ovarian, Breast, Prostate & Pancreatic Cancers',
      therapy: 'PARP Inhibitors (Olaparib, Rucaparib)',
      impact: 'Exploits synthetic lethality by crippling alternate DNA repair mechanisms in homologous recombination-deficient tumors.'
    },
    {
      id: 'kras',
      name: 'KRAS G12C Mutation',
      category: 'GTPase Switch',
      cancers: 'Colorectal & Lung Cancers',
      therapy: 'Specific KRAS G12C Inhibitors',
      impact: 'Locks previously untargetable oncogenic KRAS proteins into an inactive GDP-bound state to halt proliferation.'
    }
  ];

  const [activeBiomarker, setActiveBiomarker] = useState<BiomarkerNode>(biomarkerNodes[0]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const pathwaySteps = [
    {
      num: '01',
      title: 'Understand the Cancer',
      icon: Microscope,
      details:
        'Comprehensive histological grading, organ sub-typing, and anatomic staging via high-resolution PET-CT / contrast MRI.'
    },
    {
      num: '02',
      title: 'Review Biomarkers',
      icon: Dna,
      details:
        'Next-Generation Sequencing (NGS 500+ gene panel), immunohistochemistry (IHC), and liquid ctDNA biopsy when indicated.'
    },
    {
      num: '03',
      title: 'Select Treatment',
      icon: Sliders,
      details:
        'Evidence-based regimen matching: targeted kinase inhibitors, immune checkpoint inhibitors, or tailored systemic chemotherapy.'
    },
    {
      num: '04',
      title: 'Monitor Response',
      icon: LineChart,
      details:
        'Longitudinal clinical evaluations, blood tumor markers, and scheduled interval restaging scans to quantify tumor shrinkage.'
    },
    {
      num: '05',
      title: 'Adapt When Needed',
      icon: RefreshCw,
      details:
        'Dynamic resistance monitoring: re-stratifying to next-line targeted therapy or maintenance regimens if biology shifts.'
    }
  ];

  const clinicalFactors = [
    'Cancer Type',
    'Stage (TNM)',
    'Histopathology',
    'Biomarkers',
    'Molecular Profile',
    'Prior Therapies',
    'Performance Score'
  ];

  return (
    <section id="precision" className="py-20 lg:py-28 bg-white border-b border-stone-200/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Dna className="w-3.5 h-3.5 text-teal-700 mr-1" />
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase">
              Genomic & Molecular Architecture
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Treatment Designed Around Your Cancer
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every malignant tumor carries a distinct genomic blueprint. Precision oncology replaces one-size-fits-all protocols with therapies tailored specifically to your tumor biology.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Side: Interactive Medical Illustration (Molecular / DNA Pathways) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0A1628] rounded-3xl p-7 sm:p-9 text-white shadow-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[560px]">
            {/* Background glowing molecular network */}
            <div className="absolute inset-0 bg-medical-grid opacity-15 pointer-events-none" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-teal-300 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Interactive Pathway Explorer</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Select a biomarker node
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Actionable Tumor Biomarkers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Click any molecular target below to see how Dr. Bhushan Parmar pairs targeted therapies with specific genomic alterations.
              </p>

              {/* Interactive Biomarker Node Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-7">
                {biomarkerNodes.map((node) => {
                  const isSelected = activeBiomarker.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveBiomarker(node)}
                      className={`px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/30 scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-heading text-sm">{node.name.split(' ')[0]}</span>
                      <span
                        className={`text-[10px] font-medium mt-1 truncate ${
                          isSelected ? 'text-slate-900' : 'text-teal-300/80'
                        }`}
                      >
                        {node.category}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Node Detail Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBiomarker.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                      {activeBiomarker.name}
                    </span>
                    <span className="text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                      {activeBiomarker.category}
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-200">
                    <div>
                      <span className="text-slate-400 font-medium">Common Indication: </span>
                      <span className="text-white font-semibold">{activeBiomarker.cancers}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Therapeutic Target: </span>
                      <span className="text-teal-300 font-semibold">{activeBiomarker.therapy}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                    {activeBiomarker.impact}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom footnote */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Next-Gen Sequencing (NGS) Guidance</span>
              <button
                onClick={openAppointmentModal}
                className="text-teal-300 hover:text-white font-semibold flex items-center space-x-1"
              >
                <span>Consult on NGS</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Side: Treatment Designed Around Your Cancer & Vertical Process */}
          <div className="lg:col-span-6 space-y-8">
            {/* Explanatory Factors Grid */}
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-7 border border-stone-200/80">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center">
                <Layers className="w-4 h-4 text-teal-700 mr-2" />
                Comprehensive Clinical Parameters Evaluated
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Rather than selecting uniform protocols, Dr. Bhushan Parmar cross-evaluates every patient across seven essential clinical pillars:
              </p>

              {/* Factors pill cloud */}
              <div className="flex flex-wrap gap-2">
                {clinicalFactors.map((factor, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-slate-800 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated Vertical Process: 5 Stages */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Precision Oncology Pathway
              </h3>

              <div className="space-y-3">
                {pathwaySteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-800 shadow-lg shadow-slate-900/10'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-teal-500 text-slate-950 font-bold'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold">{step.num}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-sm font-bold font-heading ${
                              isActive ? 'text-teal-300' : 'text-slate-900'
                            }`}
                          >
                            {step.title}
                          </h4>
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? 'text-teal-400' : 'text-slate-400'
                            }`}
                          />
                        </div>

                        <p
                          className={`text-xs mt-1.5 leading-relaxed ${
                            isActive ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {step.details}
                        </p>
                      </div>
                    </div>
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
