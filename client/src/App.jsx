import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import Favorites from './pages/Favorites';
// This import must match the filename in your /pages folder exactly
import ProjectDoc from './pages/ProjectDoc'; 

// Context Provider
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Discovery Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Documentation / Portfolio Page */}
              <Route path="/documentation" element={<ProjectDoc />} />

              {/* Protected User Features */}
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* 404 Custom Fallback */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center py-20">
                  <h1 className="text-5xl font-bold text-gray-200">404</h1>
                  <p className="text-gray-500 mt-2">We couldn't find that luxury stay.</p>
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