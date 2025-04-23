import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Activity, Map, Utensils, Bell, FileText, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout, currentPet } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Protected routes that require authentication
  const protectedRoutes = [
    '/profile', 
    '/monitoring', 
    '/tracking', 
    '/diet', 
    '/emergency', 
    '/reports', 
    '/alerts'
  ];

  // Check if current route is protected and user is not authenticated
  if (protectedRoutes.some(route => location.pathname.startsWith(route)) && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8" />
            <span className="text-xl font-bold">PetHealth Monitor</span>
          </Link>
          
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm">
                {currentPet ? `${currentPet.name} (${currentPet.type})` : 'No pet selected'}
              </span>
              <button 
                onClick={logout}
                className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded-md transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md font-medium transition">
                Login
              </Link>
              <Link to="/signup" className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md font-medium transition">
                Sign Up
              </Link>
            </div>
          )}
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-indigo-700 px-4 py-2">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link to="/profile" className="text-white py-2 flex items-center space-x-2" onClick={toggleMobileMenu}>
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link to="/monitoring" className="text-white py-2 flex items-center space-x-2" onClick={toggleMobileMenu}>
                  <Activity className="h-5 w-5" />
                  <span>Monitoring</span>
                </Link>
                <Link to="/tracking" className="text-white py-2 flex items-center space-x-2" onClick={toggleMobileMenu}>
                  <Map className="h-5 w-5" />
                  <span>Tracking</span>
                </Link>
                <Link to="/diet" className="text-white py-2 flex items-center space-x-2" onClick={toggleMobileMenu}>
                  <Utensils className="h-5 w-5" />
                  <span>Diet</span>
                </Link>
                <Link to="/emergency" className="text-white py-2 flex items-center space-x-2" onClick={toggleMobileMenu}>
                  <Bell className="h-5 w-5" />
                  <span>Emergency</span>
                </Link>
                <Link to="/reports" className="text-white py-2 flex items-center space-x-2" onClick={toggleMobileMenu}>
                  <FileText className="h-5 w-5" />
                  <span>Reports</span>
                </Link>
                <Link to="/alerts" className="text-white py-2 flex items-center space-x-2" onClick={toggleMobileMenu}>
                  <Bell className="h-5 w-5" />
                  <span>Alert History</span>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="text-white py-2 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 py-2">
                <Link to="/login" className="text-white py-2" onClick={toggleMobileMenu}>
                  Login
                </Link>
                <Link to="/signup" className="text-white py-2" onClick={toggleMobileMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - only show when authenticated */}
        {isAuthenticated && (
          <aside className="hidden md:block w-64 bg-white shadow-md">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/profile" 
                    className={`flex items-center space-x-3 p-3 rounded-md transition ${
                      location.pathname === '/profile' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/monitoring" 
                    className={`flex items-center space-x-3 p-3 rounded-md transition ${
                      location.pathname === '/monitoring' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Activity className="h-5 w-5" />
                    <span>Monitoring</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tracking" 
                    className={`flex items-center space-x-3 p-3 rounded-md transition ${
                      location.pathname === '/tracking' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Map className="h-5 w-5" />
                    <span>Tracking</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/diet" 
                    className={`flex items-center space-x-3 p-3 rounded-md transition ${
                      location.pathname === '/diet' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Utensils className="h-5 w-5" />
                    <span>Diet Recommendations</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/emergency" 
                    className={`flex items-center space-x-3 p-3 rounded-md transition ${
                      location.pathname === '/emergency' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    <span>Emergency</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reports" 
                    className={`flex items-center space-x-3 p-3 rounded-md transition ${
                      location.pathname === '/reports' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Health Reports</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/alerts" 
                    className={`flex items-center space-x-3 p-3 rounded-md transition ${
                      location.pathname === '/alerts' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    <span>Alert History</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">PetHealth Monitor</h3>
              <p className="text-gray-300 text-sm">
                Comprehensive health monitoring for your beloved pets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <address className="text-sm text-gray-300 not-italic">
                <p>123 Pet Street</p>
                <p>Greater Noida, Uttar Pradesh, India</p>
                <p className="mt-2">Email: info@pethealth.com</p>
                <p>Phone: 982180xxxxx</p>
              </address>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
              <p className="text-sm text-gray-300 mb-2">
                Stay updated with our latest news and updates.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-sm text-gray-900 rounded-l-md focus:outline-none"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-r-md text-sm transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} PetHealth Monitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;