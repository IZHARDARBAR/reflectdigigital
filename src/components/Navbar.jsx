import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ onSupportClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Check login status on component mount and when storage changes
  useEffect(() => {
    checkLoginStatus();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleProfileHover = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Hover pe dropdown show hoga
    setIsProfileDropdownOpen(true);
  };

  const handleProfileLeave = () => {
    // Mouse leave pe timeout set karenge
    timeoutRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
    }, 200);
  };

  const handleDropdownHover = () => {
    // Dropdown pe hover pe timeout clear karenge
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    // Dropdown se leave pe hide karenge
    timeoutRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
    }, 200);
  };

  const handleProfileClick = (e) => {
    // Click pe dropdown show nahi hoga, direct profile page pe jayega
    setIsProfileDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    // Logout button click pe confirmation dialog show karega
    setShowLogoutConfirm(true);
    setIsProfileDropdownOpen(false);
  };

  const handleLogoutConfirm = () => {
    // Yes click karne pe logout hoga
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    window.location.href = "/"; // Home page pe redirect
  };

  const handleLogoutCancel = () => {
    // No click karne pe dialog close hoga
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full px-4 sm:px-6 lg:px-10 py-4 sm:py-6 z-50 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold lg:ml-15 text-white drop-shadow-7xl">
            <Link to="/" onClick={closeMenu}>
              <img 
                src="/Navlogo.png" 
                alt="Logo" 
                className="w-[120px] sm:w-[140px] lg:w-[160px]" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-12 xl:gap-20 pr-10 text-lg items-center">
            {/* Common links for both logged in and out */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-pink-500 font-semibold"
                  : "text-white font-bold hover:text-pink-400 transition-colors duration-300"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-pink-500 font-semibold"
                  : "text-white font-bold hover:text-pink-400 transition-colors duration-300"
              }
            >
              About
            </NavLink>

            {/* Show Events and Rewards only when logged in */}
            {isLoggedIn && (
              <>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-500 font-semibold"
                      : "text-white font-bold hover:text-pink-400 transition-colors duration-300"
                  }
                >
                  Events
                </NavLink>

                <NavLink
                  to="/rewards"
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-500 font-semibold"
                      : "text-white font-bold hover:text-pink-400 transition-colors duration-300"
                  }
                >
                  Rewards
                </NavLink>
              </>
            )}

            {/* Contact */}
            <button
              onClick={onSupportClick}
              className="text-white font-bold hover:text-pink-400 transition-colors duration-300"
            >
              Contact
            </button>

            {/* Start Text - Only when logged in, no image */}
            {isLoggedIn && (
              <span className="text-white font-bold">Start</span>
            )}

            {/* py with small image and dropdown - Only when logged in, last item */}
            {isLoggedIn && (
              <div 
                className="relative" 
                ref={dropdownRef}
                onMouseEnter={handleProfileHover}
                onMouseLeave={handleProfileLeave}
              >
                {/* Clickable py link that goes to profile page */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-white font-bold hover:text-pink-400 transition-colors duration-300"
                  onClick={handleProfileClick}
                >
                  {/* Small image */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  {/* py text */}
                  <span>py</span>
                </Link>

                {/* Dropdown Menu - Shows on hover only */}
                {isProfileDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    onMouseEnter={handleDropdownHover}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* User Info Section */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">PY</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Username: PY</p>
                          <p className="text-sm text-gray-600">UID: WKLQTY</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">Credit score: <span className="font-semibold text-green-600">100</span></p>
                        <div className="flex items-center justify-between mt-2 text-xs">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Normal</span>
                          <span className="text-gray-600">WKLQTY</span>
                          <span className="text-green-600 font-semibold">100</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <div className="grid grid-cols-3 gap-1 mb-3 text-xs text-center">
                        <span className="bg-gray-100 text-gray-700 py-1 rounded">Membership</span>
                        <span className="bg-gray-100 text-gray-700 py-1 rounded">Referral code</span>
                        <span className="bg-gray-100 text-gray-700 py-1 rounded">Credibility Score</span>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      
                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors mt-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Button - Only show when not logged in */}
          <div className="hidden lg:flex items-center gap-4">
            {!isLoggedIn && (
              <Link 
                to="/login"
                className="bg-white text-pink-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-pink-100 transition-colors duration-300 shadow-lg"
              >
                Get In Touch
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative z-60"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : "translate-y-1"
              }`}
            ></span>
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Are you sure to logout?
                </h3>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleLogoutCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={handleLogoutConfirm}
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-90 z-40 transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-gray-600 hover:text-pink-500 transition-colors duration-300"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-8">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-2xl font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-pink-500"
                      : "text-gray-800 hover:text-pink-400"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-2xl font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-pink-500"
                      : "text-gray-800 hover:text-pink-400"
                  }`
                }
              >
                About
              </NavLink>

              {/* Show Events and Rewards only when logged in */}
              {isLoggedIn && (
                <>
                  <NavLink
                    to="/events"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `text-2xl font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-pink-500"
                          : "text-gray-800 hover:text-pink-400"
                      }`
                    }
                  >
                    Events
                  </NavLink>

                  <NavLink
                    to="/rewards"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `text-2xl font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-pink-500"
                          : "text-gray-800 hover:text-pink-400"
                      }`
                    }
                  >
                    Rewards
                  </NavLink>
                </>
              )}

              {/* Contact */}
              <button
                onClick={() => {
                  closeMenu();
                  onSupportClick();
                }}
                className="text-2xl font-semibold text-gray-800 hover:text-pink-400 transition-colors duration-300 text-left"
              >
                Contact
              </button>

              {/* Start - Mobile, no image */}
              {isLoggedIn && (
                <span className="text-2xl font-semibold text-gray-800">Start</span>
              )}

              {/* py with small image - Mobile */}
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="flex items-center gap-4"
                  onClick={closeMenu}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">P</span>
                  </div>
                  <span className="text-2xl font-semibold text-gray-800">py</span>
                </Link>
              )}
            </div>

            {/* Mobile Button - Only show when not logged in */}
            <div className="mt-auto mb-8">
              {!isLoggedIn && (
                <Link 
                  to="/login"
                  className="block w-full bg-pink-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-pink-700 transition-colors duration-300 text-lg text-center"
                  onClick={closeMenu}
                >
                  Get In Touch
                </Link>
              )}
            </div>

            {/* Logo bottom */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <img 
                src="/Navlogo.png" 
                alt="Logo" 
                className="w-[140px] mx-auto opacity-80" 
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Prevent body scroll when menu is open */}
      <style>
        {`
          body {
            overflow: ${isMenuOpen ? 'hidden' : 'auto'};
          }
        `}
      </style>
    </>
  );
}