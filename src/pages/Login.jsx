import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SupportModal from "../components/SupportModal";

export default function Login() {
  const navigate = useNavigate();

  // --- State Management ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  // --- Handlers ---
  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Basic Validation
    if (!username || !password) {
      return alert("Please enter both username and password");
    }

    // 2. Fetch Users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const user = registeredUsers.find((u) => u.username === username);

    // 3. Verify User & Password
    if (!user) {
      return alert("User not found. Please register first.");
    }

    if (user.password !== password) {
      return alert("Invalid password. Please try again.");
    }

    // 4. Set Session Data
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("currentUser", JSON.stringify({
      username: user.username,
      email: user.email,
      phone: user.phone
    }));

    // Store Passwords for Profile Management
    localStorage.setItem("userPassword", password);
    localStorage.setItem("withdrawPassword", user.withdrawalPassword || "defaultWithdraw123");

    // 5. Success & Redirect
    alert("Login successful!");
    navigate("/");
    
    // Force reload to update Navbar state
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="w-full h-screen flex bg-black">
      
      {/* LEFT SIDE IMAGE WITH LOGO OVERLAY */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <img src="/Home.png" alt="Login UI" className="w-full h-full object-cover" />
        <div className="absolute top-8 left-8">
          <img src="/Login.png" alt="Logo" className="w-100 translate-x-20 translate-y-60" />
        </div>
      </div>

      {/* RIGHT SIDE LOGIN PANEL */}
      {/* Added 'relative' class here so absolute button stays inside this panel */}
      <div className="w-full lg:w-1/2 bg-[#111111] flex flex-col px-6 sm:px-10 lg:px-24 justify-center relative">
        
        {/* --- CROSS ICON START --- */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* --- CROSS ICON END --- */}

        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <img src="/Navlogo.png" alt="Logo" className="w-[120px] mx-auto" />
        </div>

        {/* Heading */}
        <h1 className="text-white text-[40px] sm:text-[50px] lg:text-[60px] font-bold mb-4">Log in</h1>
        <p className="text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg leading-6">
          Reflectdigital is a remote creative agency that's making digital meaningful.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          
          {/* Username Input */}
          <div className="mb-6 sm:mb-8">
            <label className="text-gray-300 text-sm mb-1 block">* Username</label>
            <input
              type="text"
              placeholder="Please enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="text-gray-300 text-sm mb-1 block">* Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <button
            type="button"
            onClick={() => setShowSupport(true)}
            className="text-pink-500 text-sm underline mb-6 sm:mb-10 block hover:text-pink-400"
          >
            Forgot your password?
          </button>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-900/20 mb-4"
          >
            Log in
          </button>
        </form>

        {/* Register Link */}
        <p className="text-gray-400 text-center mt-6 text-base sm:text-lg">
          Create an account?{" "}
          <Link to="/register" className="text-pink-500 underline hover:text-pink-400">
            Register
          </Link>
        </p>

        {/* Modals */}
        <SupportModal isOpen={showSupport} onClose={() => setShowSupport(false)} />
      </div>
    </div>
  );
}