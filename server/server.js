const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --- MIDDLEWARE ---

// 1. CORS Configuration (UPDATED for Production)
// This allows both your local testing and your live Vercel site to talk to this server
app.use(cors({ 
  origin: [
    'http://localhost:5173', 
    'https://dreamhome-lux.vercel.app' 
  ], 
  credentials: true 
}));

// 2. Body Parsers
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- ROUTES ---

// Auth Routes (Login, Register, Profile)
app.use('/api/auth', authRoutes);

// Property Routes (Add, Get, Delete, My-Listings)
app.use('/api/properties', propertyRoutes);

// Root route for server health check (Railway uses this to see if the app is "Live")
app.get('/', (req, res) => {
  res.status(200).send('🏠 Real Estate API is running...');
});

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📂 Cloudinary Configured: ${process.env.CLOUDINARY_CLOUD_NAME ? 'YES' : 'NO'}`);
});