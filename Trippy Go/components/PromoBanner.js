"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const PromoBanner = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-[#FFF9F5] shadow-xl flex flex-col md:flex-row min-h-[400px]"
        >
          {/* Topographic Background Pattern on the left */}
          <div className="absolute inset-0 w-full md:w-[55%] opacity-30 pointer-events-none z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="topography"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M10 10C20 20 40 10 50 30C60 50 80 40 90 60"
                    fill="none"
                    stroke="#eb662b"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M10 90C30 80 40 100 60 80C80 60 90 90 100 70"
                    fill="none"
                    stroke="#eb662b"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M50 0C60 20 80 10 100 30"
                    fill="none"
                    stroke="#eb662b"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M0 50C20 60 30 40 50 60C70 80 80 60 100 80"
                    fill="none"
                    stroke="#eb662b"
                    strokeWidth="0.5"
                  />
                  <circle cx="20" cy="50" r="15" fill="none" stroke="#eb662b" strokeWidth="0.5" />
                  <circle cx="80" cy="20" r="10" fill="none" stroke="#eb662b" strokeWidth="0.5" />
                  <circle cx="40" cy="80" r="20" fill="none" stroke="#eb662b" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topography)" />
            </svg>
          </div>

          {/* Left Content Area */}
          <div className="relative z-10 w-full md:w-[50%] p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-[#FFF9F5]">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-[#05073C] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Grab up to <span className="text-[#eb662b]">35% off</span>
              <br />
              on your favorite
              <br />
              Destination
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm font-bold text-gray-500 mb-8"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Limited time offer, don't miss the opportunity
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                className="px-8 py-4 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 w-max"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Book Now
              </button>
            </motion.div>
          </div>

          {/* Right Image Area */}
          <div className="relative w-full md:w-[50%] min-h-[300px] md:min-h-full">
            {/* Wavy/Torn edge effect using SVG mask or clip-path */}
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 z-20 pointer-events-none hidden md:block">
              <svg 
                viewBox="0 0 100 1000" 
                preserveAspectRatio="none" 
                className="w-full h-full text-[#FFF9F5] fill-current"
              >
                <path d="M0,0 L100,0 C80,100 20,200 50,300 C80,400 30,500 50,600 C70,700 20,800 60,900 C100,1000 0,1000 0,1000 Z" />
              </svg>
            </div>
            
            {/* Same edge for mobile (rotate 90 degrees) */}
            <div className="absolute top-0 left-0 right-0 h-12 z-20 pointer-events-none block md:hidden">
               <svg 
                viewBox="0 0 1000 100" 
                preserveAspectRatio="none" 
                className="w-full h-full text-[#FFF9F5] fill-current"
              >
                <path d="M0,0 L0,100 C100,80 200,20 300,50 C400,80 500,30 600,50 C700,70 800,20 900,60 C1000,100 1000,0 1000,0 Z" />
              </svg>
            </div>

            <Image
              src="https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2535&auto=format&fit=crop"
              alt="Cappadocia Hot Air Balloons"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
