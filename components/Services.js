"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Car,
  Users,
  Calendar,
  Briefcase,
  Heart,
  MapPin,
  ArrowRight,
} from "lucide-react";

export const Services = ({ onBookNow }) => {
  const services = [
    {
      id: "corporate-car-rental",
      icon: Car,
      title: "Corporate Car Rental",
      shortDescription:
        "Premium vehicles with professional chauffeurs for executive travel and business meetings.",
      color: "from-[#eb662b] to-[#ff9b6a]",
      image: "/asset/Corporate Car Rental Image 2.jpeg",
      features: [
        "Spacious Interiors",
        "Tailored for Business",
        "Modern Features",
        "Professional Chauffeurs",
        "Impeccable Maintenance",
        "Flexible Scheduling",
      ],
    },
    {
      id: "employee-transport",
      icon: Users,
      title: "Employee Transport Services",
      shortDescription:
        "Reliable and comfortable daily commute solutions for your workforce across all locations.",
      color: "from-[#ff9b6a] to-[#5DFDCB]",
      image: "/asset/Employee Transport Services Image 2.jpeg",
      features: [
        "Spacious Interiors",
        "Tailored for Business",
        "Modern Features",
        "Professional Chauffeurs",
        "Impeccable Maintenance",
        "Flexible Scheduling",
      ],
    },
    {
      id: "event-transportation",
      icon: Calendar,
      title: "Event Transportation",
      shortDescription:
        "Comprehensive transportation management for corporate events, conferences, and roadshows.",
      color: "from-[#FE805A] to-[#FE6B47]",
      image: "/asset/Event Transportation Image 1.jpeg",
      features: [
        "Spacious Interiors",
        "Tailored for Business",
        "Modern Features",
        "Professional Chauffeurs",
        "Impeccable Maintenance",
        "Flexible Scheduling",
      ],
    },
    {
      id: "conferences-delegation",
      icon: Briefcase,
      title: "Conferences & Delegation",
      shortDescription:
        "Luxury fleet with experienced chauffeurs for C-suite executives and VIP guests.",
      color: "from-[#5DFDCB] to-[#ff9b6a]",
      image: "/asset/Conferences & Delegation Image 1.jpeg",
      features: [
        "Spacious Interiors",
        "Tailored for Business",
        "Modern Features",
        "Professional Chauffeurs",
        "Impeccable Maintenance",
        "Flexible Scheduling",
      ],
    },
    {
      id: "wedding-car-rental",
      icon: Heart,
      title: "Wedding Car Rental",
      shortDescription:
        "Luxury sedans and coaches for conferences, events, and corporate outings with flexible scheduling.",
      color: "from-[#eb662b] to-[#5DFDCB]",
      image: "/asset/Wedding Car Rental Image 1.jpeg",
      features: [
        "Spacious Interiors",
        "Tailored for Business",
        "Modern Features",
        "Professional Chauffeurs",
        "Impeccable Maintenance",
        "Flexible Scheduling",
      ],
    },
    {
      id: "hotel-travel-desk",
      icon: MapPin,
      title: "Hotel Travel Desk Service",
      shortDescription:
        "Long-distance corporate travel with well-maintained vehicles and professional drivers.",
      color: "from-[#FE805A] to-[#eb662b]",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
      features: [
        "Spacious Interiors",
        "Tailored for Business",
        "Modern Features",
        "Professional Chauffeurs",
        "Impeccable Maintenance",
        "Flexible Scheduling",
      ],
    },
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
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#eb662b]/10 rounded-full mb-4">
            <span
              className="text-[#eb662b] font-semibold text-xs sm:text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              OUR EXPERTISE
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Complete Transportation Solutions
          </h2>
          <p
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            From corporate travel to special events, we provide comprehensive
            mobility solutions tailored to your every need with premium service
            excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative"
            >
              {/* Hover Gradient Overlay Layer (behind content) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl sm:rounded-3xl transition-opacity duration-500 pointer-events-none z-0`}
              />

              {/* Content Container with z-index above overlay overlay */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${service.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <service.icon
                        size={20}
                        className="sm:w-6 sm:h-6 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {service.shortDescription}
                  </p>

                  {/* Features */}
                  <div className="mb-4 sm:mb-6 mt-auto">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100/90 text-gray-700 px-2 sm:px-3 py-1 rounded-full border border-gray-200"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs bg-gray-100/90 text-gray-700 px-2 sm:px-3 py-1 rounded-full border border-gray-200">
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/service/${service.id}`}
                    className="mt-auto z-20 block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base relative overflow-hidden"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      <span className="relative z-10">View Details</span>
                      <ArrowRight
                        className="transition-transform duration-300 group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5 relative z-10"
                        size={16}
                      />
                      {/* Button hover effect */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 md:mt-16 relative overflow-hidden rounded-2xl sm:rounded-3xl mx-4 sm:mx-0 shadow-2xl"
        >
          {/* CTA Background with Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('/asset/cars backround iamge for homepage.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>

          <div className="relative z-10 p-8 sm:p-12 text-white">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ready to Experience Premium Service?
            </h3>
            <p
              className="text-base sm:text-lg mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Contact our experts today to customize the perfect transportation
              solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#eb662b] font-semibold rounded-full hover:shadow-xl transition-all duration-300 text-sm sm:text-base shadow-lg"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Get Free Consultation
                </motion.button>
              </Link>
              <a href="tel:+919990817615" className="w-full sm:w-auto block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base shadow-lg"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Call Now: +91 9990-817-615
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
