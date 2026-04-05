"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Wind,
  Gem,
  Medal,
  CheckCircle2,
} from "lucide-react";

export const WhyChoose = () => {
  const reasons = [
    {
      icon: Ticket,
      title: "Ultimate flexibility",
      description:
        "You're in control, with free cancellation and payment options to satisfy any plan or budget.",
    },
    {
      icon: Wind,
      title: "Memorable experiences",
      description:
        "Browse and book tours and activities so incredible, you'll want to tell your friends.",
    },
    {
      icon: Gem,
      title: "Quality at our core",
      description:
        "High-quality standards. Millions of reviews. A Trippy Go company.",
    },
    {
      icon: Medal,
      title: "Award-winning support",
      description:
        "New price? New plan? No problem. We're here to help, 24/7.",
    },
  ];

  return (
    <section
      className=" py-20 bg-white relative overflow-hidden"
      data-testid="why-choose-section"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #eb662b 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-16"
          data-testid="why-choose-header"
        >
          <h2
            className="text-4xl font-black text-[#05073C] mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
            data-testid="why-choose-title"
          >
            Why choose Trippy Go
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          data-testid="why-choose-grid"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-left"
              data-testid={`why-choose-card-${index}`}
            >
              {/* Icon */}
              <div className="mb-6">
                <reason.icon className="text-[#eb662b] w-12 h-12" strokeWidth={1} />
              </div>

              {/* Content */}
              <h3
                className="text-lg font-black text-[#05073C] mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
                data-testid={`why-choose-title-${index}`}
              >
                {reason.title}
              </h3>
              <p
                className="text-sm text-gray-500 leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-manrope)" }}
                data-testid={`why-choose-description-${index}`}
              >
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
