"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
} from "lucide-react";

export const DestinationShowcase = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/packages?enabled=true");
        if (!res.ok) throw new Error("Failed to fetch destinations");
        const data = await res.json();

        if (data && data.length > 0) {
          const regionMap = new Map();
          data.forEach(pkg => {
            // Priority: pkg.region -> pkg.location -> "India"
            const regionName = pkg.region || pkg.location || "Explore";
            if (!regionMap.has(regionName)) {
              regionMap.set(regionName, {
                name: regionName.charAt(0).toUpperCase() + regionName.slice(1),
                toursCount: 1,
                image: pkg.images?.[0] || pkg.image || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop"
              });
            } else {
              const current = regionMap.get(regionName);
              current.toursCount += 1;
            }
          });

          const formatted = Array.from(regionMap.values()).map((dest, index) => ({
            id: index + 1,
            name: dest.name,
            tours: `${dest.toursCount}+`,
            image: dest.image
          }));

          setDestinations(formatted.slice(0, 12));
        } else {
          setDestinations([]);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (!loading && destinations.length === 0) return null;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-16 relative z-10">

        {/* Header: Title and "See all" link */}
        <div className="flex items-end justify-between mb-16 px-0 gap-4">
          <div className="space-y-4">
            <h2
              className="text-3xl md:text-5xl font-black text-[#eb662b] tracking-tight"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Trending destinations
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-sm font-bold text-[#eb662b] bg-[#eb662b]/10 hover:bg-[#eb662b]/20 px-5 py-2.5 rounded-full transition-all flex items-center gap-2 group shadow-sm whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            <span>See all</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* destinations List */}
        {loading ? (
          <div className="flex gap-14 overflow-x-auto pb-10 no-scrollbar px-4" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-50 border border-gray-100 animate-pulse shadow-sm"></div>
                <div className="mt-8 h-4 bg-gray-100 rounded-full animate-pulse w-16"></div>
                <div className="mt-3 h-3 bg-gray-50 rounded-full animate-pulse w-12"></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex items-start justify-start gap-10 lg:gap-14 overflow-x-auto pb-14 no-scrollbar scroll-smooth px-4"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {destinations.map((destination, index) => (
              <Link
                href={`/destinations?region=${destination.name.toLowerCase()}`}
                key={destination.id}
                className="flex-shrink-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Circular Image Wrap */}
                  <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full p-[2px] transition-all duration-500 group-hover:bg-gradient-to-tr from-[#eb662b] to-[#ff9b6a]">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-gray-50 group-hover:shadow-[0_20px_40px_rgba(235,102,43,0.15)] transition-all">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  {/* labels */}
                  <div className="mt-8 text-center px-2">
                    <h4
                      className="text-base font-bold text-[#05073C] mb-1.5 group-hover:text-[#eb662b] transition-colors tracking-wide"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      {destination.name}
                    </h4>
                    <p
                      className="text-[12px] font-bold text-gray-400 uppercase tracking-widest opacity-80"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {destination.tours} Tours
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* Custom Pagination/Scroll Indicators as seen in mockup */}
        {!loading && destinations.length > 0 && (
          <div className="flex items-center justify-center gap-2.5 pt-4">
            <div className="w-10 h-1.5 rounded-full bg-[#eb662b] transition-all cursor-pointer" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 hover:bg-orange-300 transition-all cursor-pointer" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 hover:bg-orange-300 transition-all cursor-pointer" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 hover:bg-orange-300 transition-all cursor-pointer" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 hover:bg-orange-300 transition-all cursor-pointer" />
          </div>
        )}

      </div>
    </section>
  );
};
