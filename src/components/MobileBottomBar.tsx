import React from 'react';
import { useData } from '../context/DataContext';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { practiceLocation, openAppointmentModal } = useData();

  const cleanPhone = (practiceLocation?.phonePrimary || '+91 98765 43210').replace(/[^\d+]/g, '');
  const cleanWhatsApp = (practiceLocation?.whatsappNumber || '919876543210').replace(/[^\d]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    'Hello Dr. Bhushan Parmar Oncology Clinic, I would like to inquire regarding consultation / cancer second opinion.'
  )}`;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-3 py-2.5 shadow-lg"
      id="mobile-action-bar"
    >
      <div className="grid grid-cols-3 gap-2.5 items-center">
        {/* Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          id="mobile-call-btn"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 transition-colors text-center"
        >
          <Phone className="w-4 h-4 text-slate-700 mb-0.5" />
          <span className="text-xs font-semibold">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-whatsapp-btn"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 transition-colors text-center"
        >
          <MessageCircle className="w-4 h-4 text-teal-800 mb-0.5" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </a>

        {/* Book Button */}
        <button
          onClick={openAppointmentModal}
          id="mobile-book-btn"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#073F3D] text-white shadow-xs transition-colors text-center cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#18B8B4] mb-0.5" />
          <span className="text-xs font-semibold">Book</span>
        </button>
      </div>
    </div>
  );
};
