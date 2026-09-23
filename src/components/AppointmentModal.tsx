import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useData } from '../context/DataContext';
import {
  X,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { isAppointmentModalOpen, closeAppointmentModal, practiceLocation, submitAppointment } = useData();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredSlot: 'Morning (10:00 AM – 01:00 PM)',
    consultationType: 'In-Person (Hospital)' as 'In-Person (Hospital)' | 'Video Consultation',
    cancerTypeOrConcern: '',
    notes: '',
    honeypot: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Body scroll lock & modal-open class
  useEffect(() => {
    if (isAppointmentModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isAppointmentModalOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAppointmentModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAppointmentModalOpen]);

  if (!isAppointmentModalOpen) return null;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.honeypot) return;

    if (!formData.patientName.trim() || !formData.phone.trim() || !formData.preferredDate) {
      setError('Please provide patient name, phone number, and preferred date.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitAppointment({
        patientName: formData.patientName,
        phone: formData.phone,
        email: formData.email,
        preferredDate: formData.preferredDate,
        preferredSlot: formData.preferredSlot,
        consultationType: formData.consultationType,
        cancerTypeOrConcern: formData.cancerTypeOrConcern,
        notes: formData.notes
      });
      setSuccess(true);
    } catch (err) {
      setError('Could not process booking. Please call the clinic directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    closeAppointmentModal();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[20000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      style={{
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative z-[20001] bg-white w-full max-w-lg sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-48px)] my-0 sm:my-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 px-5 sm:px-6 py-4 sm:py-5 bg-[#073F3D] text-white flex items-center justify-between shrink-0 border-b border-teal-800/40 shadow-xs">
          <div className="flex items-center space-x-3 sm:space-x-3.5 pr-4 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-teal-800/80 border border-teal-600/40 flex items-center justify-center text-teal-200 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 id="booking-modal-title" className="text-base sm:text-lg font-bold font-heading text-white leading-tight truncate">
                Book Oncology Consultation
              </h3>
              <p className="text-xs text-teal-200/90 font-medium truncate mt-0.5">
                Dr. Bhushan Parmar • Senior Consultant
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-teal-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 text-slate-800">
          {success ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 font-heading">
                Appointment Requested!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you. We have logged your request. Our oncology coordinator will contact you at <strong>{formData.phone}</strong> shortly to confirm your consultation schedule.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-600 text-left space-y-1.5 border border-slate-200/60">
                <div><strong>Center:</strong> {practiceLocation.hospitalName}</div>
                <div><strong>Mode:</strong> {formData.consultationType}</div>
                <div><strong>Requested Date:</strong> {formData.preferredDate}</div>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-xl bg-[#073F3D] text-white text-xs font-bold hover:bg-[#0A4D4A] transition-colors shadow-xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                name="user_ref"
                value={formData.honeypot}
                onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
              />

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Consultation Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['In-Person (Hospital)', 'Video Consultation'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, consultationType: mode })}
                      className={`h-11 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        formData.consultationType === mode
                          ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.patientName}
                  onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={formData.preferredSlot}
                    onChange={e => setFormData({ ...formData, preferredSlot: e.target.value })}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 cursor-pointer"
                  >
                    <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                    <option value="Afternoon (01:00 PM – 04:00 PM)">Afternoon (01:00 PM – 04:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Cancer Type / Primary Medical Concern
                </label>
                <input
                  type="text"
                  placeholder="e.g. Breast, Lung, Lymphoma, Second Opinion..."
                  value={formData.cancerTypeOrConcern}
                  onChange={e => setFormData({ ...formData, cancerTypeOrConcern: e.target.value })}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Brief Medical Summary or Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of biopsy, staging, or questions for Dr. Parmar..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 px-6 rounded-xl bg-[#073F3D] hover:bg-[#0A4D4A] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#073F3D]/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Booking Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-1 text-[#18B8B4]" />
                      <span>Request Consultation Slot</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-1">
                Hospital OPD Desk: {practiceLocation.phonePrimary} • Timing: {practiceLocation.consultationTimings}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
