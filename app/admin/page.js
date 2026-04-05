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
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  Car,
  Route,
  BookOpen,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Navigation,
  Menu,
  X,
  Save,
  RefreshCw,
  FileText,
  Mail,
  ArrowRight
} from "lucide-react";

// Auth check hook
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setIsAuthenticated(data.valid);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    router.push("/admin");
  };

  return { isAuthenticated, loading, logout, setIsAuthenticated };
}

// Login Component
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      toast.success("Login successful!");
      onLogin();
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
          alt="Admin Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-2xl p-8 md:p-12 overflow-hidden relative">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#eb662b]/20 blur-2xl rounded-full" />
                <img 
                  src="/asset/logo1.png" 
                  alt="Trippy Go Admin" 
                  className="h-14 w-auto relative z-10 filter drop-shadow-xl"
                />
              </div>
            </div>
            <h1 className="text-[#eb662b]xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
             Admin Panel
            </h1>
            <p className="text-white/60 text-sm font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Authorized Person Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 pl-1">Administrator Identity</Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition-opacity" />
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 pl-12 rounded-2xl focus:ring-0 focus:border-[#eb662b] transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 pl-1">Access Key</Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#eb662b] to-[#ff9b6a] rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition-opacity" />
                <div className="relative">
                  <Settings className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 pl-12 rounded-2xl focus:ring-0 focus:border-[#eb662b] transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#eb662b] hover:bg-[#eb662b]/90 text-white font-black py-7 rounded-2xl shadow-xl shadow-orange-200 transition-all border-none text-lg mt-4 flex items-center justify-center gap-3"
              disabled={loading}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">
              Trippy Go Private Limited © 2026
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ activeTab, setActiveTab, logout }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "packages", label: "Packages", icon: Package },
    { id: "vehicles", label: "Fleet", icon: Car },
    { id: "routes", label: "Routes", icon: Route },
    { id: "vendors", label: "Vendors", icon: Users },
    { id: "contacts", label: "Contacts", icon: Mail },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } min-h-screen flex flex-col`}
    >
      <div className="p-6 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img 
              src="/asset/logo1.png" 
              alt="Logo" 
              className="h-10 w-auto filter brightness-0 invert"
            />
            {/* <span className="font-black text-xs uppercase tracking-widest text-[#0056D2] bg-white px-2 py-1 rounded">Admin</span> */}
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
              activeTab === item.id
                ? "bg-[#eb662b] text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// Dashboard Tab
function DashboardTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Bookings",
      value: stats?.bookings?.total || 0,
      icon: BookOpen,
      color: "bg-orange-500",
      subtext: `${stats?.bookings?.pending || 0} pending`,
    },
    {
      label: "Revenue",
      value: `₹${(stats?.revenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
      subtext: "From confirmed bookings",
    },
    {
      label: "Vendors",
      value: stats?.vendors || 0,
      icon: Users,
      color: "bg-[#eb662b]",
      subtext: "Registered partners",
    },
    {
      label: "Inquiries",
      value: stats?.contacts || 0,
      icon: Mail,
      color: "bg-orange-400",
      subtext: "Contact form messages",
    },
    {
      label: "Active Routes",
      value: `${stats?.routes?.active || 0}/${stats?.routes?.total || 0}`,
      icon: Route,
      color: "bg-[#eb662b]",
      subtext: "Routes enabled",
    },
    {
      label: "Fleet Status",
      value: `${stats?.vehicles?.active || 0}/${stats?.vehicles?.total || 0}`,
      icon: Car,
      color: "bg-orange-500",
      subtext: "Vehicles active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Dashboard</h1>
        <Button variant="outline" size="sm" onClick={fetchStats}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-[#eb662b]xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Booking Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookings by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>Pending</span>
                </div>
                <Badge variant="outline">{stats?.bookings?.pending || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Confirmed</span>
                </div>
                <Badge variant="outline">
                  {stats?.bookings?.confirmed || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Cancelled</span>
                </div>
                <Badge variant="outline">
                  {stats?.bookings?.cancelled || 0}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookings by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#eb662b]" />
                  <span>Cab Bookings</span>
                </div>
                <Badge variant="outline">{stats?.bookings?.byCab || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-500" />
                  <span>Package Bookings</span>
                </div>
                <Badge variant="outline">
                  {stats?.bookings?.byPackage || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-orange-500" />
                  <span>Fleet Bookings</span>
                </div>
                <Badge variant="outline">{stats?.bookings?.byFleet || 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Bookings Tab
function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Booking ${status}`);
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to update booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filterType !== "all" && booking.type !== filterType) return false;
    if (filterStatus !== "all" && booking.status !== filterStatus) return false;
    return true;
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Bookings</h1>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cab">Cab</SelectItem>
              <SelectItem value="package">Package</SelectItem>
              <SelectItem value="fleet">Fleet</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-700 whitespace-nowrap">Customer</TableHead>
                <TableHead className="font-bold text-gray-700">Type</TableHead>
                <TableHead className="font-bold text-gray-700">Route / Vehicle</TableHead>
                <TableHead className="font-bold text-gray-700">Schedule</TableHead>
                <TableHead className="font-bold text-gray-700">Amount</TableHead>
                <TableHead className="font-bold text-gray-700">Status</TableHead>
                <TableHead className="font-bold text-gray-700 whitespace-nowrap">Booked On</TableHead>
                <TableHead className="font-bold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-gray-50 align-top">

                    {/* ── Customer ── */}
                    <TableCell className="min-w-[160px]">
                      <p className="font-semibold text-gray-900">{booking.customerName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{booking.customerPhone}</p>
                      {booking.customerEmail && (
                        <p className="text-xs text-[#eb662b] mt-0.5 break-all">{booking.customerEmail}</p>
                      )}
                    </TableCell>

                    {/* ── Type ── */}
                    <TableCell>
                      <Badge variant="outline" className={`capitalize font-semibold ${
                        booking.type === 'cab' ? 'bg-orange-50 text-[#eb662b] border-orange-200' :
                        booking.type === 'fleet' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {booking.type}
                      </Badge>
                      {booking.type === 'cab' && booking.serviceType && (
                        <p className="text-[10px] text-gray-400 mt-1 capitalize">{booking.serviceType}{booking.tripType ? ` · ${booking.tripType}` : ''}</p>
                      )}
                    </TableCell>

                    {/* ── Route / Vehicle ── */}
                    <TableCell className="min-w-[200px]">
                      {booking.type === 'cab' && (
                        <div className="text-sm space-y-0.5">
                          <p className="font-medium text-gray-800">
                            <span className="text-green-600">●</span> {booking.pickup || '—'}
                          </p>
                          <p className="font-medium text-gray-800">
                            <span className="text-red-500">●</span> {booking.drop || 'Local'}
                          </p>
                          {booking.vehicleType && <p className="text-xs text-gray-400">Car: {booking.vehicleType}</p>}
                          {booking.distance && <p className="text-xs text-gray-400">{Number(booking.distance).toFixed(1)} km · {booking.duration}</p>}
                          {booking.localPackage && <p className="text-xs text-gray-400">Pkg: {booking.localPackage}</p>}
                          {booking.airportDirection && <p className="text-xs text-gray-400 capitalize">Dir: {booking.airportDirection} airport</p>}
                        </div>
                      )}
                      {booking.type === 'fleet' && (
                        <div className="text-sm space-y-0.5">
                          <p className="font-semibold text-gray-900">{booking.vehicleName}</p>
                          {booking.vehicleType && <p className="text-xs text-gray-400 capitalize">{booking.vehicleType}</p>}
                          <p className="text-xs text-gray-700 mt-1">
                            <span className="text-green-600 font-semibold">↑</span> {booking.pickupLocation || '—'}
                          </p>
                          <p className="text-xs text-gray-700">
                            <span className="text-red-500 font-semibold">↓</span> {booking.dropLocation || '—'}
                          </p>
                          {booking.customerAddress && (
                            <p className="text-xs text-gray-400">Addr: {booking.customerAddress}</p>
                          )}
                        </div>
                      )}
                      {booking.type === 'package' && (
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">{booking.packageTitle || '—'}</p>
                        </div>
                      )}
                    </TableCell>

                    {/* ── Schedule ── */}
                    <TableCell className="min-w-[140px]">
                      {booking.type === 'cab' && (
                        <div className="text-xs space-y-0.5 text-gray-700">
                          {booking.date && <p><span className="font-semibold text-gray-500">Date:</span> {booking.date}</p>}
                          {booking.time && <p><span className="font-semibold text-gray-500">Time:</span> {booking.time}</p>}
                          {booking.returnDate && (
                            <>
                              <p className="text-gray-400 mt-1 font-semibold">Return</p>
                              <p><span className="font-semibold text-gray-500">Date:</span> {booking.returnDate}</p>
                              {booking.returnTime && <p><span className="font-semibold text-gray-500">Time:</span> {booking.returnTime}</p>}
                            </>
                          )}
                        </div>
                      )}
                      {booking.type === 'fleet' && (
                        <div className="text-xs space-y-0.5 text-gray-700">
                          {booking.startDate && <p><span className="font-semibold text-gray-500">From:</span> {booking.startDate}</p>}
                          {booking.endDate && <p><span className="font-semibold text-gray-500">To:</span> {booking.endDate}</p>}
                          {booking.days && <p><span className="font-semibold text-gray-500">Days:</span> {booking.days}</p>}
                        </div>
                      )}
                      {booking.type === 'package' && (
                        <div className="text-xs space-y-0.5 text-gray-700">
                          {booking.travelDate && <p><span className="font-semibold text-gray-500">Date:</span> {booking.travelDate}</p>}
                          {booking.travelers && <p><span className="font-semibold text-gray-500">Travelers:</span> {booking.travelers}</p>}
                          {!booking.travelDate && !booking.travelers && <span className="text-gray-400">—</span>}
                        </div>
                      )}
                    </TableCell>

                    {/* ── Amount ── */}
                    <TableCell className="whitespace-nowrap">
                      <p className="font-bold text-[#0056D2] text-sm">
                        ₹{(booking.estimatedFare || booking.totalPrice || 0).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {booking.paymentStatus === 'paid' ? '✓ Paid' : 'Unpaid'}
                      </p>
                    </TableCell>

                    {/* ── Status ── */}
                    <TableCell>
                      <Badge className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                    </TableCell>

                    {/* ── Booked On ── */}
                    <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </TableCell>

                    {/* ── Actions ── */}
                    <TableCell>
                      <div className="flex gap-1">
                        {booking.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:bg-green-50"
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>

      </Card>
    </div>
  );
}

// Packages Tab
function PackagesTab() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    images: "",
    itinerary: "",
    inclusions: "",
    exclusions: "",
    highlights: "",
    bestTime: "",
    difficulty: "Easy",
    maxAltitude: "",
    region: "north",
    type: "holidays",
    enabled: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const packageData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      duration: formData.duration,
      images: formData.images.split("\n").filter(Boolean),
      itinerary: formData.itinerary.split("\n").filter(Boolean),
      inclusions: formData.inclusions.split("\n").filter(Boolean),
      exclusions: formData.exclusions.split("\n").filter(Boolean),
      highlights: formData.highlights.split("\n").filter(Boolean),
      bestTime: formData.bestTime,
      difficulty: formData.difficulty,
      maxAltitude: formData.maxAltitude,
      region: formData.region,
      type: formData.type,
      enabled: formData.enabled,
    };

    try {
      const url = editingPackage
        ? `/api/packages/${editingPackage.id}`
        : "/api/packages";
      const method = editingPackage ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(packageData),
      });

      if (res.ok) {
        toast.success(editingPackage ? "Package updated!" : "Package created!");
        setShowModal(false);
        resetForm();
        fetchPackages();
      }
    } catch (error) {
      toast.error("Failed to save package");
    }
  };

  const handleDelete = async (packageId) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/packages/${packageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Package deleted!");
        fetchPackages();
      }
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  const toggleEnabled = async (pkg) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/packages/${pkg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !pkg.enabled }),
      });

      if (res.ok) {
        toast.success(`Package ${!pkg.enabled ? "enabled" : "disabled"}`);
        fetchPackages();
      }
    } catch (error) {
      toast.error("Failed to update package");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      images: "",
      itinerary: "",
      inclusions: "",
      exclusions: "",
      highlights: "",
      bestTime: "",
      difficulty: "Easy",
      maxAltitude: "",
      region: "north",
      type: "holidays",
      enabled: true,
    });
    setEditingPackage(null);
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration,
      images: pkg.images?.join("\n") || "",
      itinerary: pkg.itinerary?.join("\n") || "",
      inclusions: pkg.inclusions?.join("\n") || "",
      exclusions: pkg.exclusions?.join("\n") || "",
      highlights: pkg.highlights?.join("\n") || "",
      bestTime: pkg.bestTime || "",
      difficulty: pkg.difficulty || "Easy",
      maxAltitude: pkg.maxAltitude || "",
      region: pkg.region || "north",
      type: pkg.type || "holidays",
      enabled: pkg.enabled,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Travel Packages</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Package
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={!pkg.enabled ? "opacity-60" : ""}>
            <div className="h-40 overflow-hidden">
              <img
                src={pkg.images?.[0] || "https://via.placeholder.com/300"}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{pkg.title}</h3>
                <Switch
                  checked={pkg.enabled}
                  onCheckedChange={() => toggleEnabled(pkg)}
                />
              </div>
              <p className="text-sm text-gray-500 mb-2">{pkg.duration}</p>
              <p className="text-lg font-bold text-primary mb-4">
                ₹{pkg.price?.toLocaleString()}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditModal(pkg)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600"
                  onClick={() => handleDelete(pkg.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? "Edit Package" : "Add Package"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="5 Days / 4 Nights"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Image URLs (one per line)</Label>
              <Textarea
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
                rows={2}
                placeholder="https://example.com/image1.jpg"
              />
            </div>
            <div>
              <Label>Itinerary (one per line)</Label>
              <Textarea
                value={formData.itinerary}
                onChange={(e) =>
                  setFormData({ ...formData, itinerary: e.target.value })
                }
                rows={3}
                placeholder="Day 1: Arrival"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Inclusions (one per line)</Label>
                <Textarea
                  value={formData.inclusions}
                  onChange={(e) =>
                    setFormData({ ...formData, inclusions: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Exclusions (one per line)</Label>
                <Textarea
                  value={formData.exclusions}
                  onChange={(e) =>
                    setFormData({ ...formData, exclusions: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
            <div>
              <Label>Highlights (one per line)</Label>
              <Textarea
                value={formData.highlights}
                onChange={(e) =>
                  setFormData({ ...formData, highlights: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(v) => setFormData({ ...formData, region: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North India</SelectItem>
                    <SelectItem value="south">South India</SelectItem>
                    <SelectItem value="east">East India</SelectItem>
                    <SelectItem value="west">West India</SelectItem>
                    <SelectItem value="central">Central India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="holidays">Holiday Packages</SelectItem>
                    <SelectItem value="hill-station">Hill Stations</SelectItem>
                    <SelectItem value="trekking">Trekking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Best Time</Label>
                <Input
                  value={formData.bestTime}
                  onChange={(e) =>
                    setFormData({ ...formData, bestTime: e.target.value })
                  }
                  placeholder="e.g. October - March"
                />
              </div>
              <div>
                <Label>Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(v) => setFormData({ ...formData, difficulty: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Max Altitude</Label>
                <Input
                  value={formData.maxAltitude}
                  onChange={(e) =>
                    setFormData({ ...formData, maxAltitude: e.target.value })
                  }
                  placeholder="e.g. 4000m or N/A"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
              <Label>Enabled</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Vehicles Tab
function VehiclesTab() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "sedan",
    seating: "",
    pricePerKm: "",
    pricePerDay: "",
    description: "",
    images: "",
    enabled: true,
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const vehicleData = {
      name: formData.name,
      type: formData.type,
      seating: parseInt(formData.seating) || 4,
      pricePerKm: parseFloat(formData.pricePerKm) || 12,
      pricePerDay: parseFloat(formData.pricePerDay) || 2500,
      description: formData.description,
      images: formData.images.split("\n").filter(Boolean),
      enabled: formData.enabled,
    };

    try {
      const url = editingVehicle
        ? `/api/vehicles/${editingVehicle.id}`
        : "/api/vehicles";
      const method = editingVehicle ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicleData),
      });

      if (res.ok) {
        toast.success(editingVehicle ? "Vehicle updated!" : "Vehicle added!");
        setShowModal(false);
        resetForm();
        fetchVehicles();
      }
    } catch (error) {
      toast.error("Failed to save vehicle");
    }
  };

  const handleDelete = async (vehicleId) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/vehicles/${vehicleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Vehicle deleted!");
        fetchVehicles();
      }
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
  };

  const toggleEnabled = async (vehicle) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !vehicle.enabled }),
      });

      if (res.ok) {
        toast.success(`Vehicle ${!vehicle.enabled ? "enabled" : "disabled"}`);
        fetchVehicles();
      }
    } catch (error) {
      toast.error("Failed to update vehicle");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "sedan",
      seating: "",
      pricePerKm: "",
      pricePerDay: "",
      description: "",
      images: "",
      enabled: true,
    });
    setEditingVehicle(null);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      seating: vehicle.seating.toString(),
      pricePerKm: vehicle.pricePerKm.toString(),
      pricePerDay: vehicle.pricePerDay.toString(),
      description: vehicle.description,
      images: vehicle.images?.join("\n") || "",
      enabled: vehicle.enabled,
    });
    setShowModal(true);
  };

  const vehicleTypeLabels = {
    sedan: "Sedan",
    suv: "SUV",
    tempo: "Tempo Traveller",
    bus: "Bus",
    luxury: "Luxury",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Fleet Vehicles</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Seating</TableHead>
                <TableHead>Price/km</TableHead>
                <TableHead>Price/day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  className={!vehicle.enabled ? "opacity-60" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          vehicle.images?.[0] ||
                          "https://via.placeholder.com/50"
                        }
                        alt={vehicle.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{vehicle.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {vehicle.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {vehicleTypeLabels[vehicle.type] || vehicle.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{vehicle.seating} seats</TableCell>
                  <TableCell>₹{vehicle.pricePerKm}</TableCell>
                  <TableCell>
                    ₹{vehicle.pricePerDay?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={vehicle.enabled}
                      onCheckedChange={() => toggleEnabled(vehicle)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(vehicle)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Vehicle Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="tempo">Tempo Traveller</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Seating Capacity</Label>
                <Input
                  type="number"
                  value={formData.seating}
                  onChange={(e) =>
                    setFormData({ ...formData, seating: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price per km (₹)</Label>
                <Input
                  type="number"
                  value={formData.pricePerKm}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerKm: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Price per day (₹)</Label>
                <Input
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerDay: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div>
              <Label>Image URLs (one per line)</Label>
              <Textarea
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
              <Label>Enabled</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Routes Tab
function RoutesTab() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    distance: "",
    baseFare: "",
    perKmRate: "",
    enabled: true,
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await fetch("/api/routes");
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const routeData = {
      from: formData.from,
      to: formData.to,
      distance: parseFloat(formData.distance) || 0,
      baseFare: parseFloat(formData.baseFare) || 100,
      perKmRate: parseFloat(formData.perKmRate) || 12,
      enabled: formData.enabled,
    };

    try {
      const url = editingRoute
        ? `/api/routes/${editingRoute.id}`
        : "/api/routes";
      const method = editingRoute ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(routeData),
      });

      if (res.ok) {
        toast.success(editingRoute ? "Route updated!" : "Route added!");
        setShowModal(false);
        resetForm();
        fetchRoutes();
      }
    } catch (error) {
      toast.error("Failed to save route");
    }
  };

  const handleDelete = async (routeId) => {
    if (!confirm("Are you sure you want to delete this route?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/routes/${routeId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Route deleted!");
        fetchRoutes();
      }
    } catch (error) {
      toast.error("Failed to delete route");
    }
  };

  const toggleEnabled = async (route) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/routes/${route.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !route.enabled }),
      });

      if (res.ok) {
        toast.success(`Route ${!route.enabled ? "enabled" : "disabled"}`);
        fetchRoutes();
      }
    } catch (error) {
      toast.error("Failed to update route");
    }
  };

  const resetForm = () => {
    setFormData({
      from: "",
      to: "",
      distance: "",
      baseFare: "",
      perKmRate: "",
      enabled: true,
    });
    setEditingRoute(null);
  };

  const openEditModal = (route) => {
    setEditingRoute(route);
    setFormData({
      from: route.from,
      to: route.to,
      distance: route.distance.toString(),
      baseFare: route.baseFare.toString(),
      perKmRate: route.perKmRate.toString(),
      enabled: route.enabled,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Route Management</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Route
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Base Fare</TableHead>
                <TableHead>Per KM Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow
                  key={route.id}
                  className={!route.enabled ? "opacity-60" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{route.from}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{route.to}</span>
                    </div>
                  </TableCell>
                  <TableCell>{route.distance} km</TableCell>
                  <TableCell>₹{route.baseFare}</TableCell>
                  <TableCell>₹{route.perKmRate}/km</TableCell>
                  <TableCell>
                    <Switch
                      checked={route.enabled}
                      onCheckedChange={() => toggleEnabled(route)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(route)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleDelete(route.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingRoute ? "Edit Route" : "Add Route"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>From (City)</Label>
                <Input
                  value={formData.from}
                  onChange={(e) =>
                    setFormData({ ...formData, from: e.target.value })
                  }
                  placeholder="Mumbai"
                  required
                />
              </div>
              <div>
                <Label>To (City)</Label>
                <Input
                  value={formData.to}
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                  placeholder="Pune"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Distance (km)</Label>
              <Input
                type="number"
                value={formData.distance}
                onChange={(e) =>
                  setFormData({ ...formData, distance: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Base Fare (₹)</Label>
                <Input
                  type="number"
                  value={formData.baseFare}
                  onChange={(e) =>
                    setFormData({ ...formData, baseFare: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Per KM Rate (₹)</Label>
                <Input
                  type="number"
                  value={formData.perKmRate}
                  onChange={(e) =>
                    setFormData({ ...formData, perKmRate: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
              <Label>Enabled</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    const token = localStorage.getItem("adminToken");
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Settings saved!");
        fetchSettings();
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateTripType = (type, enabled) => {
    setSettings({
      ...settings,
      tripTypes: {
        ...settings.tripTypes,
        [type]: { ...settings.tripTypes[type], enabled },
      },
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Settings</h1>
        <Button onClick={saveSettings} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pricing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Default Pricing</CardTitle>
            <CardDescription>
              Set default rates for cab bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Base Fare (₹)</Label>
              <Input
                type="number"
                value={settings?.baseFare || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    baseFare: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Per KM Rate (₹)</Label>
              <Input
                type="number"
                value={settings?.perKmRate || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    perKmRate: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Surge Pricing Multiplier</Label>
              <Input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={settings?.surgePricing || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    surgePricing: parseFloat(e.target.value),
                  })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                1.0 = Normal, 1.5 = 50% surge, 2.0 = 100% surge
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trip Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trip Types</CardTitle>
            <CardDescription>Enable or disable trip types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Local</p>
                <p className="text-sm text-gray-500">Within city trips</p>
              </div>
              <Switch
                checked={settings?.tripTypes?.local?.enabled}
                onCheckedChange={(checked) => updateTripType("local", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Outstation</p>
                <p className="text-sm text-gray-500">City to city trips</p>
              </div>
              <Switch
                checked={settings?.tripTypes?.outstation?.enabled}
                onCheckedChange={(checked) =>
                  updateTripType("outstation", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Airport</p>
                <p className="text-sm text-gray-500">Airport transfers</p>
              </div>
              <Switch
                checked={settings?.tripTypes?.airport?.enabled}
                onCheckedChange={(checked) =>
                  updateTripType("airport", checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Blog Tab
function BlogTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: "",
    tags: "",
    readTime: "",
    featured: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    try {
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : "/api/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        toast.success(editingBlog ? "Blog updated!" : "Blog created!");
        setShowModal(false);
        resetForm();
        fetchBlogs();
      } else {
        toast.error("Failed to save blog");
      }
    } catch (error) {
      toast.error("Failed to save blog");
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Blog deleted!");
        fetchBlogs();
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const toggleFeatured = async (blog) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featured: !blog.featured }),
      });

      if (res.ok) {
        toast.success(`Blog ${!blog.featured ? "featured" : "unfeatured"}`);
        fetchBlogs();
      }
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      image: "",
      tags: "",
      readTime: "",
      featured: false,
    });
    setEditingBlog(null);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      image: blog.image,
      tags: blog.tags?.join(", ") || "",
      readTime: blog.readTime,
      featured: blog.featured,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Blog Posts</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <div className="h-40 overflow-hidden relative">
              <img
                src={blog.image || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              {blog.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold line-clamp-1">{blog.title}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {blog.category} • {blog.readTime}
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {blog.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={blog.featured}
                    onCheckedChange={() => toggleFeatured(blog)}
                  />
                  <span className="text-xs text-gray-500">Feature</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditModal(blog)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Post" : "Add Post"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="E.g., Travel Tips"
                  required
                />
              </div>
              <div>
                <Label>Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={2}
                required
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                required
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="luxury, travel, guide"
                />
              </div>
              <div>
                <Label>Read Time</Label>
                <Input
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readTime: e.target.value })
                  }
                  placeholder="5 min read"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
              <Label>Featured Post</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Vendors Tab
function VendorsTab() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/admin/vendors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Vendor Registrations</h1>
        <Button variant="outline" size="sm" onClick={fetchVendors}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Details</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Vehicles</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Exp</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : vendors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No vendors found
                  </TableCell>
                </TableRow>
              ) : (
                vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-gray-500">{vendor.email}</p>
                        <p className="text-xs text-gray-400">{vendor.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{vendor.companyName}</TableCell>
                    <TableCell>
                      <div className="text-sm max-w-[200px] truncate" title={vendor.vehicleTypes}>
                        {vendor.vehicleTypes}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{vendor.city}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{vendor.experience}y</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(vendor.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Contacts Tab
function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#eb662b]xl font-bold">Contact Inquiries</h1>
        <Button variant="outline" size="sm" onClick={fetchContacts}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Inquiry</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : contacts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    No messages found
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                        <p className="text-xs text-gray-400">{contact.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{contact.service || "General"}</p>
                        {contact.company && (
                          <p className="text-xs text-gray-500">{contact.company}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-3" title={contact.message}>
                        {contact.message}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Admin Component
export default function AdminPage() {
  const { isAuthenticated, loading, logout, setIsAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "bookings":
        return <BookingsTab />;
      case "packages":
        return <PackagesTab />;
      case "vehicles":
        return <VehiclesTab />;
      case "routes":
        return <RoutesTab />;
      case "settings":
        return <SettingsTab />;
      case "blog":
        return <BlogTab />;
      case "vendors":
        return <VendorsTab />;
      case "contacts":
        return <ContactsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logout={logout}
      />
      <main className="flex-1 p-6 overflow-auto">{renderTab()}</main>
    </div>
  );
}
