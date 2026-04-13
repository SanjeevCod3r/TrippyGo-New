"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Navigation,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Users,
  BookOpen,
  Globe,
  Compass,
  Map,
  Plane,
  Camera,
  Heart,
  Search,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Always use solid white navbar as per user request
  const shouldBeSolid = true;

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Destinations", href: "/destinations" },
    { name: "Fleet", href: "/fleet" },
    { name: "Hotels", href: "/hotels" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const getIcon = (name) => {
    switch (name) {
      case "Home":
        return <Globe size={20} />;
      case "Destinations":
        return <Map size={20} />;
      case "Tours":
        return <Compass size={20} />;
      case "Fleet":
        return <Plane size={20} />;
      case "Hotels":
        return <Building2 size={20} />;
      case "Experience":
        return <Camera size={20} />;
      case "Blog":
        return <BookOpen size={20} />;
      case "Contact":
        return <Phone size={20} />;
      default:
        return <Navigation size={20} />;
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] border-b border-gray-100 ${isScrolled ? "py-2.5" : "py-4"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 flex items-center justify-between">

          {/* Left: Logo (Mega Prominent) */}
          <div className="flex-shrink-0 w-1/4">
            <Link href="/" className="flex items-center group">
              <img
                src="/asset/logo1.png"
                alt="TrippyGo"
                className={`h-14 w-auto md:h-20 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm`}
              />
            </Link>
          </div>

          {/* Center: Symmetric Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[15.5px] font-bold tracking-wide transition-colors duration-500 group ${shouldBeSolid ? "text-[#05073C] hover:text-[#eb662b]" : "text-[#eb662b] hover:text-[#eb662b]"
                    }`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-8 ${shouldBeSolid ? "bg-[#eb662b]" : "bg-white"
                    }`} />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Auth & CTA Buttons */}
          <div className="flex items-center justify-end gap-10 w-1/4">
            {user ? (
              <div className="flex items-center gap-4 bg-gray-50/50 p-1.5 rounded-full pl-5 border border-gray-100 shadow-sm">
                <span className={`text-sm font-bold ${shouldBeSolid ? "text-[#05073C]" : "text-[#eb662b]"}`}>
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-[10px] font-black uppercase tracking-widest text-[#eb662b] bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-10">
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: shouldBeSolid ? "0 15px 30px -10px rgba(235, 102, 43, 0.4)" : "0 15px 30px -10px rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-10 py-4 font-black rounded-full transition-all duration-500 text-[13.5px] uppercase tracking-[0.12em] shadow-xl ${shouldBeSolid
                        ? "bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white"
                        : "bg-white text-[#05073C]"
                      }`}
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Log in
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button Wrapper */}
          <div className="lg:hidden">
            <button
              className={`p-3.5 rounded-2xl transition-all duration-300 ${shouldBeSolid
                ? "text-gray-700 bg-gray-50 border border-gray-200 shadow-sm shadow-black/5 hover:bg-gray-100"
                : "text-[#eb662b] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20"
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-menu-backdrop"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
              data-testid="mobile-menu-drawer"
            >
              {/* Background Decor */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }}
                ></div>
              </div>

              {/* Drawer Header */}
              <div className="relative bg-gradient-to-br px-6 py-10 overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-[#eb662b]">
                  <motion.div className="flex items-center gap-2">
                  <img src="/asset/logo1.png" alt="TrippyGo" className="h-12 w-auto" /> </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[#eb662b]/80 text-sm font-medium"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      Search destinations or activities
                    </motion.p>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                    data-testid="close-drawer-button"
                  >
                    <X size={20} className="text-[#eb662b]" />
                  </motion.button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="relative z-10 px-6 py-3 space-y-3 overflow-y-auto flex-1 pb-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group relative flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-blue-600/30 overflow-hidden bg-white hover:bg-blue-50/30"
                    >
                      <div className="relative flex items-center gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 + index * 0.08 }}
                          className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#eb662b]"
                        >
                          {getIcon(link.name)}
                        </motion.div>
                        <span
                          className="text-gray-900 font-bold text-lg group-hover:text-[#eb662b] transition-all duration-300"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {link.name}
                        </span>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.08 }}
                        className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#eb662b] group-hover:text-[#eb662b] transition-all duration-300"
                      >
                        <Navigation size={14} className="rotate-90" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                {/* Auth section inside drawer */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative h-px bg-gradient-to-r from-transparent via-[#eb662b]/50 to-transparent my-8"
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-2 h-2 bg-[#eb662b] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#eb662b] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#eb662b] rounded-full"></div>
                  </motion.div>
                </motion.div>

                {/* Contact Info & CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-5"
                >
                  {/* Phone Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="relative p-5 rounded-2xl overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(254, 128, 90, 0.15) 0%, rgba(254, 107, 71, 0.08) 100%)",
                      border: "1px solid rgba(254, 128, 90, 0.3)",
                    }}
                  >
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-[#FE805A]/30">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-1 rounded-full bg-gradient-to-r from-[#FE805A] to-[#FE6B47]"
                        style={{
                          clipPath: "polygon(50% 50%, 50% 0%, 100% 0%)",
                        }}
                      ></motion.div>
                    </div>

                    <div className="relative flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg"
                      >
                        <Phone size={18} className="text-[#eb662b]" />
                      </motion.div>
                      <div>
                        <p
                          className="text-sm text-gray-400 font-medium"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          24/7 Support
                        </p>
                        <p
                          className="font-bold text-gray-800 text-lg"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          +91 8076449902
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Auth Buttons */}
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
                        <div className="w-10 h-10 bg-[#eb662b]/10 rounded-full flex items-center justify-center text-[#eb662b] font-bold">
                          {user.name?.[0] || "U"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {user.name || "User"}
                          </p>
                          <a
                            href="/my-bookings"
                            className="text-xs text-[#eb662b] font-semibold"
                          >
                            View Bookings
                          </a>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full py-6 rounded-2xl border-red-100 text-red-500 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/auth"
                        className="block w-full py-4 text-center font-bold text-gray-700 hover:text-[#eb662b] border border-gray-200 rounded-2xl transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Login
                      </Link>

                      {/* Book Your Ride CTA */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 30px rgba(235, 102, 43, 0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          window.location.href = "/contact";
                        }}
                        className="relative w-full px-6 py-4 bg-gradient-to-br from-[#eb662b] to-[#d45821] text-white font-bold rounded-2xl shadow-xl transition-all duration-300 text-lg overflow-hidden group"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <Plane size={20} className="group-hover:rotate-12 transition-transform" />
                          Plan Your Trip
                        </span>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
                {/* Spacer block to ensure the last button isn't cut off on any mobile browser */}
                <div className="h-32 w-full flex-shrink-0"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
