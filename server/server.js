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

// 1. CORS Configuration
// Note: Ensure origin matches your frontend URL (Vite default is 5173)
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));

// 2. Body Parsers (FIXED: Stabilized limits for large Base64 image uploads)
// Set to 50mb, which is a safe upper bound for multiple high-res property photos
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- ROUTES ---

// Auth Routes (Login, Register, Profile)
app.use('/api/auth', authRoutes);

// Property Routes (Add, Get, Delete, My-Listings)
app.use('/api/properties', propertyRoutes);

// Root route for server health check
app.get('/', (req, res) => {
  res.send('🏠 Real Estate API is running...');
});

// --- ERROR HANDLING (Optional but recommended) ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📂 Cloudinary Configured: ${process.env.CLOUDINARY_CLOUD_NAME ? 'YES' : 'NO'}`);
});