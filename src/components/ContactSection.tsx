import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Loader2,
  Building2,
  Stethoscope
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { practiceLocation, submitAppointment } = useData();

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

  const cleanPhone = (practiceLocation?.phonePrimary || '+91 98765 43210').replace(/[^\d+]/g, '');
  const cleanWhatsApp = (practiceLocation?.whatsappNumber || '919876543210').replace(/[^\d]/g, '');

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.honeypot) return;

    if (!formData.patientName.trim() || !formData.phone.trim() || !formData.preferredDate) {
      setError('Please provide your name, phone number, and preferred date.');
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
      setFormData({
        patientName: '',
        phone: '',
        email: '',
        preferredDate: '',
        preferredSlot: 'Morning (10:00 AM – 01:00 PM)',
        consultationType: 'In-Person (Hospital)',
        cancerTypeOrConcern: '',
        notes: '',
        honeypot: ''
      });
    } catch (err) {
      setError('Could not process booking. Please call the clinic directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="locations" className="py-20 lg:py-28 bg-white border-b border-stone-200/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-teal-700 mr-1" />
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase">
              Outpatient Clinic & Practice Location
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Where to Consult
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Consult Dr. Bhushan Parmar at Paras Hospital, Mohali. Clear OPD timings, direct department desk contact, and appointment scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hospital & Timings Card */}
            <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                    Practice Center
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {practiceLocation.hospitalName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {practiceLocation.department}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-600 border-t border-slate-200/80">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>
                    {practiceLocation.addressLine1}, {practiceLocation.addressLine2}, {practiceLocation.city} – {practiceLocation.pincode}, {practiceLocation.state}
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      {practiceLocation.consultationTimings}
                    </span>
                    <span className="text-slate-500">Days: {practiceLocation.daysAvailable}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="font-bold text-slate-900 hover:text-sky-700"
                    >
                      {practiceLocation.phonePrimary}
                    </a>
                    {practiceLocation.phoneSecondary && (
                      <span className="text-slate-500 block">
                        Alt: {practiceLocation.phoneSecondary}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${practiceLocation.emailContact}`}
                    className="text-slate-700 hover:text-sky-700 underline"
                  >
                    {practiceLocation.emailContact}
                  </a>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call OPD Desk</span>
                </a>
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                    'Hello Dr. Bhushan Parmar Oncology Clinic, I would like to schedule an appointment.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <iframe
                title="Dr. Bhushan Parmar Oncology Clinic Location"
                src={practiceLocation.googleMapsEmbedUrl && practiceLocation.googleMapsEmbedUrl.trim() ? practiceLocation.googleMapsEmbedUrl.trim() : 'https://maps.google.com/maps?q=Max+Hospital+Mohali&t=&z=14&ie=UTF8&iwloc=&output=embed'}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Mohali, Punjab</span>
                <a
                  href={practiceLocation.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-sky-700 hover:text-sky-900"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: In-Person / Video Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Book a Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Schedule your hospital OPD or tele-oncology consultation with Dr. Bhushan Parmar.
                </p>
              </div>

              {success ? (
                <div className="text-center py-10 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 font-heading">
                    Appointment Request Received
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Our oncology clinic coordinator will contact you promptly to confirm the appointment time slot and advise on reports to bring.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-3 px-5 py-2 rounded-xl bg-sky-700 text-white text-xs font-semibold hover:bg-sky-800"
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="phone_check"
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
                    <div className="grid grid-cols-2 gap-3">
                      {(['In-Person (Hospital)', 'Video Consultation'] as const).map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFormData({ ...formData, consultationType: mode })}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                            formData.consultationType === mode
                              ? 'bg-sky-50 border-sky-500 text-sky-800 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Patient Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Patient Full Name"
                        value={formData.patientName}
                        onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.preferredSlot}
                        onChange={e => setFormData({ ...formData, preferredSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      >
                        <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                        <option value="Afternoon (01:00 PM – 04:00 PM)">Afternoon (01:00 PM – 04:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Cancer Type or Primary Concern
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Breast Cancer Staging, Lung Nodule, Second Opinion"
                      value={formData.cancerTypeOrConcern}
                      onChange={e => setFormData({ ...formData, cancerTypeOrConcern: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Additional Clinical Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any prior chemotherapy, surgery date, or specific questions..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold text-xs uppercase tracking-wide shadow-md shadow-sky-600/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Request...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        <span>Confirm Appointment Booking</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
