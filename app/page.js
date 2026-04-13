"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Phone,
  Mail,
  User,
  Plane,
  Building2,
  Route,
  ChevronRight,
  Star,
  Shield,
  Headphones,
  CreditCard,
  CheckCircle2,
  X,
  Menu,
  ArrowRight,
  Package,
  Truck,
  Navigation,
  Globe,
} from "lucide-react";
import Contact from "./contact/page";
import About from "./about/page";
import Footer from "./footer/page";
import Header from "@/components/Header";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Services } from "@/components/Services";
import { FleetShowcase } from "@/components/FleetShowcase";
import { FleetIntro } from "@/components/FleetIntro";
import { AboutShowcase } from "@/components/AboutShowCase";
import { WhyChoose } from "@/components/WhyChooseUs";
import { DestinationShowcase } from "@/components/DestinationShowCase";
import { CabBookingForm } from "@/components/CabBookingForm";
import { PromoBanner } from "@/components/PromoBanner";
import { PopularThingsToDo } from "@/components/PopularThingsToDo";
import { CustomerReviews } from "@/components/CustomerReviews";
import { AppPromoBanner } from "@/components/AppPromoBanner";
import { TravelArticles } from "@/components/TravelArticles";
import { EnquiryModal } from "@/components/EnquiryModal";
import { OurClients } from "@/components/OurClients";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Old Header Component
function OldHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

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
    { name: "Home", href: "#home" },
    { name: "Packages", href: "#packages" },
    { name: "Fleet", href: "#fleet" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${isScrolled ? "top-2 left-2 right-2" : ""
          }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between rounded-3xl border transition-all duration-500 ${isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl"
            : "bg-white/80 backdrop-blur-lg"
            }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-paleBlue">
              TrippyGo
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-gray-700 hover:text-primary transition"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary hover:w-full transition-all"></span>
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <a
                  href="/my-bookings"
                  className="text-gray-600 hover:text-paleBlue"
                >
                  {user.name || "My Bookings"}
                </a>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a href="/auth" className="text-gray-600 hover:text-paleBlue">
                  Login
                </a>
                <Button size="sm">Sign Up</Button>
              </>
            )}

            {/* CTA */}
            <a href="#contact">
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#FE805A] to-[#FE6B47] text-white rounded-full shadow-lg hover:shadow-xl transition">
                Book Now
              </button>
            </a>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 p-6"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="mb-6">
              <X />
            </button>

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-gray-700 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Redundant CabBookingForm removed as it is now a separate component

