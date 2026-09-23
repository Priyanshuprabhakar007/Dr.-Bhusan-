import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { LocalSeoPageData } from '../types';
import {
  MapPin,
  CheckCircle2,
  Calendar,
  Building2,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  X,
  Phone
} from 'lucide-react';

export const LocalSeoSection: React.FC = () => {
  const { localSeoList, practiceLocation, openAppointmentModal } = useData();
  const [selectedSeoPage, setSelectedSeoPage] = useState<LocalSeoPageData | null>(null);

  return (
    <section className="py-14 bg-white border-b border-slate-200/70" id="local-care">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center space-x-2 text-sky-700 text-xs font-bold uppercase tracking-wider bg-sky-50 border border-sky-200/60 px-3 py-1 rounded-full mb-2">
            <MapPin className="w-3.5 h-3.5 mr-1 text-sky-600" />
            Regional Oncology Center • Mohali & Tricity
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Dedicated Oncology Care in Mohali & Greater Punjab
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Patients across Mohali, Chandigarh, Panchkula, and Himachal Pradesh access tertiary medical oncology care under Dr. Bhushan Parmar.
          </p>
        </div>

        {/* 5 Local SEO Badges / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {localSeoList.map(item => (
            <div
              key={item.slug}
              onClick={() => setSelectedSeoPage(item)}
              className="cursor-pointer bg-slate-50 hover:bg-sky-50/70 border border-slate-200/90 hover:border-sky-300 p-4 rounded-2xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block mb-1">
                  Mohali Regional Care
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-sky-800 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {item.intro}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-sky-700">
                <span>View Local Details</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local SEO Details Modal */}
      {selectedSeoPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Mohali Clinical Practice</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  {selectedSeoPage.h1}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSeoPage(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600">
              <p className="text-slate-700 leading-relaxed font-medium">
                {selectedSeoPage.intro}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Clinical Services Offered at Mohali Center:
                </h4>
                <div className="space-y-1.5">
                  {selectedSeoPage.servicesOffered.map((serv, i) => (
                    <div key={i} className="flex items-start space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{serv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-100">
                <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2">
                  Why Consult Dr. Bhushan Parmar in Mohali:
                </h4>
                <div className="space-y-1.5">
                  {selectedSeoPage.whyChooseDrBhushan.map((why, i) => (
                    <div key={i} className="flex items-start space-x-2 text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{why}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900">{practiceLocation.hospitalName}</div>
                  <div className="text-slate-500">{practiceLocation.addressLine1}, {practiceLocation.city}</div>
                  <div className="text-slate-500">Timings: {practiceLocation.consultationTimings}</div>
                </div>
                <a
                  href={`tel:${(practiceLocation?.phonePrimary || '+91 98765 43210').replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  {practiceLocation.phonePrimary}
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedSeoPage(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedSeoPage(null);
                  openAppointmentModal();
                }}
                className="inline-flex items-center text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Book Consultation in Mohali
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
