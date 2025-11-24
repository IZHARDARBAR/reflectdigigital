import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);
  const [showConfirmWithdrawalPassword, setShowConfirmWithdrawalPassword] =
    useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [formData, setFormData] = useState({
    countryCode: "+61",
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    withdrawalPassword: "",
    confirmWithdrawalPassword: "",
    nationality: "",
    birthDate: "",
    uid: "",
    captcha: "",
    agreeToTerms: false,
  });
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Generate captcha
  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 6;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaText(result);
    drawCaptcha(result);
  };

  // Draw captcha on canvas
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#1A1A1A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Add some distortion
    for (let i = 0; i < text.length; i++) {
      const x = 25 + i * 20;
      const y = 25 + Math.random() * 10 - 5;
      const rotation = Math.random() * 0.4 - 0.2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Add some noise
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleWithdrawalPasswordVisibility = () => {
    setShowWithdrawalPassword(!showWithdrawalPassword);
  };

  const toggleConfirmWithdrawalPasswordVisibility = () => {
    setShowConfirmWithdrawalPassword(!showConfirmWithdrawalPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCountryCodeChange = (e) => {
    setFormData({
      ...formData,
      countryCode: e.target.value,
    });
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    navigate("/terms-of-service");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Captcha validation
    if (formData.captcha !== captchaText) {
      alert("Invalid captcha code");
      generateCaptcha();
      return;
    }

    // Combine country code and phone number
    const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;

    // Validation
    if (
      !formData.phone ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.withdrawalPassword ||
      !formData.confirmWithdrawalPassword ||
      !formData.nationality ||
      !formData.birthDate ||
      !formData.uid ||
      !formData.captcha
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.withdrawalPassword !== formData.confirmWithdrawalPassword) {
      alert("Withdrawal passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the User Agreement");
      return;
    }

    // Check if phone number already exists
    const existingUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const phoneExists = existingUsers.find(
      (user) => user.phone === fullPhoneNumber
    );

    if (phoneExists) {
      alert(
        "Phone number already registered. Please use a different phone number."
      );
      return;
    }

    // Check if username already exists
    const userExists = existingUsers.find(
      (user) => user.username === formData.username
    );

    if (userExists) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Check if email already exists
    const emailExists = existingUsers.find(
      (user) => user.email === formData.email
    );
    if (emailExists) {
      alert("Email already registered. Please use a different email.");
      return;
    }

    // Save user data to localStorage
    const userData = {
      phone: fullPhoneNumber,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      withdrawalPassword: formData.withdrawalPassword,
      nationality: formData.nationality,
      birthDate: formData.birthDate,
      uid: formData.uid,
      registeredAt: new Date().toISOString(),
    };

    // Add new user to registered users array
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Auto-login after registration
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        phone: fullPhoneNumber,
        username: formData.username,
        email: formData.email,
      })
    );

    // Show success message
    alert("Registration successful! You are now logged in.");

    // Redirect to home page
    navigate("/");

    // Page reload to update navbar
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Common country codes
  const countryCodes = [
    { code: "+61", country: "Australia" },
    { code: "+1", country: "USA/Canada" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+92", country: "Pakistan" },
    { code: "+971", country: "UAE" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+65", country: "Singapore" },
    { code: "+60", country: "Malaysia" },
    { code: "+86", country: "China" },
    { code: "+81", country: "Japan" },
    { code: "+82", country: "South Korea" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+39", country: "Italy" },
    { code: "+34", country: "Spain" },
  ];

  // Nationalities
  const nationalities = [
    "Australia",
    "United States",
    "United Kingdom",
    "Canada",
    "India",
    "Pakistan",
    "China",
    "Japan",
    "Germany",
    "France",
    "Italy",
    "Spain",
  ];

  return (
    <div className="w-full h-screen flex bg-black">
      {/* LEFT SIDE IMAGE WITH LOGO OVERLAY */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <img
          src="/Home.png"
          alt="Register UI"
          className="w-full h-full object-cover"
        />
        {/* Logo overlay on image */}
        <div className="absolute top-8 left-8">
          <img
            src="/Login.png"
            alt="Logo"
            className="w-100 translate-x-20 translate-y-60"
          />
        </div>
      </div>

      {/* RIGHT SIDE REGISTER PANEL */}
      <div className="w-full lg:w-1/2 bg-[#111111] flex flex-col px-6 sm:px-10 lg:px-24 justify-center overflow-hidden relative">
        {/* Close button - Top RIGHT corner */}
        <button
          onClick={handleHomeRedirect}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg
            className="w-6 h-6"
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

        {/* Scrollable container with hidden scrollbar */}
        <div className="max-h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4">
          {/* Mobile Logo - Only show on mobile */}
          <div className="lg:hidden mb-8">
            <img src="/Navlogo.png" alt="Logo" className="w-[120px] mx-auto" />
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister}>
            {/* Phone Number */}
            <label className="text-gray-300 text-sm mb-1">* Phone No.</label>
            <div className="flex gap-2 mb-6">
              {/* Country Code Dropdown */}
              <div className="relative w-1/3">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleCountryCodeChange}
                  className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 appearance-none"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
                {/* Dropdown arrow */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="relative w-2/3">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <label className="text-gray-300 text-sm mb-1">* Username</label>
            <input
              type="text"
              name="username"
              placeholder="Please enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg mb-6 border border-gray-700 focus:outline-none focus:border-pink-500"
              required
              minLength="3"
            />

            {/* Email */}
            <label className="text-gray-300 text-sm mb-1">* Email</label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg mb-6 border border-gray-700 focus:outline-none focus:border-pink-500"
              required
            />

            {/* Password */}
            <label className="text-gray-300 text-sm mb-1">* Password</label>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Please enter your password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 pr-12"
                required
                minLength="6"
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <label className="text-gray-300 text-sm mb-1">
              * Confirm Password
            </label>
            <div className="relative mb-6">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Login Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 pr-12"
                required
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Withdrawal Password */}
            <label className="text-gray-300 text-sm mb-1">
              * Withdrawal Password
            </label>
            <div className="relative mb-6">
              <input
                type={showWithdrawalPassword ? "text" : "password"}
                name="withdrawalPassword"
                placeholder="Withdrawal Password"
                value={formData.withdrawalPassword}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 pr-12"
                required
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={toggleWithdrawalPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showWithdrawalPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Withdrawal Password */}
            <label className="text-gray-300 text-sm mb-1">
              * Confirm Withdrawal Password
            </label>
            <div className="relative mb-6">
              <input
                type={showConfirmWithdrawalPassword ? "text" : "password"}
                name="confirmWithdrawalPassword"
                placeholder="Confirm Withdrawal Password"
                value={formData.confirmWithdrawalPassword}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 pr-12"
                required
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={toggleConfirmWithdrawalPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmWithdrawalPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Nationality and Birth Date - Inline */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-gray-300 text-sm mb-1">
                  * Nationality
                </label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 appearance-none"
                  required
                >
                  <option value="">Select Nationality</option>
                  {nationalities.map((nationality) => (
                    <option key={nationality} value={nationality}>
                      {nationality}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-1">* Birth</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
            </div>

            {/* UID and Captcha - Better layout */}
            <div className="mb-6">
              <label className="text-gray-300 text-sm mb-1">* UID</label>
              <input
                type="text"
                name="uid"
                placeholder="UID"
                value={formData.uid}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 mb-4"
                required
              />

              <label className="text-gray-300 text-sm mb-1">
                * Captcha Code
              </label>
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    name="captcha"
                    placeholder="Enter Captcha Code"
                    value={formData.captcha}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 bg-[#1A1A1A] border border-gray-700 rounded-lg p-2">
                  <canvas
                    ref={canvasRef}
                    width="135"
                    height="40"
                    className="rounded cursor-pointer"
                    onClick={generateCaptcha}
                  />

                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    title="Refresh Captcha"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500 focus:ring-2"
                required
              />
              <label className="ml-2 text-sm text-gray-300">
                I have read and agreed to the{" "}
                <Link
                  to="/terms-of-service"
                  className="text-pink-500 underline hover:text-pink-400 transition-colors"
                >
                  User Agreement
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-900/20 mb-4"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-gray-400 text-center mt-6 text-base sm:text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-500 underline hover:text-pink-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