// Hero Section with Cinematic Slider and Side-Panel Form
function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2671&auto=format&fit=crop", // Taj Mahal
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2670&auto=format&fit=crop", // Varanasi
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=2670&auto=format&fit=crop", // Kerala
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2670&auto=format&fit=crop", // Hawa Mahal
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home" className="relative min-h-screen overflow-hidden bg-black">
      {/* Cinematic Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={images[currentImage]}
              alt="Travel Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[2]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Cinematic Content */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-md rounded-full border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-[0.3em] mb-8 mt-24 lg:mt-0">
                <Globe size={14} className="animate-spin-slow" />
                <span>Boutique Travel Experiences</span>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight uppercase"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                Find your next
                <br />
                adventure with
                <br />
                <span className="text-[#eb662b]">TrippyGo</span> India Technology
              </h1>

              <p
                className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl leading-relaxed font-medium"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                Experience the soul of India through curated itineraries,
                premium accommodations, and seamless mobility solutions tailored for the modern explorer.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link href="/destinations">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(235, 102, 43, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white font-black rounded-2xl shadow-2xl transition-all duration-300 text-base uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    Explore Destinations
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Floating Glass Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[450px] relative group">
              {/* Decorative Glow - Fixed overflow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#eb662b]/30 to-[#ff9b6a]/30 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />

              <div className="relative bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-2 shadow-2xl overflow-hidden">
                <div className="bg-white/90 backdrop-blur-md p-2 rounded-[2rem]">
                  <CabBookingForm />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}

      {/* Curve Bottom Design */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg
          className="w-full h-auto translate-y-px"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 105C1200 110 1320 100 1380 95L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}

// Booking Modal Component with Razorpay Payment
function BookingModal({ open, onClose, type, bookingData, onSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setCustomerName(parsedUser.name || "");
      setCustomerPhone(parsedUser.phone || "");
      setCustomerEmail(parsedUser.email || "");
    }
  }, [open]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!customerName || !customerPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("Please login to book");
      window.location.href = "/auth";
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      const amount =
        (bookingData?.totalPrice ||
          bookingData?.pricePerDay ||
          bookingData?.estimatedFare ||
          1500) * 100;

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          bookingType: type,
        }),
      });

      const orderData = await orderRes.json();

      if (orderData.error) {
        if (orderData.requireLogin) {
          toast.error("Please login to continue");
          window.location.href = "/auth";
          return;
        }
        toast.error(orderData.error);
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Trippy Go",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} Booking`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: {
                  type,
                  customerName,
                  customerPhone,
                  customerEmail,
                  ...bookingData,
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment successful! Booking confirmed.");
              onClose();
              setCustomerName("");
              setCustomerPhone("");
              setCustomerEmail("");
              if (onSuccess) onSuccess();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: "#0056D2",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in
  if (open && !localStorage.getItem("userToken")) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl">
          <DialogHeader className="space-y-4 text-center items-center">
            <DialogTitle
              className="text-2xl font-black text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Login Required
            </DialogTitle>
            <DialogDescription
              className="text-gray-500 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Sign up to secure your booking and unlock premium features.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-paleBlue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-[#0056D2]" />
            </div>
            <p
              className="text-gray-600 mb-8 font-semibold"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              You need to be logged in to make a booking
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl px-10 py-5 h-auto font-black border-gray-200"
              >
                Cancel
              </Button>
              <a href="/auth">
                <Button className="bg-[#0056D2] hover:bg-paleBlue-700 text-white font-black rounded-xl px-10 py-5 h-auto shadow-lg shadow-paleBlue-100 transition-all">
                  Sign Up Now
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const totalAmount =
    bookingData?.totalPrice ||
    bookingData?.pricePerDay ||
    bookingData?.estimatedFare ||
    0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
        {/* Modal Header with vibrant gradient */}
        <div className="bg-gradient-to-r from-[#0056D2] to-[#43E0F8] p-8 text-white relative">
          <div className="relative z-10">
            <h2
              className="text-2xl font-black mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book Your Success
            </h2>
            <p
              className="opacity-90 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {type === "fleet" ? "Fleet Vehicle" : "Travel Package"} •{" "}
              {bookingData?.vehicleName ||
                bookingData?.packageTitle ||
                "Service"}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        </div>

        <div className="p-8 space-y-8">
          {/* User Details Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-3 bg-paleBlue-50 rounded-full mb-2">
              <Label
                className="text-[15px] font-black uppercase tracking-widest text-[#0056D2]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Personal Information
              </Label>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
                <div className="relative flex items-center bg-gray-50 rounded-2xl border-none h-full">
                  <div className="pl-5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-4 pr-4 py-5 bg-transparent text-gray-900 focus:outline-none font-bold placeholder:text-gray-400"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
                  <div className="relative flex items-center bg-gray-50 rounded-2xl border-none h-full">
                    <div className="pl-5 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-4 pr-4 py-5 bg-transparent text-gray-900 focus:outline-none font-bold placeholder:text-gray-400"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                      required
                    />
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
                  <div className="relative flex items-center bg-gray-50 rounded-2xl border-none h-full">
                    <div className="pl-5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email (Optional)"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-4 pr-4 py-5 bg-transparent text-gray-900 focus:outline-none font-bold placeholder:text-gray-400"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary Card */}
          <div className="bg-gradient-to-br from-[#0056D2] to-[#0056D2] rounded-3xl p-4 text-white shadow-xl  flex items-center justify-between">
            <div>
              <span
                className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Secure your quote
              </span>
              <h3
                className="text-2xl font-black"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ₹{(totalAmount || 1500).toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl py-6 h-auto font-black border-gray-100 text-gray-500 hover:bg-gray-50 transition-all"
            >
              Later
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="flex-[2] bg-primary hover:bg-primary text-white font-black rounded-2xl py-4 h-auto shadow-xl transition-all hover:scale-[1.02] active:scale-95 gap-3 text-lg"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <CreditCard className="w-5 h-5" />
              {loading ? "Processing..." : "Confirm Now"}
            </Button>
          </div>

          <p
            className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            256-bit secure encrypted payment
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Removed old PackagesSection and FleetSection functions as they are replaced by new components

// Main App Component
export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [selectedFleetVehicle, setSelectedFleetVehicle] = useState(null);
  const [showFleetModal, setShowFleetModal] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles?enabled=true");
      const data = await res.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoadingVehicles(false);
    }
  };

  const handleBookingSuccess = () => {
    console.log("Booking successful!");
    toast.success("Your booking request has been received!");
  };

  const handleFleetBooking = ({ vehicle }) => {
    setSelectedFleetVehicle(vehicle);
    setShowFleetModal(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <WhyChoose />
        {/* <Services /> */}
        <DestinationShowcase />
        <FeaturedDestinations />
        <PromoBanner />
        <PopularThingsToDo />
        <CustomerReviews />
        <OurClients />
        <AppPromoBanner />
        <TravelArticles />
        <FleetShowcase
          vehicles={vehicles}
          loading={loadingVehicles}
          onBookNow={handleFleetBooking}
        />
      </main>

      <Footer />

      <EnquiryModal />

      {/* Booking Modals for Fleet */}
      {selectedFleetVehicle && (
        <BookingModal
          open={showFleetModal}
          onClose={() => {
            setShowFleetModal(false);
            setSelectedFleetVehicle(null);
          }}
          type="fleet"
          bookingData={{
            vehicleId: selectedFleetVehicle.id,
            vehicleName: selectedFleetVehicle.name,
            vehicleType: selectedFleetVehicle.type,
            pricePerDay: selectedFleetVehicle.pricePerDay,
            pricePerKm: selectedFleetVehicle.pricePerKm,
          }}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
