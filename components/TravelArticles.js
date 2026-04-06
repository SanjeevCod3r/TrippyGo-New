"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const TravelArticles = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/blogs?enabled=true");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        
        // We need 4 articles for this layout (1 featured + 3 list)
        // Ensure we parse dates cleanly
        const formattedArticles = (Array.isArray(data) ? data : []).slice(0, 4).map((blog) => {
           let parsedDate = "Unknown Date";
           try {
              const d = new Date(blog.createdAt || Date.now());
              parsedDate = d.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
           } catch (e) {
              parsedDate = blog.date || "Unknown Date";
           }
           
           return {
             id: blog.id || blog._id,
             title: blog.title || "Travel Journey",
             excerpt: blog.excerpt || blog.content?.substring(0, 120) + "..." || "Discover amazing new places and experiences on your next journey. Read the full article to learn more about the best spots to visit.",
             date: parsedDate,
             readTime: blog.readTime || "5 min read",
             category: blog.category || "Travel Guide",
             image: blog.image || blog.images?.[0] || "https://images.unsplash.com/photo-1547471080-7fc2caa6f7fd?w=800&q=80",
           };
        });
        
        // If the API doesn't return enough articles, we pad it with some static ones just so the beautiful layout doesn't break
        const paddedArticles = [...formattedArticles];
        const fallbacks = [
           { id: 'f1', title: "15 South London Markets You'll Love", excerpt: "", date: "Aug 15, 2024", readTime: "4 min read", category: "Shopping", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80" },
           { id: 'f2', title: "10 incredible hotels around the world you can book with points", excerpt: "", date: "Aug 10, 2024", readTime: "5 min read", category: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
           { id: 'f3', title: "Visiting Chicago on a budget: Affordable Eats and Attractions", excerpt: "", date: "Aug 05, 2024", readTime: "6 min read", category: "Travel Budget", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80" }
        ];

        while (paddedArticles.length < 4) {
           paddedArticles.push(fallbacks[paddedArticles.length - 1]);
        }

        setArticles(paddedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const listArticles = articles.length > 1 ? articles.slice(1, 4) : [];

  return (
    <section className="py-20 md:py-28 bg-[#FFF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 sm:mb-16 gap-4">
          <h2
            className="text-5xl md:text-4xl font-black text-[#05073C]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Latest Stories
          </h2>
          <Link
            href="/blog"
            className="px-6 py-2 border border-gray-300 rounded-full text-xs font-bold text-[#05073C] hover:bg-[#05073C] hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Read more articles
          </Link>
        </div>

        {/* Content Layout */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             {/* Main Article Skeleton */}
             <div className="col-span-1 lg:col-span-7 flex flex-col animate-pulse">
                <div className="w-full h-[300px] md:h-[450px] bg-gray-200 rounded-[2rem] mb-6"></div>
                <div className="h-4 bg-gray-200 w-32 mb-4 rounded"></div>
                <div className="h-6 bg-gray-200 w-3/4 mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 w-48 mb-6 rounded"></div>
                <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
             </div>
             {/* Side List Skeleton */}
             <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-6 animate-pulse">
                     <div className="w-32 h-32 bg-gray-200 rounded-[1.5rem] shrink-0"></div>
                     <div className="flex-1 py-1">
                        <div className="h-4 bg-gray-200 w-20 mb-3 rounded"></div>
                        <div className="h-5 bg-gray-200 w-full mb-2 rounded"></div>
                        <div className="h-5 bg-gray-200 w-3/4 mb-4 rounded"></div>
                        <div className="h-3 bg-gray-200 w-32 rounded"></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left Column: Featured Article */}
            {featuredArticle && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="col-span-1 lg:col-span-7 flex flex-col group cursor-pointer"
              >
                <div className="relative w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden mb-6 shadow-sm">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div 
                  className="text-[#eb662b] text-[13px] font-bold mb-3 hover:text-[#eb662b] transition-colors"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {featuredArticle.category}
                </div>
                
                <h3
                  className="text-2xl md:text-3xl font-black text-[#05073C] mb-4 leading-snug group-hover:text-[#eb662b] transition-colors"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {featuredArticle.title}
                </h3>
                
                <div 
                  className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-5"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  <span>{featuredArticle.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{featuredArticle.readTime}</span>
                </div>
                
                <p 
                  className="text-[15px] font-medium text-gray-600 leading-relaxed max-w-[90%]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {featuredArticle.excerpt}
                </p>
              </motion.div>
            )}

            {/* Right Column: List of smaller articles */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-8 md:gap-10">
              {listArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-5 md:gap-6 group cursor-pointer items-start"
                >
                  {/* Small Square Image */}
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-[1.5rem] overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Article Info */}
                  <div className="flex flex-col flex-1 py-1">
                    <div 
                      className="text-[#eb662b] text-[11px] md:text-xs font-bold mb-2 md:mb-3 hover:text-[#eb662b] transition-colors"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {article.category}
                    </div>
                    
                    <h4
                      className="text-[15px] md:text-base font-black text-[#05073C] mb-3 leading-tight group-hover:text-[#eb662b] transition-colors line-clamp-3"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {article.title}
                    </h4>
                    
                    <div 
                      className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-500 font-bold mt-auto"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      <span>{article.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
