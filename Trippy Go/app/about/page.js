"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Ticket,
  Camera,
  ShieldCheck,
  Award,
  ChevronRight,
  PlaneTakeoff,
  XCircle,
  Zap,
  Car,
  FastForward,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Header />

      <main className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-20">
        
        {/* TOP BANNER */}
        <div className="relative w-full bg-[#FAFAFD] rounded-[2rem] p-12 md:p-20 mb-20 overflow-hidden flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#05073C]" style={{ fontFamily: "var(--font-montserrat)" }}>
            About Us
          </h1>
          
          {/* Decorative Plane Trail SVG */}
          <div className="absolute bottom-4 left-10 opacity-30 pointer-events-none">
            <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
              <path d="M10,70 Q50,90 80,40 T180,20" stroke="#eb662b" strokeWidth="2" strokeDasharray="6 6" fill="transparent" />
              <PlaneTakeoff x="170" y="5" className="text-[#eb662b]" size={24} />
            </svg>
          </div>
        </div>


        {/* SECTION 1: Tour And Travel Deals */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Image Collage */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-2 gap-4 h-[500px]"
          >
             <div className="flex flex-col gap-4">
                <div className="flex-1 rounded-[2rem] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" alt="Dubai" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 rounded-[2rem] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" alt="Paris" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="rounded-[2rem] overflow-hidden h-full">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" alt="London" className="w-full h-full object-cover" />
             </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
             <div className="flex items-center gap-2 mb-3">
               <MapPin className="text-[#eb662b]" size={16} />
               <span className="text-[#eb662b] font-semibold text-sm">Save big on your next adventure.</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-[#05073C] mb-6 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
               Tour And Travel Deals
             </h2>
             
             <div className="space-y-4 text-gray-500 font-medium text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-manrope)" }}>
               <p>
                 Discover unbeatable travel packages tailored just for you. From serene escapes to thrilling adventures, we bring you the world's most captivating destinations at prices that inspire you to explore more.
               </p>
               <p>
                 At TrippyGo, we believe every journey should be as unique as the traveler. Our dedicated team works tirelessly to curate experiences that blend luxury, comfort, and local authenticity.
               </p>
               <p>
                 Whether you're planning a corporate retreat, a romantic getaway, or a family vacation, our comprehensive services ensure every detail is perfectly managed, allowing you to focus on creating lasting memories.
               </p>
             </div>

             <Link href="/destinations">
                <button className="px-8 py-3 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                   Book Now
                </button>
             </Link>

             {/* Map Pins Graphic */}
             <div className="hidden lg:block absolute right-0 -translate-y-32 opacity-20 pointer-events-none">
                <svg width="250" height="100" viewBox="0 0 250 100" fill="none">
                  <path d="M20,80 Q80,110 120,40 T220,50" stroke="#05073C" strokeWidth="2" strokeDasharray="6 6" fill="transparent" />
                  <MapPin x="10" y="60" className="text-[#eb662b]" size={24} />
                  <MapPin x="210" y="30" className="text-[#05073C]" size={24} />
                </svg>
             </div>
          </motion.div>
        </section>


        {/* SECTION 2: Why Book With Trippy Go? */}
        <section className="mb-32">
          {/* Header */}
          <div className="text-center mb-16 relative">
             <div className="flex items-center justify-center gap-2 mb-2">
               <ShieldCheck className="text-[#eb662b]" size={16} />
               <span className="text-[#eb662b] font-semibold text-sm">Why we are the best for our client</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-black text-[#05073C]" style={{ fontFamily: "var(--font-montserrat)" }}>
               Why book with TrippyGo?
             </h2>

             {/* Loop Graphic */}
             <div className="absolute top-0 left-0 hidden lg:block opacity-20 pointer-events-none -translate-y-10">
                <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                  <path d="M180,20 Q100,-20 80,40 T20,90" stroke="#05073C" strokeWidth="2" strokeDasharray="6 6" fill="transparent" />
                  <MapPin x="10" y="70" className="text-[#05073C]" size={20} />
                </svg>
             </div>
          </div>

          {/* 4 Columns */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
             style={{ fontFamily: 'var(--font-manrope)' }}
          >
             {/* Col 1 */}
             <div className="flex flex-col items-center text-center px-4">
                <div className="mb-6 w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#eb662b] shadow-sm transition-transform hover:scale-110">
                   <Ticket size={40} />
                </div>
                <h3 className="font-black text-[#05073C] mb-3 text-lg" style={{ fontFamily: 'var(--font-montserrat)' }}>Ultimate Flexibility</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  Experience travel on your terms with our fully customizable booking options and seamless planning.
                </p>
             </div>

             {/* Col 2 */}
             <div className="flex flex-col items-center text-center px-4">
                <div className="mb-6 w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#eb662b] shadow-sm transition-transform hover:scale-110">
                   <Camera size={40} />
                </div>
                <h3 className="font-black text-[#05073C] mb-3 text-lg" style={{ fontFamily: 'var(--font-montserrat)' }}>Memorable Experiences</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  Capture the magic of travel with our curated journeys designed to create stories worth sharing.
                </p>
             </div>

             {/* Col 3 */}
             <div className="flex flex-col items-center text-center px-4">
                <div className="mb-6 w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#eb662b] shadow-sm transition-transform hover:scale-110">
                   <PlaneTakeoff size={40} />
                </div>
                <h3 className="font-black text-[#05073C] mb-3 text-lg" style={{ fontFamily: 'var(--font-montserrat)' }}>Quality At Our Core</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  Every detail of your trip is meticulously planned and managed to ensure peak service excellence.
                </p>
             </div>

             {/* Col 4 */}
             <div className="flex flex-col items-center text-center px-4">
                <div className="mb-6 w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#eb662b] shadow-sm transition-transform hover:scale-110">
                   <Award size={40} />
                </div>
                <h3 className="font-black text-[#05073C] mb-3 text-lg" style={{ fontFamily: 'var(--font-montserrat)' }}>Award-Winning Support</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  Our dedicated support team is available around the clock to provide unparalleled travel assistance.
                </p>
             </div>
          </motion.div>
        </section>


        {/* SECTION 3: Our Best Services */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
             <div className="flex items-center gap-2 mb-3">
               <Award className="text-[#eb662b]" size={16} />
               <span className="text-[#eb662b] font-semibold text-sm">Our Dedication to Excellence</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-[#05073C] mb-6 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
               Our Best Services
             </h2>
             
             <div className="space-y-4 text-gray-500 font-medium text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-manrope)" }}>
               <p>
                 We pride ourselves on offering more than just transportation; we offer peace of mind. Our luxury fleet and professional chauffeurs are at your service for any occasion, ensuring every journey is smooth and stylish.
               </p>
               <p>
                 From corporate delegation handling to seamless wedding transportation, our attention to detail and commitment to punctuality set us apart. We understand that your time is valuable, and your comfort is paramount.
               </p>
             </div>

             <Link href="/destinations">
                <button className="px-8 py-3 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                   Discover Destinations
                </button>
             </Link>

             {/* Plane Graphic bottom */}
             <div className="absolute -bottom-16 right-10 opacity-20 pointer-events-none hidden md:block">
                <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
                  <path d="M20,20 Q80,0 120,40 T180,60" stroke="#05073C" strokeWidth="2" strokeDasharray="6 6" fill="transparent" />
                  <PlaneTakeoff x="20" y="5" className="text-[#eb662b]" size={24} />
                </svg>
             </div>
          </motion.div>

          {/* Right Cards Stack */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
             {/* Dotted Border Container with extremely faint orange background */}
             <div className="w-full bg-[#FFFBFB] border-2 border-dashed border-orange-200 rounded-[2rem] p-6 md:p-10 flex flex-col gap-6 relative z-10" style={{ fontFamily: 'var(--font-manrope)' }}>
                
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-5 flex items-start gap-5 shadow-sm border border-gray-100 group hover:border-[#eb662b]/30 transition-all">
                   <div className="bg-orange-50 p-3 rounded-lg text-[#eb662b] group-hover:scale-110 transition-transform">
                     <XCircle size={24} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-[#05073C] mb-1" style={{ fontFamily: 'var(--font-montserrat)' }}>Easy cancellation</h4>
                      <p className="text-[11px] text-gray-500 font-medium">Life is unpredictable. That's why we offer hassle-free cancellation options for your convenience.</p>
                   </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-5 flex items-start gap-5 shadow-sm border border-gray-100 group hover:border-[#eb662b]/30 transition-all">
                   <div className="bg-orange-50 p-3 rounded-lg text-[#eb662b] group-hover:scale-110 transition-transform">
                     <Zap size={24} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-[#05073C] mb-1" style={{ fontFamily: 'var(--font-montserrat)' }}>Instant confirmation</h4>
                      <p className="text-[11px] text-gray-500 font-medium">Book with confidence. Receive immediate confirmation for all your travel arrangements.</p>
                   </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-5 flex items-start gap-5 shadow-sm border border-gray-100 group hover:border-[#eb662b]/30 transition-all">
                   <div className="bg-orange-50 p-3 rounded-lg text-[#eb662b] group-hover:scale-110 transition-transform">
                     <Car size={24} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-[#05073C] mb-1" style={{ fontFamily: 'var(--font-montserrat)' }}>Pick-up Possible</h4>
                      <p className="text-[11px] text-gray-500 font-medium">Door-to-door service that ensures you start your journey right from your doorstep.</p>
                   </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-2xl p-5 flex items-start gap-5 shadow-sm border border-gray-100 group hover:border-[#eb662b]/30 transition-all">
                   <div className="bg-orange-50 p-3 rounded-lg text-[#eb662b] group-hover:scale-110 transition-transform">
                     <FastForward size={24} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-[#05073C] mb-1" style={{ fontFamily: 'var(--font-montserrat)' }}>Skip the line</h4>
                      <p className="text-[11px] text-gray-500 font-medium">Enjoy VIP entry and skip the queues at some of the world's most popular attractions.</p>
                   </div>
                </div>

             </div>
          </motion.div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
