import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPost } from '../../types';
import {
  BookOpen,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Search
} from 'lucide-react';

export const ResourcesEditor: React.FC = () => {
  const { blogPosts, updateBlogPost, addBlogPost, deleteBlogPost } = useData();

  const [selectedPostId, setSelectedPostId] = useState<string>(blogPosts[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const currentPost = blogPosts.find(p => p.id === selectedPostId) || blogPosts[0];

  const filteredPosts = blogPosts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFieldChange = (field: string, val: any) => {
    if (!currentPost) return;
    updateBlogPost(currentPost.id, { [field]: val });
  };

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: 'blog-' + Date.now(),
      title: 'New Oncological Clinical Guide',
      slug: 'new-clinical-guide-' + Date.now().toString().slice(-4),
      category: 'Patient Education',
      publishedDate: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      author: 'Dr. Bhushan Parmar',
      featuredImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      summary: 'Clinical insights on evidence-based therapies, supportive nutrition, and understanding modern cancer diagnostics.',
      content: [
        'Modern cancer treatment has advanced exponentially over recent years. Today, therapies are tailored precisely to individual tumor biology rather than broad systemic toxicities.',
        'Next-Generation Sequencing (NGS) and immunohistochemistry enable medical oncologists to pinpoint specific gene mutations and select targeted medications.'
      ],
      keyTakeaways: [
        'Genomic profiling directs personalized medical oncology protocols.',
        'Early multidisciplinary review significantly enhances patient outcomes.'
      ],
      seoTitle: 'Cancer Guidance & Patient Education | Dr. Bhushan Parmar',
      metaDescription: 'Expert oncology insights and clinical guidance from Dr. Bhushan Parmar.'
    };
    addBlogPost(newPost);
    setSelectedPostId(newPost.id);
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
            Patient Guides & Oncology Articles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish educational patient resources, treatment explanations, and clinical articles.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreatePost}
          className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#18B8B4]" />
          <span>Write New Article</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Article updated successfully and published to public resources section!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Post List */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredPosts.map(p => {
              const isSelected = p.id === selectedPostId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPostId(p.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/70 border-[#149A96] ring-1 ring-[#149A96]'
                      : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-[#071D2D] line-clamp-1">
                      {p.title}
                    </h4>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 bg-emerald-100 text-emerald-800">
                      Published
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {p.category} • {(p as any).publishedDate || (p as any).publishDate || ''}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editor */}
        {currentPost && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#071D2D]">
                  {currentPost.title}
                </h3>
                <span className="text-xs text-slate-400">
                  Slug: /{currentPost.slug}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {blogPosts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete "${currentPost.title}"?`)) {
                        deleteBlogPost(currentPost.id);
                        setSelectedPostId(blogPosts[0]?.id || '');
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={triggerToast}
                  className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#18B8B4]" />
                  <span>Save Article</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  value={currentPost.title}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#149A96] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={currentPost.category}
                  onChange={e => handleFieldChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Read Time (e.g. 5 min read)
                </label>
                <input
                  type="text"
                  value={(currentPost as any)?.readTime || (currentPost as any)?.readingTime || ''}
                  onChange={e => handleFieldChange('readTime', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={currentPost?.slug || ''}
                  onChange={e => handleFieldChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Featured Cover Image URL
              </label>
              <input
                type="text"
                value={(currentPost as any)?.featuredImageUrl || (currentPost as any)?.featuredImage || ''}
                onChange={e => handleFieldChange('featuredImageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Brief Excerpt / Summary
              </label>
              <textarea
                rows={2}
                value={(currentPost as any)?.summary || (currentPost as any)?.excerpt || ''}
                onChange={e => handleFieldChange('summary', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
              />
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Key Takeaways / Clinical Summary
              </label>
              <div className="space-y-2">
                {((currentPost as any)?.keyTakeaways || []).map((takeaway: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={takeaway}
                      onChange={e => {
                        const updated = [...((currentPost as any)?.keyTakeaways || [])];
                        updated[idx] = e.target.value;
                        handleFieldChange('keyTakeaways', updated);
                      }}
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleFieldChange(
                          'keyTakeaways',
                          ((currentPost as any)?.keyTakeaways || []).filter((_: any, i: number) => i !== idx)
                        );
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    handleFieldChange('keyTakeaways', [
                      ...((currentPost as any)?.keyTakeaways || []),
                      'New essential takeaway point'
                    ]);
                  }}
                  className="text-xs text-[#149A96] hover:text-teal-700 font-semibold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Takeaway</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
