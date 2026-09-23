import React from 'react';
import { X, CheckCircle2, Award, Building2 } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AboutDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutDoctorModal: React.FC<AboutDoctorModalProps> = ({ isOpen, onClose }) => {
  const { doctorProfile, openAppointmentModal } = useData();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-stone-200 z-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          {Boolean((doctorProfile.aboutPhoto || doctorProfile.photoUrl)?.trim()) && (
            <img
              src={(doctorProfile.aboutPhoto || doctorProfile.photoUrl)?.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'}
              alt={doctorProfile.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-stone-200 shadow-xs shrink-0"
              referrerPolicy="no-referrer"
            />
          )}
          <div>
            <span className="text-xs font-semibold tracking-wider text-teal-800 uppercase">
              Medical Oncologist Profile
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-heading mt-0.5">
              {doctorProfile.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {doctorProfile.positioning} • {doctorProfile.experienceYears} Years Oncology Experience
            </p>
          </div>
        </div>

        {/* Full Bio */}
        <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed pb-6 border-b border-stone-100">
          {(doctorProfile?.fullBio || []).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Qualifications Timeline */}
        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
            Education & Super-Specialty Training
          </h3>
          <div className="space-y-4">
            {(doctorProfile?.qualifications || []).map((q, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-teal-700 mt-2 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">{q.degree}</div>
                  <div className="text-xs text-slate-500">{q.institution}</div>
                  {q.description && (
                    <div className="text-xs text-slate-600 mt-0.5">{q.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              openAppointmentModal();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Book Consultation
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
