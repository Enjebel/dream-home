import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties'; // NEW: Inventory Management
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import PropertyDetails from './pages/PropertyDetails';
import Inbox from './pages/Inbox'; 
import InfoPage from './pages/InfoPage'; 
import ProjectDoc from './pages/ProjectDoc'; 

// Context Provider
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans selection:bg-blue-100">
          <Navbar />

          <main className="flex-grow pt-24 pb-12">
            <Routes>
              {/* --- Public Discovery Routes --- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              
              {/* --- Technical Documentation --- */}
              <Route path="/documentation" element={<ProjectDoc />} />

              {/* --- Footer Navigation / Info Pages --- */}
              <Route path="/agents" element={<InfoPage title="Our Agents" content="Meet our global network of certified luxury real estate professionals. Every DreamHome agent is vetted for excellence and market expertise." />} />
              <Route path="/reviews" element={<InfoPage title="Client Reviews" content="Read authentic stories from homeowners and buyers who found their sanctuary through our platform. 4.9/5 average rating based on 2,000+ reviews." />} />
              <Route path="/help" element={<InfoPage title="Help Center" content="Find answers to frequently asked questions about listing properties, secure payments, and tour scheduling." />} />
              <Route path="/terms" element={<InfoPage title="Terms of Service" content="Standard legal guidelines for using the DreamHome marketplace." />} />
              <Route path="/privacy" element={<InfoPage title="Privacy Policy" content="Your data is your own. We use high-level encryption to ensure your personal information remains confidential." />} />
              <Route path="/safety" element={<InfoPage title="Safety Center" content="Luxury meets security. Learn how we verify agents and properties." />} />

              {/* --- Protected Routes (Requires Login) --- */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/my-properties" element={<ProtectedRoute><MyProperties /></ProtectedRoute>} />
              <Route path="/add-property" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
              <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />

              {/* --- 404 Catch-all --- */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                  <h1 className="text-6xl font-black text-gray-200 uppercase tracking-tighter italic">404</h1>
                  <p className="text-gray-500 mt-4 font-black uppercase tracking-[0.2em] text-xs">Lost in the architecture</p>
                  <a href="/" className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition shadow-xl shadow-blue-100">
                    Back to Marketplace
                  </a>
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