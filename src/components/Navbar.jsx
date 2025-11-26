import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// --- Constants & Data ---
const TIER_DATA = [
  {
    id: "premium",
    title: "Premium 👑",
    bg: "bg-[#FCD385]",
    points: [
      "Normal brands - 3%, Interbrand - 7%",
      "40 brands per stage",
      "2 stages per day",
      "Min balance $3,000",
      "Withdraw after stage",
      "Middle privilege",
    ],
  },
  {
    id: "normal",
    title: "Normal",
    bg: "bg-[#DCD6F7]",
    points: [
      "Normal brands - 1%, Interbrand - 5%",
      "20 brands per stage",
      "2 stages per day",
      "Min balance $100",
      "Max withdraw $10,000",
      "Low privilege",
    ],
  },
  {
    id: "elite",
    title: "Elite 🔥",
    bg: "bg-[#B8D4FF]",
    points: [
      "Normal brands - 2%, Interbrand - 6%",
      "30 brands per stage",
      "2 stages per day",
      "Min balance $1,000",
      "Max withdraw $10,000",
      "Low privilege",
    ],
  },
];

export default function Navbar({ onSupportClick }) {
  const navigate = useNavigate();

  // --- State Management ---
  // UI States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);

  // Auth & User States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Refs
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // --- Effects ---
  useEffect(() => {
    checkLoginStatus();

    // Sync login status across tabs
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);

    // Close dropdowns on outside click
    const handleClickOutside = (event) => {
      const clickedOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target);
      const clickedOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target);
      
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- Auth Logic ---
  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const currentUsername = localStorage.getItem("username");

    setIsLoggedIn(loggedIn === "true");
    setUsername(currentUsername || "User");

    // Profile Image Logic
    if (loggedIn === "true" && currentUsername) {
      try {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const currentUser = registeredUsers.find((user) => user.username === currentUsername);
        setProfileImage(currentUser?.profileImage || null);
      } catch (error) {
        console.error("Error parsing users:", error);
        setProfileImage(null);
      }
    } else {
      setProfileImage(null);
    }
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    
    setIsLoggedIn(false);
    setUsername("");
    setProfileImage(null);
    setShowLogoutConfirm(false);
    
    window.location.href = "/";
  };

  // --- Event Handlers ---
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Modal Handlers
  const handleStartClick = () => {
    setShowStartModal(true);
    setIsMenuOpen(false);
  };

  const handleCardNavigation = () => {
    setShowStartModal(false);
    navigate("/start");
  };

  // Slider Logic
  const nextSlide = (e) => {
    e?.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % TIER_DATA.length);
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + TIER_DATA.length) % TIER_DATA.length);
  };

  // Profile Interaction Handlers
  const handleProfileHover = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProfileDropdownOpen(true);
  };

  const handleProfileLeave = () => {
    timeoutRef.current = setTimeout(() => setIsProfileDropdownOpen(false), 200);
  };

  const toggleMobileProfileDropdown = (e) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Utilities
  const getInitials = () => {
    if (!username) return "US";
    const words = username.split(" ");
    return words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : username.substring(0, 2).toUpperCase();
  };

  const getInitial = () => (username ? username.charAt(0).toUpperCase() : "U");

  // Determine Slide Positions
  const getOrderedSlides = () => {
    const center = TIER_DATA[activeSlide];
    const left = TIER_DATA[(activeSlide - 1 + TIER_DATA.length) % TIER_DATA.length];
    const right = TIER_DATA[(activeSlide + 1) % TIER_DATA.length];
    return { left, center, right };
  };

  const { left, center, right } = getOrderedSlides();

  // --- Sub-Components ---
  const DropdownContent = () => (
    <div
      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
      onMouseEnter={() => clearTimeout(timeoutRef.current)}
      onMouseLeave={handleProfileLeave}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center overflow-hidden border border-gray-200">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm font-bold">{getInitials()}</span>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">Username: {username}</p>
            <p className="text-xs text-gray-600">UID: WKLQTY</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-700">
            Credit score: <span className="font-semibold text-green-600">100</span>
          </p>
          <div className="flex items-center justify-between mt-2 text-[10px]">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Normal</span>
            <span className="text-gray-600">WKLQTY</span>
            <span className="text-green-600 font-semibold">100</span>
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-3 gap-1 mb-3 text-[10px] text-center">
          <span className="bg-gray-100 text-gray-700 py-1 rounded">Membership</span>
          <span className="bg-gray-100 text-gray-700 py-1 rounded">Referral</span>
          <span className="bg-gray-100 text-gray-700 py-1 rounded">Score</span>
        </div>

        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
          onClick={() => setIsProfileDropdownOpen(false)}
        >
          {/* Profile Icon SVG */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          My Profile
        </Link>

        <button
          onClick={() => { setShowLogoutConfirm(true); setIsProfileDropdownOpen(false); }}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded-lg transition-colors mt-1"
        >
          {/* Logout Icon SVG */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-4 sm:px-6 lg:px-10 py-4 sm:py-6 z-50 bg-transparent">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="text-2xl font-bold lg:ml- text-white drop-shadow-7xl">
            <Link to="/" onClick={closeMenu}>
              <img src="/Login.png" alt="Logo" className="w-[120px] sm:w-[140px] lg:w-[160px]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-12 xl:gap-20 pr-10 text-lg items-center">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : "text-white font-bold hover:text-pink-400 transition-colors duration-300"}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : "text-white font-bold hover:text-pink-400 transition-colors duration-300"}>About</NavLink>
            
            {isLoggedIn && (
              <>
                <NavLink to="/events" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : "text-white font-bold hover:text-pink-400 transition-colors duration-300"}>Events</NavLink>
                <NavLink to="/rewards" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : "text-white font-bold hover:text-pink-400 transition-colors duration-300"}>Rewards</NavLink>
              </>
            )}
            
            <button onClick={onSupportClick} className="text-white font-bold hover:text-pink-400 transition-colors duration-300">Contact</button>
            
            {isLoggedIn && (
              <button onClick={handleStartClick} className="text-white font-bold hover:text-pink-400 transition-colors">Start</button>
            )}

            {/* Desktop Profile Icon */}
            {isLoggedIn && (
              <div
                className="relative"
                ref={desktopDropdownRef}
                onMouseEnter={handleProfileHover}
                onMouseLeave={handleProfileLeave}
              >
                <Link to="/profile" className="flex items-center gap-2 text-white font-bold hover:text-pink-400 transition-colors duration-300" onClick={() => setIsProfileDropdownOpen(false)}>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center overflow-hidden border border-white/50">
                    {profileImage ? (
                      <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-bold">{getInitial()}</span>
                    )}
                  </div>
                  <span>{username}</span>
                </Link>
                {isProfileDropdownOpen && <DropdownContent />}
              </div>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!isLoggedIn && (
              <Link to="/login" className="bg-white text-pink-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-pink-100 transition-colors duration-300 shadow-lg">
                Get In Touch
              </Link>
            )}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center gap-3">
            {!isLoggedIn && (
              <Link to="/login" className="bg-white text-pink-600 text-xs sm:text-sm font-bold px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors shadow-md">
                Get In Touch
              </Link>
            )}
            
            {isLoggedIn && (
              <button onClick={handleStartClick} className="bg-pink-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md">
                Start
              </button>
            )}

            {/* Mobile Profile Icon */}
            {isLoggedIn && (
              <div className="relative" ref={mobileDropdownRef}>
                <button onClick={toggleMobileProfileDropdown} className="flex items-center justify-center focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center border border-white/20 overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-bold">{getInitial()}</span>
                    )}
                  </div>
                </button>
                {isProfileDropdownOpen && <DropdownContent />}
              </div>
            )}

            {/* Hamburger Menu Button */}
            <button className="flex flex-col justify-center items-center w-8 h-8 relative z-60" onClick={toggleMenu}>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${isMenuOpen ? "-rotate-45 -translate-y-2" : "translate-y-1"}`}></span>
            </button>
          </div>
        </div>

        {/* --- Start Modal --- */}
        {showStartModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] w-full max-w-3xl max-h-[85vh] rounded-3xl p-6 relative flex flex-col items-center border border-gray-800 shadow-2xl overflow-y-auto scrollbar-hide">
              <button onClick={() => setShowStartModal(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-white/10 p-2 rounded-full z-50">
                <FiX size={20} />
              </button>

              <div className="text-center mb-6 mt-2">
                <Link to="/start" onClick={() => setShowStartModal(false)} className="block">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 hover:text-pink-500 transition-colors cursor-pointer">
                    Get Start
                  </h2>
                </Link>
                <p className="text-gray-400 text-sm">Forget the old rules. Right now. Right here</p>
              </div>

              <div className="w-full flex items-center justify-center relative min-h-[380px]">
                {/* Desktop Arrows */}
                <button onClick={prevSlide} className="absolute left-0 z-30 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-110 hidden md:block">
                  <FiChevronLeft size={20} />
                </button>

                {/* Cards Container */}
                <div className="relative w-full h-[380px] flex items-center justify-center perspective-1000">
                  {/* Left Card */}
                  <div
                    onClick={handleCardNavigation}
                    className="hidden md:flex flex-col rounded-3xl p-5 w-[260px] h-[320px] shadow-xl absolute transition-all duration-500 ease-in-out z-10 -translate-x-[200px] opacity-80 scale-90 cursor-pointer hover:scale-95"
                    style={{ backgroundColor: left.bg.replace("bg-[", "").replace("]", "") || "#FCD385" }}
                  >
                    <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-2">{left.title}</h3>
                    <ul className="space-y-2">
                      {left.points.slice(0, 5).map((point, idx) => (
                        <li key={idx} className="text-black text-[10px] font-medium flex items-start gap-1"><span className="mt-0.5">●</span> {point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Card */}
                  <div
                    onClick={handleCardNavigation}
                    className={`flex flex-col rounded-3xl p-6 w-full md:w-[320px] h-[380px] shadow-2xl z-20 transition-all duration-500 ease-in-out scale-100 cursor-pointer hover:scale-105 ${center.bg}`}
                  >
                    <h3 className="text-2xl font-extrabold text-black mb-4 flex items-center gap-2">{center.title}</h3>
                    <ul className="space-y-3 flex-1">
                      {center.points.map((point, idx) => (
                        <li key={idx} className="text-black text-xs font-semibold flex items-start gap-1"><span className="mt-0.5">●</span> {point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Card */}
                  <div
                    onClick={handleCardNavigation}
                    className="hidden md:flex flex-col rounded-3xl p-5 w-[260px] h-[320px] shadow-xl absolute transition-all duration-500 ease-in-out z-10 translate-x-[200px] opacity-80 scale-90 cursor-pointer hover:scale-95"
                    style={{ backgroundColor: right.bg.replace("bg-[", "").replace("]", "") || "#B8D4FF" }}
                  >
                    <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-2">{right.title}</h3>
                    <ul className="space-y-2">
                      {right.points.slice(0, 5).map((point, idx) => (
                        <li key={idx} className="text-black text-[10px] font-medium flex items-start gap-1"><span className="mt-0.5">●</span> {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Desktop Right Arrow */}
                <button onClick={nextSlide} className="absolute right-0 z-30 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-110 hidden md:block">
                  <FiChevronRight size={20} />
                </button>

                {/* Mobile Navigation Arrows */}
                <div className="absolute -bottom-10 flex gap-6 md:hidden">
                  <button onClick={prevSlide} className="bg-white text-black p-2 rounded-full shadow-lg"><FiChevronLeft size={20} /></button>
                  <button onClick={nextSlide} className="bg-white text-black p-2 rounded-full shadow-lg"><FiChevronRight size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Logout Confirmation Modal --- */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure to logout?</h3>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setShowLogoutConfirm(false)} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400">
                    No
                  </button>
                  <button onClick={handleLogoutConfirm} className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Mobile Sidebar --- */}
        <div className={`fixed inset-0 bg-black bg-opacity-90 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeMenu}></div>

        <div className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full pt-20 px-6">
            <button className="absolute top-6 right-6 text-gray-600 hover:text-pink-500 transition-colors duration-300" onClick={closeMenu}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col space-y-8">
              <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `text-2xl font-semibold transition-colors duration-300 ${isActive ? "text-pink-500" : "text-gray-800 hover:text-pink-400"}`}>Home</NavLink>
              <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `text-2xl font-semibold transition-colors duration-300 ${isActive ? "text-pink-500" : "text-gray-800 hover:text-pink-400"}`}>About</NavLink>

              {isLoggedIn && (
                <>
                  <NavLink to="/events" onClick={closeMenu} className={({ isActive }) => `text-2xl font-semibold transition-colors duration-300 ${isActive ? "text-pink-500" : "text-gray-800 hover:text-pink-400"}`}>Events</NavLink>
                  <NavLink to="/rewards" onClick={closeMenu} className={({ isActive }) => `text-2xl font-semibold transition-colors duration-300 ${isActive ? "text-pink-500" : "text-gray-800 hover:text-pink-400"}`}>Rewards</NavLink>
                </>
              )}

              <button onClick={() => { closeMenu(); onSupportClick(); }} className="text-2xl font-semibold text-gray-800 hover:text-pink-400 transition-colors duration-300 text-left">
                Contact
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <img src="/Login.png" alt="Logo" className="w-[140px] mx-auto opacity-80" />
            </div>
          </div>
        </div>
      </nav>

      {/* --- Global Styles --- */}
      <style>
        {`
          body {
            overflow: ${isMenuOpen || showStartModal ? "hidden" : "auto"};
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </>
  );
}