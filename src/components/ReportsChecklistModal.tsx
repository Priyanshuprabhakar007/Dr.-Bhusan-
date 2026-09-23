import React from 'react';
import { X, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ReportsChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportsChecklistModal: React.FC<ReportsChecklistModalProps> = ({ isOpen, onClose }) => {
  const { openSecondOpinionModal } = useData();

  if (!isOpen) return null;

  const reportItems = [
    {
      title: 'Biopsy / Histopathology Report',
      desc: 'Mandatory confirmation of tissue diagnosis, tumor type, grade, and histology.'
    },
    {
      title: 'IHC (Immunohistochemistry) & Molecular Tests',
      desc: 'Receptor status (ER/PR/HER2), PD-L1, EGFR, ALK, KRAS, BRAF, or NGS genetic profiling if performed.'
    },
    {
      title: 'Radiology & Imaging Scans',
      desc: 'Recent PET-CT, Contrast CT (CECT), or MRI reports including baseline and comparison scans.'
    },
    {
      title: 'Current Treatment Summary / Discharge Cards',
      desc: 'Details of any surgery, chemotherapy cycles, targeted therapies, or radiation received till date.'
    },
    {
      title: 'Recent Blood Work',
      desc: 'Complete blood count (CBC), liver & renal function tests (LFT/KFT), and tumor markers (CEA, CA-125, PSA, etc.).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Oncology Review Checklist</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            What Reports Do I Need for a Second Opinion?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Bringing or uploading these documents ensures Dr. Bhushan Parmar can provide a thorough, accurate assessment.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {reportItems.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-stone-50/80 border border-stone-100">
              <CheckCircle2 className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              openSecondOpinionModal();
            }}
            className="h-11 px-6 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center space-x-2"
          >
            <span>Proceed to Request Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
