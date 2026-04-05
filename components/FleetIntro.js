"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Car, ChevronRight } from "lucide-react";

export const FleetIntro = () => {
  const router = useRouter();

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-paleBlue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-paleBlue-400/5 to-cyan-400/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
                Premium Fleet for
                <br />
                <span className="bg-gradient-to-r from-[#eb662b] via-[#ff9b6a] to-[#ff9b6a] bg-clip-text text-transparent">
                  Every Journey
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-black-600 leading-relaxed max-w-lg mt-6"
            >
              Experience unparalleled comfort and style with our meticulously
              curated fleet of luxury vehicles. From sleek sedans to spacious
              SUVs, every ride is designed to make your journey unforgettable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("#fleet")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#eb662b] via-[#ff9b6a] to-[#ff9b6a] text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto justify-center"
              >
                <Car
                  size={20}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                <span>Discover Our Fleet</span>
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-80 md:h-96 lg:h-full"
          >
            <img
              src="/asset/Home Page Image 2.webp"
              alt="Fleet Showcase"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=srgb&fm=jpg&q=85";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
