"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export const CustomerReviews = () => {
  const scrollRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "John Smith",
      title: "Traveler",
      heading: "Excellent Service!",
      text: "I had an amazing experience with this company. The service was top-notch, and the staff was incredibly friendly. I highly recommend them to anyone wanting a hassle-free trip.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      title: "Explorer",
      heading: "A trip to remember",
      text: "Everything was perfectly curated. From the hotels to the tours, TrippyGo made sure our family had the best time possible in the serene mountains.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      title: "Photographer",
      heading: "Flawless Execution",
      text: "As a photographer, finding the right spots is crucial. The local guides knew exactly where to take me. Completely worth it.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Clark",
      title: "Solo Backpacker",
      heading: "Safe and Reliable",
      text: "Traveling alone can be daunting, but the team checked up on me and provided 24/7 support. I felt super safe.",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop",
      rating: 4,
    },
    {
      id: 5,
      name: "David Wright",
      title: "Business Executive",
      heading: "Best Fleet Service",
      text: "I use their corporate car rental for all my business trips in India. The drivers are professional and the cars are immaculate.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
           <div>
              <h2
                className="text-4xl md:text-4xl font-black text-[#eb662b] mb-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Customer Reviews
              </h2>
              <p className="text-sm font-medium text-gray-500 max-w-sm" style={{ fontFamily: "var(--font-manrope)" }}>
                 Real stories from our travelers who experienced the best journeys with us.
              </p>
           </div>
           
           {/* Slider Controls */}
           <div className="flex items-center gap-3">
              <button 
                 onClick={scrollLeft}
                 className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-[#eb662b] hover:border-[#eb662b] transition-colors shadow-sm"
              >
                 <ChevronLeft />
              </button>
              <button 
                 onClick={scrollRight}
                 className="w-12 h-12 rounded-full border border-[#eb662b] bg-[#eb662b] flex items-center justify-center text-white hover:bg-[#d55b25] transition-colors shadow-md shadow-orange-500/20"
              >
                 <ChevronRight />
              </button>
           </div>
        </div>

        {/* Carousel Container */}
        <div 
           ref={scrollRef}
           className="flex gap-6 overflow-x-auto pb-8 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-12 md:px-12 snap-x snap-mandatory hide-scroll-bar z-10 relative scroll-smooth"
           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
           {reviews.map((review, index) => (
             <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[380px] lg:w-[400px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col"
             >
                {/* Rating */}
                <div className="flex gap-1 mb-6 text-[#eb662b]">
                   {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                   ))}
                   {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-gray-200" />
                   ))}
                </div>

                {/* Text Content */}
                <h4 className="text-lg font-bold text-[#05073C] mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
                   "{review.heading}"
                </h4>
                <p className="text-sm font-medium text-gray-500 mb-8 flex-1 leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
                   {review.text}
                </p>

                {/* Profile */}
                <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6">
                   <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h5 className="text-[14px] font-black text-[#05073C]" style={{ fontFamily: "var(--font-montserrat)" }}>
                         {review.name}
                      </h5>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider" style={{ fontFamily: "var(--font-manrope)" }}>
                         {review.title}
                      </span>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
