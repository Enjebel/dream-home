import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// Ensure these files exist in your client/src/pages folder
import CreateListing from './pages/CreateListing';
import Favorites from './pages/Favorites';
import ProjectDoc from './pages/ProjectDoc'; 

// Context Provider
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Transparency/Documentation Route */}
              <Route path="/documentation" element={<ProjectDoc />} />

              {/* Protected Routes */}
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* 404 Fallback */}
              <Route path="*" element={
                <div className="text-center py-20">
                  <h1 className="text-6xl font-bold text-blue-600">404</h1>
                  <p className="text-xl text-gray-600 mt-4">Oops! This luxury stay doesn't exist.</p>
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