"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Award, Users } from "lucide-react";

export const AboutShowcase = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-[#eb662b]/10 to-[#ff9b6a]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-orange-300/10 to-yellow-300/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white rounded-full mb-6"
          >
            <Heart size={18} />
            <span
              className="font-semibold text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              About Trippy Go
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Your Trusted Travel
            <br />
            <span className="bg-gradient-to-r from-[#eb662b] via-[#f58d5c] to-[#ff9b6a] bg-clip-text text-transparent">
              Companion
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Since our founding, Trippy Go has been dedicated to providing
            exceptional transportation services that combine luxury,
            reliability, and personalized care.
          </motion.p>
        </motion.div>

        {/* Middle Image - Cinematic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mb-24 group px-4"
        >
          <div className="absolute inset-0 bg-[#eb662b]/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop"
              alt="Taj Mahal Premium View"
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-baseline justify-between text-white">
              <div>
                <h4 className="text-2xl font-black" style={{ fontFamily: "var(--font-montserrat)" }}>Authentic India</h4>
                <p className="text-sm opacity-80" style={{ fontFamily: "var(--font-manrope)" }}>Curated by Local Experts</p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-white/50" />
                <div className="w-2 h-2 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="max-w-3xl mx-auto"
          >
            <p
              className="text-lg text-gray-700 leading-relaxed mb-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              We understand that every journey is unique, and we're here to make
              yours unforgettable. Our commitment to excellence ensures that
              every ride with Trippy Go is crafted for your comfort and
              convenience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#eb662b] group-hover:to-[#ff9b6a] group-hover:text-white transition-all duration-300 mx-auto text-[#eb662b]">
                  <Shield className="w-8 h-8" />
                </div>
                <h4
                  className="text-xl font-black text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Unrivaled Safety
                </h4>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Your peace of mind is our priority, with 24/7 support and certified local guides.
                </p>
              </div>
              <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#eb662b] group-hover:to-[#ff9b6a] group-hover:text-white transition-all duration-300 mx-auto text-[#eb662b]">
                  <Award className="w-8 h-8" />
                </div>
                <h4
                  className="text-xl font-black text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Expert Curation
                </h4>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Bespoke itineraries designed by travel connoisseurs with decades of experience.
                </p>
              </div>
              <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#eb662b] group-hover:to-[#ff9b6a] group-hover:text-white transition-all duration-300 mx-auto text-[#eb662b]">
                  <Heart className="w-8 h-8" />
                </div>
                <h4
                  className="text-xl font-black text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Heartfelt Service
                </h4>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  We treat every journey as our own, ensuring meticulous attention to every detail.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
