"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Star, ArrowRight, IndianRupee, Heart } from "lucide-react";

export const FeaturedDestinations = () => {
  const [tours, setTours] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/packages?enabled=true");
        if (!res.ok) throw new Error("Failed to fetch tours");
        const data = await res.json();
        
        // Map backend data to UI format and take only the first 6 for featured
        const formattedTours = (Array.isArray(data) ? data : []).slice(0, 6).map(pkg => ({
          id: pkg.id || pkg._id,
          title: pkg.title || pkg.name || "Tour Package",
          location: pkg.region ? `${pkg.region} India` : "India",
          image: pkg.images?.[0] || pkg.image || "https://images.unsplash.com/photo-1544551763-47a0159c92b2?q=80&w=2670&auto=format&fit=crop",
          rating: pkg.rating || 4.5,
          reviews: pkg.reviews || 0,
          duration: pkg.duration || "Custom",
          price: pkg.price || 0,
        }));
        setTours(formattedTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-4xl font-black text-[#000]"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Find Popular Tours
          </h2>
          <Link 
            href="/destinations" 
            className="text-sm font-bold text-[#eb662b] bg-[#eb662b]/10 hover:bg-[#eb662b]/20 px-5 py-2.5 rounded-full transition-all flex items-center gap-2 group shadow-sm"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            <span>See all</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 h-[420px]">
                <div className="w-full h-64 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mt-12"></div>
                </div>
              </div>
            ))}
          </div>
        ) : tours.length === 0 ? (
           <div className="text-center py-12 text-gray-500 font-bold" style={{ fontFamily: 'var(--font-manrope)' }}>
              No tours currently available. 
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* Image Container */}
                <Link href={`/package/${tour.id}`} className="block relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </Link>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[#eb662b] transition-colors z-10">
                  <Heart size={16} />
                </button>

              {/* Content Container */}
              <div className="p-6">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">
                  {tour.location}
                </p>
                <h3 
                  className="text-lg font-black text-[#ff9b6a] mb-4 line-clamp-2 min-h-[3rem]"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  {tour.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-6">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-400 ml-1">
                    {tour.rating} ({tour.reviews})
                  </span>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <p className="text-xs font-bold text-[#05073C]">
                    {tour.duration}
                  </p>
                  <p className="text-xs font-bold text-gray-400">
                    From <span className="text-[#05073C] text-lg font-black">₹{tour.price.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}

      </div>
    </section>
  );
};
