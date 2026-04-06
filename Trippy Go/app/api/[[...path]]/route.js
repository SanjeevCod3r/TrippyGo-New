export const dynamic = 'force-dynamic'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'
import crypto from 'crypto'

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'voyage-travel-secret-key-2024'

// Admin credentials (hardcoded for MVP)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// MongoDB connection
let client
let db

async function connectToMongo() {
  try {
    if (db) return db;

    if (!client) {
      if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not defined in environment variables");
      }
      client = new MongoClient(process.env.MONGO_URL);
      await client.connect();
      console.log("Successfully connected to MongoDB client");
    }

    db = client.db(process.env.DB_NAME || 'travel_db');
    console.log(`Connected to database: ${process.env.DB_NAME || 'travel_db'}`);
    return db;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// Verify JWT Token
function verifyToken(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  const token = authHeader.split(' ')[1]
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Initialize database with sample data
async function initializeDatabase(db) {
  // Check if already initialized
  const settings = await db.collection('settings').findOne({ id: 'app-settings' })
  if (settings) return

  // Create app settings
  await db.collection('settings').insertOne({
    id: 'app-settings',
    tripTypes: {
      local: { enabled: true, label: 'Local' },
      outstation: { enabled: true, label: 'Outstation' },
      airport: { enabled: true, label: 'Airport' }
    },
    baseFare: 50,
    perKmRate: 12,
    surgePricing: 1.0,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  // Create sample routes
  const routes = [
    { id: uuidv4(), from: 'Mumbai', to: 'Pune', distance: 150, baseFare: 100, perKmRate: 14, enabled: true, createdAt: new Date() },
    { id: uuidv4(), from: 'Delhi', to: 'Agra', distance: 230, baseFare: 120, perKmRate: 13, enabled: true, createdAt: new Date() },
    { id: uuidv4(), from: 'Bangalore', to: 'Mysore', distance: 145, baseFare: 90, perKmRate: 12, enabled: true, createdAt: new Date() },
    { id: uuidv4(), from: 'Chennai', to: 'Pondicherry', distance: 170, baseFare: 95, perKmRate: 11, enabled: true, createdAt: new Date() },
    { id: uuidv4(), from: 'Hyderabad', to: 'Warangal', distance: 150, baseFare: 85, perKmRate: 10, enabled: true, createdAt: new Date() },
    { id: uuidv4(), from: 'Mumbai', to: 'Nashik', distance: 180, baseFare: 110, perKmRate: 13, enabled: true, createdAt: new Date() },
    { id: uuidv4(), from: 'Jaipur', to: 'Udaipur', distance: 400, baseFare: 200, perKmRate: 15, enabled: true, createdAt: new Date() },
    { id: uuidv4(), from: 'Kolkata', to: 'Digha', distance: 185, baseFare: 100, perKmRate: 11, enabled: false, createdAt: new Date() }
  ]
  await db.collection('routes').insertMany(routes)

  // Create sample vehicles
  const vehicles = [
    { id: uuidv4(), name: 'Swift Dzire', type: 'sedan', seating: 4, pricePerKm: 12, pricePerDay: 2500, images: ['https://images.unsplash.com/photo-1580679568899-be51739ba2df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJ8ZW58MHx8fHwxNzc0MzQxMzkyfDA&ixlib=rb-4.1.0&q=85'], enabled: true, description: 'Comfortable sedan perfect for small families', createdAt: new Date() },
    { id: uuidv4(), name: 'Toyota Innova', type: 'suv', seating: 7, pricePerKm: 16, pricePerDay: 4000, images: ['https://images.pexels.com/photos/13554818/pexels-photo-13554818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'], enabled: true, description: 'Spacious SUV for family trips', createdAt: new Date() },
    { id: uuidv4(), name: 'Tempo Traveller', type: 'tempo', seating: 12, pricePerKm: 22, pricePerDay: 6000, images: ['https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJ8ZW58MHx8fHwxNzc0MzQxMzkyfDA&ixlib=rb-4.1.0&q=85'], enabled: true, description: 'Perfect for group travel with AC', createdAt: new Date() },
    { id: uuidv4(), name: 'Luxury Coach', type: 'bus', seating: 35, pricePerKm: 45, pricePerDay: 15000, images: ['https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NzQzNDEzNzZ8MA&ixlib=rb-4.1.0&q=85'], enabled: true, description: 'Luxury AC bus for large groups', createdAt: new Date() },
    { id: uuidv4(), name: 'Mercedes S-Class', type: 'luxury', seating: 4, pricePerKm: 35, pricePerDay: 12000, images: ['https://images.unsplash.com/photo-1580679568899-be51739ba2df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJ8ZW58MHx8fHwxNzc0MzQxMzkyfDA&ixlib=rb-4.1.0&q=85'], enabled: true, description: 'Premium luxury sedan for VIP travel', createdAt: new Date() }
  ]
  await db.collection('vehicles').insertMany(vehicles)

  // Create sample packages
  const packages = [
    {
      id: uuidv4(),
      title: 'Golden Triangle Tour',
      images: ['https://images.unsplash.com/photo-1534695215921-52f8a19e7909?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHw0fHxkZXN0aW5hdGlvbnN8ZW58MHx8fHwxNzc0MzQxMzk4fDA&ixlib=rb-4.1.0&q=85'],
      price: 25000,
      duration: '5 Days / 4 Nights',
      description: 'Experience the best of India with Delhi, Agra, and Jaipur',
      itinerary: ['Day 1: Arrive Delhi, City Tour', 'Day 2: Delhi to Agra, Taj Mahal Visit', 'Day 3: Agra to Jaipur', 'Day 4: Jaipur Sightseeing', 'Day 5: Departure'],
      inclusions: ['Hotel Accommodation', 'Breakfast & Dinner', 'AC Transport', 'Sightseeing', 'Tour Guide'],
      exclusions: ['Airfare', 'Lunch', 'Personal Expenses', 'Entry Tickets'],
      enabled: true,
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Goa Beach Paradise',
      images: ['https://images.unsplash.com/photo-1710915322745-cd5912851417?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxkZXN0aW5hdGlvbnN8ZW58MHx8fHwxNzc0MzQxMzk4fDA&ixlib=rb-4.1.0&q=85'],
      price: 18000,
      duration: '4 Days / 3 Nights',
      description: 'Relax on beautiful beaches of Goa',
      itinerary: ['Day 1: Arrival & North Goa', 'Day 2: South Goa Beaches', 'Day 3: Water Sports & Nightlife', 'Day 4: Departure'],
      inclusions: ['Beach Resort Stay', 'All Meals', 'Airport Transfer', 'Beach Hopping'],
      exclusions: ['Water Sports', 'Personal Expenses', 'Drinks'],
      enabled: true,
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Kerala Backwaters',
      images: ['https://images.pexels.com/photos/346768/pexels-photo-346768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
      price: 32000,
      duration: '6 Days / 5 Nights',
      description: 'Explore Gods Own Country - Kerala',
      itinerary: ['Day 1: Arrive Cochin', 'Day 2: Munnar Hill Station', 'Day 3: Tea Gardens & Waterfalls', 'Day 4: Alleppey Houseboat', 'Day 5: Kovalam Beach', 'Day 6: Departure'],
      inclusions: ['Luxury Hotels', 'Houseboat Stay', 'All Meals', 'AC Vehicle', 'Ayurvedic Spa'],
      exclusions: ['Airfare', 'Tips', 'Personal Shopping'],
      enabled: true,
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Rajasthan Royal Experience',
      images: ['https://images.unsplash.com/photo-1534695215921-52f8a19e7909?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHw0fHxkZXN0aW5hdGlvbnN8ZW58MHx8fHwxNzc0MzQxMzk4fDA&ixlib=rb-4.1.0&q=85'],
      price: 45000,
      duration: '8 Days / 7 Nights',
      description: 'Live like royalty in majestic Rajasthan',
      itinerary: ['Day 1-2: Jaipur', 'Day 3-4: Jodhpur', 'Day 5-6: Udaipur', 'Day 7-8: Jaisalmer Desert'],
      inclusions: ['Heritage Hotels', 'All Meals', 'Camel Safari', 'Cultural Shows', 'Private Guide'],
      exclusions: ['Airfare', 'Camera Fees', 'Shopping'],
      enabled: true,
      createdAt: new Date()
    }
  ]
  await db.collection('packages').insertMany(packages)

  // Create sample blogs
  const blogs = [
    {
      id: uuidv4(),
      title: 'Top 10 Hidden Gems in India for Luxury Travel',
      excerpt: 'Discover the most exquisite and lesser-known destinations that offer world-class luxury experiences...',
      author: 'Rajesh Kumar',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Destinations',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
      featured: true,
      views: 2450,
      tags: ['luxury', 'india', 'hidden gems'],
      content: 'India is a land of diverse cultures, landscapes, and experiences. For those seeking luxury, there are hidden gems that offer unparalleled experiences away from the usual tourist trails...',
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Ultimate Guide to Airport Transfers: What You Need to Know',
      excerpt: 'Everything you need to know about airport transfers, from timing to vehicle selection...',
      author: 'Priya Sharma',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop',
      featured: false,
      views: 1820,
      tags: ['airport', 'transfers', 'guide'],
      content: 'Airport transfers can make or break the beginning of your journey. Planning ahead ensures a smooth, stress-free start. Consider traffic, distance, and the amount of luggage when choosing a vehicle...',
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Mercedes-Benz S-Class vs BMW 7 Series: Which is Better?',
      excerpt: 'A comprehensive comparison of two luxury sedans for your executive travel needs...',
      author: 'Amit Patel',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'Vehicle Reviews',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
      featured: false,
      views: 3200,
      tags: ['luxury', 'comparison', 'sedans'],
      content: 'When it comes to executive travel, the choice often narrows down to the Mercedes-Benz S-Class and the BMW 7 Series. Both offer top-tier luxury, but they excel in different areas...',
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Travel Safety During Monsoon Season: Essential Tips',
      excerpt: 'Stay safe and comfortable while traveling during the rainy season with these expert tips...',
      author: 'Dr. Sunita Rao',
      date: '2024-01-08',
      readTime: '5 min read',
      category: 'Safety',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      featured: false,
      views: 1650,
      tags: ['safety', 'monsoon', 'tips'],
      content: 'Monsoons bring beautiful landscapes but also travel challenges. Pack waterproof gear, stay updated on weather forecasts, and choose reliable transportation that can handle wet conditions safely...',
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'The Future of Transportation: Electric Vehicles in Travel',
      excerpt: 'How electric vehicles are revolutionizing the luxury travel industry...',
      author: 'Vikram Singh',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop',
      featured: false,
      views: 2100,
      tags: ['electric', 'future', 'technology'],
      content: 'The shift towards sustainable travel is accelerating. High-end electric vehicles are offering silent, smooth rides with zero emissions, combining environmental consciousness with premium comfort...',
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Corporate Travel: Making Business Journeys Comfortable',
      excerpt: 'Essential tips for arranging perfect corporate transportation solutions...',
      author: 'Meera Joshi',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
      featured: false,
      views: 1380,
      tags: ['corporate', 'business', 'travel'],
      content: 'Corporate travel demands punctuality, comfort, and reliability. Providing executives with premium travel solutions like luxury sedans with Wi-Fi ensures they arrive at meetings relaxed and prepared...',
      createdAt: new Date()
    }
  ]
  await db.collection('blogs').insertMany(blogs)

  console.log('Database initialized with sample data')
}

let isInitialized = false

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    // connectToMongo sets the global db variable
    await connectToMongo()

    if (!db) {
      throw new Error("Database connection failed: 'db' is undefined")
    }

    if (!isInitialized) {
      await initializeDatabase(db)
      isInitialized = true
    }

    // ==================== AUTH ROUTES ====================

    // POST /api/auth/signup - User Registration
    if (route === '/auth/signup' && method === 'POST') {
      const body = await request.json()
      const { name, email, phone, password } = body

      // Validation
      if (!name || !email || !password) {
        return handleCORS(NextResponse.json(
          { error: 'Name, email, and password are required' },
          { status: 400 }
        ))
      }

      // Check if email already exists
      const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() })
      if (existingUser) {
        return handleCORS(NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        ))
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const newUser = {
        id: uuidv4(),
        name,
        email: email.toLowerCase(),
        phone: phone || '',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date()
      }

      await db.collection('users').insertOne(newUser)

      // Generate token
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: 'user' },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      return handleCORS(NextResponse.json({
        success: true,
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, role: 'user' }
      }))
    }

    // POST /api/auth/login - User & Admin Login
    if (route === '/auth/login' && method === 'POST') {
      const body = await request.json()
      const { email, password, username } = body

      // Admin login (backward compatible)
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign(
          { username, role: 'admin' },
          JWT_SECRET,
          { expiresIn: '24h' }
        )
        return handleCORS(NextResponse.json({
          success: true,
          token,
          user: { username, role: 'admin' }
        }))
      }

      // User login with email
      if (email) {
        const user = await db.collection('users').findOne({ email: email.toLowerCase() })

        if (!user) {
          return handleCORS(NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
          ))
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
          return handleCORS(NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
          ))
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: '7d' }
        )

        return handleCORS(NextResponse.json({
          success: true,
          token,
          user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
        }))
      }

      return handleCORS(NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      ))
    }

    // GET /api/auth/verify
    if (route === '/auth/verify' && method === 'GET') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        ))
      }
      return handleCORS(NextResponse.json({ valid: true, user }))
    }

    // GET /api/auth/me - Get current user profile
    if (route === '/auth/me' && method === 'GET') {
      const tokenUser = verifyToken(request)
      if (!tokenUser) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      if (tokenUser.role === 'admin') {
        return handleCORS(NextResponse.json({
          user: { username: tokenUser.username, role: 'admin' }
        }))
      }

      const user = await db.collection('users').findOne({ id: tokenUser.id })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }

      const { password, _id, ...userWithoutPassword } = user
      return handleCORS(NextResponse.json({ user: userWithoutPassword }))
    }

    // GET /api/user/bookings - Get user's bookings
    if (route === '/user/bookings' && method === 'GET') {
      const tokenUser = verifyToken(request)
      if (!tokenUser) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const bookings = await db.collection('bookings')
        .find({ userId: tokenUser.id })
        .sort({ createdAt: -1 })
        .toArray()

      const cleanedBookings = bookings.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedBookings))
    }

    // ==================== SETTINGS ROUTES ====================

    // GET /api/settings
    if (route === '/settings' && method === 'GET') {
      const settings = await db.collection('settings').findOne({ id: 'app-settings' })
      return handleCORS(NextResponse.json(settings || {}))
    }

    // PUT /api/settings
    if (route === '/settings' && method === 'PUT') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const body = await request.json()
      const updateData = { ...body, updatedAt: new Date() }
      delete updateData.id
      delete updateData._id

      await db.collection('settings').updateOne(
        { id: 'app-settings' },
        { $set: updateData }
      )

      const updated = await db.collection('settings').findOne({ id: 'app-settings' })
      return handleCORS(NextResponse.json(updated))
    }

    // ==================== ROUTES MANAGEMENT ====================

    // GET /api/routes
    if (route === '/routes' && method === 'GET') {
      const url = new URL(request.url)
      const enabledOnly = url.searchParams.get('enabled') === 'true'

      const filter = enabledOnly ? { enabled: true } : {}
      const routes = await db.collection('routes').find(filter).toArray()
      const cleanedRoutes = routes.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedRoutes))
    }

    // POST /api/routes
    if (route === '/routes' && method === 'POST') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const body = await request.json()
      const newRoute = {
        id: uuidv4(),
        from: body.from,
        to: body.to,
        distance: body.distance || 0,
        baseFare: body.baseFare || 100,
        perKmRate: body.perKmRate || 12,
        enabled: body.enabled !== false,
        createdAt: new Date()
      }

      await db.collection('routes').insertOne(newRoute)
      const { _id, ...cleanRoute } = newRoute
      return handleCORS(NextResponse.json(cleanRoute))
    }

    // PUT /api/routes/:id
    if (route.startsWith('/routes/') && method === 'PUT') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const routeId = path[1]
      const body = await request.json()
      const updateData = { ...body, updatedAt: new Date() }
      delete updateData.id
      delete updateData._id

      await db.collection('routes').updateOne(
        { id: routeId },
        { $set: updateData }
      )

      const updated = await db.collection('routes').findOne({ id: routeId })
      if (!updated) {
        return handleCORS(NextResponse.json({ error: 'Route not found' }, { status: 404 }))
      }
      const { _id, ...cleanRoute } = updated
      return handleCORS(NextResponse.json(cleanRoute))
    }

    // DELETE /api/routes/:id
    if (route.startsWith('/routes/') && method === 'DELETE') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const routeId = path[1]
      const result = await db.collection('routes').deleteOne({ id: routeId })
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Route not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // ==================== VEHICLES (FLEET) MANAGEMENT ====================

    // GET /api/vehicles
    if (route === '/vehicles' && method === 'GET') {
      const url = new URL(request.url)
      const enabledOnly = url.searchParams.get('enabled') === 'true'

      const filter = enabledOnly ? { enabled: true } : {}
      const vehicles = await db.collection('vehicles').find(filter).toArray()
      const cleanedVehicles = vehicles.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedVehicles))
    }

    // GET /api/vehicles/:id
    if (route.startsWith('/vehicles/') && method === 'GET' && path.length === 2) {
      const vehicleId = path[1]
      const vehicle = await db.collection('vehicles').findOne({ id: vehicleId })
      if (!vehicle) {
        return handleCORS(NextResponse.json({ error: 'Vehicle not found' }, { status: 404 }))
      }
      const { _id, ...cleanVehicle } = vehicle
      return handleCORS(NextResponse.json(cleanVehicle))
    }

    // POST /api/vehicles
    if (route === '/vehicles' && method === 'POST') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const body = await request.json()
      const newVehicle = {
        id: uuidv4(),
        name: body.name,
        type: body.type,
        seating: body.seating || 4,
        pricePerKm: body.pricePerKm || 12,
        pricePerDay: body.pricePerDay || 2500,
        images: body.images || [],
        description: body.description || '',
        enabled: body.enabled !== false,
        createdAt: new Date()
      }

      await db.collection('vehicles').insertOne(newVehicle)
      const { _id, ...cleanVehicle } = newVehicle
      return handleCORS(NextResponse.json(cleanVehicle))
    }

    // PUT /api/vehicles/:id
    if (route.startsWith('/vehicles/') && method === 'PUT') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const vehicleId = path[1]
      const body = await request.json()
      const updateData = { ...body, updatedAt: new Date() }
      delete updateData.id
      delete updateData._id

      await db.collection('vehicles').updateOne(
        { id: vehicleId },
        { $set: updateData }
      )

      const updated = await db.collection('vehicles').findOne({ id: vehicleId })
      if (!updated) {
        return handleCORS(NextResponse.json({ error: 'Vehicle not found' }, { status: 404 }))
      }
      const { _id, ...cleanVehicle } = updated
      return handleCORS(NextResponse.json(cleanVehicle))
    }

    // DELETE /api/vehicles/:id
    if (route.startsWith('/vehicles/') && method === 'DELETE') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const vehicleId = path[1]
      const result = await db.collection('vehicles').deleteOne({ id: vehicleId })
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Vehicle not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // ==================== PACKAGES MANAGEMENT ====================

    // GET /api/packages
    if (route === '/packages' && method === 'GET') {
      const url = new URL(request.url)
      const enabledOnly = url.searchParams.get('enabled') === 'true'

      const filter = enabledOnly ? { enabled: true } : {}
      const packages = await db.collection('packages').find(filter).toArray()
      const cleanedPackages = packages.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedPackages))
    }

    // GET /api/packages/:id
    if (route.startsWith('/packages/') && method === 'GET' && path.length === 2) {
      const packageId = path[1]
      const pkg = await db.collection('packages').findOne({ id: packageId })
      if (!pkg) {
        return handleCORS(NextResponse.json({ error: 'Package not found' }, { status: 404 }))
      }
      const { _id, ...cleanPackage } = pkg
      return handleCORS(NextResponse.json(cleanPackage))
    }

    // POST /api/packages
    if (route === '/packages' && method === 'POST') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const body = await request.json()
      const newPackage = {
        id: uuidv4(),
        title: body.title,
        images: body.images || [],
        price: body.price || 0,
        duration: body.duration || '',
        description: body.description || '',
        itinerary: body.itinerary || [],
        inclusions: body.inclusions || [],
        exclusions: body.exclusions || [],
        highlights: body.highlights || [],
        bestTime: body.bestTime || '',
        difficulty: body.difficulty || '',
        maxAltitude: body.maxAltitude || '',
        region: body.region || '',
        type: body.type || '',
        rating: body.rating || 4.5,
        reviews: body.reviews || 0,
        enabled: body.enabled !== false,
        createdAt: new Date()
      }

      await db.collection('packages').insertOne(newPackage)
      const { _id, ...cleanPackage } = newPackage
      return handleCORS(NextResponse.json(cleanPackage))
    }

    // PUT /api/packages/:id
    if (route.startsWith('/packages/') && method === 'PUT') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const packageId = path[1]
      const body = await request.json()
      const updateData = { ...body, updatedAt: new Date() }
      delete updateData.id
      delete updateData._id

      await db.collection('packages').updateOne(
        { id: packageId },
        { $set: updateData }
      )

      const updated = await db.collection('packages').findOne({ id: packageId })
      if (!updated) {
        return handleCORS(NextResponse.json({ error: 'Package not found' }, { status: 404 }))
      }
      const { _id, ...cleanPackage } = updated
      return handleCORS(NextResponse.json(cleanPackage))
    }

    // DELETE /api/packages/:id
    if (route.startsWith('/packages/') && method === 'DELETE') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const packageId = path[1]
      const result = await db.collection('packages').deleteOne({ id: packageId })
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Package not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // ==================== BLOGS MANAGEMENT ====================

    // GET /api/blogs
    if (route === '/blogs' && method === 'GET') {
      const url = new URL(request.url)
      const featuredOnly = url.searchParams.get('featured') === 'true'

      const filter = featuredOnly ? { featured: true } : {}
      const blogs = await db.collection('blogs').find(filter).sort({ createdAt: -1 }).toArray()
      const cleanedBlogs = blogs.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedBlogs))
    }

    // GET /api/blogs/:id
    if (route.startsWith('/blogs/') && method === 'GET' && path.length === 2) {
      const blogId = path[1]
      const blog = await db.collection('blogs').findOne({ id: blogId })
      if (!blog) {
        return handleCORS(NextResponse.json({ error: 'Blog not found' }, { status: 404 }))
      }

      await db.collection('blogs').updateOne({ id: blogId }, { $inc: { views: 1 } })

      const { _id, ...cleanBlog } = blog
      cleanBlog.views = (cleanBlog.views || 0) + 1
      return handleCORS(NextResponse.json(cleanBlog))
    }

    // POST /api/blogs
    if (route === '/blogs' && method === 'POST') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const body = await request.json()
      const newBlog = {
        id: uuidv4(),
        title: body.title || 'Untitled',
        excerpt: body.excerpt || '',
        content: body.content || '',
        author: body.author || 'Trippy Go Team',
        date: body.date || new Date().toISOString().split('T')[0],
        readTime: body.readTime || '5 min read',
        category: body.category || 'Uncategorized',
        image: body.image || '',
        featured: !!body.featured,
        views: 0,
        tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map(t => t.trim()) : []),
        createdAt: new Date()
      }

      await db.collection('blogs').insertOne(newBlog)
      const { _id, ...cleanBlog } = newBlog
      return handleCORS(NextResponse.json(cleanBlog))
    }

    // PUT /api/blogs/:id
    if (route.startsWith('/blogs/') && method === 'PUT') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const blogId = path[1]
      const body = await request.json()
      const updateData = { ...body, updatedAt: new Date() }
      delete updateData.id
      delete updateData._id

      if (typeof updateData.tags === 'string') {
        updateData.tags = updateData.tags.split(',').map(t => t.trim())
      }

      await db.collection('blogs').updateOne(
        { id: blogId },
        { $set: updateData }
      )

      const updated = await db.collection('blogs').findOne({ id: blogId })
      if (!updated) {
        return handleCORS(NextResponse.json({ error: 'Blog not found' }, { status: 404 }))
      }
      const { _id, ...cleanBlog } = updated
      return handleCORS(NextResponse.json(cleanBlog))
    }

    // DELETE /api/blogs/:id
    if (route.startsWith('/blogs/') && method === 'DELETE') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const blogId = path[1]
      const result = await db.collection('blogs').deleteOne({ id: blogId })
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Blog not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // ==================== PRICING ESTIMATION ====================

    // POST /api/pricing/estimate
    if (route === '/pricing/estimate' && method === 'POST') {
      const body = await request.json()
      const { pickup, drop, tripType, vehicleType } = body

      const settings = await db.collection('settings').findOne({ id: 'app-settings' })

      // Check if trip type is enabled
      if (settings?.tripTypes && !settings.tripTypes[tripType]?.enabled) {
        return handleCORS(NextResponse.json(
          { error: 'This trip type is currently not available' },
          { status: 400 }
        ))
      }

      // Try to find specific route pricing
      let routeData = await db.collection('routes').findOne({
        from: { $regex: new RegExp(pickup, 'i') },
        to: { $regex: new RegExp(drop, 'i') },
        enabled: true
      })

      // Also check reverse route
      if (!routeData) {
        routeData = await db.collection('routes').findOne({
          from: { $regex: new RegExp(drop, 'i') },
          to: { $regex: new RegExp(pickup, 'i') },
          enabled: true
        })
      }

      let baseFare = settings?.baseFare || 50
      let perKmRate = settings?.perKmRate || 12
      let distance = 50 // Default estimated distance
      let surgePricing = settings?.surgePricing || 1.0

      if (routeData) {
        baseFare = routeData.baseFare
        perKmRate = routeData.perKmRate
        distance = routeData.distance
      }

      // Adjust for trip type
      let tripMultiplier = 1.0
      if (tripType === 'airport') {
        tripMultiplier = 1.2
      } else if (tripType === 'outstation') {
        tripMultiplier = 1.1
      }

      // Adjust for vehicle type
      let vehicleMultiplier = 1.0
      if (vehicleType === 'suv') {
        vehicleMultiplier = 1.3
      } else if (vehicleType === 'luxury') {
        vehicleMultiplier = 2.0
      } else if (vehicleType === 'tempo') {
        vehicleMultiplier = 1.8
      }

      const totalFare = Math.round((baseFare + (distance * perKmRate)) * tripMultiplier * vehicleMultiplier * surgePricing)

      return handleCORS(NextResponse.json({
        pickup,
        drop,
        tripType,
        vehicleType: vehicleType || 'sedan',
        distance,
        baseFare,
        perKmRate,
        surgePricing,
        tripMultiplier,
        vehicleMultiplier,
        estimatedFare: totalFare,
        routeFound: !!routeData
      }))
    }

    // ==================== BOOKINGS MANAGEMENT ====================

    // GET /api/bookings
    if (route === '/bookings' && method === 'GET') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const url = new URL(request.url)
      const type = url.searchParams.get('type')
      const status = url.searchParams.get('status')
      const date = url.searchParams.get('date')

      const filter = {}
      if (type) filter.type = type
      if (status) filter.status = status
      if (date) {
        const startDate = new Date(date)
        const endDate = new Date(date)
        endDate.setDate(endDate.getDate() + 1)
        filter.createdAt = { $gte: startDate, $lt: endDate }
      }

      const bookings = await db.collection('bookings')
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray()
      const cleanedBookings = bookings.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedBookings))
    }

    // POST /api/bookings
    if (route === '/bookings' && method === 'POST') {
      const body = await request.json()
      const { type, customerName, customerPhone, customerEmail } = body

      // Require login for booking
      const tokenUser = verifyToken(request)
      if (!tokenUser) {
        return handleCORS(NextResponse.json(
          { error: 'Please login to book', requireLogin: true },
          { status: 401 }
        ))
      }

      if (!type || !customerName || !customerPhone) {
        return handleCORS(NextResponse.json(
          { error: 'Missing required fields: type, customerName, customerPhone' },
          { status: 400 }
        ))
      }

      const newBooking = {
        id: uuidv4(),
        type, // 'cab', 'package', 'fleet'
        customerName,
        customerPhone,
        customerEmail: customerEmail || '',
        userId: tokenUser.id,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date(),
        ...body
      }

      await db.collection('bookings').insertOne(newBooking)
      const { _id, ...cleanBooking } = newBooking
      return handleCORS(NextResponse.json(cleanBooking))
    }

    // ==================== PAYMENT ROUTES ====================

    // POST /api/payment/create-order
    if (route === '/payment/create-order' && method === 'POST') {
      const tokenUser = verifyToken(request)
      if (!tokenUser) {
        return handleCORS(NextResponse.json(
          { error: 'Please login to make payment', requireLogin: true },
          { status: 401 }
        ))
      }

      const body = await request.json()
      const { amount, bookingId, bookingType } = body

      if (!amount || amount < 100) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid amount. Minimum amount is ₹1 (100 paise)' },
          { status: 400 }
        ))
      }

      try {
        const order = await razorpay.orders.create({
          amount: Math.round(amount), // Amount in paise
          currency: 'INR',
          receipt: `rcpt_${uuidv4().slice(0, 8)}`,
          notes: {
            bookingId: bookingId || '',
            bookingType: bookingType || '',
            userId: tokenUser.id
          }
        })

        // Store order in database
        await db.collection('payment_orders').insertOne({
          id: uuidv4(),
          razorpayOrderId: order.id,
          amount: amount,
          currency: 'INR',
          bookingId: bookingId || null,
          bookingType: bookingType || null,
          userId: tokenUser.id,
          status: 'created',
          createdAt: new Date()
        })

        return handleCORS(NextResponse.json({
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: process.env.RAZORPAY_KEY_ID
        }))
      } catch (error) {
        console.error('Razorpay order creation error:', error)
        return handleCORS(NextResponse.json(
          { error: 'Failed to create payment order' },
          { status: 500 }
        ))
      }
    }

    // POST /api/payment/verify
    if (route === '/payment/verify' && method === 'POST') {
      const tokenUser = verifyToken(request)
      if (!tokenUser) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const body = await request.json()
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = body

      // Verify signature
      const sign = razorpay_order_id + '|' + razorpay_payment_id
      const expectedSign = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(sign)
        .digest('hex')

      if (expectedSign !== razorpay_signature) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid payment signature' },
          { status: 400 }
        ))
      }

      // Update payment order status
      await db.collection('payment_orders').updateOne(
        { razorpayOrderId: razorpay_order_id },
        {
          $set: {
            status: 'paid',
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            paidAt: new Date()
          }
        }
      )

      // Create the booking with payment info
      if (bookingData) {
        const newBooking = {
          id: uuidv4(),
          ...bookingData,
          userId: tokenUser.id,
          status: 'confirmed',
          paymentStatus: 'paid',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          createdAt: new Date()
        }

        await db.collection('bookings').insertOne(newBooking)
        const { _id, ...cleanBooking } = newBooking

        return handleCORS(NextResponse.json({
          success: true,
          message: 'Payment verified and booking confirmed',
          booking: cleanBooking
        }))
      }

      return handleCORS(NextResponse.json({
        success: true,
        message: 'Payment verified successfully'
      }))
    }

    // PUT /api/bookings/:id
    if (route.startsWith('/bookings/') && method === 'PUT') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const bookingId = path[1]
      const body = await request.json()
      const updateData = { ...body, updatedAt: new Date() }
      delete updateData.id
      delete updateData._id

      await db.collection('bookings').updateOne(
        { id: bookingId },
        { $set: updateData }
      )

      const updated = await db.collection('bookings').findOne({ id: bookingId })
      if (!updated) {
        return handleCORS(NextResponse.json({ error: 'Booking not found' }, { status: 404 }))
      }
      const { _id, ...cleanBooking } = updated
      return handleCORS(NextResponse.json(cleanBooking))
    }

    // ==================== DASHBOARD STATS ====================

    // GET /api/dashboard/stats
    if (route === '/dashboard/stats' && method === 'GET') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const totalBookings = await db.collection('bookings').countDocuments()
      const pendingBookings = await db.collection('bookings').countDocuments({ status: 'pending' })
      const confirmedBookings = await db.collection('bookings').countDocuments({ status: 'confirmed' })
      const cancelledBookings = await db.collection('bookings').countDocuments({ status: 'cancelled' })

      const cabBookings = await db.collection('bookings').countDocuments({ type: 'cab' })
      const packageBookings = await db.collection('bookings').countDocuments({ type: 'package' })
      const fleetBookings = await db.collection('bookings').countDocuments({ type: 'fleet' })

      const activeRoutes = await db.collection('routes').countDocuments({ enabled: true })
      const totalRoutes = await db.collection('routes').countDocuments()

      const activeVehicles = await db.collection('vehicles').countDocuments({ enabled: true })
      const totalVehicles = await db.collection('vehicles').countDocuments()

      const activePackages = await db.collection('packages').countDocuments({ enabled: true })
      const totalPackages = await db.collection('packages').countDocuments()

      const totalVendors = await db.collection('vendors').countDocuments()
      const totalContacts = await db.collection('contacts').countDocuments()

      // Calculate estimated revenue from confirmed bookings
      const confirmedBookingsList = await db.collection('bookings')
        .find({ status: 'confirmed' })
        .toArray()

      const totalRevenue = confirmedBookingsList.reduce((sum, booking) => {
        return sum + (booking.estimatedFare || booking.totalPrice || 0)
      }, 0)

      return handleCORS(NextResponse.json({
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed: confirmedBookings,
          cancelled: cancelledBookings,
          byCab: cabBookings,
          byPackage: packageBookings,
          byFleet: fleetBookings
        },
        routes: {
          total: totalRoutes,
          active: activeRoutes
        },
        vehicles: {
          total: totalVehicles,
          active: activeVehicles
        },
        packages: {
          total: totalPackages,
          active: activePackages
        },
        vendors: totalVendors,
        contacts: totalContacts,
        revenue: totalRevenue
      }))
    }

    // ==================== VENDOR REGISTRATION ====================

    // POST /api/vendor-registration
    if (route === '/vendor-registration' && method === 'POST') {
      const data = await request.json()
      
      const vendor = {
        id: uuidv4(),
        ...data,
        status: 'pending',
        createdAt: new Date()
      }

      await db.collection('vendors').insertOne(vendor)
      return handleCORS(NextResponse.json({ success: true, vendor }))
    }

    // GET /api/admin/vendors
    if (route === '/admin/vendors' && method === 'GET') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const vendors = await db.collection('vendors').find().sort({ createdAt: -1 }).toArray()
      return handleCORS(NextResponse.json(vendors))
    }

    // ==================== CONTACT MESSAGES ====================

    // POST /api/contact
    if (route === '/contact' && method === 'POST') {
      const data = await request.json()
      
      const contact = {
        id: uuidv4(),
        ...data,
        createdAt: new Date()
      }

      await db.collection('contacts').insertOne(contact)
      return handleCORS(NextResponse.json({ success: true, contact }))
    }

    // ==================== ENQUIRIES ====================

    // POST /api/enquiry
    if (route === '/enquiry' && method === 'POST') {
      const data = await request.json()
      
      const enquiry = {
        id: uuidv4(),
        ...data,
        createdAt: new Date()
      }

      await db.collection('enquiries').insertOne(enquiry)
      return handleCORS(NextResponse.json({ success: true, enquiry }))
    }

    // GET /api/admin/contacts
    if (route === '/admin/contacts' && method === 'GET') {
      const user = verifyToken(request)
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const contacts = await db.collection('contacts').find().sort({ createdAt: -1 }).toArray()
      return handleCORS(NextResponse.json(contacts))
    }

    // ==================== DEFAULT ROUTES ====================

    // Root endpoint
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Voyage Travel API v1.0' }))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` },
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute