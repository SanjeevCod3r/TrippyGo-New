import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Search, User, Mail, Phone, Check, Car, IndianRupee, Navigation, ArrowRight } from 'lucide-react';
import { pricingData, cities, carTypes } from '@/app/data/pricingData';
import { EnhancedLocationInput } from './EnhancedLocationInput';
import { toast } from 'sonner';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

export const CabBookingForm = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries
  });

  const [activeTab, setActiveTab] = useState('outstation');
  const [tripType, setTripType] = useState('oneway');
  const [selectedCar, setSelectedCar] = useState('');
  const [airportDirection, setAirportDirection] = useState('from');
  const [showPricing, setShowPricing] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [bookingStep, setBookingStep] = useState('basic');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'airport' || activeTab === 'local') {
      setTripType('oneway');
    }
  }, [activeTab]);

  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    returnDestination: '',
    returnDate: '',
    returnTime: '',
    localPackage: ''
  });

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const localPackages = [
    { id: '2hr-20km', label: '2Hr. 20Km.', hours: 2, km: 20 },
    { id: '3hr-30km', label: '3Hr. 30Km.', hours: 3, km: 30 },
    { id: '4hr-40km', label: '4Hr. 40Km.', hours: 4, km: 40 },
    { id: '5hr-50km', label: '5Hr. 50Km.', hours: 5, km: 50 },
    { id: '6hr-60km', label: '6Hr. 60Km', hours: 6, km: 60 },
    { id: '7hr-70km', label: '7Hr. 70Km.', hours: 7, km: 70 },
    { id: '8hr-80km', label: '8Hr. 80Km.', hours: 8, km: 80 },
    { id: '9hr-90km', label: '9Hr. 90Km.', hours: 9, km: 90 },
    { id: '10hr-100km', label: '10Hr. 100Km.', hours: 10, km: 100 }
  ];

  const tabs = [
    { id: 'outstation', label: 'OutStation' },
    { id: 'local', label: 'Hourly' },
    { id: 'airport', label: 'Airport' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserDetailsChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const calculateKMPrice = (kms) => {
    if (!selectedCar) return 0;
    const defaultCity = 'Delhi (NCR)';
    const carPricing = pricingData[defaultCity][selectedCar];

    if (!carPricing) return kms * 15; // Fallback

    if (activeTab === 'local' && formData.localPackage) {
      return carPricing.localPackages[formData.localPackage] || carPricing.baseCharge;
    }

    if (activeTab === 'outstation') {
      const minKms = carPricing.outstationMinKms;
      const rate = carPricing.outstationRate;
      let billKms = Math.max(kms, minKms);
      if (tripType === 'round') billKms *= 2;
      return billKms * rate;
    }

    // Dynamic Airport Transfer: Base Charge + Extra KM if distance > 40km
    if (activeTab === 'airport') {
      const base = carPricing.baseCharge;
      if (kms > 40) {
        return Math.round(base + (kms - 40) * 15);
      }
      return Math.round(base);
    }

    return Math.round(carPricing.baseCharge);
  };

  const calculateDistance = async () => {
    if (!isLoaded || !window.google) return;
    const service = new window.google.maps.DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [formData.pickupLocation],
          destinations: [activeTab === 'local' ? formData.pickupLocation : formData.destination],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const res = response.rows[0].elements[0];
            const distKm = res.distance.value / 1000;
            const timeStr = res.duration.text;
            resolve({ distance: distKm, duration: timeStr });
          } else {
            console.error('Distance Matrix Result:', response);
            reject('Could not calculate distance');
          }
        }
      );
    });
  };

  const handleSearchCabs = async (e) => {
    e.preventDefault();
    if (!selectedCar) {
      toast.error('Please select car type');
      return;
    }

    setLoading(true);
    try {
      if (activeTab === 'local') {
        const dist = 10;
        const dur = 'Local Package';
        setDistance(dist);
        setDuration(dur);
        const price = calculateKMPrice(dist);
        setCalculatedPrice(price);
        setBookingStep('pricing');
        setShowPricing(true);
      } else {
        const result = await calculateDistance();
        if (!result) throw new Error('Distance calculation failed');

        setDistance(result.distance);
        setDuration(result.duration);
        const price = calculateKMPrice(result.distance);
        setCalculatedPrice(price);
        setBookingStep('pricing');
        setShowPricing(true);
      }
    } catch (err) {
      console.error('Search Cabs Error:', err);
      toast.error('Could not get accurate distance. Using base price.');
      const fallbackDist = 10;
      setDistance(fallbackDist);
      setDuration('Approx. 1 hr');
      setCalculatedPrice(calculateKMPrice(fallbackDist));
      setBookingStep('pricing');
      setShowPricing(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBasicNext = (e) => {
    e.preventDefault();
    if (!formData.pickupLocation) {
      toast.error('Please enter pickup location');
      return;
    }
    if (activeTab === 'local' && !formData.localPackage) {
      toast.error('Please select a package');
      return;
    }
    if (activeTab !== 'local' && !formData.destination) {
      toast.error('Please enter destination');
      return;
    }
    if (activeTab === 'airport' && !airportDirection) {
      toast.error('Please select From Airport or To Airport');
      return;
    }
    if (!formData.pickupDate || !formData.pickupTime) {
      toast.error('Please select pickup date and time');
      return;
    }
    if (tripType === 'round' && (!formData.returnDate || !formData.returnTime)) {
      toast.error('Please provide return date and time');
      return;
    }
    setBookingStep('details');
  };

  const handleAcceptPrice = () => {
    setBookingStep('userDetails');
    setShowPricing(false);
    setShowUserForm(true);
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      toast.error('Please fill all details');
      return;
    }
    setBookingStep('confirmation');
    setShowUserForm(false);
    setShowConfirmation(true);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Session expired. Please login again.');
      return;
    }

    setLoading(true);
    try {
      // 1. Create order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: calculatedPrice * 100, // paise
          bookingType: 'cab'
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Trippy Go',
        description: `${selectedCar} - ${activeTab} Booking`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            // 3. Verify payment and create booking in one go
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: {
                  type: 'cab',
                  customerName: userDetails.name,
                  customerEmail: userDetails.email,
                  customerPhone: userDetails.phone,
                  pickup: formData.pickupLocation,
                  drop: formData.destination || 'Local Package',
                  date: formData.pickupDate,
                  time: formData.pickupTime,
                  tripType: tripType,
                  serviceType: activeTab,
                  vehicleType: selectedCar,
                  estimatedFare: calculatedPrice,
                  distance: distance,
                  duration: duration,
                  airportDirection: airportDirection,
                  localPackage: formData.localPackage,
                  returnDate: formData.returnDate,
                  returnTime: formData.returnTime,
                  status: 'confirmed', // Direct confirmed
                  paymentStatus: 'paid',
                  createdAt: new Date()
                }
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setShowSuccessPopup(true);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              toast.error(verifyData.error || 'Payment verification failed');
            }
          } catch (err) {
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: '#eb662b'
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Booking Payment Error:', error);
      toast.error(error.message || 'Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#FFFFFFCC] rounded-3xl shadow-2xl p-6 sm:p-8 md:p-8 w-full max-w-md mx-auto lg:mx-0"
    // style={{
    //   background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    //   boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
    // }}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {bookingStep === 'basic' && 'Book Your Ride'}
          {bookingStep === 'details' && 'Select Car Type'}
          {bookingStep === 'pricing' && 'Pricing Details'}
          {bookingStep === 'userDetails' && 'Your Details'}
          {bookingStep === 'confirmation' && 'Confirm Booking'}
        </h3>
        <p className="text-black text-sm">
          {bookingStep === 'basic' && 'Where and when would you like to go?'}
          {bookingStep === 'details' && 'Choose your preferred vehicle'}
          {bookingStep === 'pricing' && 'Best prices guaranteed'}
          {bookingStep === 'userDetails' && 'Please provide your details'}
          {bookingStep === 'confirmation' && 'Review your booking'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {bookingStep === 'basic' && (
          <motion.div key="basic" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <div className="flex mb-4 bg-white rounded-xl p-1 backdrop-blur-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); if (tab.id !== 'airport') setAirportDirection('from'); }}
                  className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white shadow-lg' : 'text-black hover:bg-white/10'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'airport' && (
              <div className="flex gap-3 bg-white/5 rounded-xl p-2 backdrop-blur-sm mb-4">
                {['from', 'to'].map((dir) => (
                  <button key={dir} onClick={() => setAirportDirection(dir)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${airportDirection === dir ? 'bg-[#eb662b] text-white' : 'text-black hover:bg-white/10'}`}>
                    {dir === 'from' ? 'From Airport' : 'To Airport'}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'outstation' && (
              <div className="flex gap-2 bg-[#F3F4F680] rounded-xl p-1.5 backdrop-blur-sm mb-4">
                {['oneway', 'round'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-300 ${tripType === type
                      ? 'bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white shadow-md'
                      : 'text-black hover:bg-white/50'
                      }`}
                  >
                    {type === 'oneway' ? 'One Way' : 'Round Trip'}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleBasicNext} className="space-y-4">
              <div className="space-y-1">

                <EnhancedLocationInput
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="Enter Pickup Location"
                  required
                  theme="light"
                  customInputStyles="!bg-white !text-gray-500 shadow-sm"
                />
              </div>

              {activeTab !== 'local' && (
                <div className="space-y-1">

                  <EnhancedLocationInput
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Enter Destination"
                    required
                    theme="light"
                    customInputStyles="!bg-white !text-gray-500 shadow-sm"
                  />
                </div>
              )}
              {activeTab === 'local' && (
                <div className="relative group">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#eb662b]/60 z-10" />
                  <select name="localPackage" value={formData.localPackage} onChange={handleInputChange} className="w-full pl-12 pr-10 py-4 bg-white/10 border border-white/20 rounded-xl text-black text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#eb662b]/50 transition-all hover:bg-white/20" required>
                    <option value="" className="bg-gray-900 text-black">Select Package</option>
                    {localPackages.map(pkg => <option key={pkg.id} value={pkg.id} className="bg-gray-800 text-black">{pkg.label}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#eb662b]/60">
                    <Navigation className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-white border border-white/20 rounded-xl text-black text-sm" required min={new Date().toISOString().split("T")[0]} />
                <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-white border border-white/20 rounded-xl text-black text-sm" required />
              </div>
              {tripType === 'round' && (
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-white  border border-white/20 rounded-xl text-black text-sm" required min={formData.pickupDate} />
                  <input type="time" name="returnTime" value={formData.returnTime} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-white border border-white/20 rounded-xl text-black text-sm" required />
                </div>
              )}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
                Next <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        )}

        {bookingStep === 'details' && (
          <motion.div key="details" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <div className="bg-white/5 rounded-xl p-4 mb-6 backdrop-blur-sm text-sm text-black space-y-1">
              <p><span className="text-base text-black font-bold">From:</span> {formData.pickupLocation}</p>
              {activeTab !== 'local' && <p><span className="text-base text-black font-bold">To:</span> {formData.destination}</p>}
              <p><span className="text-base text-black font-bold">Time:</span> {formData.pickupDate} {formData.pickupTime}</p>
            </div>
            <form onSubmit={handleSearchCabs} className="space-y-4">
              <div className="relative group">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#eb662b]/60 z-10" />
                <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className="w-full pl-12 pr-10 py-4 bg-white/10 border border-white/20 rounded-xl text-black appearance-none focus:outline-none focus:ring-2 focus:ring-[#eb662b]/50 transition-all hover:bg-white/20" required>
                  <option value="" className="bg-gray-900 text-black">Select Car Type</option>
                  {carTypes.map(car => <option key={car} value={car} className="bg-gray-800 text-black">{car}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#eb662b]/60">
                  <Navigation className="w-4 h-4 rotate-180" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setBookingStep('basic')} className="flex-1 py-4 bg-white/10 text-black rounded-xl font-bold">Back</button>
                <button type="submit" disabled={loading} className="flex-1 py-4 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white rounded-xl font-bold disabled:opacity-50">
                  {loading ? 'Calculating...' : 'Get Price'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {bookingStep === 'pricing' && (
          <motion.div key="pricing" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white/10 rounded-2xl p-6 text-center mb-6">
              <p className="text-black-100 text-base mb-2">Estimated Price</p>
              <h2 className="text-4xl font-bold text-black mb-4">₹{calculatedPrice}</h2>
              <div className="text-base text-black-300 space-y-2">
                <p>{selectedCar} • {distance.toFixed(1)} KM • {duration}</p>
                {activeTab === 'outstation' && distance < 250 && (
                  <p className="text-[#eb662b]/80 font-medium italic">Note: Minimum 250 KM charge applies</p>
                )}
                {activeTab === 'airport' && (
                  <p className="text-[#eb662b]/80 font-medium italic">Flat rate for first 40 KM</p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setBookingStep('details')} className="flex-1 py-4 bg-white/10 text-black rounded-xl font-bold">Back</button>
              <button onClick={handleAcceptPrice} className="flex-1 py-4 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white rounded-xl font-bold">Continue</button>
            </div>
          </motion.div>
        )}

        {bookingStep === 'userDetails' && (
          <motion.div key="userDetails" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleUserFormSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#eb662b]/60" />
                <input type="text" name="name" value={userDetails.name} onChange={handleUserDetailsChange} placeholder="Your Name" className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-black" required />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#eb662b]/60" />
                <input type="email" name="email" value={userDetails.email} onChange={handleUserDetailsChange} placeholder="Your Email" className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-black" required />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#eb662b]/60" />
                <input type="tel" name="phone" value={userDetails.phone} onChange={handleUserDetailsChange} placeholder="Your Phone" className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-black" required />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setBookingStep('pricing')} className="flex-1 py-4 bg-white/10 text-black rounded-xl font-bold">Back</button>
                <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white rounded-xl font-bold">Review</button>
              </div>
            </form>
          </motion.div>
        )}

        {bookingStep === 'confirmation' && (
          <motion.div key="confirmation" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white/10 rounded-2xl p-6 mb-6 text-base text-black space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2 mb-2"><span className="text-base text-black">Price</span><span className="font-bold text-lg text-black">₹{calculatedPrice}</span></div>
              <p><span className="text-base text-black">To:</span> {formData.destination || 'Local'}</p>
              <p><span className="text-base text-black">Car:</span> {selectedCar}</p>
              <p><span className="text-base text-black">Customer:</span> {userDetails.name}</p>
            </div>
            <button onClick={handleConfirmBooking} disabled={loading} className="w-full py-4 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] text-white rounded-xl font-bold shadow-xl">
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-sm text-center shadow-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Requested!</h3>
              <p className="text-gray-600 mb-6">Our team will contact you shortly to confirm your ride.</p>
              <button onClick={() => window.location.reload()} className="w-full py-3 bg-[#eb662b] text-white rounded-xl font-bold">Back to Home</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
