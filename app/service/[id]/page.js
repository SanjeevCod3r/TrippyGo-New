"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  CheckCircle,
  Star,
  Clock,
  Car,
  Users,
  Heart,
  Calendar,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function ServiceDetail() {
  const { id } = useParams();
  const router = useRouter();

  const servicesData = {
    "corporate-car-rental": {
      title: "Corporate Car Rental",
      heroImage: "/asset/Corporate Car Rental Image 1.jpeg",
      iconColor: "from-[#0056D2] to-[#43E0F8]",
      content: {
        galleryImage: "/asset/Corporate Car Rental Image 2.jpeg",
        subtitle: "Sit back and enjoy – Let our chauffeurs drive you",
        description:
          "Trippy Go Car rental promises a seamless and comfortable journey, be it for client meetings, corporate events, site visits, or airport pick and drops. Our Corporate car rental service in Pan India meets a wide range of business requirements, providing a combination of flexibility, convenience, and professionalism that meets the high standards of contemporary businesses.",
        details:
          "Intended to fit the ever-changing pace of business life, our services offer chauffeur-driven cars that ensure timely arrival and hassle-free travel. Elegant interiors make the journey a work area, enabling professionals to prepare for conferences or make calls while on the move. Further, we can uphold a sophisticated and professional reputation by utilizing top-notch vehicles coupled with well-trained and polite drivers.",
        galleryImages: [
          "/asset/Corporate Car Rental Image 3.jpeg",
          "/asset/Corporate Car Rental Image 4.png",
          "/asset/Corporate Car Rental Image 5.jpeg",
        ],
        benefits: [
          {
            title: "Diverse Fleet Options",
            description:
              "A Diverse Fleet of economy cars, luxury sedans, SUVs, among others, is bound to leave you spoilt for choice. Our trained chauffeurs, are certain to take you on a journey that is as smooth as it is enjoyable. Luxury cars for the officious, stately sedans for those on important duties, and large coaches and SUVs for large groups of family or friends, Trippy Go can arrange for the vehicle that suits all your needs and ticks all boxes.",
            icon: Star,
            image: "/asset/Corporate Car Rental Image 1.jpeg",
          },
          {
            title: "Professional Chauffeurs",
            description:
              "Chauffeurs will not only look to getting you to your destination but take care to see that you are not inconvenienced in any way throughout your journey with Trippy Go. Our trained chauffeurs are everything that Trippy Go stands for – reliability, safety, comfort, and professionalism.",
            icon: Users,
            image: "/asset/Corporate Car Rental Image 2.jpeg",
          },
          {
            title: "Hassle-Free Service",
            description:
              "Hassle-Free Service assured from the moment you choose the corporate car rental option. We are committed to securing your comfort, convenience, and safety throughout your journey. Our team can be reached at any time of the day, and our customers can rest assured of having their inquiries answered.",
            icon: CheckCircle,
            image: "/asset/Corporate Car Rental Image 3.jpeg",
          },
          {
            title: "Customized Solutions",
            description:
              "While our operational models are standardized as are our administrative processes, there is no template that we fall back on to offer our clients a customized. The requirements and demands of each of our customers is heeded, and our approach, ranging from the choice of the car to the selection of the driver, is guided by our determination to achieve optimum customer satisfaction. We take pride in our ability to organising your journey bearing in mind all your requirements and your preferences.",
            icon: Heart,
            image: "/asset/Corporate Car Rental Image 4.png",
          },
        ],
        features: [
          "Spacious Interiors",
          "Tailored for Business",
          "Modern Features",
          "Professional Chauffeurs",
          "Impeccable Maintenance",
          "Flexible Scheduling",
        ],
        pricing: "Starting from ₹3,500/day",
        availability: "Available 24/7",
      },
    },
    "employee-transport": {
      title: "Employee Transport Services",
      heroImage: "/asset/Employee Transport Services Image 1.jpeg",
      iconColor: "from-[#43E0F8] to-[#43E0F8]",
      content: {
        galleryImage: "/asset/Employee Transport Services Image 2.jpeg",
        subtitle: "A smooth ride for your workforce",
        description:
          "Looking for safe, comfortable and reliable employee transportation services for your team? Then you have come to the right place. At Trippy Go, we understand that assurance of reliable transportation services boosts employee morale, and drives productivity at the workplace by increasing punctuality and eliminating anxiety over finding rides.",
        details:
          "Our large fleet of cars and experienced chauffeurs, Trippy Go can help businesses put in place systems that can effectively save time and energy for the employees, and prevent wastage of valuable resources in mobility planning. Regardless of the size of the workforce, Trippy Go can ensure a seamless transition to a more efficient and easy transportation system that is beneficial to both employees and businesses. Get all your doubts soundly answered with a presentation. Call us to arrange a presentation for you as per your convenience.",
        galleryImages: [
          "/asset/Employee Transport Services Image 3.jpeg",
          "/asset/Employee Transport Services Image 4.jpeg",
        ],
        benefits: [
          {
            title: "24/7 Availability",
            description:
              "Irregular shift is no hurdle to us. Trippy Go ensures availability of cars to ferry employees regardless of their shift – early morning hours or late-night. Arrangements to pick-up or drop employees at irregular hours are made such that businesses can rest assured of the workforce arriving at the office on time or reaching home comfortable and safe. Trippy Go expert team is available round-the-clock to assist clients, and answer any queries you may have.",
            icon: Clock,
            image: "/asset/Employee Transport Services Image 1.jpeg",
          },
          {
            title: "Digital Platform",
            description:
              "Say goodbye to manual duty slips with our digitized usage authorization platform. Users can now sign on to a digital platform for usage authorization, streamlining the approval process and reducing paperwork. This not only saves time but also improves accuracy and accountability.",
            icon: CheckCircle,
            image: "/asset/Employee Transport Services Image 2.jpeg",
          },
          {
            title: "Optimal Resource Utilization",
            description:
              "Optimal utilisation of resources ensures efficiency of operations on the one hand, while trimming the number of variable parameters involved in the management equation. Streamlining of operations through use of technology and expert personnel has enabled Trippy Go to ensure quality service, while preventing incidence of unforeseen disruptions.",
            icon: Star,
            image: "/asset/Employee Transport Services Image 3.jpeg",
          },
          {
            title: "Tailored Solutions",
            description:
              "Tailored solution best describes Trippy Go employee transport service. We handle end-to-end solutions, and flexibility in back-end operations has allowed us to adopt a technology-agnostic approach to management, thereby enabling us to tailor our model to meet the specific requirements of each client.",
            icon: Heart,
            image: "/asset/Employee Transport Services Image 4.jpeg",
          },
        ],
        features: [
          "Spacious Interiors",
          "Tailored for Business",
          "Modern Features",
          "Professional Chauffeurs",
          "Impeccable Maintenance",
          "Flexible Scheduling",
        ],
        pricing: "Custom pricing based on routes",
        availability: "Fixed schedule operations",
      },
    },
    "event-transportation": {
      title: "Event Transportation",
      heroImage: "/asset/Event Transportation Image 1.jpeg",
      iconColor: "from-[#FE805A] to-[#FE6B47]",
      content: {
        galleryImage: "/asset/Event Transportation Image 2.jpeg",
        subtitle: "Let us steer the wheels on your Big Days!",
        description:
          "Events, personal or corporate, big or small, entail logistics that require expert hands to handle them, with arranging transport being one of the major tasks that requires meticulous planning and execution. Be it a high-profile wedding, corporate celebrations, an intra-office celebration, arranging vehicles for all invitees to arrive at the venue on time, or ensuring that they return home safely, is a task that may consume a very large portion of time and your energies. That is precisely why it is best to leave this task in the hands of experienced mobility managers.",
        details:
          "Trippy Go has not only the technical expertise to handle the mandate for ceremonial events, but our people are also acutely sensitive to the cultural sensibilities involved in many such celebratory events. While our trained drivers, with their acute knowledge of the roads try to ensure that you are never late for any of the events or rituals, those working tirelessly at the back-end, arranging trips, finalizing routes and schedules, try to ensure that all contingencies are accounted for. Entrusting the mobility mandate of your events to Trippy Go will relieve you of all the attendant stress, while leaving you with a bundle of joyous memories.",
        galleryImages: [
          "/asset/Event Transportation Image 3.jpeg",
          "/asset/Event Transportation Image 4.jpeg",
        ],
        benefits: [
          {
            title: "Event-Specific Arrangements",
            description:
              "Event-Specific Transportation arrangements guaranteed by Trippy Go. Once you enlist our assistance for the event, and furnish all the required information about the event, and the number of guests to be expected, you can rid your mind of all worry about the guests arriving at the venue on time. It could be a wedding or a corporate event, our solutions are specific, and tailored to meet the unique demands and necessities of that situation.",
            icon: Calendar,
            image: "/asset/Event Transportation Image 1.jpeg",
          },
          {
            title: "Extensive Fleet Options",
            description:
              "Our Extensive Fleet offers you significant choice for the cars you want that best suits the event. SUVs that can ferry a larger number of people in just the one trip or luxury sedans for some of the more important guests at the event – you will certainly have plenty to choose from.",
            icon: Car,
            image: "/asset/Event Transportation Image 2.jpeg",
          },
          {
            title: "Vendor Coordination",
            description:
              "Liaising With Other Vendors is also within our scope of operations. We work in tandem with the event planners you have chosen to manage the event so we are aware of every last detail of the itinerary of your guests.",
            icon: Users,
            image: "/asset/Event Transportation Image 3.jpeg",
          },
          {
            title: "Professional Service",
            description:
              "Professional Drivers will secure your comfort, while being punctual, courteous, and thoroughly professional. Our managers will ensure that you and your guests are assigned the cars of your choice, while our drivers will take care to ensure that, regardless of the chaos on the streets, your journeys are peaceful and comfortable.",
            icon: Star,
            image: "/asset/Event Transportation Image 4.jpeg",
          },
        ],
        features: [
          "Spacious Interiors",
          "Tailored for Business",
          "Modern Features",
          "Professional Chauffeurs",
          "Impeccable Maintenance",
          "Flexible Scheduling",
        ],
        pricing: "Custom event packages",
        availability: "Event-based services",
      },
    },
    "conferences-delegation": {
      title: "Conferences & Delegation",
      heroImage: "/asset/Conferences & Delegation Image 1.jpeg",
      iconColor: "from-[#5DFDCB] to-[#43E0F8]",
      content: {
        galleryImage: "/asset/Conferences & Delegation Image 2.jpeg",
        subtitle: "Conferences & Delegations Transportation Services",
        description:
          "Conferences and delegations are quite common in this corporate world. Many corporate organizations arrange these conferences for their firm to promote it. In these conferences, they not only discuss things but also interact or even join in the debate with many other different businesses. So we all can understand how important these conferences and delegations can be for any business. That is why Trippy Go, one of the best providers of car rental services for conferences and delegations offers the best vehicles at your doorstep at an affordable price.",
        details:
          "Attentive and Experienced Personnel at Trippy Go will liaise with conference organizers to understand their requirements, and suitably deploy the required number of cars and coaches for ferrying delegates and participants to and from the event venue. Similarly, delegates attending any big conference from outside the town can reserve either one or multiple cars – depending on the side of their group – so they can focus entirely on the event, and not worry about getting to the venue on time. Our experienced personnel are adept at tailoring solutions to suit your requirements.",
        galleryImages: [
          "/asset/Conferences & Delegation Image 3.jpeg",
          "/asset/Conferences & Delegation Image 4.jpeg",
        ],
        benefits: [
          {
            title: "Expert Coordination",
            description:
              "Attentive and Experienced Personnel at Trippy Go will liaise with conference organizers to understand their requirements, and suitably deploy the required number of cars and coaches for ferrying delegates and participants to and from the event venue. Similarly, delegates attending any big conference from outside the town can reserve either one or multiple cars – depending on the side of their group – so they can focus entirely on the event, and not worry about getting to the venue on time. Our experienced personnel are adept at tailoring solutions to suit your requirements.",
            icon: Users,
            image: "/asset/Conferences & Delegation Image 1.jpeg",
          },
          {
            title: "Professional Chauffeurs",
            description:
              "Professional Chauffeurs are on stand-by to ferry delegates to the conference, and meetings. Our chauffeurs reflect our ethos rooted in punctuality, professionalism, and sophistication. Cognizant of the value of time where such high-profile events are concerned, our chauffeurs, supported by back-end personnel, meticulously plan and map journeys such that there is maximum convenience and comfort.",
            icon: Star,
            image: "/asset/Conferences & Delegation Image 2.jpeg",
          },
          {
            title: "Diverse Fleet Options",
            description:
              "A Diverse Fleet of Cars to choose from. Trippy Go fleet of more than 9,000 cars has in its ranks a number of premium luxury sedans, and SUVs, which can be reserved. Delegates, organisers and VIPs, all of them can rest assured of a comfortable ride on board our well-maintained cars.",
            icon: Car,
            image: "/asset/Conferences & Delegation Image 3.jpeg",
          },
          {
            title: "24/7 Support",
            description:
              "Assistance Guaranteed round-the-clock. Stakeholders can reach out to Trippy Go personnel at any time of day or night seeking assistance, and rest assured of being lent a patient ear. You may be seeking clarity on billing or you may wish to reschedule your trip or make a fresh reservation besides an existing one, our co-operation is guaranteed.",
            icon: Clock,
            image: "/asset/Conferences & Delegation Image 4.jpeg",
          },
        ],
        features: [
          "Spacious Interiors",
          "Tailored for Business",
          "Modern Features",
          "Professional Chauffeurs",
          "Impeccable Maintenance",
          "Flexible Scheduling",
        ],
        pricing: "Custom pricing based on requirements",
        availability: "On-demand and scheduled",
      },
    },
    "wedding-car-rental": {
      title: "Wedding Car Rental",
      heroImage: "/asset/Wedding Car Rental Image 1.jpeg",
      iconColor: "from-[#0056D2] to-[#43E0F8]",
      content: {
        galleryImage: "/asset/Wedding Car Rental Image 2.jpeg",
        subtitle:
          "Make the special day, extra special with Trippy Go relax Wedding Car Rentals",
        description:
          "Weddings are amongst the most special and memorable occasions in people's lives. The entire planning and execution are a huge event in itself, regardless of the size of the weddings. In India, weddings hold a special place in the lives of the bride and groom as well as their families and guests. Knowing how important, intimate, and eventful the wedding ceremonies can be, Trippy Go prides itself in providing exclusive and effortless car rental services that will take a huge part of the planning off the hands of the already occupied family members.",
        details:
          "From the bride and groom arriving in style, to organizing airport to venue to airport pick-up and drop, to arranging dream wedding transport for the entire bride and groom gang, the team at Trippy Go will effortlessly handle the planning logistics and management. Stylish Cars, well maintained and, decked up as suits the occasion, will be at your disposal throughout the duration of the wedding ceremony, including the many events leading up to the big day. You can reserve any number of cars of varying size – sedans, SUVs among others – depending on the preferences of your guest list.",
        galleryImages: [
          "/asset/Wedding Car Rental Image 3.jpeg",
          "/asset/Wedding Car Rental Image 4.jpeg",
        ],
        benefits: [
          {
            title: "Stylish Wedding Cars",
            description:
              "Stylish Cars, well maintained and, decked up as suits the occasion, will be at your disposal throughout the duration of the wedding ceremony, including the many events leading up to the big day. You can reserve any number of cars of varying size – sedans, SUVs among others – depending on the preferences of your guest list.",
            icon: Heart,
            image: "/asset/Wedding Car Rental Image 1.jpeg",
          },
          {
            title: "Courteous Chauffeurs",
            description:
              "Courteous Chauffeurs will ensure that there is no dampening of the celebratory spirit even on the most congested streets leading up to the venue. Trippy Go trained chauffeurs, with their knowledge of the streets, coupled with their thoroughly professional approach to their jobs, will take care not only to secure your comfort but ensure that you arrive in time for all the auspicious events well ahead of time.",
            icon: Star,
            image: "/asset/Wedding Car Rental Image 2.jpeg",
          },
          {
            title: "Bespoke Packages",
            description:
              "Bespoke Packages will fit your needs as well as your tailored suit, for sure. Clients can reserve as many cars as they want, and not necessarily requisition each of them for all the days. Instead, clients can reserve more cars for those days when the number of guests expected is significantly higher while requisitioning fewer cars on other days. This flexibility will ensure that the entire exercise is economical. Our team working tirelessly at the back-end will always be on hand or available on the phone or WhatsApp to accommodate any last-minute changes to the original order.",
            icon: Calendar,
            image: "/asset/Wedding Car Rental Image 3.jpeg",
          },
          {
            title: "Signature Touches",
            description:
              "Signature Touches that we add to the cars rented for the big day, even while you are on the move, leave a touch of festivity to the occasion. From complimentary decorations to the car to any special requests, our experts go above and beyond to make it special.",
            icon: Sparkles,
            image: "/asset/Wedding Car Rental Image 4.jpeg",
          },
        ],
        features: [
          "Spacious Interiors",
          "Tailored for Business",
          "Modern Features",
          "Professional Chauffeurs",
          "Impeccable Maintenance",
          "Flexible Scheduling",
        ],
        pricing: "Custom wedding packages",
        availability: "Event-based services",
      },
    },
    "hotel-travel-desk": {
      title: "Hotel Travel Desk Service",
      heroImage:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      iconColor: "from-[#FE805A] to-[#0056D2]",
      content: {
        galleryImage:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600",
        subtitle: "HOTEL TRAVEL DESK SERVICE",
        description:
          "Comprehensive travel desk services for hotels. We provide complete mobility solutions for hotel guests, ensuring seamless transportation from airports, railway stations, and bus stands to your hotel and vice versa.",
        details:
          "Our hotel travel desk service is designed to enhance the guest experience by providing reliable, comfortable, and punctual transportation solutions. Whether it's airport transfers, city tours, or local transportation needs, we ensure that your guests have a hassle-free stay at your hotel. Professional chauffeurs and well-maintained vehicles ensure that your guests arrive at their destinations safely and on time. Our services are available 24/7, catering to early morning flights, late-night arrivals, and emergency transportation needs. We understand the importance of first impressions and the role transportation plays in shaping the overall guest experience. Our commitment to excellence ensures that your hotel guests receive the premium service they deserve. Flexible booking options, competitive pricing, and dedicated support make us the preferred choice for hotels looking to provide exceptional transportation services to their guests. Contact us today to learn more about our comprehensive hotel travel desk solutions.",
        benefits: [
          {
            title: "Seamless Airport Transfers",
            description:
              "Comprehensive airport transfer services ensuring your guests arrive at the hotel safely and on time. Our professional chauffeurs handle everything from flight tracking to luggage assistance.",
            icon: Car,
            image: "/asset/Mercedes GLS.png",
          },
          {
            title: "24/7 Availability",
            description:
              "Round-the-clock transportation services catering to early morning flights, late-night arrivals, and emergency transportation needs. Our team is always ready to assist.",
            icon: Clock,
            image: "/asset/Toyota Fortuner.png",
          },
          {
            title: "Premium Fleet",
            description:
              "Well-maintained, luxury vehicles that enhance your hotel's image and provide comfort to your guests. From sedans to SUVs, we have the right vehicle for every occasion.",
            icon: Star,
            image: "/asset/Audi Q7.png",
          },
          {
            title: "Guest Experience Enhancement",
            description:
              "Elevate your hotel's service quality with reliable transportation that creates lasting impressions. Our commitment to excellence ensures guest satisfaction and loyalty.",
            icon: Heart,
            image: "/asset/Toyota Vellfire.png",
          },
        ],
        features: [
          "Spacious Interiors",
          "Tailored for Business",
          "Modern Features",
          "Professional Chauffeurs",
          "Impeccable Maintenance",
          "Flexible Scheduling",
        ],
        pricing: "Custom pricing for hotels",
        availability: "24/7 service",
      },
    },
  };

  const service = servicesData[id];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h2>
          <Link href="/services" className="text-[#0056D2] hover:underline">
            Return to Services
          </Link>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {service ? (
        <div className="relative">
          {/* Dramatic Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0">
              <img
                src={service.heroImage}
                alt={`${service.title} Hero`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent" />
            </div>

            {/* Floating Content Cards */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12">
              <div className="flex justify-center items-center min-h-screen">
                {/* Centered Content */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-white text-center space-y-8 max-w-4xl"
                >
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20"
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">
                        Premium Transportation Service
                      </span>
                    </motion.div>

                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {service.title.split(" ").map((word, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.6 + index * 0.1,
                          }}
                          className="inline-block mr-2 sm:mr-4"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h1>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed max-w-3xl mx-auto px-6 py-4 bg-gradient-to-r from-white/30 to-white/20 rounded-2xl border-2 border-white/30 shadow-xl font-semibold"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {service.content.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <a
                      href="tel:+919990817615"
                      className="bg-gradient-to-r from-[#0056D2] to-[#003DA6] hover:from-[#0041A8] hover:to-[#002D80] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3 justify-center"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now: +91 9990-817-615
                    </a>
                    <Link
                      href="/contact"
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </section>

          <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] text-white rounded-full mb-4">
                  <span
                    className="font-semibold text-sm flex items-center gap-2"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Your Journey
                  </span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Seamless Experience From{" "}
                  <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#43E0F8] bg-clip-text text-transparent">
                    Start to Finish
                  </span>
                </h2>
                <p
                  className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Discover our comprehensive 4-step journey that ensures every
                  moment of your transportation experience is exceptional
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto mb-16"
              >
                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#43E0F8] rounded-full"
                  />
                </div>
              </motion.div>

              <div className="max-w-7xl mx-auto">
                {/* Journey Steps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                  {[
                    {
                      step: "01",
                      title: "Smart Booking",
                      subtitle: "Easy Planning",
                      description:
                        "Seamless online booking with personalized service planning tailored to your specific needs and preferences.",
                      icon: "📱",
                      color: "from-blue-500 to-blue-600",
                      bgColor: "from-blue-50 to-blue-100",
                      features: [
                        "24/7 Online Booking",
                        "Instant Confirmation",
                        "Flexible Scheduling",
                      ],
                    },
                    {
                      step: "02",
                      title: "Professional Pickup",
                      subtitle: "Punctual Service",
                      description:
                        "Experienced chauffeurs arrive on time with meticulously maintained, luxury vehicles ready for your journey.",
                      icon: "🚗",
                      color: "from-green-500 to-green-600",
                      bgColor: "from-green-50 to-green-100",
                      features: [
                        "Trained Chauffeurs",
                        "Well-Maintained Fleet",
                        "Real-time Tracking",
                      ],
                    },
                    {
                      step: "03",
                      title: "Luxury Experience",
                      subtitle: "Premium Comfort",
                      description:
                        "Indulge in premium comfort, cutting-edge safety features, and personalized service throughout your journey.",
                      icon: "✨",
                      color: "from-purple-500 to-purple-600",
                      bgColor: "from-purple-50 to-purple-100",
                      features: [
                        "Premium Interiors",
                        "Advanced Safety",
                        "Personalized Service",
                      ],
                    },
                    {
                      step: "04",
                      title: "Safe Arrival",
                      subtitle: "Peace of Mind",
                      description:
                        "Reliable drop-off with comprehensive tracking, 24/7 support, and guaranteed satisfaction at your destination.",
                      icon: "🏁",
                      color: "from-orange-500 to-orange-600",
                      bgColor: "from-orange-50 to-orange-100",
                      features: [
                        "Safe Drop-off",
                        "24/7 Support",
                        "Quality Assurance",
                      ],
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative"
                    >
                      {/* Card */}
                      <div
                        className={`relative bg-gradient-to-br ${item.bgColor} rounded-3xl p-8 h-full border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                          />
                        </div>

                        {/* Step Number */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.15 + 0.2,
                            type: "spring",
                          }}
                          viewport={{ once: true }}
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color} text-white font-bold text-lg mb-6 shadow-lg`}
                        >
                          {item.step}
                        </motion.div>

                        {/* Icon */}
                        <motion.div
                          initial={{ rotate: -180, scale: 0 }}
                          whileInView={{ rotate: 0, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.15 + 0.3,
                            type: "spring",
                          }}
                          viewport={{ once: true }}
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {item.icon}
                        </motion.div>

                        {/* Content */}
                        <div className="space-y-3">
                          <div>
                            <h3
                              className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              {item.title}
                            </h3>
                            <p
                              className="text-sm text-gray-600 font-medium"
                              style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                              {item.subtitle}
                            </p>
                          </div>

                          <p
                            className="text-sm text-gray-700 leading-relaxed"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {item.description}
                          </p>

                          {/* Features List */}
                          <div className="space-y-2 pt-2">
                            {item.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.15 + 0.4 + idx * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color}`}
                                />
                                <span
                                  className="text-xs text-gray-600 font-medium"
                                  style={{ fontFamily: "Manrope, sans-serif" }}
                                >
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div
                          className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${item.color} transition-all duration-500`}
                        />

                        {/* Corner Accent */}
                        <div
                          className={`absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-transparent group-hover:border-l-white group-hover:border-t-white transition-all duration-300`}
                        />
                      </div>

                      {/* Connecting Arrow (for larger screens) */}
                      {index < 3 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.15 + 0.6,
                          }}
                          viewport={{ once: true }}
                          className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-md">
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="text-white text-sm"
                            >
                              →
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mt-16"
                >
                  <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-10 h-10 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-lg">✓</span>
                    </motion.div>
                    <div className="text-left">
                      <h4
                        className="font-bold text-gray-900"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Ready for Your Journey?
                      </h4>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Experience our premium service from booking to arrival
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="px-6 py-3 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Start Now
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Feature Showcase */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Key Features
                </h2>
                <p
                  className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Discover the essential features that make our transportation
                  service the preferred choice for discerning clients
                </p>
              </motion.div>

              {/* Alternating Benefits Layout */}
              <div className="space-y-20">
                {service.content.benefits?.slice(0, 4).map((benefit, index) => {
                  const isEven = index % 2 === 0;
                  const IconMap = {
                    1: Star,
                    2: Users,
                    3: CheckCircle,
                    4: Heart,
                    5: Clock,
                    6: Car,
                    7: Calendar,
                    8: Sparkles,
                  };
                  // We'll fallback to Car icon if we can't map the dynamically generated lucide-react icon component reference (it was passed as an object from the static dataset in the user's code, but we know which icons they were using roughly)
                  const IconToRender =
                    typeof benefit.icon === "function" ||
                    typeof benefit.icon === "object"
                      ? benefit.icon
                      : Car;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Image Section */}
                      <div className="flex-1 w-full lg:w-auto">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1 + 0.2,
                          }}
                          viewport={{ once: true }}
                          className="relative group"
                        >
                          <div className="relative overflow-hidden rounded-[20px] shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                            <img
                              src={benefit.image}
                              alt={benefit.title}
                              className="w-full h-80 sm:h-96 lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1555215695-3004980ad54e?crop=entropy&cs=srgb&fm=jpg&q=85";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>

                          {/* Floating Icon */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.1 + 0.4,
                            }}
                            viewport={{ once: true }}
                            className="absolute -top-6 -right-6 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] p-4 rounded-2xl shadow-xl"
                          >
                            <IconToRender className="w-8 h-8 text-white" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 w-full lg:w-auto text-center lg:text-left">
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1 + 0.3,
                          }}
                          viewport={{ once: true }}
                          className="space-y-6"
                        >
                          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0056D2]/10 to-[#43E0F8]/10 px-6 py-3 rounded-full">
                            <IconToRender className="w-6 h-6 text-[#0056D2]" />
                            <span
                              className="text-[#0056D2] font-semibold text-sm uppercase tracking-wider"
                              style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                              Feature {index + 1}
                            </span>
                          </div>

                          <h3
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {benefit.title}
                          </h3>

                          <p
                            className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {benefit.description}
                          </p>

                          {/* Decorative Line */}
                          <div className="w-24 h-1 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-full mx-auto lg:mx-0" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-24 bg-gradient-to-r from-[#0056D2] to-[#003DA6] relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Ready to Experience Luxury?
                  </h2>
                  <p
                    className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed px-4 sm:px-0"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Book your premium transportation service today and discover
                    why discerning clients choose Trippy Go for all their
                    mobility needs.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <a
                      href="tel:+919990817615"
                      className="bg-white text-[#0056D2] px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center hover:scale-105"
                    >
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      Call Now: +91 9990-817-615
                    </a>

                    <Link
                      href="/contact"
                      className="border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-white hover:text-[#0056D2] transition-all duration-300 w-full sm:w-auto text-center hover:scale-105"
                    >
                      Get Quote
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-white/20"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        1000+
                      </div>
                      <div className="text-white/70 text-sm">Happy Clients</div>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        24/7
                      </div>
                      <div className="text-white/70 text-sm">Support</div>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        5★
                      </div>
                      <div className="text-white/70 text-sm">Rating</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="hidden sm:block fixed top-20 sm:top-24 left-4 sm:left-6 z-50 bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Service Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The requested service could not be found.
            </p>
            <Link
              href="/services"
              className="bg-[#0056D2] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0041A8] transition-colors duration-300 inline-block"
            >
              Back to Services
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
