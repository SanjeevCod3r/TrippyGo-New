"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react";

export const Fleet = ({ onBookNow, vehicles = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Group vehicles by category for category selection
  const fleetCategories = useMemo(() => {
    const categories = Array.from(
      new Set(vehicles.map((v) => v.type || "other"))
    );
    return [{ name: "All", value: "all" }, ...categories.map((cat) => ({
      name: cat.toUpperCase(),
      value: cat,
    }))];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        searchTerm === "" ||
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.description &&
          vehicle.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" || vehicle.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [vehicles, searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Tag color logic based on category (similar to Regions in destinations)
  const getCategoryTagColor = (type) => {
    const t = type?.toLowerCase() || '';
    if (t === 'suv') return 'bg-[#eb662b]'; 
    if (t === 'sedan') return 'bg-[#f49e34]'; 
    if (t === 'luxury' || t === 'luxury sedan') return 'bg-[#ff9b6a]'; 
    if (t === 'innova' || t === 'van') return 'bg-[#d45821]'; 
    return 'bg-[#eb662b]'; 
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#F6F9F8]">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&q=80" 
              alt="Premium Fleet Cars" 
              className="w-full h-full object-cover select-none"
            />
            <div className="absolute inset-0 bg-black/40"></div>
         </div>

         {/* Hero Text */}
         <div className="relative z-10 text-center px-4 mt-16 max-w-2xl">
             <h1 
               className="text-4xl md:text-6xl text-white font-serif leading-tight drop-shadow-md mb-4"
               style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }} 
             >
               Premium Fleet<br/>for Every Journey
             </h1>
             <p className="text-white text-sm md:text-base font-medium mb-8 max-w-[500px] mx-auto drop-shadow-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
               Experience ultimate comfort and reliability. Our top-tier vehicles are perfectly maintained for your road trips and corporate travels.
             </p>
             <button 
                onClick={() => {
                  const el = document.getElementById("fleet-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 bg-[#eb662b] hover:bg-[#ff9b6a] text-white font-bold text-sm tracking-wider uppercase rounded-full shadow-lg transition-transform hover:-translate-y-1 block mx-auto" 
                style={{ fontFamily: 'var(--font-montserrat)' }}
             >
               VIEW VEHICLES
             </button>
         </div>

         {/* Torn Paper Bottom Edge */}
         <div className="absolute bottom-0 left-0 right-0 z-20 w-full overflow-hidden pointer-events-none translate-y-[2px]">
            <svg 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none" 
              className="w-full h-12 md:h-20 text-[#F6F9F8] fill-current"
            >
               <path d="M0,0 L0,120 L1200,120 L1200,0 C1100,50 900,10 800,40 C700,70 500,10 400,30 C300,50 100,10 0,0 Z" />
            </svg>
         </div>
      </section>

      {/* Main Content Section */}
      <section id="fleet-grid" className="relative min-h-screen py-16 bg-[#F6F9F8]">
         {/* Topography faint backdrop */}
         <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="topography" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M10 10C20 20 40 10 50 30C60 50 80 40 90 60" fill="none" stroke="#000" strokeWidth="0.5" />
                  <path d="M10 90C30 80 40 100 60 80C80 60 90 90 100 70" fill="none" stroke="#000" strokeWidth="0.5" />
                  <path d="M50 0C60 20 80 10 100 30" fill="none" stroke="#000" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topography)" />
            </svg>
         </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          
          {/* Header Title section */}
          <div className="flex flex-col items-center mb-10 text-center">
             <span className="text-[#eb662b] font-medium italic text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Top Vehicles
             </span>
             <h2 className="text-3xl md:text-4xl font-black text-[#05073C] mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Find Your Perfect Ride
             </h2>
             <div className="flex items-center gap-1">
                <svg width="40" height="10" viewBox="0 0 40 10" className="text-[#eb662b] fill-none stroke-current stroke-2">
                   <path d="M0 5 Q 5 0, 10 5 T 20 5 T 30 5 T 40 5" />
                </svg>
             </div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto"
          >
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search vehicles by name or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb662b] text-sm text-gray-900 placeholder-gray-400"
                  style={{ fontFamily: "var(--font-manrope)" }}
                />
              </div>

              <div>
                 <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
                   Filter by Category
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {fleetCategories.map((category) => (
                       <button
                         key={category.value}
                         onClick={() => setSelectedCategory(category.value)}
                         className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                           selectedCategory === category.value
                             ? "bg-[#eb662b] text-white shadow-md shadow-orange-100"
                             : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                         }`}
                         style={{ fontFamily: "var(--font-manrope)" }}
                       >
                         {category.name}
                       </button>
                   ))}
                 </div>
              </div>
          </motion.div>

          {/* Fleet Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-[2rem] overflow-hidden shadow-sm h-[480px]">
                  <div className="bg-gray-200 h-56 w-full m-4 rounded-[1.5rem]" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-5/6 mb-8" />
                    <div className="h-8 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchTerm}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredVehicles.map((vehicle) => {
                  const title = vehicle.name || "Premium Vehicle";
                  const image = vehicle.images?.[0] || "/asset/car-placeholder.png";
                  const price = vehicle.pricePerDay || vehicle.basePrice || 1000;
                  const type = vehicle.type || 'Standard';
                  const seats = vehicle.seating || 4;
                  const description = vehicle.description || `Experience comfortable travel with our premium ${type} perfect for any group size.`;

                  return (
                    <motion.div
                      key={vehicle.id || vehicle._id}
                      variants={itemVariants}
                      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-50 hover:shadow-xl transition-shadow duration-300 flex flex-col pt-3 px-3 relative"
                    >
                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden rounded-[1.5rem] w-full shrink-0 bg-gray-50">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Colored Tag (Top Left) */}
                        <div className={`absolute top-4 left-4 ${getCategoryTagColor(type)} text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded`}>
                           {type}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 pt-6 flex flex-col flex-1">
                        <h3
                          className="text-lg font-black text-[#05073C] mb-2 leading-snug line-clamp-2"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {title}
                        </h3>
                        <p
                          className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2 font-medium"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {description}
                        </p>

                        <div className="border-t border-gray-100 flex items-center justify-between py-4 mt-auto">
                            <div className="flex items-center gap-2">
                               <Users className="text-[#eb662b]" size={16} />
                               <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-800 font-bold uppercase" style={{ fontFamily: 'var(--font-manrope)'}}>Seats</span>
                                  <span className="text-[10px] text-gray-500 font-medium">{seats} max</span>
                               </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                               <Shield className="text-[#eb662b]" size={16} />
                               <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-800 font-bold uppercase" style={{ fontFamily: 'var(--font-manrope)'}}>Standard</span>
                                  <span className="text-[10px] text-gray-500 font-medium">Premium</span>
                               </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 flex items-center justify-between pt-4 pb-2">
                           <span className="text-lg font-black text-[#05073C]" style={{ fontFamily: 'var(--font-montserrat)' }}>
                              ₹{price.toLocaleString()}<span className="text-[10px] text-gray-400 font-bold ml-1">/day</span>
                           </span>
                           <button 
                              onClick={() => onBookNow?.({ vehicle })}
                              className="px-5 py-2.5 bg-[#eb662b] hover:bg-[#ff9b6a] text-white text-xs font-bold uppercase rounded-xl transition-colors shadow-sm tracking-wide" 
                              style={{ fontFamily: 'var(--font-manrope)' }}
                           >
                              BOOK NOW
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results */}
          {!loading && filteredVehicles.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl mt-10 shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-montserrat)' }}>No vehicles found</h3>
               <p className="text-gray-500" style={{ fontFamily: 'var(--font-manrope)' }}>Try selecting a different category or search term.</p>
               <button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase rounded-xl transition-colors" 
                  style={{ fontFamily: 'var(--font-manrope)' }}
               >
                  Clear Filters
               </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
