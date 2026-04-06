"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Send } from "lucide-react";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+919990817615"; // Replace with your actual WhatsApp number
    const message =
      "Hi! I'm interested in your transportation services. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = () => {
    const phoneNumber = "+919990817615"; // Replace with your actual phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulsing ring effect */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-green-500 rounded-full -z-10"
          />
        )}
      </motion.div>

      {/* Chat Options Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden min-w-80"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white p-4">
              <h3
                className="font-black text-lg"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                How can we help you?
              </h3>
              <p
                className="text-sm opacity-90 font-medium"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Get in touch with TrippyGo
              </p>
            </div>

            {/* Options */}
            <div className="p-4 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppClick}
                className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p
                    className="font-semibold text-green-800"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    Chat on WhatsApp
                  </p>
                  <p
                    className="text-sm text-green-600"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    Instant messaging
                  </p>
                </div>
                <Send size={16} className="text-green-500 ml-auto" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCallClick}
                className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#eb662b] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-white" />
                </div>
                <div className="text-left">
                  <p
                    className="font-bold text-orange-900"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    Call Us Directly
                  </p>
                  <p
                    className="text-sm text-orange-600 font-medium"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    Speak with our team
                  </p>
                </div>
                <Phone size={16} className="text-[#eb662b] ml-auto" />
              </motion.button>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <div
                className="text-center text-sm text-gray-500"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Available 24/7 for your transportation needs
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingChat;
