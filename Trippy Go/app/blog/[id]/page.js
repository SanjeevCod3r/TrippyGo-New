"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Eye,
  Tag,
  Facebook,
  Twitter,
  Instagram,
  Link2,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id;
  const [blogPost, setBlogPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        if (!data.error) {
          setBlogPost(data);

          // Fetch related posts (could be categorized or just latest)
          const allRes = await fetch("/api/blogs");
          const allData = await allRes.json();
          // Find up to 3 posts in the same category or latest, excluding current
          const related = allData
            .filter(
              (p) =>
                String(p.id) !== String(id) &&
                (data.category === "All" || p.category === data.category)
            )
            .slice(0, 3);

          // If less than 3 related, just pad with latest
          if (related.length < 3) {
            const more = allData
              .filter(
                (p) =>
                  String(p.id) !== String(id) &&
                  !related.find((r) => r.id === p.id)
              )
              .slice(0, 3 - related.length);
            setRelatedPosts([...related, ...more]);
          } else {
            setRelatedPosts(related);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id]);

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
        <Header />
        <div className="flex-1"></div>
        <Footer />
      </div>
    );
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        // You could add a toast here for success
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      <Header />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#0056D2]/5 to-[#43E0F8]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-[#43E0F8]/5 to-[#5DFDCB]/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1 pt-16">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 pb-8"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0056D2] hover:text-[#0056D2]/80 transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              <span style={{ fontFamily: "Manrope, sans-serif" }}>
                Back to Blog
              </span>
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] text-white text-sm font-semibold rounded-full">
                {blogPost.category}
              </span>
              {blogPost.tags &&
                blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {blogPost.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-gray-900"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {blogPost.author}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(
                          blogPost.createdAt || blogPost.date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {blogPost.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {blogPost.views} views
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleBookmark}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isBookmarked
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Bookmark
                    size={16}
                    className={isBookmarked ? "fill-current" : ""}
                  />
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-all duration-300"
                  >
                    <Share2 size={16} />
                  </motion.button>

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10"
                      >
                        <button
                          onClick={() => handleShare("facebook")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3"
                        >
                          <Facebook size={16} className="text-blue-600" />
                          <span style={{ fontFamily: "Manrope, sans-serif" }}>
                            Facebook
                          </span>
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3"
                        >
                          <Twitter size={16} className="text-sky-500" />
                          <span style={{ fontFamily: "Manrope, sans-serif" }}>
                            Twitter
                          </span>
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3"
                        >
                          <Link2 size={16} className="text-gray-600" />
                          <span style={{ fontFamily: "Manrope, sans-serif" }}>
                            Copy Link
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        {blogPost.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-64 sm:h-80 md:h-[500px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pb-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:mb-6 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-[#0056D2] hover:prose-a:text-[#0056D2]/80 prose-blockquote:border-l-4 prose-blockquote:border-[#0056D2] prose-blockquote:pl-4 prose-blockquote:italic"
                style={{ fontFamily: "Manrope, sans-serif" }}
                dangerouslySetInnerHTML={{
                  __html:
                    blogPost.content.includes("<") &&
                    blogPost.content.includes(">")
                      ? blogPost.content
                      : blogPost.content
                          .split("\n")
                          .filter((p) => p.trim())
                          .map((p) => `<p>${p}</p>`)
                          .join(""),
                }}
              />
            </article>
          </div>
        </motion.div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pb-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 text-center"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Related Articles
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
                  >
                    <div className="relative overflow-hidden h-48 flex-shrink-0">
                      <img
                        src={
                          post.image ||
                          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3
                        className="text-lg font-bold text-gray-900 mb-2 line-clamp-2"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User size={14} />
                          <span className="line-clamp-1 max-w-[100px]">
                            {post.author}
                          </span>
                        </div>
                        <Link
                          href={`/blog/${post.id}`}
                          className="flex items-center gap-2 text-[#0056D2] font-semibold hover:text-[#0056D2]/80 transition-colors text-sm flex-shrink-0"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
