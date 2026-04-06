"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Car,
  Users,
  Route,
  Phone,
  Mail,
  User,
  ArrowLeft,
  Calendar,
  Search,
  CreditCard,
  Truck,
  Bus,
  MapPin,
  Shield,
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
import { Fleet } from "@/components/Fleet";
import Footer from "@/app/footer/page";
import { useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_LIBRARIES = ["places"];

// Fleet-specific location input that works correctly inside a Dialog.
// Uses the raw Google Maps Places Autocomplete constructor so that
// suggestion-dropdown clicks are NOT intercepted by the Dialog's event-trap.
function FleetLocationInput({
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
}) {
  const inputRef = React.useRef(null);
  const autocompleteRef = React.useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  React.useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "in" },
      fields: ["formatted_address", "name", "geometry"],
      types: ["establishment", "geocode"],
    });

    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      const address = place.formatted_address || place.name || "";
      if (address) {
        onChange({ target: { name, value: address } });
      }
    });

    autocompleteRef.current = ac;
  }, [isLoaded, name, onChange]);

  const icon = name === "pickupLocation" ? "text-green-500" : "text-red-500";

  if (!isLoaded) {
    return (
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <MapPin className={`h-5 w-5 ${icon} animate-pulse`} />
        </div>
        <input
          type="text"
          placeholder="Loading maps..."
          disabled
          className="w-full pl-12 pr-4 py-6 rounded-2xl bg-gray-50 border-none font-bold text-sm opacity-50"
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <MapPin className={`h-5 w-5 ${icon}`} />
      </div>
      <input
        ref={inputRef}
        type="text"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className={`w-full pl-12 pr-4 py-6 rounded-2xl bg-gray-50 border-none font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all${
          error ? " ring-2 ring-red-300" : ""
        }`}
        onChange={onChange}
      />
    </div>
  );
}

