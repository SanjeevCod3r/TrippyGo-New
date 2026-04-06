"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/app/footer/page';

export default function PrivacyPage (){
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
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-600"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Your privacy is important to us. This Privacy Policy explains how TrippyGo collects, uses, and protects your information.
            </motion.p>
          </motion.div>

          {/* Privacy Policy Sections */}
          <div className="space-y-8">
            {/* Introduction */}
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
                1. Introduction
              </motion.h3>
              <div className="text-gray-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p className="mb-4">
                  TrippyGo ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </motion.div>

            {/* Information We Collect */}
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
                2. Information We Collect
              </motion.h3>
              <div className="text-gray-700 space-y-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, phone number</li>
                    <li>Billing and payment information</li>
                    <li>Government-issued ID for verification</li>
                    <li>Travel preferences and requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Usage Information:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Device information</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
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
                3. How We Use Your Information
              </motion.h3>
              <ul className="text-gray-700 space-y-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <li>• <strong>Service Provision:</strong> To provide transportation services and process bookings</li>
                <li>• <strong>Communication:</strong> To send booking confirmations, updates, and customer support</li>
                <li>• <strong>Payment Processing:</strong> To process payments and maintain billing records</li>
                <li>• <strong>Legal Compliance:</strong> To comply with legal obligations and regulatory requirements</li>
                <li>• <strong>Service Improvement:</strong> To analyze usage patterns and improve our services</li>
                <li>• <strong>Marketing:</strong> To send promotional offers (with your consent)</li>
              </ul>
            </motion.div>

            {/* Information Sharing */}
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
                4. Information Sharing and Disclosure
              </motion.h3>
              <div className="text-gray-700 space-y-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="space-y-2">
                  <li>• <strong>Service Providers:</strong> With trusted partners who help us operate our services (payment processors, chauffeur services)</li>
                  <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li>• <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li>• <strong>Consent:</strong> With your explicit permission</li>
                </ul>
              </div>
            </motion.div>

            {/* Data Security */}
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
                5. Data Security
              </motion.h3>
              <div className="text-gray-700 space-y-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Security Measures Include:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Secure data storage systems</li>
                    <li>Regular security audits and updates</li>
                    <li>Employee access controls and training</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Cookies and Tracking */}
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
                6. Cookies and Tracking Technologies
              </motion.h3>
              <div className="text-gray-700 space-y-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h4>
                  <ul className="space-y-2">
                    <li>• <strong>Essential Cookies:</strong> Required for website functionality</li>
                    <li>• <strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li>• <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                  </ul>
                </div>
                <p>
                  You can control cookie preferences through your browser settings, though disabling certain cookies may affect website functionality.
                </p>
              </div>
            </motion.div>

            {/* Your Rights */}
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
                7. Your Rights and Choices
              </motion.h3>
              <div className="text-gray-700 space-y-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p>You have the following rights regarding your personal information:</p>
                <ul className="space-y-2">
                  <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li>• <strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </motion.div>

            {/* Children's Privacy */}
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
                8. Children's Privacy
              </motion.h3>
              <div className="text-gray-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p>
                  Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
                </p>
              </div>
            </motion.div>

            {/* Changes to Privacy Policy */}
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
                9. Changes to This Privacy Policy
              </motion.h3>
              <div className="text-gray-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="bg-gradient-to-r from-[#eb662b] to-[#d45a20] rounded-xl shadow-lg p-8 text-white text-center"
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Contact Us About Privacy
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-lg mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                For privacy-related questions or to exercise your rights, contact us at:
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.3 }}
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
