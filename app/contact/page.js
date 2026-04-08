"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store in database backend logic
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: "General Contact" }),
      });
    } catch (error) {
      console.error("Failed to store contact submission:", error);
    }

    // Show thank you popup
    setShowThankYou(true);

    // Create mailto link with form data (will open after popup)
    setTimeout(() => {
      const subject = `Inquiry from ${formData.name}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
      `.trim();

      window.location.href = `mailto:info@trippygo.co.in?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }, 2000); // Show popup for 2 seconds before opening mailto
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 flex flex-col">
      <Header />

      {/* IMMERSIVE HERO SECTION */}
      <section className="relative w-full h-[350px] md:h-[450px] mt-10 md:mt-0 flex items-center justify-center bg-black overflow-hidden z-10">
        
        {/* Background Image Loading */}
        <div 
           className="absolute inset-0 bg-cover bg-center brightness-[0.40] opacity-80" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')" }} 
        />
        
        {/* Hero Text */}
        <div className="relative z-10 text-center flex flex-col items-center gap-3 mt-10" style={{ fontFamily: "var(--font-montserrat)" }}>
           <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black tracking-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              <span className="text-[#eb662b]">Contact</span> <span className="text-white">Us</span>
           </h1>
        </div>

        {/* The Geometric Upward Chevron Cutout (Overlapping Bottom Edge) */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[120px]">
            <path d="M0,120 L600,0 L1200,120 Z" fill="#ffffff" stroke="none" />
          </svg>
        </div>
      </section>

      {/* TWO-COLUMN WHITE CONTENT SECTION */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-16 md:pt-24 pb-32 bg-white relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            
            {/* LEFT COLUMN: GET IN TOUCH */}
            <div>
               <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>Get In Touch</h2>
               <p className="text-gray-500 text-[15px] font-medium leading-relaxed mb-8 max-w-md" style={{ fontFamily: "var(--font-manrope)" }}>
                 Drop us a message and our team will get back to you shortly with the best travel solutions and support.
               </p>

               <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "var(--font-manrope)" }}>
                  
                  {/* Row 1: Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#1F1F1F]">Email</label>
                        <input 
                           type="email" name="email" value={formData.email} onChange={handleChange} required
                           className="w-full bg-[#fcfcfc] border-none outline-none focus:ring-1 focus:ring-[#eb662b]/30 px-4 py-3.5 text-sm font-semibold rounded-sm shadow-inner transition-colors"
                           placeholder="Email"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#1F1F1F]">Phone</label>
                        <input 
                           type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                           className="w-full bg-[#fcfcfc] border-none outline-none focus:ring-1 focus:ring-[#eb662b]/30 px-4 py-3.5 text-sm font-semibold rounded-sm shadow-inner transition-colors"
                           placeholder="Phone"
                        />
                     </div>
                  </div>

                  {/* Row 2: Name */}
                  <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-[#1F1F1F]">Name</label>
                     <input 
                        type="text" name="name" value={formData.name} onChange={handleChange} required
                        className="w-full bg-[#fcfcfc] border-none outline-none focus:ring-1 focus:ring-[#eb662b]/30 px-4 py-3.5 text-sm font-semibold rounded-sm shadow-inner transition-colors"
                        placeholder="Name"
                     />
                  </div>

                  {/* Row 3: Message */}
                  <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-[#1F1F1F]">Message</label>
                     <textarea 
                        name="message" value={formData.message} onChange={handleChange} required rows={5}
                        className="w-full bg-[#fcfcfc] border-none outline-none focus:ring-1 focus:ring-[#eb662b]/30 px-4 py-4 text-sm font-semibold rounded-sm shadow-inner transition-colors resize-none"
                        placeholder="Message"
                     />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                     <button type="submit" className="bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white font-black uppercase text-[13px] tracking-widest px-10 py-4 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all rounded-full" style={{ fontFamily: "var(--font-manrope)" }}>
                        Send Message
                     </button>
                  </div>

               </form>
            </div>


            {/* RIGHT COLUMN: OUR COMPANY */}
            <div>
               <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>Our Company</h2>
               <p className="text-gray-500 text-[15px] font-medium leading-relaxed mb-10 max-w-lg" style={{ fontFamily: "var(--font-manrope)" }}>
                 We are here to help you plan your perfect trip. Reach out to us for bookings, inquiries, or customized travel packages across India.
               </p>

               {/* Contact Information List */}
               <div className="flex flex-col gap-5 mb-10 text-[15px] font-bold text-[#202020]" style={{ fontFamily: "var(--font-manrope)" }}>
                  
                  <div className="flex items-center gap-4">
                     <Phone size={18} fill="#eb662b" stroke="#eb662b" className="flex-shrink-0" />
                     <span>+91 8076449902</span>
                  </div>

                  <div className="flex items-center gap-4">
                     <Mail size={18} fill="#eb662b" stroke="#ffffff" className="flex-shrink-0" />
                     <span>info@trippygo.co.in</span>
                  </div>

                  {/* Head Office */}
                  <div className="flex items-start gap-4">
                     <MapPin size={20} fill="#eb662b" stroke="#ffffff" className="mt-1 flex-shrink-0" />
                     <div className="flex flex-col">
                        <span className="text-[12px] font-black uppercase tracking-widest text-[#eb662b] mb-1">Head Office</span>
                        <span className="leading-snug">D-193, G/F Saurabh Vihar Gali No. 7, Harinagar Ext, Jaitpur, Badarpur New Delhi – 110044</span>
                     </div>
                  </div>

                  {/* Branch (Ballia) */}
                  <div className="flex items-start gap-4">
                     <MapPin size={20} fill="#eb662b" stroke="#ffffff" className="mt-1 flex-shrink-0" />
                     <div className="flex flex-col">
                        <span className="text-[12px] font-black uppercase tracking-widest text-[#eb662b] mb-1">Branch Office (Ballia)</span>
                        <span className="leading-snug">Plot No - 517 Narayangarh ballia up 277208</span>
                     </div>
                  </div>

                  {/* Branch (Noida) */}
                  <div className="flex items-start gap-4">
                     <MapPin size={20} fill="#eb662b" stroke="#ffffff" className="mt-1 flex-shrink-0" />
                     <div className="flex flex-col">
                        <span className="text-[12px] font-black uppercase tracking-widest text-[#eb662b] mb-1">Branch Office (Noida)</span>
                        <span className="leading-snug">B - 16, office no 2 basement noida sec 62 up</span>
                     </div>
                  </div>

                  {/* Branch (Chapra) */}
                  <div className="flex items-start gap-4">
                     <MapPin size={20} fill="#eb662b" stroke="#ffffff" className="mt-1 flex-shrink-0" />
                     <div className="flex flex-col">
                        <span className="text-[12px] font-black uppercase tracking-widest text-[#eb662b] mb-1">Branch Office (Chapra)</span>
                        <span className="leading-snug">Plot No - 3/1139, Civil court colony bara telpa chapra bihar 841302</span>
                     </div>
                  </div>

               </div>

               {/* Embedded Google Map removed per user request */}

            </div>

         </div>
      </main>

      {/* Thank You Popup Component */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 w-full h-full border-none"
            onClick={() => setShowThankYou(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#eb662b] to-[#ff9b6a] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-[#05073C] mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>Sent!</h3>
              <p className="text-gray-500 font-medium mb-5" style={{ fontFamily: "var(--font-manrope)" }}>We will contact you soon.</p>
              <button 
                 onClick={() => setShowThankYou(false)}
                 className="w-full bg-[#FAFAFD] text-[#05073C] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                 style={{ fontFamily: "var(--font-manrope)" }}
              >
                 Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

    </div>
  );
}