// Fleet Booking Modal with Payment
function FleetBookingModal({ open, onClose, vehicle, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    customerAddress: "",
    pickupLocation: "",
    dropLocation: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      // Try to split name if it contains a space
      const names = (parsedUser.name || "").split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
      }));
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "Required";
      if (!formData.email.trim()) newErrors.email = "Required";
      if (!formData.phone.trim()) newErrors.phone = "Required";
    } else if (step === 2) {
      if (!formData.startDate) newErrors.startDate = "Required";
      if (!formData.pickupLocation.trim())
        newErrors.pickupLocation = "Required";
      if (!formData.dropLocation.trim()) newErrors.dropLocation = "Required";
      if (!formData.customerAddress.trim())
        newErrors.customerAddress = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 1;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const totalAmount = (vehicle?.pricePerDay || 0) * calculateDays();

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

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalAmount * 100,
          bookingType: "fleet",
        }),
      });

      const orderData = await orderRes.json();
      if (orderData.error) {
        toast.error(orderData.error);
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "TRIPPY GO",
        description: `Fleet Booking - ${vehicle?.name}`,
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
                  type: "fleet",
                  customerName: `${formData.firstName} ${formData.lastName}`,
                  customerPhone: formData.phone,
                  customerEmail: formData.email,
                  customerAddress: formData.customerAddress,
                  pickupLocation: formData.pickupLocation,
                  dropLocation: formData.dropLocation,
                  vehicleId: vehicle?.id,
                  vehicleName: vehicle?.name,
                  vehicleType: vehicle?.type,
                  pricePerDay: vehicle?.pricePerDay,
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  days: calculateDays(),
                  totalPrice: totalAmount,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success("Booking confirmed successfully!");
              onClose();
              if (onSuccess) onSuccess();
              window.location.reload();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("An error occurred during verification");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#0056D2" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Trip", icon: MapPin },
    { id: 3, title: "Confirm", icon: CreditCard },
  ];

  if (open && !localStorage.getItem("userToken")) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#0056D2]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-[#0056D2]" />
            </div>
            <h2
              className="text-2xl font-black mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Login Required
            </h2>
            <p className="text-gray-500 font-medium mb-8">
              Please sign up to book your premium fleet.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-2xl px-8 py-6 h-auto font-black border-2 border-gray-100"
              >
                Cancel
              </Button>
              <a href="/auth">
                <Button className="bg-[#0056D2] hover:bg-black text-white font-black rounded-2xl px-10 py-6 h-auto shadow-xl transition-all">
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-2xl rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white max-h-[90vh] flex flex-col"
        onInteractOutside={(e) => {
          // Prevent Dialog from closing when clicking on Google Maps pac-container dropdown
          const target = e.target;
          if (
            target.closest &&
            (target.closest(".pac-container") ||
              target.closest(".pac-item") ||
              target.closest(".pac-matched"))
          ) {
            e.preventDefault();
          }
        }}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#eb662b] to-[#ff9b6a] p-8 text-white relative h-48 flex flex-col justify-end">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          <div className="relative z-10">
            <h2
              className="text-3xl font-black mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book {vehicle.name}
            </h2>
            <p
              className="opacity-90 font-bold"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Step {currentStep} of {steps.length} •{" "}
              {steps[currentStep - 1].title} Details
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.id <= currentStep
                        ? "bg-[#eb662b] text-white shadow-lg"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <step.icon size={18} />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      step.id <= currentStep
                        ? "text-[#eb662b]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full ${
                      step.id < currentStep ? "bg-[#eb662b]" : "bg-gray-100"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                      First Name
                    </Label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`py-6 rounded-2xl bg-gray-50 border-none font-bold ${
                        errors.firstName ? "ring-2 ring-red-300" : ""
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                      Last Name
                    </Label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`py-6 rounded-2xl bg-gray-50 border-none font-bold ${
                        errors.lastName ? "ring-2 ring-red-300" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold ${
                        errors.email ? "ring-2 ring-red-300" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold ${
                        errors.phone ? "ring-2 ring-red-300" : ""
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                      Starts
                    </Label>
                    <Input
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="py-6 rounded-2xl bg-gray-50 border-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                      Ends
                    </Label>
                    <Input
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      min={
                        formData.startDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      className="py-6 rounded-2xl bg-gray-50 border-none font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                    Pickup Location
                  </Label>
                  <FleetLocationInput
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Enter Pickup Point"
                    required
                    error={errors.pickupLocation}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                    Drop Location
                  </Label>
                  <FleetLocationInput
                    name="dropLocation"
                    value={formData.dropLocation}
                    onChange={handleInputChange}
                    placeholder="Enter Destination"
                    required
                    error={errors.dropLocation}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                    Customer Address
                  </Label>
                  <Input
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleInputChange}
                    className={`py-6 rounded-2xl bg-gray-50 border-none font-bold ${
                      errors.customerAddress ? "ring-2 ring-red-300" : ""
                    }`}
                    placeholder="Enter your full address"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-[2rem] p-6 border-2 border-dashed border-gray-200">
                  <h4
                    className="font-black text-gray-900 mb-4 flex items-center gap-2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <CreditCard size={18} /> Booking Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-bold">Vehicle:</span>
                      <span className="font-black text-gray-900">
                        {vehicle.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-bold">Duration:</span>
                      <span className="font-black text-gray-900">
                        {calculateDays()}{" "}
                        {calculateDays() === 1 ? "Day" : "Days"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-bold">Route:</span>
                      <span className="font-black text-gray-900 text-right">
                        {formData.pickupLocation} → {formData.dropLocation}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-bold">
                        Passenger:
                      </span>
                      <span className="font-black text-gray-900">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="pt-4 mt-4 border-t-2 border-gray-100 flex justify-between items-center">
                      <span className="text-lg font-black text-gray-900 uppercase">
                        Total amount
                      </span>
                      <span className="text-2xl font-black text-[#eb662b]">
                        ₹{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0056D2]/5 p-4 rounded-2xl flex items-start gap-3">
                  <Shield
                    size={20}
                    className="text-[#0056D2] mt-1 flex-shrink-0"
                  />
                  <p className="text-xs text-[#0056D2] font-bold leading-relaxed">
                    By clicking "Process Payment", you agree to our terms of
                    service and recognize that this is a premium travel
                    contract.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-8 pt-0 flex gap-4">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="flex-1 py-6 rounded-2xl border-2 border-gray-100 font-black text-gray-500"
            >
              Back
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 py-6 rounded-2xl border-2 border-gray-100 font-black text-gray-500"
            >
              Cancel
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              onClick={() =>
                validateStep(currentStep) && setCurrentStep((prev) => prev + 1)
              }
              className="flex-[2] bg-primary hover:bg-primary text-white font-black rounded-2xl py-4 h-auto shadow-xl transition-all"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="flex-[2] bg-[#eb662b] hover:bg-[#eb662b] text-white font-black rounded-2xl py-4 h-auto shadow-xl transition-all gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={18} /> Process Payment
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles?enabled=true");
      const data = await res.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = ({ vehicle }) => {
    setSelectedVehicle(vehicle);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Fleet vehicles={vehicles} loading={loading} onBookNow={handleBook} />

      {/* Booking Modal */}
      <FleetBookingModal
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        vehicle={selectedVehicle}
        onSuccess={() => {
          setShowBookingModal(false);
          setSelectedVehicle(null);
        }}
      />
      <Footer />
    </div>
  );
}
