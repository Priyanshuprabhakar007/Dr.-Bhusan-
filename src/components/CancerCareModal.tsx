import React from 'react';
import {
  X,
  Activity,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface RegionData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  conditions: string[];
  treatments: {
    name: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

interface CancerCareModalProps {
  region: RegionData | null;
  onClose: () => void;
  onOpenSecondOpinion: () => void;
  onOpenAppointment: () => void;
}

export const CancerCareModal: React.FC<CancerCareModalProps> = ({
  region,
  onClose,
  onOpenSecondOpinion,
  onOpenAppointment
}) => {
  if (!region) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-900 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Medical Oncology Protocol</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              {region.name}
            </h3>
            <p className="text-xs font-semibold text-teal-800 mt-0.5">
              {region.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-6 mb-8 text-left">
            <p className="text-slate-600 text-sm leading-relaxed">
              {region.description}
            </p>

            {/* Common Conditions Treated */}
            <div className="bg-stone-50/80 rounded-2xl p-5 border border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-teal-700 mr-2 shrink-0" />
                <span>Conditions Evaluated & Treated</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {region.conditions.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Options May Include */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                <span>Treatment Options May Include</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Treatment is tailored to each individual following staging, molecular profiling, and multidisciplinary tumor board discussion:
              </p>
              <div className="flex flex-wrap gap-2">
                {region.treatments.map((treatment: { name: string; icon?: React.ComponentType<{ className?: string }> }, idx: number) => {
                  const TreatmentIcon = treatment.icon;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 rounded-xl bg-teal-50/80 border border-teal-200/80 text-teal-900 text-xs font-medium"
                    >
                      {TreatmentIcon && (
                        <TreatmentIcon className="w-3.5 h-3.5 text-teal-700 mr-1.5 shrink-0" />
                      )}
                      <span>{treatment.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Evidence Note */}
            <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-100 flex items-start space-x-3 text-left">
              <ShieldCheck className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
              <p className="text-[11px] text-teal-950 leading-relaxed">
                Treatment planning strictly adheres to evidence-based international oncology guidelines (NCCN / ESMO / ASCO) and personalized genomic findings.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenAppointment();
              }}
              className="h-11 px-6 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book In-Person Consultation</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSecondOpinion();
              }}
              className="h-11 px-6 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold tracking-wide transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-teal-800" />
              <span>Get Second Opinion on Reports</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
