"use client";

import React from "react";
import { motion } from "framer-motion";

export const AppPromoBanner = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[400px] shadow-2xl"
        >
          {/* Decorative background vectors */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
            <svg viewBox="0 0 800 600" className="absolute right-0 top-0 h-full text-yellow-400">
               <path d="M400 0 C500 200, 700 100, 800 400 L800 0 Z" fill="currentColor" fillOpacity="0.2" />
               <path d="M600 -100 C700 200, 500 400, 800 600 L800 -100 Z" stroke="currentColor" strokeWidth="4" fill="none" />
               <path d="M650 -100 C750 150, 550 350, 850 600" stroke="currentColor" strokeWidth="2" fill="none" />
               <path d="M700 -100 C800 100, 600 300, 900 600" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            {/* Small yellow flower/star at bottom right */}
            <div className="absolute bottom-10 right-10 w-16 h-16 text-yellow-400 fill-current opacity-80">
              <svg viewBox="0 0 100 100">
                <path d="M50 0 C50 25, 75 50, 100 50 C75 50, 50 75, 50 100 C50 75, 25 50, 0 50 C25 50, 50 25, 50 0 Z" />
              </svg>
            </div>
          </div>

          {/* Left Content Area (Text & Form) */}
          <div className="relative z-10 w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Get 5% off your 1st
              <br />
              web booking
            </h2>
            <p 
              className="text-sm font-medium text-white/80 mb-8 max-w-sm"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Booking's better on the app. Use promo code "TourBooking" to save!
            </p>

            <span className="text-white text-xs font-bold mb-3" style={{ fontFamily: "var(--font-manrope)" }}>
               Get a magic link sent to your email
            </span>
            
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 px-4 py-3 rounded-xl border-none outline-none text-sm text-gray-800 placeholder-gray-400 shadow-inner font-semibold"
                style={{ fontFamily: 'var(--font-manrope)' }}
              />
              <button 
                type="button" 
                className="px-6 py-3 bg-white text-[#eb662b] font-black text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-md"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                Send
              </button>
            </form>
          </div>

          {/* Right Image Area (Phones Mockup) */}
          <div className="relative w-full md:w-1/2 min-h-[300px] flex items-end justify-center md:justify-end md:pr-16 pt-10 md:pt-0 overflow-hidden">
             {/* Main Phone */}
             <motion.div 
               initial={{ y: 100, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative z-20 w-[180px] md:w-[220px] h-[350px] md:h-[400px] bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-4 border-gray-900 overflow-hidden translate-y-8"
             >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-gray-900 rounded-b-xl z-30" />
                
                {/* Simulated App Content 1 */}
                <div className="w-full h-full bg-gray-50 flex flex-col relative overflow-hidden">
                   <div className="w-full h-1/2 bg-orange-50 flex items-center justify-center p-4">
                     <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" alt="Travel App" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   <div className="p-4 bg-white flex-1 rounded-t-3xl -mt-6 relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                      <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
                      <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                      <div className="h-3 bg-gray-100 rounded w-1/2 mb-6" />
                      
                      <div className="h-10 bg-[#eb662b] rounded-lg w-full flex items-center justify-center text-white text-[10px] font-bold">
                        Search
                      </div>
                   </div>
                </div>
             </motion.div>

             {/* Secondary Phone (Behind) */}
             <motion.div 
               initial={{ y: 100, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="absolute z-10 right-[60%] md:right-[45%] w-[160px] md:w-[200px] h-[300px] md:h-[350px] bg-white rounded-[2rem] shadow-xl border-4 border-gray-800 overflow-hidden translate-y-16"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-gray-800 rounded-b-xl z-30" />
                 {/* Simulated App Content 2 */}
                 <div className="w-full h-full bg-white flex flex-col p-3">
                   <div className="h-4 bg-gray-100 rounded w-1/2 mb-4 mt-6" />
                   <div className="grid grid-cols-2 gap-2 mb-4">
                     <div className="h-20 bg-gray-100 rounded-lg overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80" className="w-full h-full object-cover" />
                     </div>
                     <div className="h-20 bg-gray-100 rounded-lg overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=200&q=80" className="w-full h-full object-cover" />
                     </div>
                   </div>
                   <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
                   <div className="h-24 bg-gray-100 rounded-lg overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&q=80" className="w-full h-full object-cover" />
                   </div>
                 </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
