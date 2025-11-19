import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ onSupportClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
                className="w-[120px]  sm:w-[140px] lg:w-[160px]" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-12 xl:gap-20 pr-10 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-pink-500 font-semibold"
                  : "text-gray-700 font-bold hover:text-pink-400 transition-colors duration-300"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-pink-500 font-semibold"
                  : "text-gray-700 font-bold hover:text-pink-400 transition-colors duration-300"
              }
            >
              About
            </NavLink>

            {/* Contact opens popup */}
            <button
              onClick={onSupportClick}
              className="text-gray-700 font-bold hover:text-pink-400 transition-colors duration-300"
            >
              Contact
            </button>
          </div>

          {/* Desktop Button */}
          <button 
            onClick={onSupportClick}
            className="hidden lg:block bg-white text-pink-600 font-semibold px-5 py-2 rounded-xl hover:bg-pink-100 transition-colors duration-300"
          >
            Get In Touch
          </button>

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

              {/* Contact opens popup */}
              <button
                onClick={() => {
                  closeMenu();
                  onSupportClick();
                }}
                className="text-2xl font-semibold text-gray-800 hover:text-pink-400 transition-colors duration-300 text-left"
              >
                Contact
              </button>
            </div>

            {/* Mobile Button */}
            <div className="mt-auto mb-8">
              <button 
                className="w-full bg-pink-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-pink-700 transition-colors duration-300 text-lg"
                onClick={() => {
                  closeMenu();
                  onSupportClick();
                }}
              >
                Get In Touch
              </button>
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
