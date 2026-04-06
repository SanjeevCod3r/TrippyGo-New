"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Navigation, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    mobileNo: "",
    destination: "",
    from: "",
    noOfPersons: "",
    question: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Open the modal after 1.5 seconds on initial load
    const timer = setTimeout(() => {
      const hasSeenModal = sessionStorage.getItem("enquiryModalSeen");
      if (!hasSeenModal) {
        setOpen(true);
        sessionStorage.setItem("enquiryModalSeen", "true");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Enquiry submitted successfully!");
        setOpen(false);
        setFormData({
          fullName: "",
          emailId: "",
          mobileNo: "",
          destination: "",
          from: "",
          noOfPersons: "",
          question: "",
        });
      } else {
        toast.error("Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] rounded-[2rem] border-none shadow-2xl p-6 bg-white overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-black text-center text-gray-900 tracking-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Enquiry Now
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div className="relative flex items-center bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors focus-within:border-[#eb662b] focus-within:hover:border-[#eb662b]">
            <div className="pl-4 flex items-center pointer-events-none text-gray-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 bg-transparent text-gray-900 focus:outline-none rounded-xl font-semibold placeholder:text-gray-400 placeholder:font-medium text-[15px]"
              required
            />
          </div>

          {/* Email Id */}
          <div className="relative flex items-center bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors focus-within:border-[#eb662b] focus-within:hover:border-[#eb662b]">
            <div className="pl-4 flex items-center pointer-events-none text-gray-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="emailId"
              placeholder="Email Id"
              value={formData.emailId}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 bg-transparent text-gray-900 focus:outline-none rounded-xl font-semibold placeholder:text-gray-400 placeholder:font-medium text-[15px]"
            />
          </div>

          {/* Mobile No. */}
          <div className="relative flex items-center bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors focus-within:border-[#eb662b] focus-within:hover:border-[#eb662b]">
            <div className="pl-4 flex items-center pointer-events-none text-gray-500">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              name="mobileNo"
              placeholder="Mobile No."
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 bg-transparent text-gray-900 focus:outline-none rounded-xl font-semibold placeholder:text-gray-400 placeholder:font-medium text-[15px]"
              required
            />
          </div>

          {/* Destination */}
          <div className="relative flex items-center bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors focus-within:border-[#eb662b] focus-within:hover:border-[#eb662b]">
            <div className="pl-4 flex items-center pointer-events-none text-gray-500">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 bg-transparent text-gray-900 focus:outline-none rounded-xl font-semibold placeholder:text-gray-400 placeholder:font-medium text-[15px]"
              required
            />
          </div>

          {/* From */}
          <div className="relative flex items-center bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors focus-within:border-[#eb662b] focus-within:hover:border-[#eb662b]">
            <div className="pl-4 flex items-center pointer-events-none text-gray-500">
              <Navigation className="w-4 h-4 transform -rotate-45" />
            </div>
            <input
              type="text"
              name="from"
              placeholder="From"
              value={formData.from}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 bg-transparent text-gray-900 focus:outline-none rounded-xl font-semibold placeholder:text-gray-400 placeholder:font-medium text-[15px]"
              required
            />
          </div>

          {/* No of Persons */}
          <div className="relative flex items-center bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors focus-within:border-[#eb662b] focus-within:hover:border-[#eb662b]">
            <div className="pl-4 flex items-center pointer-events-none text-gray-500">
              <Users className="w-4 h-4" />
            </div>
            <input
              type="number"
              name="noOfPersons"
              placeholder="No of Persons"
              value={formData.noOfPersons}
              onChange={handleChange}
              min="1"
              className="w-full pl-3 pr-4 py-3 bg-transparent text-gray-900 focus:outline-none rounded-xl font-semibold placeholder:text-gray-400 placeholder:font-medium text-[15px]"
              required
            />
          </div>

          {/* Ask Your Travel Consultant A Question */}
          <div className="relative flex items-start bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors focus-within:border-[#eb662b] focus-within:hover:border-[#eb662b] pt-3">
            <div className="pl-4 flex items-center pointer-events-none text-gray-500">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              name="question"
              placeholder="Ask Your Travel Consultant A Question"
              value={formData.question}
              onChange={handleChange}
              rows={2}
              className="w-full pl-3 pr-4 py-0 bg-transparent text-gray-900 focus:outline-none rounded-xl font-semibold placeholder:text-gray-400 placeholder:font-medium text-[15px] resize-none min-h-[50px]"
            ></textarea>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-5 mt-2 h-auto bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] hover:from-[#d1531e] hover:to-[#eb662b] text-white font-black text-lg rounded-xl shadow-lg shadow-[#eb662b]/30 hover:shadow-2xl hover:shadow-[#eb662b]/40 hover:-translate-y-1 transition-all uppercase tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
