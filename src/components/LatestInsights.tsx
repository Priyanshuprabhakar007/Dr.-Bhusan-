import React from 'react';
import { useData } from '../context/DataContext';
import { BlogPostRecord } from '../types/admin';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const LatestInsights: React.FC = () => {
  const { blogPosts, getSlotMediaUrl } = useData() as any;
  const posts = Array.isArray(blogPosts) ? blogPosts : [];
  const latestPosts = posts.filter((p: any) => p.status === 'published').slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section id="blogs" className="py-20 bg-stone-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-heading text-slate-900 mb-12">Latest Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post: any, idx: number) => {
            const slotKey = `slot-resource-feature-${idx + 1}`;
            const fallbackImg = post.featuredImage || post.featuredImageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80';
            const postImg = getSlotMediaUrl(slotKey, fallbackImg);

            return (
              <div key={post.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-shadow">
                <img src={postImg} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">{post.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3">{post.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">{post.excerpt}</p>
                  <a href={`/blogs/${post.slug}`} className="text-xs font-bold text-teal-800 flex items-center">
                    Read Article <ArrowRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
            <a href="/blogs" className="px-6 py-3 rounded-full bg-teal-800 text-white text-xs font-bold hover:bg-teal-950 transition-colors">
              View All Blogs
            </a>
        </div>
      </div>
    </section>
  );
};
