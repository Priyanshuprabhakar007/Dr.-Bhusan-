import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FAQItem, Testimonial } from '../../types';
import {
  HelpCircle,
  Star,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Check
} from 'lucide-react';

export const FaqReviewsEditor: React.FC = () => {
  const {
    faqs = [],
    updateFAQ,
    addFAQ,
    deleteFAQ,
    testimonials = [],
    updateTestimonials
  } = useData() as any;

  const [activeTab, setActiveTab] = useState<'faqs' | 'reviews'>('faqs');
  const [saveToast, setSaveToast] = useState(false);

  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      id: 'faq-' + Date.now(),
      category: 'Consultation & Logistics',
      question: 'What documents should I bring to my first oncology appointment?',
      answer: 'Please bring all previous histopathology reports, biopsy slides or blocks, PET-CT/MRI/CT scans, surgical operative notes, and a list of all current medications.'
    };
    addFAQ(newFaq);
    triggerToast();
  };

  const handleAddReview = () => {
    const newRev: Testimonial = {
      id: 'rev-' + Date.now(),
      patientName: 'Patient Family Member',
      source: 'Google Review',
      rating: 5,
      date: 'Recent',
      condition: 'Targeted Therapy Review',
      reviewText: 'Dr. Bhushan Parmar was extremely compassionate, thoroughly explaining the genomic biomarker report and outlining our next treatment steps clearly.',
      verified: true
    };
    const currentTestimonials = Array.isArray(testimonials) ? testimonials : [];
    updateTestimonials([newRev, ...currentTestimonials]);
    triggerToast();
  };

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Clinical FAQs & Patient Testimonials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage frequently asked clinical questions and verified patient experience stories.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'faqs' ? (
            <button
              type="button"
              onClick={handleAddFaq}
              className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#18B8B4]" />
              <span>Add FAQ</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddReview}
              className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#18B8B4]" />
              <span>Add Review</span>
            </button>
          )}
        </div>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Updates saved successfully and refreshed across website!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === 'faqs'
              ? 'border-[#073F3D] text-[#073F3D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#149A96]" />
          <span>Frequently Asked Questions ({(faqs || []).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === 'reviews'
              ? 'border-[#073F3D] text-[#073F3D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Star className="w-4 h-4 text-amber-500" />
          <span>Patient Testimonials ({(testimonials || []).length})</span>
        </button>
      </div>

      {/* FAQs Panel */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          {(faqs || []).map((faq: any, idx: number) => (
            <div
              key={faq.id || `faq-${idx}`}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <input
                  type="text"
                  value={faq.category}
                  onChange={e => updateFAQ(faq.id, { category: e.target.value })}
                  placeholder="Category (e.g. Treatment Logistics)"
                  className="px-2 py-1 rounded-lg bg-teal-50 text-teal-900 text-[11px] font-semibold border border-teal-200"
                />

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Delete this FAQ?')) {
                        deleteFAQ(faq.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={e => updateFAQ(faq.id, { question: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinical Answer
                </label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={e => updateFAQ(faq.id, { answer: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Panel */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(testimonials || []).map((rev: any, idx: number) => (
            <div
              key={rev.id || `rev-${idx}`}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, starI) => (
                    <Star
                      key={starI}
                      className={`w-3.5 h-3.5 ${starI < rev.rating ? 'fill-current' : 'text-slate-200'}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const currentTestimonials = Array.isArray(testimonials) ? testimonials : [];
                    const updated = currentTestimonials.filter((_, i) => i !== idx);
                    updateTestimonials(updated);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500">Patient / Family</label>
                  <input
                    type="text"
                    value={rev.patientName}
                    onChange={e => {
                      const updated = [...testimonials];
                      updated[idx].patientName = e.target.value;
                      updateTestimonials(updated);
                    }}
                    className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500">Condition / Treatment</label>
                  <input
                    type="text"
                    value={rev.condition}
                    onChange={e => {
                      const updated = [...testimonials];
                      updated[idx].condition = e.target.value;
                      updateTestimonials(updated);
                    }}
                    className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500">Review Feedback</label>
                <textarea
                  rows={3}
                  value={rev.reviewText}
                  onChange={e => {
                    const updated = [...testimonials];
                    updated[idx].reviewText = e.target.value;
                    updateTestimonials(updated);
                  }}
                  className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
