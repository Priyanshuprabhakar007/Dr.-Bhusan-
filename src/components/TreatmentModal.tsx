import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Treatment } from '../types';
import { useData } from '../context/DataContext';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({ treatment, onClose }) => {
  const { openAppointmentModal } = useData();

  if (!treatment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-stone-200 z-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {Boolean((treatment.featuredImage || (treatment as any).image)?.trim()) && (
          <div className="mb-4 rounded-xl overflow-hidden aspect-[16/9] bg-stone-100 border border-stone-200">
            <img
              src={(treatment.featuredImage || (treatment as any).image)?.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'}
              alt={treatment.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="mb-4">
          <span className="text-xs font-semibold tracking-wider text-teal-800 uppercase">
            Treatment Pathway
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-heading mt-1">
            {treatment.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {treatment.category} Oncology
          </p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {treatment.overview || treatment.shortDesc}
        </p>

        {treatment.keyBenefits && treatment.keyBenefits.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Key Clinical Benefits
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {treatment.keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              openAppointmentModal();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Consult on This Treatment
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
