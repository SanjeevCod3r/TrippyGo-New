'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Navigation, LogOut, User, ArrowLeft, Car, Package, Truck,
  MapPin, Calendar, Clock, Phone, Mail, ChevronRight
} from 'lucide-react'

export default function MyBookingsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('userToken')
    const userData = localStorage.getItem('userData')

    if (!token) {
      router.push('/auth')
      return
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userData')
        router.push('/auth')
        return
      }

      const data = await res.json()
      setUser(data.user)
      fetchBookings(token)
    } catch (error) {
      console.error('Auth check failed:', error)
      if (userData) {
        setUser(JSON.parse(userData))
        fetchBookings(token)
      } else {
        router.push('/auth')
      }
    }
  }

  const fetchBookings = async (token) => {
    try {
      const res = await fetch('/api/user/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        const data = await res.json()
        setBookings(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    toast.success('Logged out successfully')
    router.push('/')
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const typeIcons = {
    cab: Car,
    package: Package,
    fleet: Truck
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-primary">Trippy Go</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">{user?.name || user?.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-600">View and track all your travel bookings</p>
          </div>
          <Button onClick={() => router.push('/')}>
            New Booking
          </Button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Yet</h3>
              <p className="text-gray-500 mb-6">Start exploring and book your first trip!</p>
              <Button onClick={() => router.push('/')}>
                Explore Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => {
              const TypeIcon = typeIcons[booking.type] || Car
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Booking Type & Details */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TypeIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="capitalize">{booking.type}</Badge>
                              <Badge className={statusColors[booking.status]}>
                                {booking.status}
                              </Badge>
                            </div>

                            {/* Cab Booking Details */}
                            {booking.type === 'cab' && (
                              <div>
                                <div className="flex items-center gap-2 text-gray-700 font-medium">
                                  <span>{booking.pickup}</span>
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                  <span>{booking.drop}</span>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                  <span className="capitalize">{booking.tripType}</span>
                                  <span className="capitalize">{booking.vehicleType}</span>
                                  {booking.distance && <span>{booking.distance} km</span>}
                                </div>
                              </div>
                            )}

                            {/* Package Booking Details */}
                            {booking.type === 'package' && (
                              <div>
                                <p className="text-gray-700 font-medium">{booking.packageTitle}</p>
                                <p className="text-sm text-gray-500">{booking.duration}</p>
                              </div>
                            )}

                            {/* Fleet Booking Details */}
                            {booking.type === 'fleet' && (
                              <div>
                                <p className="text-gray-700 font-medium">{booking.vehicleName}</p>
                                <p className="text-sm text-gray-500 capitalize">{booking.vehicleType}</p>
                              </div>
                            )}

                            <p className="text-xs text-gray-400 mt-2">
                              Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ₹{(booking.estimatedFare || booking.totalPrice || booking.pricePerDay || 0).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.type === 'fleet' ? 'per day' : 'total'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
