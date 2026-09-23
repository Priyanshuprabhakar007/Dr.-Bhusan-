import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPostRecord } from '../../types/admin';
import { Plus, Search, Edit3, Trash2, Eye, Save, X, Calendar, Clock, Image as ImageIcon, CheckCircle, FileText } from 'lucide-react';
import { ImagePickerField } from './ImagePickerField';

export const BlogsEditor: React.FC = () => {
  const { blogPosts = [], updateBlogPosts } = useData() as {
    blogPosts: BlogPostRecord[];
    updateBlogPosts: (posts: BlogPostRecord[]) => void;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingPost, setEditingPost] = useState<BlogPostRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewPost, setPreviewPost] = useState<BlogPostRecord | null>(null);

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

  const safeBlogPosts = Array.isArray(blogPosts) ? blogPosts : [];

  const filteredPosts = safeBlogPosts.filter((post) => {
    const matchesSearch =
      (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const updated = safeBlogPosts.some((p) => p.id === editingPost.id)
      ? safeBlogPosts.map((p) => (p.id === editingPost.id ? { ...editingPost, updatedAt: new Date().toISOString().split('T')[0] } : p))
      : [editingPost, ...safeBlogPosts];

    updateBlogPosts(updated);
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      updateBlogPosts(safeBlogPosts.filter((p) => p.id !== id));
    }
  };

  const handleCreateNew = () => {
    const newPost: BlogPostRecord = {
      id: `blog-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Patient Guidance',
      excerpt: '',
      featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
      mainContent: '',
      author: 'Dr. Bhushan Parmar',
      publishDate: new Date().toISOString().split('T')[0],
      readingTime: '5 min read',
      seoTitle: '',
      metaDescription: '',
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setEditingPost(newPost);
    setIsCreating(true);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Patient Guides & Blog Manager</h1>
          <p className="text-slate-600 text-sm mt-1">
            Create and manage clinical articles, patient education guides, and oncology updates.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold flex items-center space-x-2 transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#18B8B4]" />
          <span>Create New Blog Post</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, topic or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 text-slate-800"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#073F3D] text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-stone-100">
                <img
                  src={post.featuredImage?.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.status === 'published'
                        ? 'bg-emerald-500 text-white'
                        : post.status === 'scheduled'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {post.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-teal-900 text-[10px] font-bold uppercase">
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

                <h3 className="text-lg font-bold text-slate-900 font-heading mb-2 line-clamp-2">
                  {post.title || 'Untitled Article'}
                </h3>
                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                  {post.excerpt || 'No excerpt provided yet.'}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">By {post.author}</span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setPreviewPost(post)}
                  className="p-2 rounded-lg text-slate-600 hover:text-teal-800 hover:bg-teal-50 transition-colors cursor-pointer"
                  title="Preview Article"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-2 rounded-lg text-slate-600 hover:text-sky-800 hover:bg-sky-50 transition-colors cursor-pointer"
                  title="Edit Article"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 rounded-lg text-slate-600 hover:text-rose-800 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-stone-200/80 text-center text-slate-500">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-base font-semibold">No blog articles found matching your query.</p>
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div onClick={() => setEditingPost(null)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {isCreating ? 'Create New Blog Article' : 'Edit Blog Article'}
              </h2>
              <button
                onClick={() => setEditingPost(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingPost({ ...editingPost, title, slug, seoTitle: editingPost.seoTitle || title });
                    }}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                    placeholder="e.g. Advanced Immunotherapy in Lung Cancer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 font-mono text-xs"
                    placeholder="advanced-immunotherapy-lung-cancer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Category *</label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Publish Status *</label>
                  <select
                    value={editingPost.status}
                    onChange={(e: any) => setEditingPost({ ...editingPost, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 font-semibold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Publish Date</label>
                  <input
                    type="date"
                    value={editingPost.publishDate}
                    onChange={(e) => setEditingPost({ ...editingPost, publishDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Author</label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Reading Time</label>
                  <input
                    type="text"
                    value={editingPost.readingTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readingTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              {/* Featured Image Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Featured Image (Cloudflare R2 Media)</label>
                <ImagePickerField
                  label="Featured Image"
                  value={editingPost.featuredImage}
                  onChange={(url) => setEditingPost({ ...editingPost, featuredImage: url })}
                  category="Blog"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Short Excerpt / Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                  placeholder="Brief summary displayed on article cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Main Article Content *</label>
                <textarea
                  rows={8}
                  required
                  value={editingPost.mainContent}
                  onChange={(e) => setEditingPost({ ...editingPost, mainContent: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 font-sans"
                  placeholder="Full article content. Paragraphs separated by blank lines..."
                />
              </div>

              {/* SEO Fields */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">SEO & Metadata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={editingPost.seoTitle}
                      onChange={(e) => setEditingPost({ ...editingPost, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Description</label>
                    <input
                      type="text"
                      value={editingPost.metaDescription}
                      onChange={(e) => setEditingPost({ ...editingPost, metaDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#0A4D4A] text-white text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4 text-[#18B8B4]" />
                  <span>Save & Publish Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div onClick={() => setPreviewPost(null)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-stone-200 z-10 text-left">
            <button
              onClick={() => setPreviewPost(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">{previewPost.category}</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-4">{previewPost.title}</h1>
            <div className="flex items-center space-x-4 text-xs text-slate-500 mb-6 pb-4 border-b border-stone-100">
              <span>By {previewPost.author}</span>
              <span>•</span>
              <span>{previewPost.publishDate}</span>
              <span>•</span>
              <span>{previewPost.readingTime}</span>
            </div>
            {Boolean(previewPost.featuredImage?.trim()) && (
              <img
                src={previewPost.featuredImage.trim()}
                alt={previewPost.title}
                className="w-full aspect-[16/9] object-cover rounded-2xl mb-6 shadow-sm"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="prose text-slate-700 text-sm leading-relaxed space-y-4">
              {previewPost.mainContent.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
