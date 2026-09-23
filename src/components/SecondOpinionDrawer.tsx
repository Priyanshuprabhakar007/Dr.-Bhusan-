import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { UploadedFileMeta } from '../types';
import {
  X,
  ShieldCheck,
  Lock,
  Upload,
  FileText,
  FileCheck,
  FileSpreadsheet,
  FileImage,
  Layers,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecondOpinionDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultCancerType?: string;
}

export const SecondOpinionDrawer: React.FC<SecondOpinionDrawerProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  defaultCancerType = ''
}) => {
  const { isSecondOpinionModalOpen, closeSecondOpinionModal, submitSecondOpinion, practiceLocation } = useData();
  const isOpen = propsIsOpen ?? isSecondOpinionModalOpen;
  const onClose = propsOnClose ?? closeSecondOpinionModal;

  const [headerHeight, setHeaderHeight] = useState(70);

  useEffect(() => {
    if (!isOpen) return;

    const updateHeight = () => {
      const headerEl = document.querySelector('header');
      if (headerEl) {
        setHeaderHeight(headerEl.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    const headerEl = document.querySelector('header');
    if (headerEl) {
      resizeObserver.observe(headerEl);
    }

    window.addEventListener('resize', updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cityCountry: '',
    cancerType: defaultCancerType,
    currentDiagnosis: '',
    previousTreatment: '',
    message: '',
    honeypot: ''
  });

  const [files, setFiles] = useState<UploadedFileMeta[]>([]);
  const [selectedFileCategory, setSelectedFileCategory] = useState<UploadedFileMeta['category']>('Pathology');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultCancerType) {
      setFormData((prev) => ({ ...prev, cancerType: defaultCancerType }));
    }
  }, [defaultCancerType]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const [uploadingFiles, setUploadingFiles] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const uploadedList = Array.from(e.target.files);
    setUploadingFiles(true);

    const newlyCreated: UploadedFileMeta[] = [];

    for (const file of uploadedList) {
      const tempId = 'file-' + Math.random().toString(36).substring(2, 9);
      let assignedFileId = tempId;

      try {
        const formDataPayload = new FormData();
        formDataPayload.append('file', file);
        formDataPayload.append('fileType', selectedFileCategory.toLowerCase());
        formDataPayload.append('requestId', 'temp-' + Date.now());

        const res = await fetch('/api/public/second-opinion/upload-report', {
          method: 'POST',
          body: formDataPayload
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.fileId) {
            assignedFileId = resData.fileId;
          }
        }
      } catch (err) {
        console.warn('Private upload fallback:', err);
      }

      newlyCreated.push({
        id: assignedFileId,
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        uploadedAt: 'Just now',
        category: selectedFileCategory
      });
    }

    setFiles((prev) => [...prev, ...newlyCreated]);
    setUploadingFiles(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.honeypot) return;

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your full name and phone number so our team can follow up.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await submitSecondOpinion({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        cityCountry: formData.cityCountry.trim() || 'Not specified',
        cancerType: formData.cancerType.trim() || defaultCancerType || 'General Oncology',
        currentDiagnosis: formData.currentDiagnosis.trim() || 'Reports attached for review',
        previousTreatment: formData.previousTreatment.trim() || 'None / Not specified',
        message: formData.message.trim(),
        attachedFiles: files
      });

      if (success) {
        setSubmitSuccess(true);
      } else {
        setErrorMessage('Failed to submit consultation request. Please try again or call our clinic directly.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please contact the oncology OPD directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      cityCountry: '',
      cancerType: defaultCancerType,
      currentDiagnosis: '',
      previousTreatment: '',
      message: '',
      honeypot: ''
    });
    setFiles([]);
    setSubmitSuccess(false);
    setErrorMessage(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed left-0 right-0 bottom-0 z-50 overflow-hidden flex justify-end"
          style={{ 
            top: `${headerHeight}px`,
            height: `calc(100dvh - ${headerHeight}px)`
          }}
        >
          {/* Backdrop (Starts below navbar, does not darken or blur navbar) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#05101C]/52 backdrop-blur-[6px]"
          />

          {/* Wrapper to hold the floating panel with proper click-through bounds */}
          <div className="absolute inset-0 flex justify-end pointer-events-none overflow-hidden">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 24, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto bg-white shadow-2xl flex flex-col overflow-hidden border border-slate-200/60
                /* Mobile layout: floating card with consistent 16px padding from viewport edges */
                w-[calc(100vw-32px)] h-[calc(100%-32px)] max-h-[calc(100%-32px)] my-4 mr-4 ml-auto rounded-[20px]
                /* Tablet layout (>= 768px): balanced 24px margins, refined content bounds */
                md:w-[min(600px,calc(100vw-48px))] md:h-[calc(100%-48px)] md:max-h-[calc(100%-48px)] md:my-6 md:mr-6 md:ml-auto md:rounded-[24px]
                /* Large Desktop layout (>= 1024px): luxurious 32px margins */
                lg:w-[min(620px,calc(100vw-64px))] lg:h-[calc(100%-64px)] lg:max-h-[calc(100%-64px)] lg:my-8 lg:mr-8 lg:ml-auto lg:rounded-[28px]
              "
            >
              {/* Top Header */}
              <div className="relative px-6 py-6 sm:pl-8 sm:pr-16 sm:pt-8 sm:pb-6 border-b border-stone-200/80 bg-stone-50/80 flex flex-col shrink-0">
                <div className="self-start inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Confidential Oncology Review</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-tight">
                  Request a Cancer Second Opinion
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Dr. Bhushan Parmar will evaluate your staging, histopathology, and genomic biomarkers.
                </p>
                
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 sm:top-7 sm:right-8 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                  aria-label="Close second opinion drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                /* Success screen */
                <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6 flex flex-col justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 font-heading">
                    Case Submitted Successfully
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you. Your records have been securely routed to Dr. Bhushan Parmar’s oncology review desk.
                    Our clinical coordinator will reach out to you within 24–48 hours to discuss review insights and scheduling.
                  </p>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-700 max-w-md mx-auto text-left space-y-1.5">
                    <div className="font-semibold text-slate-900">For Urgent Medical Assistance:</div>
                    <div>Contact OPD Coordinator: <a href={`tel:${practiceLocation.phonePrimary}`} className="font-bold text-teal-700">{practiceLocation.phonePrimary}</a></div>
                    <div>Location: Paras Hospital, Mohali (Sector 71)</div>
                  </div>

                  <div className="pt-4 flex justify-center space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Scrollable Form */
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden min-w-0">
                  {/* Scrollable Form Content */}
                  <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8 space-y-6 min-w-0">
                    {/* Honeypot anti-spam */}
                    <input
                      type="text"
                      name="hp_website"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-2 text-rose-800 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Row 1: Full Name | Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4.5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-slate-800 mb-2">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Patient's full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-[48px] px-3.5 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-slate-800 mb-2">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 Mobile number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-[48px] px-3.5 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email | City/State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4.5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-slate-800 mb-2">
                          Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-[48px] px-3.5 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-slate-800 mb-2">
                          City / State
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mohali, Chandigarh, Delhi"
                          value={formData.cityCountry}
                          onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                          className="w-full h-[48px] px-3.5 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: Cancer Type | Stage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4.5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-slate-800 mb-2">
                          Cancer Type / Body Area
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Lung, Breast, Colon, Lymphoma"
                          value={formData.cancerType}
                          onChange={(e) => setFormData({ ...formData, cancerType: e.target.value })}
                          className="w-full h-[48px] px-3.5 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-slate-800 mb-2">
                          Current Stage / Diagnosis Details
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Stage III adenocarcinoma, newly diagnosed"
                          value={formData.currentDiagnosis}
                          onChange={(e) => setFormData({ ...formData, currentDiagnosis: e.target.value })}
                          className="w-full h-[48px] px-3.5 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Full-width Fields: Previous Treatments */}
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-800 mb-2">
                        Previous Treatments (If Any)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Surgery done in July, 2 cycles chemo completed, or treatment not yet started"
                        value={formData.previousTreatment}
                        onChange={(e) => setFormData({ ...formData, previousTreatment: e.target.value })}
                        className="w-full h-[48px] px-3.5 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    </div>

                    {/* Full-width Fields: Specific Questions */}
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-800 mb-2">
                        Specific Questions or Message for the Doctor
                      </label>
                      <textarea
                        rows={3}
                        placeholder="What are your key questions regarding next steps, immunotherapy, or targeted therapy?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full min-h-[100px] px-3.5 py-3 bg-stone-50/70 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
                      />
                    </div>

                    {/* Report Upload Section */}
                    <div className="pt-6 border-t border-slate-200/60 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-slate-800 flex items-center space-x-1.5">
                          <Upload className="w-3.5 h-3.5 text-teal-600" />
                          <span>Attach Diagnostic Reports</span>
                        </label>
                        <span className="text-[11px] text-slate-500">PDF, JPG, PNG (up to 20MB)</span>
                      </div>

                      {/* Category selector */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(['Biopsy', 'Pathology', 'PET-CT/CT', 'Previous Summary', 'Other'] as const).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedFileCategory(cat)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                              selectedFileCategory === cat
                                ? 'bg-teal-600 text-white font-semibold'
                                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Dropzone */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2.5 border-2 border-dashed border-slate-200 hover:border-teal-500/60 rounded-[16px] px-5 py-[22px] min-h-[100px] text-center cursor-pointer bg-stone-50/50 hover:bg-teal-50/30 transition-all flex flex-col justify-center items-center"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Upload className="w-5 h-5 text-teal-600 mb-1.5" />
                        <p className="text-xs font-semibold text-slate-800">
                          Click to browse or drop reports here
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Supported: Biopsy, Histopathology, PET-CT, CT, MRI, Discharge Summaries
                        </p>
                      </div>

                      {/* File list */}
                      {files.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          {files.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 shadow-xs"
                            >
                              <div className="flex items-center space-x-2 truncate pr-2">
                                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                                <span className="truncate font-medium">{file.name}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 shrink-0 font-semibold">
                                  {file.category}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Privacy Guarantee Note */}
                    <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-start space-x-3.5 text-teal-950 text-xs min-w-0">
                      <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-teal-950 mb-1">
                          Privacy & Medical Confidentiality
                        </span>
                        <p className="text-[11px] text-teal-900/90 leading-relaxed">
                          Your medical information is handled securely and privately in accordance with strict patient-data confidentiality standards. Uploaded files are reviewed solely by Dr. Bhushan Parmar and his clinical oncology team.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Sticky Submit Footer */}
                  <div 
                    className="px-6 py-5 sm:px-8 sm:py-6 bg-white border-t border-slate-200/80 shrink-0 shadow-[-4px_0_12px_rgba(0,0,0,0.02)]"
                    style={{
                      paddingBottom: 'max(24px, env(safe-area-inset-bottom))'
                    }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                          <span>Submitting Medical Case...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Records for Second Opinion</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
