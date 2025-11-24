import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Start Your Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to your dashboard! Explore all the features and tools we have to offer.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-pink-500 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Events</h3>
            <p className="text-gray-400">
              Discover and join exciting events tailored for our community members.
            </p>
            <button 
              onClick={() => navigate("/events")}
              className="mt-4 text-pink-500 hover:text-pink-400 font-semibold transition-colors"
            >
              Explore Events →
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-pink-500 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Rewards</h3>
            <p className="text-gray-400">
              Claim your rewards and enjoy exclusive benefits as a valued member.
            </p>
            <button 
              onClick={() => navigate("/rewards")}
              className="mt-4 text-pink-500 hover:text-pink-400 font-semibold transition-colors"
            >
              View Rewards →
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-pink-500 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Profile</h3>
            <p className="text-gray-400">
              Manage your account settings and personalize your experience.
            </p>
            <button 
              onClick={() => navigate("/profile")}
              className="mt-4 text-pink-500 hover:text-pink-400 font-semibold transition-colors"
            >
              Go to Profile →
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-pink-100 mb-6 text-lg">
            Your digital journey begins here. Explore all the possibilities we have for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate("/events")}
              className="bg-white text-pink-600 px-8 py-3 rounded-xl font-semibold hover:bg-pink-100 transition-colors"
            >
              Explore Events
            </button>
            <button 
              onClick={() => navigate("/rewards")}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              Claim Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}