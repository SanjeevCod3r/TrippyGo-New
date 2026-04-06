"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building,
  Mail,
  Phone,
  Car,
  MapPin,
  Send,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";
import { toast } from "sonner";

export default function VendorRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    vehicleTypes: "",
    city: "",
    experience: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/vendor-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        toast.success("Registration submitted successfully!");
        // Reset after showing success
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: "",
            companyName: "",
            email: "",
            phone: "",
            vehicleTypes: "",
            city: "",
            experience: "",
            message: "",
          });
        }, 3000);
      } else {
        toast.error(data.error || "Failed to submit registration");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-24 flex items-center justify-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-[#0056D2]/10 to-[#43E0F8]/10  -z-10 rounded-b-[40%]" />

        <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="mt-5 bg-blue-100 text-[#0056D2] px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-4 inline-block uppercase shadow-sm">
              Partner With Us
            </span>
            <h1
              className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Vendor Registration
            </h1>
            <p
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Join our network of premium fleet providers. Elevate your business
              by partnering with TrippyGo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative"
            style={{ boxShadow: "0 25px 50px -12px rgba(0, 86, 210, 0.15)" }}
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check size={40} className="text-green-500" />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Registration Submitted!
                </h3>
                <p
                  className="text-gray-600 text-center"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  Thank you for applying. Our vendor management team will
                  contact you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Contact Name */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Contact Person
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#0056D2] transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Company / Agency Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400 group-focus-within:text-[#0056D2] transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your Agency Name"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#0056D2] transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contact@company.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Contact Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#0056D2] transition-colors" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Vehicle Types */}
                  <div className="space-y-2 group md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Types of Vehicles Available
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Car className="h-5 w-5 text-gray-400 group-focus-within:text-[#0056D2] transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="vehicleTypes"
                        required
                        value={formData.vehicleTypes}
                        onChange={handleChange}
                        placeholder="E.g., Innova Crysta, Mercedes S Class, Swift Dzire"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* City Location */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Base City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-[#0056D2] transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Delhi NCR, Mumbai, etc."
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Years of Operation
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="experience"
                        required
                        min="0"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g., 5"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2 group md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Additional Information
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your fleet size and primary services..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0, 86, 210, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-4 mt-6 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:brightness-110"
                  type="submit"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Application
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
