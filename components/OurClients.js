"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building, Factory, HeartPulse, HardHat, Zap, Plane, ShieldCheck, Cpu } from "lucide-react";

export const OurClients = () => {
  const clients = [
    { name: "STL", icon: Cpu, color: "text-blue-600" },
    { name: "Sterlite Network LTD", icon: Zap, color: "text-amber-500" },
    { name: "VST Thriller", icon: Factory, color: "text-gray-800" },
    { name: "Omni Pharma Pvt Ltd", icon: HeartPulse, color: "text-red-500" },
    { name: "Medyou Pharmaceutical", icon: HeartPulse, color: "text-emerald-500" },
    { name: "Rudra Infra & Management", icon: HardHat, color: "text-orange-500" },
    { name: "Unigo Travel", icon: Plane, color: "text-[#eb662b]" },
    { name: "Modi Mundi", icon: Building, color: "text-indigo-600" },
    { name: "Trexeego Technologies", icon: Cpu, color: "text-purple-600" },
    { name: "Cipla", icon: ShieldCheck, color: "text-cyan-600" },
    { name: "Alkem Pharmaceutical", icon: HeartPulse, color: "text-teal-600" },
    { name: "Polycab India LTD", icon: Zap, color: "text-yellow-500" },
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 text-center mb-12">
        <h2
          className="text-3xl lg:text-4xl font-black text-[#05073C]"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          Our Trusted <span className="text-[#eb662b]"> Clients </span>
        </h2>
        <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
          We provide unparalleled travel experiences and corporate mobility solutions for some of India's biggest enterprises.
        </p>
      </div>

      {/* Infinite Marquee Slider */}
      <div className="relative flex overflow-hidden">
        {/* Gradient overlays to smooth edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Animated Marquee Container */}
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ ease: "linear", duration: 40, repeat: Infinity }}
           className="flex gap-8 px-4 items-center w-max"
        >
          {[...clients, ...clients].map((client, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 bg-white px-8 py-5 rounded-[1.5rem] shadow-[0_5px_15px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_10px_30px_rgba(235,102,43,0.1)] transition-all grayscale hover:grayscale-0 cursor-pointer"
            >
              <client.icon className={`${client.color} w-8 h-8 shrink-0`} />
              <span className="font-bold text-gray-800 tracking-wide text-sm" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
