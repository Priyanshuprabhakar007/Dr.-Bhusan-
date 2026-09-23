import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BlogPostRecord } from '../types/admin';
import { CmsImage } from './common/CmsImage';
import { getMediaUrl } from '../lib/cloudflareMedia';
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, BookOpen, Share2, Sparkles, UserCheck } from 'lucide-react';

interface BlogsPageProps {
  onBackToHome?: () => void;
  onOpenAppointment?: () => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onBackToHome, onOpenAppointment }) => {
  const { blogPosts, doctorProfile, mediaAssets } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const categories = [
    'All',
    'Cancer Awareness',
    'Chemotherapy',
    'Immunotherapy',
    'Targeted Therapy',
    'Precision Oncology',
    'Breast Cancer',
    'Lung Cancer',
    'Blood Cancer',
    'Patient Guidance'
  ];

  const publishedPosts = blogPosts.filter((p) => p.status === 'published');

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredArticle = publishedPosts[0] || filteredPosts[0];
  const remainingArticles = filteredPosts.filter((p) => p.id !== (featuredArticle?.id && selectedCategory === 'All' && !searchQuery ? featuredArticle.id : ''));

  const activeArticle = publishedPosts.find((p) => p.id === selectedArticleId || p.slug === selectedArticleId);

  if (activeArticle) {
    return (
      <div className="min-h-screen bg-stone-50 text-slate-900 font-sans antialiased text-left">
        {/* Sticky Article Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="flex items-center space-x-2 text-xs font-bold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: activeArticle.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={onOpenAppointment}
              className="px-4 py-1.5 rounded-xl bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Consult Dr. Parmar
            </button>
          </div>
        </header>

        {/* Article Reader Container */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-bold uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-teal-800" />
                <span>{activeArticle.publishDate}</span>
              </span>
              <span>•</span>
              <span className="text-xs text-slate-500 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-teal-800" />
                <span>{activeArticle.readingTime}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight mb-6">
              {activeArticle.title}
            </h1>

            {/* Author info card */}
            <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs mb-8">
              <CmsImage
                src={getMediaUrl(doctorProfile.photoUrl || (doctorProfile as any).image, mediaAssets) || doctorProfile.photoUrl || (doctorProfile as any).image}
                mediaAssets={mediaAssets}
                alt={activeArticle.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-800/20"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{activeArticle.author}</h4>
                <p className="text-xs text-slate-500">{doctorProfile.speciality || (doctorProfile as any).title || 'Medical Oncology'} — Senior Consultant</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {activeArticle.featuredImage && (
            <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-md bg-stone-200">
              <CmsImage
                src={getMediaUrl(activeArticle.featuredImage, mediaAssets) || activeArticle.featuredImage}
                mediaAssets={mediaAssets}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body Content */}
          <article className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xs space-y-6 text-slate-800 leading-relaxed text-base sm:text-lg">
            {activeArticle.mainContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Bottom CTA Box */}
          <div className="mt-12 bg-gradient-to-r from-[#073F3D] to-[#0A4D4A] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#18B8B4] text-[11px] font-bold uppercase tracking-wider mb-2 inline-block">
                Expert Guidance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading mb-2">Have questions about your diagnosis or treatment plan?</h3>
              <p className="text-stone-300 text-xs sm:text-sm">
                Schedule an in-person or online consultation with Dr. Bhushan Parmar for personalized second opinions.
              </p>
            </div>
            <button
              onClick={onOpenAppointment}
              className="px-6 py-3 rounded-xl bg-[#18B8B4] hover:bg-[#149E9A] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer whitespace-nowrap"
            >
              Book Consultation Now
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans antialiased text-left">
      {/* Top Navigation / Header */}
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
          Book Consultation
        </button>
      </header>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#073F3D] to-[#0A4D4A] text-white py-16 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#18B8B4_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-[#18B8B4] text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Patient Education & Clinical Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            Cancer Care Knowledge Hub
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Expert articles, targeted therapy guides, and supportive care recommendations written by Dr. Bhushan Parmar to empower patients and families.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs mb-10">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cancer articles, therapies, side effects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-teal-600 text-slate-800"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#073F3D] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Banner (if no search/category filter active) */}
        {featuredArticle && selectedCategory === 'All' && !searchQuery && (
          <div
            onClick={() => setSelectedArticleId(featuredArticle.id)}
            className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 mb-12"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-200">
              <CmsImage
                src={getMediaUrl(featuredArticle.featuredImage, mediaAssets) || featuredArticle.featuredImage}
                mediaAssets={mediaAssets}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-bold uppercase tracking-wider">
                    Featured Article
                  </span>
                  <span className="text-xs text-slate-500">{featuredArticle.readingTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 group-hover:text-teal-800 transition-colors mb-3 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                <span className="text-xs font-semibold text-slate-700">By {featuredArticle.author}</span>
                <span className="flex items-center space-x-2 text-xs font-bold text-teal-800 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === 'All' && !searchQuery ? remainingArticles : filteredPosts).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedArticleId(post.id)}
              className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <CmsImage
                    src={getMediaUrl(post.featuredImage, mediaAssets) || post.featuredImage}
                    mediaAssets={mediaAssets}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-teal-900 text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mb-2">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-800" />
                      <span>{post.publishDate}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-teal-800" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-teal-800 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">{post.author}</span>
                <span className="text-xs font-bold text-teal-800 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="bg-white p-16 rounded-3xl border border-stone-200/80 text-center text-slate-500">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-semibold">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
