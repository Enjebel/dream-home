import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectDoc from './pages/ProjectDoc'; 
import Favorites from './pages/Favorites';

// FIXED IMPORT: Changed from CreateListing to AddProperty to match your filename
import AddProperty from './pages/AddProperty';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Documentation Route */}
              <Route path="/documentation" element={<ProjectDoc />} />

              {/* Protected User Routes */}
              {/* Updated element to use AddProperty */}
              <Route path="/create-listing" element={<AddProperty />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* 404 Fallback */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center py-20">
                  <h1 className="text-5xl font-bold text-gray-200">404</h1>
                  <p className="text-gray-500 mt-2">Luxury stay not found.</p>
                </div>
              } />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;