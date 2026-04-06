"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  ChevronRight,
  PhoneCall,
  Tag,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derive categories and tags from posts
  const categories = ["All", ...new Set(blogPosts.map((p) => p.category).filter(Boolean))];
  const allTags = [...new Set(blogPosts.flatMap((p) => p.tags || []))].slice(0, 8);
  const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = post.title?.toLowerCase().includes(searchLower);
    const excerptMatch = post.excerpt?.toLowerCase().includes(searchLower);
    const matchesSearch = titleMatch || excerptMatch;
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      {/* Cinematic Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
            alt="Hot air balloons"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Blog Grid Right Sidebar
          </motion.h1>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-screen-2xl mx-auto px-6 md:px-16 py-20 lg:py-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#eb662b]"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">

            {/* LEFT: Blog Grid Content (8/12) */}
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-5 py-2 bg-white/95 backdrop-blur-sm text-[#05073C] text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Meta & Title */}
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-5 text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5 hover:text-[#eb662b] transition-colors">
                          <User size={14} className="text-[#eb662b]" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-[#eb662b] transition-colors">
                          <Calendar size={14} className="text-[#eb662b]" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>

                      <Link href={`/blog/${post.id}`}>
                        <h3
                          className="text-xl lg:text-2xl font-bold text-[#05073C] mb-4 group-hover:text-[#eb662b] transition-colors leading-tight"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {post.title}
                        </h3>
                      </Link>

                      <p
                        className="text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {post.excerpt}
                      </p>

                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-3 text-[#05073C] font-black uppercase text-xs tracking-widest group/link"
                    >
                      <span className="group-hover/link:text-[#eb662b] transition-colors">Read More</span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] transition-all group-hover/link:text-white group-hover/link:shadow-md">
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-16 flex items-center gap-3">
                <button className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white flex items-center justify-center font-bold shadow-lg shadow-orange-100">1</button>
                <button className="w-12 h-12 rounded-2xl bg-white text-gray-400 flex items-center justify-center font-bold hover:bg-orange-50 hover:text-[#eb662b] transition-colors border border-gray-100">2</button>
                <button className="w-12 h-12 rounded-2xl bg-white text-gray-400 flex items-center justify-center font-bold hover:bg-orange-50 hover:text-[#eb662b] transition-colors border border-gray-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* RIGHT: Sidebar (4/12) */}
            <aside className="lg:col-span-4 space-y-12">

              {/* Search Widget */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <h4 className="text-xl font-bold text-[#05073C] mb-6 tracking-tight">Search</h4>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-100/30 focus:border-[#eb662b] transition-all text-sm font-medium"
                  />
                  <Search size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#eb662b] transition-colors" />
                </div>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <h4 className="text-xl font-bold text-[#05073C] mb-8 tracking-tight">Recent Post</h4>
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex gap-4 group cursor-pointer">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={post.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&h=200&fit=crop"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link href={`/blog/${post.id}`}>
                          <h5 className="text-[15px] font-bold text-[#05073C] leading-snug mb-1 line-clamp-2 hover:text-[#eb662b] transition-colors">
                            {post.title}
                          </h5>
                        </Link>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#eb662b]" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <h4 className="text-xl font-bold text-[#05073C] mb-6 tracking-tight">Categories</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-5 py-4 rounded-xl text-sm font-bold tracking-wide transition-all ${selectedCategory === cat
                          ? "bg-[#eb662b] text-white shadow-lg shadow-orange-100"
                          : "text-gray-500 hover:bg-orange-50 hover:text-[#eb662b]"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <h4 className="text-xl font-bold text-[#05073C] mb-6 tracking-tight">Tags</h4>
                <div className="flex flex-wrap gap-2.5">
                  {allTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2.5 bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#eb662b] hover:text-white transition-all cursor-pointer border border-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
