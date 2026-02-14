import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyDetails from './pages/PropertyDetails';
import CreateListing from './pages/CreateListing';
import Favorites from './pages/Favorites';
import ProjectDoc from './pages/ProjectDoc'; // The new documentation page

// Context Provider
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              
              {/* Project Transparency / Documentation Route */}
              <Route path="/documentation" element={<ProjectDoc />} />

              {/* Protected Routes (Logic handled inside components) */}
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* 404 Fallback */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center h-64">
                  <h1 className="text-4xl font-bold">404</h1>
                  <p>Page Not Found</p>
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