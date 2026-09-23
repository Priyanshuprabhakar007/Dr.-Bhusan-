import React, { useRef } from 'react';
import { useData } from '../context/DataContext';
import {
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2
} from 'lucide-react';

export const PatientReviews: React.FC = () => {
  const { testimonials } = useData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white border-b border-stone-200/60 overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Google Score Card */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 mr-1" />
              <span className="text-xs font-bold text-teal-800 tracking-wider uppercase">
                Verified Patient Voices
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Patient Reflections & Experiences
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Honest perspectives from patients and families guided through systemic oncology care and second opinions.
            </p>
          </div>

          {/* Google Reviews Aggregate Pill & Controls */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="bg-stone-50 px-5 py-3 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-900 text-sm shadow-xs">
                G
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-900 ml-1">5.0 / 5.0</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Verified Google Reviews
                </div>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={scrollLeft}
                aria-label="Previous Reviews"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next Reviews"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel (3 partial on desktop, 1.1 on mobile) */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="snap-start w-[85vw] sm:w-[360px] lg:w-[380px] shrink-0 bg-stone-50/60 rounded-3xl border border-stone-200/90 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars and Quote mark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-teal-700/20" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.reviewText}"
                </p>
              </div>

              {/* Patient details */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 flex items-center">
                    {item.patientName}
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 ml-1.5 inline" />
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.condition}</p>
                </div>
                <div className="text-[10px] font-bold tracking-wider text-slate-400 bg-white px-2.5 py-1 rounded-md border border-slate-200/60">
                  {item.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
