"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Car,
  Users,
  Shield,
  Star,
  MapPin,
  Clock,
  Fuel,
  Settings,
  Briefcase,
  ChevronRight,
  Sparkles,
  Zap,
  Award,
  Crown,
} from "lucide-react";

export const FleetShowcase = ({ onBookNow }) => {
  const router = useRouter();

  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/vehicles?enabled=true");
        if (!res.ok) throw new Error("Failed to fetch fleet");
        const data = await res.json();
        setVehicles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching fleet:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#f3f4f6] rounded-[3rem] p-6 md:p-16 relative overflow-hidden">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-5xl font-black text-[#eb662b] mb-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Top Fleet
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gray-500 text-sm md:text-base font-medium max-w-sm"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Choose from our curated collection of premium vehicles, from luxury sedans to spacious SUVs, for an unforgettable travel experience.
            </motion.p>
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading Skeleton
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[450px] rounded-3xl bg-gray-200 animate-pulse" />
              ))
            ) : vehicles.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 font-bold" style={{ fontFamily: "var(--font-manrope)" }}>
                  {error ? "Error loading fleet. Please try again later." : "No vehicles available at the moment."}
                </p>
              </div>
            ) : (
              vehicles.slice(0, 8).map((vehicle, index) => {
                // Determine icon based on vehicle type
                const TypeIcon = vehicle.type === 'luxury' ? Crown : (vehicle.type === 'suv' ? Users : Car);
                
                return (
                  <motion.div
                    key={vehicle.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                    onClick={() => router.push(`/fleet#${vehicle.id}`)}
                  >
                    {/* Background Image */}
                    <img
                      src={vehicle.images?.[0] || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d"}
                      alt={vehicle.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full">
                      <span className="text-white text-xs font-bold leading-none" style={{ fontFamily: "var(--font-manrope)" }}>
                        starts at ₹{vehicle.pricePerDay || "8,000"}
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                        {vehicle.name}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-white/80 text-xs font-bold mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
                        <span className="capitalize">{vehicle.type}</span>
                        <span className="w-1 h-1 bg-white/40 rounded-full" />
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span>{vehicle.rating || "4.8"} ({vehicle.reviews || "100+"})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-white/90">
                        <div className="bg-[#eb662b] p-1.5 rounded-md">
                          <Users size={14} className="text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-manrope)" }}>
                          {vehicle.seating} Seats
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/fleet")}
              className="px-8 py-4 bg-[#05073C] text-white text-sm font-bold rounded-2xl shadow-xl hover:bg-[#0a0d5a] transition-all duration-300"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              View more fleet
            </motion.button>

            <div className="hidden md:flex gap-4">
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-white hover:border-white hover:shadow-lg transition-all duration-300">
                <ChevronRight className="rotate-180" size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-white hover:border-white hover:shadow-lg transition-all duration-300">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
