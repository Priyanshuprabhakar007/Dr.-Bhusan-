import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { LocationItem } from '../types/admin';
import { MapPin, Phone, Mail, Clock, Calendar, MessageSquare, ArrowLeft, Send, CheckCircle, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  onBackToHome?: () => void;
  onOpenAppointment?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome, onOpenAppointment }) => {
  const { locations, contactEnquiries, submitContactEnquiry } = useData() as {
    locations: LocationItem[];
    contactEnquiries: any[];
    submitContactEnquiry: (enquiry: any) => void;
  };

  const [selectedLocationId, setSelectedLocationId] = useState<string>(locations[0]?.id || 'loc-1');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeLocation = locations.find((l) => l.id === selectedLocationId) || locations[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formMessage) return;

    submitContactEnquiry({
      id: `enq-${Date.now()}`,
      name: formName,
      phone: formPhone,
      email: formEmail,
      message: formMessage,
      locationId: activeLocation?.id,
      hospitalName: activeLocation?.hospitalName,
      status: 'New',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });

    setIsSubmitted(true);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormMessage('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans antialiased text-left">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-xs font-bold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </button>
        <button
          onClick={onOpenAppointment}
          className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
        >
          Book Appointment
        </button>
      </header>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#073F3D] to-[#0A4D4A] text-white py-16 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#18B8B4_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-[#18B8B4] text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Hospital Locations & Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            Connect With Dr. Bhushan Parmar
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Visit our medical oncology OPD suites in Mohali & Punjab or send a confidential clinical enquiry.
          </p>
        </div>
      </section>

      {/* Main Content: Two-Column Split (40% Cards / 60% Map) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Location Cards (approx 40% / 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="mb-2">
              <h2 className="text-xl font-bold font-heading text-slate-900">Hospital & OPD Centers</h2>
              <p className="text-xs text-slate-500">Select a center to view location details and map directions.</p>
            </div>

            {locations.map((loc) => {
              const isSelected = loc.id === activeLocation?.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-teal-700 shadow-lg ring-2 ring-teal-700/20'
                      : 'bg-white/85 border-stone-200/80 hover:border-stone-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      {loc.isPrimary && (
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-900 text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                          Primary Practice Center
                        </span>
                      )}
                      <h3 className="text-base font-bold font-heading text-slate-900">{loc.hospitalName}</h3>
                      <p className="text-xs text-teal-800 font-medium">{loc.department}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-teal-800 text-white' : 'bg-stone-100 text-slate-400'}`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 mb-4 pt-3 border-t border-stone-100">
                    <p className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                      <span>{loc.addressLine1}, {loc.addressLine2 ? `${loc.addressLine2}, ` : ''}{loc.city}, {loc.state} - {loc.pincode}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-teal-800 shrink-0" />
                      <span>{loc.consultationDays} ({loc.openingTime} - {loc.closingTime})</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-teal-800 shrink-0" />
                      <a href={`tel:${loc.phonePrimary}`} className="text-teal-900 font-semibold hover:underline">
                        {loc.phonePrimary}
                      </a>
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <a
                      href={loc.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                    <a
                      href={`https://wa.me/${(loc.whatsappNumber || '919876543210').replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <span>WhatsApp OPD</span>
                    </a>
                  </div>
                </div>
              );
            })}

            {/* General Enquiry Form Card */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xs">
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-1">Send a Direct Enquiry</h3>
              <p className="text-xs text-slate-500 mb-6">Our patient care team will respond within 2 hours.</p>

              {isSubmitted ? (
                <div className="p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-teal-700 mx-auto" />
                  <h4 className="text-sm font-bold text-teal-900">Enquiry Sent Successfully</h4>
                  <p className="text-xs text-teal-700">Thank you. Our medical coordinator has received your message.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-teal-900 underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                      placeholder="e.g. Rajesh Kumar"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Clinical Query *</label>
                    <textarea
                      rows={3}
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                      placeholder="Describe your query or appointment request..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#073F3D] hover:bg-[#0A4D4A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#18B8B4]" />
                    <span>Send Confidential Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Large Interactive Map (approx 60% / 7 cols) */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-white p-4 rounded-3xl border border-stone-200/80 shadow-md">
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Interactive Location Map — {activeLocation.hospitalName}
                  </span>
                </div>
                <a
                  href={activeLocation.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-teal-800 hover:underline flex items-center space-x-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Container */}
              <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-stone-200 relative shadow-inner border border-stone-200">
                <iframe
                  title={`Map for ${activeLocation.hospitalName}`}
                  src={activeLocation.googleMapsEmbedUrl && activeLocation.googleMapsEmbedUrl.trim() ? activeLocation.googleMapsEmbedUrl.trim() : 'https://maps.google.com/maps?q=Max+Hospital+Mohali&t=&z=14&ie=UTF8&iwloc=&output=embed'}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Active Location Summary Footer */}
              <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900">{activeLocation.hospitalName}</h4>
                  <p className="text-[11px] text-slate-500">{activeLocation.addressLine1}, {activeLocation.city}</p>
                </div>
                <button
                  onClick={onOpenAppointment}
                  className="px-5 py-2.5 rounded-xl bg-[#18B8B4] hover:bg-[#149E9A] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Book OPD Slot Here
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
