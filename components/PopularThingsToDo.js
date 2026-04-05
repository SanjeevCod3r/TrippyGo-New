"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const PopularThingsToDo = () => {
  const activities = [
    {
      id: "cruises",
      title: "Cruises",
      image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=2669&auto=format&fit=crop",
      className: "md:col-span-1 md:row-span-1 h-[200px]",
    },
    {
      id: "beach-tours",
      title: "Beach Tours",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop",
      className: "md:col-span-1 md:row-span-2 h-[200px] md:h-full",
    },
    {
      id: "city-tours",
      title: "City Tours",
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2670&auto=format&fit=crop",
      className: "md:col-span-2 md:row-span-1 h-[200px]",
    },
    {
      id: "museum-tour",
      title: "Museum Tour",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2620&auto=format&fit=crop",
      className: "md:col-span-1 md:row-span-1 h-[200px]",
    },
    {
      id: "food",
      title: "Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop",
      className: "md:col-span-1 md:row-span-1 h-[200px]",
    },
    {
      id: "hiking",
      title: "Hiking",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop",
      className: "md:col-span-1 md:row-span-1 h-[200px]",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-4xl lg:text-4xl font-black text-[#eb662b]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Popular things to do
          </h2>
          <Link
            href="/tours"
            className="text-[11px] font-bold text-gray-500 hover:text-[#eb662b] transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            See all
          </Link>
        </div>

        {/* CSS Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[420px]">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-[20px] overflow-hidden group cursor-pointer ${activity.className}`}
            >
              {/* Image */}
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Title Text */}
              <div className="absolute bottom-4 left-5">
                <h3
                  className="text-white text-sm lg:text-base font-bold tracking-wide"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {activity.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
