"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Search,
  Star,
  Clock,
  Users,
  Mountain,
  Camera,
  Waves,
  TreePine,
  Tent,
  Calendar,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function DestinationsPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

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

  const regions = [
    { id: "all", name: "All Regions", icon: MapPin },
    { id: "north", name: "North India", icon: Mountain },
    { id: "south", name: "South India", icon: Waves },
    { id: "east", name: "East India", icon: TreePine },
    { id: "west", name: "West India", icon: Camera },
    { id: "central", name: "Central India", icon: Tent },
  ];

  const packageTypes = [
    { id: "all", name: "All Packages", icon: Star },
    { id: "holidays", name: "Holiday Packages", icon: Calendar },
    { id: "hill-station", name: "Hill Stations", icon: Mountain },
    { id: "trekking", name: "Trekking", icon: Tent },
  ];

  // Map Region to distinct tag colors based on the design
  const getRegionTagColor = (region) => {
    const r = region?.toLowerCase() || '';
    if (r === 'north') return 'bg-[#eb662b]'; // Cyan/Green 
    if (r === 'south') return 'bg-[#f49e34]'; // Orange/Yellow
    if (r === 'east') return 'bg-[#67bdda]'; // Light Blue
    if (r === 'west') return 'bg-[#eb662b]'; // Deep Orange
    return 'bg-[#eb662b]'; // Default
  };

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const title = pkg.title || pkg.name || "";
      const description = pkg.description || "";
      const region = pkg.region || "";
      const type = pkg.type || "";

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "all" || region === selectedRegion;
      const matchesType = selectedType === "all" || type === selectedType;

      return matchesSearch && matchesRegion && matchesType;
    });
  }, [packages, searchTerm, selectedRegion, selectedType]);

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

  return (
    <div className="min-h-screen bg-[#F6F9F8]">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1534695215921-52f8a19e7909?q=80&w=2670&auto=format&fit=crop" 
              alt="Solo Travellers Having Fun" 
              className="w-full h-full object-cover select-none"
            />
            <div className="absolute inset-0 bg-black/30"></div>
         </div>

         {/* Hero Text */}
         <div className="relative z-10 text-center px-4 mt-16 max-w-2xl">
             <h1 
               className="text-4xl md:text-6xl text-white font-serif leading-tight drop-shadow-md mb-4"
               style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }} // Fallback cursive aesthetic
             >
               Great Trip<br/>for Solo Travellers
             </h1>
             <p className="text-white text-sm md:text-base font-medium mb-8 max-w-[500px] mx-auto drop-shadow-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
               Since 2014, we've helped more than 500,000 people of all ages enjoy the best outdoor experience.
             </p>
             <button className="px-10 py-4 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] hover:shadow-xl hover:scale-105 active:scale-95 text-white font-black text-sm tracking-widest uppercase rounded-full shadow-lg transition-all duration-300" style={{ fontFamily: 'var(--font-montserrat)' }}>
               EXPLORE TOURS
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

      <section className="relative min-h-screen py-16 bg-[#F6F9F8]">
         {/* Topography faint backdrop */}
         <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="topography2" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M10 10C20 20 40 10 50 30C60 50 80 40 90 60" fill="none" stroke="#000" strokeWidth="0.5" />
                  <path d="M10 90C30 80 40 100 60 80C80 60 90 90 100 70" fill="none" stroke="#000" strokeWidth="0.5" />
                  <path d="M50 0C60 20 80 10 100 30" fill="none" stroke="#000" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topography2)" />
            </svg>
         </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          
          {/* Header Title section */}
          <div className="flex flex-col items-center mb-10 text-center">
             <span className="text-[#eb662b] font-medium italic text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Flash Deals
             </span>
             <h2 className="text-3xl md:text-4xl font-black text-[#05073C] mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
                We've Got Some Great Deals
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
            className="mb-12 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100"
          >
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search destinations, activities, or places..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb662b] text-sm text-gray-900 placeholder-gray-400"
                  style={{ fontFamily: "var(--font-manrope)" }}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Region Filter */}
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
                    Filter by Region
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                        <button
                          key={region.id}
                          onClick={() => setSelectedRegion(region.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            selectedRegion === region.id
                              ? "bg-[#eb662b] text-white shadow-md shadow-orange-100"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {region.name}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Package Type Filter */}
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
                    Filter by Type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {packageTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            selectedType === type.id
                              ? "bg-[#eb662b] text-white shadow-md shadow-orange-100"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {type.name}
                        </button>
                    ))}
                  </div>
                </div>
              </div>
          </motion.div>

          {/* Travel Packages Grid */}
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
                key={`${selectedRegion}-${selectedType}-${searchTerm}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredPackages.map((pkg) => {
                  const title = pkg.title || pkg.name || "Package";
                  const image = pkg.images?.[0] || pkg.image || "https://images.unsplash.com/photo-1544551763-47a0159c92b2?w=800&q=80";
                  const price = pkg.price || 0;
                  const duration = pkg.duration || "4 days";
                  const region = pkg.region || "Vietnam";
                  const description = pkg.description || "Beautiful sightseeing and stunning nature. Join us on this amazing journey.";

                  return (
                    <motion.div
                      key={pkg.id || pkg._id}
                      variants={itemVariants}
                      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-50 hover:shadow-xl transition-shadow duration-300 flex flex-col pt-3 px-3 relative"
                    >
                      {/* Image Container with inner radius */}
                      <div className="relative h-56 overflow-hidden rounded-[1.5rem] w-full shrink-0">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Colored Tag (Top Left) */}
                        <div className={`absolute top-4 left-4 ${getRegionTagColor(region)} text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded`}>
                           {region}
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
                               <Calendar className="text-[#eb662b]" size={16} />
                               <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-800 font-bold uppercase" style={{ fontFamily: 'var(--font-manrope)'}}>Duration</span>
                                  <span className="text-[10px] text-gray-500 font-medium">{duration}</span>
                               </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                               <Users className="text-[#eb662b]" size={16} />
                               <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-800 font-bold uppercase" style={{ fontFamily: 'var(--font-manrope)'}}>Group Size</span>
                                  <span className="text-[10px] text-gray-500 font-medium">8 people</span> {/* Defaulting to 8 as requested */}
                               </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 flex items-center justify-between pt-4 pb-2">
                           <span className="text-lg font-black text-[#05073C]" style={{ fontFamily: 'var(--font-montserrat)' }}>
                              ₹{price.toLocaleString()}
                           </span>
                           <Link href={`/package/${pkg.id || pkg._id}`}>
                              <button className="px-5 py-2.5 bg-[#eb662b] hover:bg-[#ff9b6a] text-white text-xs font-bold uppercase rounded-xl transition-colors shadow-sm tracking-wide" style={{ fontFamily: 'var(--font-manrope)' }}>
                                 BOOK NOW
                              </button>
                           </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results */}
          {!loading && filteredPackages.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl mt-10 shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-gray-900 mb-2">No packages found</h3>
               <p className="text-gray-500">Try adjusting your filters to discover more.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
