import React, { useState, useRef } from 'react';
import { ArrowRight, Clock, BookOpen, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { motion, useInView } from 'motion/react';
import { MaskedHeading, EDITORIAL_EASE } from './MotionUtils';
import { CmsImage } from './common/CmsImage';
import { getMediaUrl } from '../lib/cloudflareMedia';

export const BlogSection: React.FC = () => {
  const { blogPosts: cmsBlogPosts, mediaAssets, openAppointmentModal } = useData();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  const articles = cmsBlogPosts.map((post: any) => {
    const rawImg = post.featuredImageUrl || post.featuredImage || post.image || '';
    const resolvedImg = getMediaUrl(rawImg, mediaAssets) || rawImg || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80';
    return {
      id: post.id,
      title: post.title,
      category: post.category || 'Medical Oncology',
      readTime: post.readTime || post.readingTime || '4 min read',
      summary: post.summary || post.excerpt || '',
      fullContent: Array.isArray(post.content) ? post.content.join('\n\n') : (post.content || post.mainContent || ''),
      image: resolvedImg
    };
  });

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="py-20 sm:py-24 lg:py-28 bg-[#F0F7F7] scroll-mt-16"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & View All Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="text-left">
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-teal-800 uppercase block mb-2"
            >
              PATIENT RESOURCES
            </motion.span>

            <MaskedHeading
              lines={['Understand your cancer care better']}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.12] font-heading"
              delay={0.1}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EDITORIAL_EASE }}
              className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl"
            >
              Clear, evidence-grounded medical guides written to answer the critical questions patients and caregivers encounter throughout treatment.
            </motion.p>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.history.pushState({}, '', '/blogs');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="h-11 px-6 rounded-full bg-white hover:bg-stone-50 text-slate-800 border border-stone-200 shadow-2xs text-xs font-semibold self-start md:self-auto flex items-center space-x-2 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-800" />
            <span>View All Resources</span>
          </motion.button>
        </div>

        {/* 4 Staggered Editorial Article Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.98 }}
              transition={{
                duration: 0.55,
                delay: 0.2 + idx * 0.08,
                ease: EDITORIAL_EASE
              }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedArticle(article)}
              className="group rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer will-change-transform"
            >
              {/* Large Image with hover scale */}
              <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                <CmsImage
                  src={article.image}
                  mediaAssets={mediaAssets}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                />
              </div>

              {/* Card Meta & Content */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2.5">
                    <span className="text-teal-800 uppercase tracking-wider font-bold">
                      {article.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug mb-3 group-hover:text-teal-800 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-teal-800 group-hover:text-teal-950 pt-2 border-t border-stone-100">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-stone-200 z-10 text-left">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 text-xs font-bold text-teal-800 uppercase tracking-wider mb-3">
              <span>{selectedArticle.category}</span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-slate-500 normal-case font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-4 leading-tight">
              {selectedArticle.title}
            </h3>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-stone-100">
              <CmsImage
                src={selectedArticle.image}
                mediaAssets={mediaAssets}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 mb-8">
              {selectedArticle.fullContent.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h5 className="text-xs font-bold text-teal-950 uppercase tracking-wider">
                  Have questions about this topic?
                </h5>
                <p className="text-xs text-slate-600 mt-0.5">
                  Schedule a consultation to discuss your specific clinical diagnosis.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  openAppointmentModal();
                }}
                className="h-10 px-5 rounded-full bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold shrink-0 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
