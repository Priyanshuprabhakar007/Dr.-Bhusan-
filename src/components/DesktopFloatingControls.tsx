import React from 'react';
import { useData } from '../context/DataContext';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export const DesktopFloatingControls: React.FC = () => {
  const { practiceLocation, openAppointmentModal } = useData();

  const cleanPhone = (practiceLocation?.phonePrimary || '+91 98765 43210').replace(/[^\d+]/g, '');
  const cleanWhatsApp = (practiceLocation?.whatsappNumber || '919876543210').replace(/[^\d]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    'Hello Dr. Bhushan Parmar Oncology Clinic, I would like to inquire regarding consultation / cancer second opinion.'
  )}`;

  return (
    <aside
      className="hidden md:flex fixed right-6 bottom-8 z-40 flex-col items-end space-y-2.5"
      aria-label="Quick contact options"
    >
      {/* Call Button */}
      <a
        href={`tel:${cleanPhone}`}
        id="desktop-float-call-btn"
        className="flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 border border-stone-200/90 shadow-md hover:bg-stone-50 hover:shadow-lg transition-all duration-200 group text-xs font-semibold"
        title="Call Oncology Clinic"
      >
        <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 group-hover:bg-teal-100 transition-colors">
          <Phone className="w-3.5 h-3.5" />
        </div>
        <span className="pr-1 text-slate-700 group-hover:text-slate-900">Call Clinic</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="desktop-float-whatsapp-btn"
        className="flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 border border-stone-200/90 shadow-md hover:bg-stone-50 hover:shadow-lg transition-all duration-200 group text-xs font-semibold"
        title="Chat on WhatsApp"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-100 transition-colors">
          <MessageCircle className="w-3.5 h-3.5" />
        </div>
        <span className="pr-1 text-slate-700 group-hover:text-slate-900">WhatsApp</span>
      </a>

      {/* Book Appointment Button */}
      <button
        onClick={openAppointmentModal}
        id="desktop-float-book-btn"
        className="flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-xs font-semibold group cursor-pointer"
        title="Book Appointment"
      >
        <Calendar className="w-3.5 h-3.5 text-[#18B8B4]" />
        <span>Book Appointment</span>
      </button>
    </aside>
  );
};
