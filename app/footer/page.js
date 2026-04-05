"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Fleet", href: "/fleet" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1Favmyizxy/" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "https://www.instagram.com/trippygo_india_technologies?igsh=bnRzOWRuMHVsdTA3&utm_source=qr" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="relative w-full overflow-hidden text-white pt-24 pb-12">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
          alt="Mountain Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top: brand + compact link grid (matches reduced link set) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 lg:mb-20 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p
              className="text-sm text-white/55 max-w-md leading-relaxed"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Reliable cab and travel services across India—book rides, explore
              destinations, and travel with confidence.
            </p>
          </div>

          <div className="lg:col-span-7">
            <h4
              className="text-lg font-black mb-6 tracking-wide"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Quick links
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#eb662b] text-sm font-medium transition-all inline-flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 shrink-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar (Glassmorphism Effect) */}
        <div className="relative group">
          {/* Glass Effect Background */}
          <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl -z-10 group-hover:bg-white/[0.08] transition-all duration-500" />

          {/* Bar Content */}
          <div className="flex flex-col lg:flex-row justify-between items-center px-10 py-8 gap-8">
            {/* Address */}
            <div className="flex items-center gap-4 group/item cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#eb662b]/10 text-[#eb662b] flex items-center justify-center group-hover/item:bg-[#eb662b] group-hover/item:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase text-[#eb662b] tracking-widest block">
                  Location
                </span>
                <span className="text-sm font-bold text-white/80">
                D-193, G/F Saurabh Vihar Gali No. 7, Harinagar Extension
                Jaitpur, Badarpur New Delhi – 110044
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 group/item cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#eb662b]/10 text-[#eb662b] flex items-center justify-center group-hover/item:bg-[#eb662b] group-hover/item:text-white transition-all duration-300">
                <Phone size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase text-[#eb662b] tracking-widest block">
                  Call Us
                </span>
                <a
                  href="tel:+8076449902"
                  className="text-sm font-bold text-white/80 hover:text-white"
                >
                  8076449902
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 group/item cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#eb662b]/10 text-[#eb662b] flex items-center justify-center group-hover/item:bg-[#eb662b] group-hover/item:text-white transition-all duration-300">
                <Mail size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase text-[#eb662b] tracking-widest block">
                  Support
                </span>
                <a
                  href="mailto:info@trippygo.co.in"
                  className="text-sm font-bold text-white/80 hover:text-white"
                >
                 info@trippygo.co.in 
                </a>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#eb662b] hover:text-white hover:border-[#eb662b] hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-xs font-medium text-white/30 tracking-wider"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            © {currentYear} Trippy Go. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-2 text-[11px] font-black uppercase tracking-widest text-white/30">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
