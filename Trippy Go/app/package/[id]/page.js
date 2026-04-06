"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";
import {
  MapPin, Clock, Users, Star, IndianRupee, CheckCircle, XCircle, Share, Heart,
  CalendarDays, Ticket, Plane, Sparkles, Check, Image as ImageIcon
} from "lucide-react";

export default function PackageDetail() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking State
  const [user, setUser] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "", specialRequests: "" });
  
  // Refined Sidebar State
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    if (id) fetchPackageDetails();
    checkAuth();

    // Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

  const checkAuth = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setBookingForm((prev) => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
      }));
    }
  };

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/packages/${id}`);
      if (!res.ok) throw new Error("Package not found");
      const data = await res.json();

      data.highlights = data.highlights || [];
      data.itinerary = data.itinerary || [];
      data.inclusions = data.inclusions || [];
      data.exclusions = data.exclusions || [];
      data.images = data.images || [];

      setPackageData(data);
    } catch (error) {
      console.error("Failed to fetch package:", error);
    } finally {
      setLoading(false);
    }
  };

  const basePrice = packageData?.price || 0;
  
  const calculateTotal = () => {
    return travelers * basePrice;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please login to book this package");
      router.push("/auth");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date for your travel.");
      return;
    }

    if (!bookingForm.name || !bookingForm.phone || !bookingForm.email) {
      alert("Please ensure your contact details are filled.");
      return;
    }

    const totalPrice = calculateTotal();

    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalPrice * 100,
          bookingType: "package",
          bookingId: id,
        }),
      });

      const orderData = await orderRes.json();
      if (orderData.error) throw new Error(orderData.error);

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Trippy Go",
        description: `Booking for ${packageData.title}`,
        image: "/logo.png",
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
                  packageTitle: packageData.title,
                  packageId: id,
                  duration: packageData.duration,
                  totalPrice: totalPrice,
                  customerName: bookingForm.name,
                  customerPhone: bookingForm.phone,
                  customerEmail: bookingForm.email,
                  travelers: travelers,
                  travelDate: selectedDate,
                  specialRequests: bookingForm.specialRequests,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("Booking Confirmed! Thank you for choosing TrippyGo.");
              window.location.reload();
            } else {
              throw new Error(verifyData.error || "Payment verification failed");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: bookingForm.name,
          email: bookingForm.email,
          contact: bookingForm.phone,
        },
        theme: {
          color: "#eb662b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Booking Error:", error);
      alert(error.message || "Failed to initiate booking. Please try again.");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#eb662b] border-t-transparent rounded-full mx-auto mb-4"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) return null;

  const title = packageData.title || "Beautiful Destination";
  const region = packageData.region ? packageData.region.charAt(0).toUpperCase() + packageData.region.slice(1) : "Global";

  // Ensure 4 images for masonry
  const images = [...packageData.images];
  while (images.length < 4) {
    images.push("https://images.unsplash.com/photo-1544551763-47a0159c92b2?w=800&q=80"); 
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFD] text-gray-900 font-sans">
      <Header />

      <main className="mt-20 flex-1 max-w-[1200px] w-full mx-auto px-4 pt-28 pb-20">
        
        {/* Breadcrumb Row */}
        <div className="text-[11px] md:text-xs text-gray-500 font-bold mb-6 uppercase tracking-wide flex justify-between items-center" style={{ fontFamily: "var(--font-manrope)" }}>
           <div className="flex items-center gap-2">
             <span className="hover:text-[#eb662b] transition-colors cursor-pointer text-[#eb662b]/60">Home</span> {'>'} 
             <span className="hover:text-[#eb662b] transition-colors cursor-pointer text-[#eb662b]/60">Tours</span> {'>'} 
             <span className="text-[#eb662b] font-black">{region}</span>
           </div>
           <div className="hidden md:block text-[#eb662b] font-bold">
             THE 10 BEST {region} Tours & Excursions
           </div>
        </div>

        {/* Tags */}
        <div className="flex gap-3 mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
           <span className="bg-[#05073C] text-white px-3 py-1.5 text-xs font-bold rounded-md shadow-sm">Bestseller</span>
           <span className="bg-green-100 text-green-800 px-3 py-1.5 text-xs font-bold rounded-md shadow-sm">Free cancellation</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-[#05073C] leading-snug lg:leading-tight mb-4 max-w-4xl" style={{ fontFamily: "var(--font-montserrat)" }}>
           {title}
        </h1>

        {/* Ratings and Actions */}
        <div className="flex flex-wrap items-center justify-between mb-8 pb-4" style={{ fontFamily: "var(--font-manrope)" }}>
           <div className="flex items-center gap-5 text-sm font-bold text-gray-700">
              <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full border border-yellow-100">
                 <Star size={16} fill="currentColor" color="currentColor" />
                 4.8 (269)
              </span>
              <span className="flex items-center gap-1.5 text-gray-600">
                 <MapPin size={16} />
                 {region}, India
              </span>
              <span className="text-[#05073C] font-semibold flex items-center gap-1.5">
                 <Sparkles size={16} className="text-gray-400"/> 30K+ booked
              </span>
           </div>

           <div className="flex items-center gap-6 text-sm font-bold mt-4 sm:mt-0">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#eb662b] transition-colors"><Share size={18}/> Share</button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#eb662b] transition-colors"><Heart size={18}/> Wishlist</button>
           </div>
        </div>


        {/* Masonry Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 h-auto md:h-[450px] gap-2 md:gap-3 mb-10 shadow-sm rounded-2xl overflow-hidden bg-white p-1.5">
           {/* Main Left Large Image */}
           <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
              <img src={images[0]} alt={title} className="w-full h-64 md:h-full object-cover rounded-xl" />
           </div>

           {/* Top Right Wide Image */}
           <div className="col-span-1 md:col-span-2 row-span-1">
              <img src={images[1]} alt={title} className="w-full h-40 md:h-full object-cover rounded-xl" />
           </div>

           {/* Bottom Right Two Squares */}
           <div className="col-span-1 md:col-span-2 row-span-1 grid grid-cols-2 gap-2 md:gap-3">
              <img src={images[2]} alt={title} className="w-full h-40 md:h-full object-cover rounded-xl" />
              
              {/* Last Image with Overlay Button */}
              <div className="relative w-full h-40 md:h-full rounded-xl overflow-hidden group cursor-pointer">
                 <img src={images[3]} alt={title} className="w-full h-full object-cover brightness-[0.75] group-hover:scale-110 transition-transform duration-700" />
              </div>
           </div>
        </div>


        {/* Quick Info Bar - Colorful Orange Highlights */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 mb-10 bg-white rounded-xl shadow-sm border border-gray-100" style={{ fontFamily: "var(--font-manrope)" }}>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF3EE] text-[#eb662b] rounded-xl flex items-center justify-center shadow-sm"><Clock size={18}/></div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Duration</span>
                 <span className="text-sm font-black text-[#05073C]">{packageData.duration || "4 days"}</span>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF3EE] text-[#eb662b] rounded-xl flex items-center justify-center shadow-sm"><Users size={18}/></div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Group Size</span>
                 <span className="text-sm font-black text-[#05073C]">Max 12 people</span>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF3EE] text-[#eb662b] rounded-xl flex items-center justify-center shadow-sm"><CalendarDays size={18}/></div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ages</span>
                 <span className="text-sm font-black text-[#05073C]">Family Friendly</span>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF3EE] text-[#eb662b] rounded-xl flex items-center justify-center shadow-sm"><Ticket size={18}/></div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Languages</span>
                 <span className="text-sm font-black text-[#05073C]">English, Local</span>
              </div>
           </div>
        </div>

        {/* Flex Layout for Body vs Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
           
           {/* LEFT CONTENT */}
           <div className="flex-1 max-w-full lg:max-w-3xl overflow-hidden bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              
              {/* Tour Overview */}
              <section className="mb-10">
                 <h2 className="text-xl font-black text-[#05073C] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                    <span className="bg-[#FFF3EE] p-1.5 rounded-md text-[#eb662b]"><MapPin size={20}/></span>
                    Tour Overview
                 </h2>
                 <p className="text-gray-600 leading-relaxed text-[15px] font-medium space-y-4 whitespace-pre-line" style={{ fontFamily: "var(--font-manrope)", lineHeight: "1.8" }}>
                    {packageData.description || "The archipelago is a must-visit. You will be whisked around islands in one day. Visit emerald lagoons, snorkel on beautiful islands, and enjoy complimentary meals throughout the journey. Hotel pickup and drop-off is seamlessly included so you don't have to worry about a thing."}
                 </p>
              </section>

              {/* Tour Highlights - Orange Bullets */}
              <section className="mb-10">
                 <h2 className="text-lg font-bold text-[#05073C] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>Tour Highlights</h2>
                 <ul className="space-y-3 bg-[#FAFAFD] p-5 rounded-xl border border-gray-100">
                    {(packageData.highlights.length > 0 ? packageData.highlights : [
                       "Experience the thrill of exploring beautiful islands.",
                       "Be amazed by the variety of marine and terrestrial life.",
                       "Enjoy relaxing in paradise with white sand beaches.",
                       "Feel the comfort of a strictly limited group size.",
                       "Catch a glimpse of authentic regional cultures."
                    ]).map((highlight, idx) => (
                       <li key={idx} className="flex items-start gap-3 text-[#05073C] font-semibold text-sm leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
                          <span className="w-5 h-5 rounded-full bg-[#eb662b] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                             <Check size={10} strokeWidth={4}/>
                          </span>
                          {highlight}
                       </li>
                    ))}
                 </ul>
              </section>

              <hr className="border-gray-100 mb-10" />

              {/* What's included */}
              <section className="mb-10">
                 <h2 className="text-xl font-black text-[#05073C] mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>What's included</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6" style={{ fontFamily: "var(--font-manrope)" }}>
                    {(packageData.inclusions.length > 0 ? packageData.inclusions : [
                       "Beverages, drinking water, morning tea",
                       "Local taxes",
                       "Hotel pickup and drop-off by air-conditioned minivan",
                       "Insurance Transfer to a private pier",
                       "Soft drinks",
                       "Tour Guide"
                    ]).map((inc, i) => (
                       <div key={i} className="flex items-start gap-3 text-sm text-gray-800 font-bold bg-green-50/50 p-2.5 rounded-lg border border-green-100">
                          <CheckCircle className="text-green-500 mt-[1px]" size={18} />
                          <span className="leading-relaxed">{inc}</span>
                       </div>
                    ))}

                    <div className="flex items-start gap-3 text-sm text-gray-500 font-bold bg-red-50/50 p-2.5 rounded-lg border border-red-50">
                       <XCircle className="text-[#eb662b] mt-[1px]" size={18} />
                       <span className="leading-relaxed line-through">Towels</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-500 font-bold bg-red-50/50 p-2.5 rounded-lg border border-red-50">
                       <XCircle className="text-[#eb662b] mt-[1px]" size={18} />
                       <span className="leading-relaxed line-through">Personal Expenses</span>
                    </div>
                 </div>
              </section>

              <hr className="border-gray-100 mb-10" />

              {/* Itinerary */}
              <section className="mb-4 relative z-0">
                 <h2 className="text-xl font-black text-[#05073C] mb-8" style={{ fontFamily: "var(--font-montserrat)" }}>Itinerary</h2>
                 
                 <div className="relative border-l-2 border-dashed border-[#eb662b]/30 ml-[10px] pl-8 space-y-10">
                    {(packageData.itinerary.length > 0 ? packageData.itinerary : [
                       "Day 1: Airport Pick Up: We collect you direct from the terminal.",
                       "Day 2: Temples & River Cruise: A scenic tour through historical locations.",
                       "Day 3: Massage & Overnight Train: Like on all of our trips, we collect you from the airport when you land and take you",
                       "Day 4: National Park: Trek through lush green forests."
                    ]).map((dayLine, i) => {
                       const parts = dayLine.split(":");
                       const hasPrefix = parts.length > 1 && parts[0].toLowerCase().includes("day");
                       const titleStr = hasPrefix ? parts[0] + ": " + (parts[1] || "").trim() : `Day ${i+1}: ${parts[0] || ""}`;
                       const descStr = hasPrefix ? parts.slice(2).join(":").trim() : parts.slice(1).join(":").trim(); 

                       return (
                          <div key={i} className="relative z-10 bg-[#FAFAFD] p-5 rounded-xl border border-gray-100 shadow-sm">
                             <div className="absolute -left-[43px] top-4 w-5 h-5 rounded-full border-[3px] border-white bg-[#eb662b] shadow-sm"></div>
                             <h4 className="font-black text-[#05073C] text-[15px] mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>{titleStr}</h4>
                             {descStr && (
                                <p className="text-gray-600 text-[13px] font-medium leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-manrope)" }}>{descStr}</p>
                             )}
                          </div>
                       )
                    })}
                 </div>
              </section>

           </div>

           
           {/* RIGHT CONTENT - BOOKING WIDGET */}
           <div className="w-full lg:w-[380px] z-20" style={{ fontFamily: "var(--font-manrope)" }}>
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                 <div className="flex flex-col gap-5">
                    
                    {/* Price Header */}
                    <div className="text-center bg-gray-50 border border-gray-100 py-4 rounded-xl mb-1 shadow-inner">
                       <span className="text-3xl font-black text-[#05073C]" style={{ fontFamily: "var(--font-montserrat)" }}>₹{basePrice.toLocaleString()}</span>
                       <span className="text-gray-500 font-bold text-[12px] ml-1 uppercase tracking-wide">/ person</span>
                    </div>

                    {/* Simple Booking Form */}
                    <div className="flex flex-col gap-3">
                       
                       <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Travel Date</label>
                          <input 
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full outline-none text-sm font-bold text-[#05073C] bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer focus:bg-white focus:border-[#eb662b] transition-colors"
                          />
                       </div>

                       <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Number of Travelers</label>
                          <div className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus-within:bg-white focus-within:border-[#eb662b] transition-colors">
                             <span className="text-sm font-bold text-[#05073C]">Travelers</span>
                             <div className="flex items-center gap-3">
                                <button onClick={(e) => { e.preventDefault(); setTravelers(Math.max(1, travelers - 1)); }} className="w-7 h-7 rounded-md bg-white border border-gray-200 text-[#05073C] font-bold hover:bg-[#eb662b] hover:text-white hover:border-[#eb662b] transition-colors shadow-sm">-</button>
                                <span className="font-bold text-[#05073C] w-3 text-center text-sm">{travelers}</span>
                                <button onClick={(e) => { e.preventDefault(); setTravelers(travelers + 1); }} className="w-7 h-7 rounded-md bg-white border border-gray-200 text-[#05073C] font-bold hover:bg-[#eb662b] hover:text-white hover:border-[#eb662b] transition-colors shadow-sm">+</button>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="w-full h-px bg-gray-100 my-1" />

                    {/* Required User Details */}
                    <div>
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Your Details</label>
                       <div className="flex flex-col gap-2.5">
                          <input type="text" placeholder="Full Name" value={bookingForm.name} onChange={e=>setBookingForm({...bookingForm, name: e.target.value})} className="w-full text-xs font-bold px-3 py-2.5 text-[#05073C] bg-gray-50 rounded-lg outline-none border border-gray-200 focus:border-[#eb662b] focus:bg-white transition-colors" required />
                          <input type="tel" placeholder="Phone Number" value={bookingForm.phone} onChange={e=>setBookingForm({...bookingForm, phone: e.target.value})} className="w-full text-xs font-bold px-3 py-2.5 text-[#05073C] bg-gray-50 rounded-lg outline-none border border-gray-200 focus:border-[#eb662b] focus:bg-white transition-colors" required />
                          <input type="email" placeholder="Email Address" value={bookingForm.email} onChange={e=>setBookingForm({...bookingForm, email: e.target.value})} className="w-full text-xs font-bold px-3 py-2.5 text-[#05073C] bg-gray-50 rounded-lg outline-none border border-gray-200 focus:border-[#eb662b] focus:bg-white transition-colors" required />
                       </div>
                    </div>
                    
                    {/* Total and Submit */}
                    <div className="pt-2 mt-2">
                       <div className="flex items-center justify-between mb-5 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                          <span className="text-sm font-black text-gray-800 tracking-wide">Total Price</span>
                          <span className="text-2xl font-black text-[#05073C]" style={{ fontFamily: "var(--font-montserrat)" }}>₹{calculateTotal().toLocaleString()}</span>
                       </div>

                       <button onClick={handleBookingSubmit} className="w-full bg-[#eb662b] hover:bg-[#d45a20] hover:shadow-lg hover:shadow-[#eb662b]/30 hover:-translate-y-0.5 text-white py-4 rounded-xl text-[15px] font-black tracking-wide transition-all duration-300">
                          Proceed to Booking
                       </button>
                    </div>

                 </div>
              </div>
           </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
