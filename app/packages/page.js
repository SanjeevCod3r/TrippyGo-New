"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Navigation,
  Star,
  Clock,
  MapPin,
  Check,
  X,
  Phone,
  Mail,
  User,
  ArrowLeft,
  Calendar,
  Users,
  ChevronRight,
  Search,
  CreditCard,
  ArrowRight,
} from "lucide-react";

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

import Header from "@/components/Header";
import Footer from "@/app/footer/page";

// Booking Modal with Razorpay Payment
function BookingModal({ open, onClose, packageData }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setCustomerName(parsedUser.name || "");
      setCustomerPhone(parsedUser.phone || "");
      setCustomerEmail(parsedUser.email || "");
    }
  }, [open]);

  const totalAmount = (packageData?.price || 0) * parseInt(travelers || 1);

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
    if (!customerName || !customerPhone || !travelDate) {
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

      const amount = totalAmount * 100; // Convert to paise

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          bookingType: "package",
        }),
      });

      const orderData = await orderRes.json();

      if (orderData.error) {
        if (orderData.requireLogin) {
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
        name: "ANTIGRAVITY TRAVEL",
        description: `Package Booking - ${packageData?.title}`,
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
                  type: "package",
                  customerName,
                  customerPhone,
                  customerEmail,
                  packageId: packageData?.id,
                  packageTitle: packageData?.title,
                  totalPrice: totalAmount,
                  duration: packageData?.duration,
                  travelDate,
                  travelers: parseInt(travelers),
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment successful! Package booked.");
              onClose();
              setCustomerName("");
              setCustomerPhone("");
              setCustomerEmail("");
              setTravelDate("");
              setTravelers("2");
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
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in
  if (open && !localStorage.getItem("userToken")) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl">
          <DialogHeader className="space-y-4">
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
              Enhance your experience and secure your journey by signing in
              first.
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
                className="rounded-xl px-6 py-5 h-auto font-bold border-gray-200"
              >
                Cancel
              </Button>
              <a href="/auth">
                <Button className="bg-[#0056D2] hover:bg-paleBlue-700 text-white font-bold rounded-xl px-8 py-5 h-auto shadow-lg shadow-paleBlue-100 transition-all">
                  Sign Up Now
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!packageData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-[#0056D2] to-[#43E0F8] p-8 text-white relative">
          <div className="relative z-10">
            <h2
              className="text-2xl font-black mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book Your Adventure
            </h2>
            <p
              className="opacity-90 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {packageData.title} • {packageData.duration}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                className="text-xs font-black uppercase tracking-widest text-gray-400"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Travel Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#0056D2]/20 transition-all"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                className="text-xs font-black uppercase tracking-widest text-gray-400"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Travelers
              </Label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#0056D2]/20 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              className="text-xs font-black uppercase tracking-widest text-gray-400"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Your Details
            </Label>
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#0056D2]/20 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#0056D2]/20 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Price Summary Card */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span
                className="text-sm font-bold text-gray-500 uppercase tracking-widest"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Subtotal
              </span>
              <span className="font-black text-gray-900">
                ₹{packageData.price?.toLocaleString()}{" "}
                <span className="text-xs text-gray-400">/ person</span>
              </span>
            </div>
            <div className="border-t border-gray-200/50 my-4"></div>
            <div className="flex justify-between items-center">
              <span
                className="text-lg font-black text-gray-900"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Total Amount
              </span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0056D2] to-[#43E0F8]">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl py-6 h-auto font-black border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="flex-[2] bg-gradient-to-r from-[#0056D2] to-[#43E0F8] hover:scale-[1.02] active:scale-95 text-white font-black rounded-2xl py-6 h-auto shadow-xl shadow-paleBlue-100 transition-all gap-3"
            >
              <CreditCard className="w-5 h-5" />
              {loading ? "Processing..." : "Confirm & Pay"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Package Detail Modal
function PackageDetailModal({ open, onClose, packageData, onBook }) {
  if (!packageData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="relative h-80 shrink-0">
          <img
            src={
              packageData.images?.[0] ||
              "https://images.unsplash.com/photo-1534695215921-52f8a19e7909"
            }
            alt={packageData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-xl mb-4 text-xs font-black uppercase tracking-widest border border-white/10">
              <Clock className="w-3.5 h-3.5" />
              {packageData.duration}
            </div>
            <h2
              className="text-4xl font-black mb-2 tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {packageData.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
          <div className="space-y-4">
            <h3
              className="text-xs font-black uppercase tracking-[0.3em] text-[#0056D2]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Overview
            </h3>
            <p
              className="text-lg text-gray-600 leading-relaxed font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {packageData.description}
            </p>
          </div>

          {/* Detailed Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {packageData.itinerary?.length > 0 && (
              <div className="space-y-6">
                <h3
                  className="text-xs font-black uppercase tracking-[0.3em] text-gray-400"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Planned Itinerary
                </h3>
                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  {packageData.itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 relative"
                    >
                      <div className="w-6 h-6 bg-white border-2 border-[#0056D2] rounded-full flex items-center justify-center flex-shrink-0 z-10 text-[10px] font-black text-[#0056D2]">
                        {index + 1}
                      </div>
                      <span
                        className="text-gray-600 font-bold leading-snug pt-0.5"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-8">
              {packageData.inclusions?.length > 0 && (
                <div className="space-y-4">
                  <h3
                    className="text-xs font-black uppercase tracking-[0.3em] text-green-500"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    What's Included
                  </h3>
                  <div className="grid gap-3">
                    {packageData.inclusions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-green-50/50 p-3 rounded-2xl border border-green-100/50"
                      >
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white stroke-[3px]" />
                        </div>
                        <span
                          className="text-green-800 text-sm font-bold uppercase tracking-wider"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {packageData.exclusions?.length > 0 && (
                <div className="space-y-4">
                  <h3
                    className="text-xs font-black uppercase tracking-[0.3em] text-red-400"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Not Included
                  </h3>
                  <div className="grid gap-2">
                    {packageData.exclusions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-red-400/80 font-bold text-sm px-1"
                      >
                        <X className="w-4 h-4 stroke-[3px]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Pricing Strip */}
        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <div
              className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Starting From
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl font-black text-gray-900"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ₹{packageData.price?.toLocaleString()}
              </span>
              <span className="text-gray-400 font-bold">/ person</span>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => {
              onClose();
              onBook(packageData);
            }}
            className="rounded-[1.5rem] bg-gradient-to-r from-[#0056D2] to-[#43E0F8] hover:scale-105 active:scale-95 text-white font-black px-12 py-8 h-auto shadow-2xl shadow-paleBlue-200 transition-all text-lg"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Book Experience
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingPackage, setBookingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages?enabled=true");
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowDetailModal(true);
  };

  const handleBook = (pkg) => {
    setBookingPackage(pkg);
    setShowBookingModal(true);
  };

  const cardColors = [
    "from-[#0056D2] to-[#43E0F8]",
    "from-[#43E0F8] to-[#5DFDCB]",
    "from-[#FE805A] to-[#FE6B47]",
    "from-[#5DFDCB] to-[#43E0F8]",
    "from-[#0056D2] to-[#5DFDCB]",
    "from-[#FE805A] to-[#0056D2]",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}

      {/* Packages Grid */}
      <section className="mt-10 py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-[#0056D2]/10 rounded-full mb-4">
              <span
                className="text-[#0056D2] font-semibold text-xs sm:text-sm tracking-wider"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                CURATED FOR YOU
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Popular Packages
            </h2>
            <p
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              We've designed specialized packages to provide you with the most
              immersive, comfortable, and memorable travel experiences.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                >
                  <div className="bg-gray-200 h-48 w-full" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
                    <div className="flex gap-2 mb-6">
                      <div className="h-6 bg-gray-200 rounded-full w-16" />
                      <div className="h-6 bg-gray-200 rounded-full w-20" />
                    </div>
                    <div className="h-12 bg-gray-200 rounded-2xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 mx-auto max-w-3xl">
              <div className="w-20 h-20 bg-paleBlue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-paleBlue-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No packages found
              </h3>
              <p className="text-gray-500">
                We couldn't find any packages matching your search criteria. Try
                adjusting your search term.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 px-6 py-3 bg-[#0056D2] text-white rounded-full font-medium hover:bg-paleBlue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {filteredPackages.map((pkg, index) => {
                const colorClass = cardColors[index % cardColors.length];

                return (
                  <motion.div
                    key={pkg.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
                  >
                    {/* Image */}
                    <div
                      className="relative h-56 sm:h-64 overflow-hidden cursor-pointer shrink-0"
                      onClick={() => handleViewDetails(pkg)}
                    >
                      <img
                        src={
                          pkg.images?.[0] ||
                          "https://images.unsplash.com/photo-1534695215921-52f8a19e7909"
                        }
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div
                          className={`px-3 py-1.5 bg-gradient-to-br ${colorClass} rounded-xl shadow-lg flex items-center gap-1.5 backdrop-blur-md`}
                        >
                          <Clock className="w-3.5 h-3.5 text-white" />
                          <span
                            className="text-white text-xs font-semibold tracking-wide"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {pkg.duration}
                          </span>
                        </div>
                        {pkg.featured && (
                          <div className="px-3 py-1.5 bg-amber-500/90 rounded-xl shadow-lg backdrop-blur-md">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price Badge on Image bottom */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">
                            Starting from
                          </span>
                          <span
                            className="text-white text-2xl sm:text-3xl font-bold leading-none"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            ₹{pkg.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-7 sm:p-8 flex flex-col flex-grow bg-white group-hover:bg-[#FCFDFF] transition-colors duration-500">
                      <div className="mb-4">
                        <div className="mb-2 h-4"></div>
                        <h3
                          className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-[#0056D2] transition-colors cursor-pointer line-clamp-2 mb-2"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                          onClick={() => handleViewDetails(pkg)}
                        >
                          {pkg.title}
                        </h3>
                        <p
                          className="text-gray-500 text-sm sm:text-base leading-relaxed line-clamp-2"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          {pkg.description}
                        </p>
                      </div>

                      {/* Features/Inclusions */}
                      <div className="mb-8 flex-grow">
                        <div className="flex flex-wrap gap-2">
                          {pkg.inclusions?.slice(0, 4).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] sm:text-xs bg-paleBlue-50/50 text-[#0056D2] px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider border border-paleBlue-100/50"
                              style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons - More spacing and clearer separation */}
                      <div className="mt-auto pt-6 border-t border-gray-100/80">
                        <div className="grid grid-cols-2 gap-4">
                          <motion.button
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "#f9fafb",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleViewDetails(pkg)}
                            className="w-full bg-white text-gray-700 border-2 border-gray-100 font-bold py-3.5 px-4 rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center text-sm"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            View Details
                          </motion.button>

                          <motion.button
                            whileHover={{
                              scale: 1.02,
                              shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBook(pkg)}
                            className={`w-full bg-gradient-to-r ${colorClass} text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group text-sm relative overflow-hidden`}
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            <span className="relative z-10">Book Now</span>
                            <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Hover Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-20 relative overflow-hidden rounded-3xl mx-px"
          >
            {/* CTA Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0056D2] to-[#4A8BDF]" />
            <div className="absolute inset-0 bg-black/20" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 p-10 sm:p-16 text-white max-w-4xl mx-auto">
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Need a Custom Package?
              </h3>
              <p
                className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed font-light"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                We can tailor-make an itinerary exclusively for you based on
                your preferences, schedule, and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 sm:py-4 bg-white text-[#0056D2] font-semibold text-base sm:text-lg rounded-full hover:shadow-2xl transition-all duration-300"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Contact Our Experts
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 sm:py-4 bg-transparent backdrop-blur-md text-white font-semibold text-base sm:text-lg rounded-full border-2 border-white/50 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <Phone className="w-5 h-5" />
                  +91 9990-817-615
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <PackageDetailModal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        packageData={selectedPackage}
        onBook={handleBook}
      />

      {/* Booking Modal */}
      <BookingModal
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        packageData={bookingPackage}
      />

      <Footer />
    </div>
  );
}
