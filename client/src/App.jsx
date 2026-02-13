import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProperty from './pages/AddProperty';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans selection:bg-blue-100">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Wrapper */}
      <main className="flex-grow pt-24 pb-12">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/add-property" 
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            } 
          />

          {/* 404 Catch-all */}
          <Route 
            path="*" 
            element={
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h1 className="text-6xl font-black text-gray-200">404</h1>
                <p className="text-gray-500 mt-4">Page not found</p>
                <a href="/" className="mt-6 text-blue-600 font-bold">Return Home</a>
              </div>
            } 
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;