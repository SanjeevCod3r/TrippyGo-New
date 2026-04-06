"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/app/footer/page';

export default function TermsPage () {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24 sm:pt-28 md:pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Terms and Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-600"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Welcome to TrippyGo. These Terms and Conditions outline the rules and regulations for using our services.
            </motion.p>
          </motion.div>

          {/* Cancellation Policy Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Cancellation Policy
            </motion.h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#eb662b] text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>S.No.</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>Cancellation Time</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">1</td>
                    <td className="border border-gray-300 px-4 py-3">Prior to 48 hours from pick-up time</td>
                    <td className="border border-gray-300 px-4 py-3">0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">2</td>
                    <td className="border border-gray-300 px-4 py-3">Within 24 – 48 hours from pick-up time</td>
                    <td className="border border-gray-300 px-4 py-3">3%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">3</td>
                    <td className="border border-gray-300 px-4 py-3">Within 4 – 24 hours from pick-up time</td>
                    <td className="border border-gray-300 px-4 py-3">50%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">4</td>
                    <td className="border border-gray-300 px-4 py-3">Within 0 – 4 hours from pick-up time</td>
                    <td className="border border-gray-300 px-4 py-3">100%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">5</td>
                    <td className="border border-gray-300 px-4 py-3">No Show</td>
                    <td className="border border-gray-300 px-4 py-3">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Company Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                1. Company Details
              </motion.h3>
              <div className="text-gray-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p className="font-semibold text-lg mb-2">TRIPPYGO</p>
                <p>Address: D-193, G/F Saurabh Vihar Gali No. 7, Harinagar Extension Jaitpur, Badarpur New Delhi – 110044</p>
              </div>
            </motion.div>

            {/* Booking Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                2. Booking Policy
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• All bookings are subject to availability and confirmation.</li>
                <li>• Customers must provide a valid government-issued ID and a valid driver's license (if applicable).</li>
                <li>• Advance payment is required to confirm bookings.</li>
              </ul>
            </motion.div>

            {/* Payment Terms */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                3. Payment Terms
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Payments can be made via credit card, debit card, or bank transfer.</li>
                <li>• Any outstanding dues must be cleared at the end of the rental period.</li>
                <li>• Refunds for cancellations will be processed based on our cancellation policy.</li>
              </ul>
            </motion.div>

            {/* Cancellation Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                4. Cancellation Policy
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Cancellations made more than 24 hours before the scheduled pickup time will incur no charges.</li>
                <li>• Cancellations within 24 hours of the pickup time will result in a 50% charge.</li>
              </ul>
            </motion.div>

            {/* Vehicle Use Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                5. Vehicle Use Policy
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Vehicles must be returned in the same condition as rented.</li>
                <li>• Smoking and carrying hazardous materials are strictly prohibited.</li>
                <li>• The renter is responsible for any fines, damages, or traffic violations incurred during the rental period.</li>
              </ul>
            </motion.div>

            {/* Chauffeur Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                6. Chauffeur Services
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Chauffeurs will operate vehicles within agreed working hours.</li>
                <li>• Additional charges may apply for overtime or late-night services.</li>
                <li>• The renter is responsible for any fines, damages, or traffic violations incurred during the rental period.</li>
              </ul>
            </motion.div>

            {/* Airport and Event Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                7. Airport and Event Transfers
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Waiting time beyond the agreed duration may result in additional charges.</li>
                <li>• Missed pickups due to flight delays or other issues must be communicated promptly.</li>
              </ul>
            </motion.div>

            {/* Liability and Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                8. Liability and Insurance
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Comprehensive insurance is included for all vehicles, covering third-party liability.</li>
                <li>• The renter is responsible for damages not covered by insurance, including negligence or unauthorized use.</li>
              </ul>
            </motion.div>

            {/* Privacy Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                9. Privacy Policy
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Customer data is securely stored and used only for booking and service improvement purposes.</li>
                <li>• TrippyGo will not share personal data with third parties without consent.</li>
              </ul>
            </motion.div>

            {/* Dispute Resolution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                10. Dispute Resolution
              </motion.h3>
              <ul className="text-gray-700 space-y-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• Any disputes arising from these terms will be resolved under the jurisdiction of the courts in Delhi.</li>
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="bg-gradient-to-r from-[#eb662b] to-[#d45a20] rounded-xl shadow-lg p-8 text-white text-center"
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Contact Us
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="text-lg mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                For any questions or clarifications regarding these Terms and Conditions, contact us at:
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="space-y-2"
              >
                <p className="text-xl font-semibold">Phone: +91 8076449902</p>
                <p className="text-xl font-semibold">Email: info@trippygo.co.in</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
