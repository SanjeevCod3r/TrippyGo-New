"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Lock,
  Navigation,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("userToken");
    if (token) {
      router.push("/my-bookings");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      toast.success("Welcome back to Trippy Go!");
      router.push("/");
    } catch (error) {
      console.error("Login flow error:", error);
      toast.error("Account verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup button clicked", {
      signupName,
      signupEmail,
      signupPhone,
    });

    if (
      !signupName ||
      !signupEmail ||
      !signupPassword ||
      !signupConfirmPassword
    ) {
      toast.error("Please fill in all required fields marked with *");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending signup request to API...");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          phone: signupPhone,
          password: signupPassword,
        }),
      });

      const data = await res.json();
      console.log("Signup API response:", data);

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        toast.success("Welcome to the Trippy Go family!");
        router.push("/");
      } else {
        toast.error(
          "Account created but auto-login failed. Please login manually."
        );
        setActiveTab("login");
      }
    } catch (error) {
      console.error("Signup flow error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-[#eb662b]/20" />
      </div>

      {/* Floating Elements for Premium Feel */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#eb662b]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff9b6a]/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        layout
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[480px] px-6"
      >
        <div className="mt-10 bg-white/10 backdrop-blur-[24px] rounded-[2.5rem] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden p-8 md:p-7">
          {/* Logo & Branding */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
             <img src="/asset/logo1.png" alt="Trippy Go" className="h-16 w-auto scale-125"/>
            </motion.div>
            <h1
              className="text-3xl font-black text-white mb-2 tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Your Adventure Awaits
            </h1>
            <p
              className="text-white/60 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Premium Travel Experiences Redefined
            </p>
          </div>

          <div className="w-full">
            {/* Custom Tab Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1.5 bg-white/5 rounded-[1.25rem] mb-10 border border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`py-3.5 rounded-[0.875rem] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-white text-[#eb662b] shadow-md"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("signup")}
                className={`py-3.5 rounded-[0.875rem] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-[#eb662b] text-white shadow-md"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-white/50 pl-1">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 pl-12 rounded-2xl focus:ring-0 focus:border-[#eb662b] transition-all font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <Label className="text-xs font-black uppercase tracking-widest text-white/50">
                          Password
                        </Label>
                        <button
                          type="button"
                          className="text-xs font-bold text-white hover:text-white transition-colors"
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Your Secret Key"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 pl-12 pr-12 rounded-2xl focus:ring-0 focus:border-[#eb662b] transition-all font-medium"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] hover:scale-[1.02] active:scale-95 text-white font-black py-7 rounded-2xl shadow-xl shadow-orange-500/20 transition-all border-none text-lg mt-2"
                    >
                      {loading ? "Verifying..." : "Login"}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-white/50 pl-1">
                        Full Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          placeholder="Adventurer Name"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 pl-12 rounded-2xl focus:ring-0 focus:border-[#ff9b6a] transition-all font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/50 pl-1">
                          Email *
                        </Label>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 px-5 rounded-2xl focus:ring-0 focus:border-[#ff9b6a] transition-all font-medium text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/50 pl-1">
                          Phone
                        </Label>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 px-5 rounded-2xl focus:ring-0 focus:border-[#ff9b6a] transition-all font-medium text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/50 pl-1">
                          Password *
                        </Label>
                        <Input
                          type="password"
                          placeholder="Min 6 chars"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 px-5 rounded-2xl focus:ring-0 focus:border-[#ff9b6a] transition-all font-medium text-sm"
                          required
                          minLength={6}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/50 pl-1">
                          Confirm *
                        </Label>
                        <Input
                          type="password"
                          placeholder="Match above"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 px-5 rounded-2xl focus:ring-0 focus:border-[#ff9b6a] transition-all font-medium text-sm"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] hover:scale-[1.02] active:scale-95 text-white font-black py-7 rounded-2xl shadow-xl shadow-orange-500/20 transition-all border-none text-lg mt-2"
                    >
                      {loading ? "Onboarding..." : "Sign Up"}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* <motion.button
          whileHover={{ x: -10 }}
          onClick={() => router.push("/")}
          className="mt-8 text-center flex items-center gap-2 text-white/50 hover:text-white text-base transition-all mx-auto"
        >
          <ArrowLeft size={18} />
          <span>Explore as guest</span>
        </motion.button> */}
          {/* <p className="text-center text-white/30 text-xs mt-10 font-medium">
            By joining, you agree to our{" "}
            <span className="text-white/50 underline cursor-pointer">
              Terms for Travelers
            </span>
          </p> */}
        </div>

        {/* Back Button */}
        <motion.button
          whileHover={{ x: -10 }}
          onClick={() => router.push("/")}
          className="mt-8 flex items-center text-center gap-2 text-white hover:text-white font-bold transition-all mx-auto"
        >
          <ArrowLeft size={18} />
          <span>Explore as Guest</span>
        </motion.button>
      </motion.div>

      {/* Footer Text */}
      {/* <div className="absolute bottom-6 left-0 right-0 text-center z-10 hidden md:block">
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
          Trippy Go Private Limited © 2024
        </p>
      </div> */}
    </div>
  );
}
