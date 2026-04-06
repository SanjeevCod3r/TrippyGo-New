"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#eb662b]/5 rounded-bl-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-600/5 rounded-tr-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 z-10 w-full relative">
          
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-white/50 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#eb662b] to-[#ff9b6a] opacity-10 rounded-[2rem]" />
            <Building2 size={40} className="text-[#eb662b]" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#eb662b]/10 text-[#eb662b] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-[#eb662b] animate-pulse" />
              Coming Soon
            </div>
            
            <h1 
              className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Premium Hotel <br/>
              <span className="text-[#eb662b]">Booking Experience</span>
            </h1>
            
            <p 
              className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              We're curating a world-class selection of luxury resorts, boutique hotels, and comfortable stays for your next adventure. Our hotel booking platform is launching very soon.
            </p>
          </motion.div>

          {/* Feature Teasers */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto"
          >
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 mx-auto text-blue-500">
                <Building2 size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>Luxury Stays</h3>
              <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-manrope)" }}>Handpicked premium accommodations</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4 mx-auto text-[#eb662b]">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>Prime Locations</h3>
              <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-manrope)" }}>Best spots in central districts</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4 mx-auto text-green-500">
                <CalendarDays size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>Flexible Booking</h3>
              <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-manrope)" }}>Zero-hassle modifications</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <Link href="/">
              <button className="flex items-center gap-2 mx-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-gray-900/20" style={{ fontFamily: "var(--font-manrope)" }}>
                <ArrowLeft size={18} />
                Back to Home
              </button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
