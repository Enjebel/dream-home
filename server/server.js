const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Load variables immediately
dotenv.config();

// 2. Import local files
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes'); // NEW: Import Inquiry logic

// 3. Connect to Database
connectDB();

const app = express();

// --- MIDDLEWARE ---
app.use(cors({ 
  origin: [
    process.env.CLIENT_URL,
    'https://dreamhome-lux.vercel.app',
    'http://localhost:5173'
  ].filter(Boolean), 
  credentials: true 
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes); // NEW: Mount Inquiry routes

// Health Check for Railway
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
  console.log(`✅ MONGO_URI detected: ${process.env.MONGO_URI ? 'YES' : 'NO'}`);
  console.log(`🔗 Permitted Client URL: ${process.env.CLIENT_URL || 'Not set'}`);
  console.log(`💬 Inquiry System: ACTIVE`); // Confirmation log
});