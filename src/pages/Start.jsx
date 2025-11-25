import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCoins, FaChartBar, FaBookmark } from "react-icons/fa";
import { FiX, FiAlertCircle } from "react-icons/fi"; // Icons for popup
import SupportModal from "../components/SupportModal"; // Import SupportModal

export default function Start() {
  const navigate = useNavigate();

  // States
  const [showInterbrandPopup, setShowInterbrandPopup] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // Handle Start Button Click
  const handleStartWork = () => {
    setShowInterbrandPopup(true);
  };

  // Handle Confirm Click (Open Support Modal)
  const handleConfirm = () => {
    setShowInterbrandPopup(false);
    setShowSupportModal(true);
  };

  // Dummy Data for History
  const historyData = [
    {
      id: 1,
      name: "Red-Bull",
      date: "2025-10-09 10:07:34",
      status: "Pending",
      action: "Upload",
      brandValue: "$17,986.97",
      commissions: "5%",
      profits: "$899.34",
      rebate: "$18,886.31",
      logoColor: "bg-blue-900",
    },
    {
      id: 2,
      name: "Evian",
      date: "2025-09-30 12:10:42",
      status: "Pending",
      action: "Pending",
      brandValue: "$31,123.32",
      commissions: "5%",
      profits: "$1,556.16",
      rebate: "$32,679.48",
      logoColor: "bg-red-800",
    },
    {
      id: 3,
      name: "Havells",
      date: "2025-09-30 12:10:36",
      status: "Completed",
      action: "Completed",
      brandValue: "$3,698.25",
      commissions: "1%",
      profits: "$36.98",
      rebate: "$3,735.23",
      logoColor: "bg-green-800",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* ================= ENHANCED TOP SECTION ================= */}
      <div 
        className="relative w-full h-[70vh] min-h-[500px] sm:min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/startbg.png')" }} // Background Image Added Here
      >
        {/* ================= BUBBLE IMAGES START ================= */}
        
        {/* Original Bubbles Replaced with Images */}
        <img src="/bubble.png" alt="" className="absolute bottom-10 left-10 w-12 h-12 sm:w-16 sm:h-16 object-contain animate-float-up-1" />
        <img src="/bubble.png" alt="" className="absolute bottom-20 right-4 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 object-contain animate-float-up-2" />
        <img src="/bubble.png" alt="" className="absolute bottom-32 left-1/4 w-8 h-8 sm:w-10 sm:h-10 object-contain animate-float-up-3" />
        <img src="/bubble.png" alt="" className="absolute bottom-16 right-1/4 sm:right-1/3 w-10 h-10 sm:w-14 sm:h-14 object-contain animate-float-up-4" />
        <img src="/bubble.png" alt="" className="absolute bottom-40 left-3/4 w-6 h-6 sm:w-8 sm:h-8 object-contain animate-float-up-5" />

        {/* Additional Bubbles */}
        <img src="/bubble.png" alt="" className="absolute bottom-24 left-1/3 w-7 h-7 sm:w-9 sm:h-9 object-contain animate-float-up-6" />
        <img src="/bubble.png" alt="" className="absolute bottom-28 right-1/4 w-8 h-8 sm:w-11 sm:h-11 object-contain animate-float-up-7" />
        <img src="/bubble.png" alt="" className="absolute bottom-36 left-2/3 w-5 h-5 sm:w-7 sm:h-7 object-contain animate-float-up-8" />

        {/* MORE BUBBLES */}
        <img src="/bubble.png" alt="" className="absolute bottom-12 left-12 sm:left-16 w-8 h-8 sm:w-13 sm:h-13 object-contain animate-float-up-9" />
        <img src="/bubble.png" alt="" className="absolute bottom-48 right-8 sm:right-16 w-4 h-4 sm:w-6 sm:h-6 object-contain animate-float-up-10" />
        <img src="/bubble.png" alt="" className="absolute bottom-22 left-3/4 w-7 h-7 sm:w-10 sm:h-10 object-contain animate-float-up-11" />
        <img src="/bubble.png" alt="" className="absolute bottom-38 right-3/4 w-5 h-5 sm:w-8 sm:h-8 object-contain animate-float-up-12" />
        <img src="/bubble.png" alt="" className="absolute bottom-15 left-8 sm:left-12 w-4 h-4 sm:w-7 sm:h-7 object-contain animate-float-up-13" />
        <img src="/bubble.png" alt="" className="absolute bottom-52 right-16 sm:right-32 w-7 h-7 sm:w-11 sm:h-11 object-contain animate-float-up-14" />
        <img src="/bubble.png" alt="" className="absolute bottom-26 left-40 sm:left-60 w-6 h-6 sm:w-9 sm:h-9 object-contain animate-float-up-15" />
        <img src="/bubble.png" alt="" className="absolute bottom-44 left-32 sm:left-44 w-3 h-3 sm:w-5 sm:h-5 object-contain animate-float-up-16" />

        {/* ================= BUBBLE IMAGES END ================= */}

        {/* START WORK BUTTON */}
        <button
          onClick={handleStartWork}
          className="group relative w-[320px] lg:h-[95px] h-[95px] mt-15 sm:w-[446px] sm:h-[130px] bg-black/40 backdrop-blur-md border-[3px] sm:border-[4px] border-[#3A3A3C] rounded-full cursor-pointer overflow-hidden transition-all duration-500 hover:border-gray-500 hover:shadow-[0_0_25px_rgba(232,58,120,0.4)] z-20"
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-2 lg:h-[60px] lg:w-[60px] h-[60px] w-[60px] sm:h-[94px] sm:w-[94px] bg-[#E83A78] rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_#E83A78] transition-all duration-500 ease-in-out group-hover:w-[calc(100%-16px)]">
            <FaBookmark className="text-white text-2xl sm:text-3xl" />
          </div>
          <span className="absolute top-1/2 -translate-y-1/2 left-0 w-full text-center pl-16 sm:pl-20 lg:text-4xl sm:text-2xl font-bold tracking-wide text-white z-10 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-10">
            Start Work
          </span>
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-8 sm:bottom-16 w-full max-w-full px-4 sm:px-6">
          <div className="relative w-full h-8 sm:h-12 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[95%] bg-gradient-to-r from-[#E83A78] to-[#FF8BA7] rounded-full shadow-[0_0_15px_#E83A78]"></div>
            <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-sm sm:text-base font-bold text-white z-20 drop-shadow-md">
              19/20
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <div className="bg-black py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* CARD 1: Total Account Balance */}
            <div className="bg-[#1C1C1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-gray-800 min-h-[350px] sm:min-h-[450px]">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2 sm:gap-3 max-w-[65%] sm:max-w-[70%]">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Total Account Balance
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base lg:text-xl leading-relaxed">
                    Includes our daily profits, which makes it super easy to see
                    how we're doing overall
                  </p>
                </div>
                {/* Icon */}
                <div className="text-[#FFB37C]">
                  <FaCoins size={40} className="sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="w-full border-t border-gray-700 my-4 sm:my-6 lg:my-8"></div>

              {/* Bottom Section (Amount) */}
              <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white flex items-start gap-1 sm:gap-2">
                <span className="text-[#E83A78] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mt-1 sm:mt-2 lg:mt-3">$</span>{" "}
                32,148.46
              </div>
            </div>

            {/* CARD 2: Insufficient Balance */}
            <div className="bg-[#1C1C1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-gray-800 min-h-[350px] sm:min-h-[450px]">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2 sm:gap-3 max-w-[65%] sm:max-w-[70%]">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Insufficient Balance
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base lg:text-xl leading-relaxed">
                    Amount required to deposit in order to proceed with the next
                    task
                  </p>
                </div>
                {/* Icon */}
                <div className="text-[#FFB37C]">
                  <FaCoins size={40} className="sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="w-full border-t border-gray-700 my-4 sm:my-6 lg:my-8"></div>

              {/* Bottom Section (Amount) */}
              <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#4ADE80] flex items-start gap-1 sm:gap-2">
                <span className="text-[#4ADE80] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mt-1 sm:mt-2 lg:mt-3">$</span>{" "}
                16,961.83
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-16">
            {/* CARD 3: Today's Profit */}
            <div className="bg-[#1C1C1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-gray-800 min-h-[350px] sm:min-h-[450px]">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2 sm:gap-3 max-w-[65%] sm:max-w-[70%]">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Today's Profit
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base lg:text-xl leading-relaxed">
                    Your profits will be refreshed daily based on the tasks you
                    complete
                  </p>
                </div>
                {/* Icon */}
                <div className="text-[#A855F7]">
                  <FaChartBar size={40} className="sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="w-full border-t border-gray-700 my-4 sm:my-6 lg:my-8"></div>

              {/* Bottom Section (Amount) */}
              <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white flex items-start gap-1 sm:gap-2">
                <span className="text-[#E83A78] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mt-1 sm:mt-2 lg:mt-3">$</span> 0.00
              </div>
            </div>
            <div className="hidden md:block"></div>
          </div>

          {/* History */}
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">History</h2>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {historyData.map((item) => (
              <div
                key={item.id}
                className="bg-[#1C1C1E] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 h-auto flex flex-col justify-between"
              >
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Logo Size */}
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${item.logoColor} rounded-lg sm:rounded-xl border border-gray-600 shadow-md`}
                    ></div>
                    <div>
                      {/* Text Size */}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm lg:text-base mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-start sm:justify-end">
                    {item.action === "Upload" ? (
                      <>
                        <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg border border-red-900 text-red-500 text-xs sm:text-sm lg:text-base bg-black/20 font-medium">
                          Pending
                        </button>
                        <button className="px-4 sm:px-6 lg:px-10 py-2 sm:py-3 rounded-lg bg-[#E83A78] text-white text-xs sm:text-sm lg:text-base font-bold hover:bg-pink-700 transition-colors shadow-[0_0_15px_#E83A78]">
                          Upload
                        </button>
                      </>
                    ) : item.action === "Completed" ? (
                      <button className="px-4 sm:px-6 lg:px-10 py-2 sm:py-3 rounded-lg bg-[#2C2C2E] text-white text-xs sm:text-sm lg:text-base font-medium border border-gray-600">
                        Completed
                      </button>
                    ) : (
                      <button className="px-4 sm:px-6 lg:px-10 py-2 sm:py-3 rounded-lg border border-red-900 text-red-500 text-xs sm:text-sm lg:text-base bg-black/20 font-medium">
                        Pending
                      </button>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 w-full my-3 sm:my-4"></div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 md:gap-8">
                  <div>
                    <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase mb-1 sm:mb-2 tracking-wider">
                      BRAND VALUE
                    </p>
                    <p className="text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
                      {item.brandValue}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase mb-1 sm:mb-2 tracking-wider">
                      COMMISSIONS
                    </p>
                    <p className="text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
                      {item.commissions}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase mb-1 sm:mb-2 tracking-wider">
                      PROFITS
                    </p>
                    <p className="text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
                      {item.profits}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase mb-1 sm:mb-2 tracking-wider">
                      REBATE
                    </p>
                    <p className="text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
                      {item.rebate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= INTERBRAND POPUP ================= */}
      {showInterbrandPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1C1C1E] w-full max-w-md sm:max-w-lg rounded-xl p-4 sm:p-6 relative border border-gray-700 shadow-2xl">
            <button
              onClick={() => setShowInterbrandPopup(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-white"
            >
              <FiX size={18} className="sm:w-5 sm:h-5" />
            </button>

            <div className="flex gap-3 sm:gap-4">
              <div className="shrink-0 mt-0 sm:mt-1">
                <FiAlertCircle className="text-[#F59E0B] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
              </div>

              <div>
                <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
                  Congratulations! You've received an INTERBRAND! <br />
                  Please contact our customer service and deposit the
                  insufficient balance to continue with the upload process.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => setShowInterbrandPopup(false)}
                className="px-4 sm:px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 sm:px-6 py-2 rounded-lg bg-[#E83A78] text-white font-semibold hover:bg-pink-700 transition-colors text-sm sm:text-base"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUPPORT MODAL ================= */}
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />

      {/* Custom CSS for Bubble Animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }
        .animate-float-up-1 {
          animation: floatUp 8s linear infinite;
          animation-delay: 0s;
        }
        .animate-float-up-2 {
          animation: floatUp 10s linear infinite;
          animation-delay: 1s;
        }
        .animate-float-up-3 {
          animation: floatUp 12s linear infinite;
          animation-delay: 2s;
        }
        .animate-float-up-4 {
          animation: floatUp 9s linear infinite;
          animation-delay: 3s;
        }
        .animate-float-up-5 {
          animation: floatUp 11s linear infinite;
          animation-delay: 4s;
        }
        .animate-float-up-6 {
          animation: floatUp 7s linear infinite;
          animation-delay: 5s;
        }
        .animate-float-up-7 {
          animation: floatUp 13s linear infinite;
          animation-delay: 6s;
        }
        .animate-float-up-8 {
          animation: floatUp 8s linear infinite;
          animation-delay: 7s;
        }
        .animate-float-up-9 {
          animation: floatUp 8s linear infinite;
          animation-delay: 8s;
        }
        .animate-float-up-10 {
          animation: floatUp 10s linear infinite;
          animation-delay: 9s;
        }
        .animate-float-up-11 {
          animation: floatUp 12s linear infinite;
          animation-delay: 10s;
        }
        .animate-float-up-12 {
          animation: floatUp 9s linear infinite;
          animation-delay: 11s;
        }
        .animate-float-up-13 {
          animation: floatUp 11s linear infinite;
          animation-delay: 12s;
        }
        .animate-float-up-14 {
          animation: floatUp 7s linear infinite;
          animation-delay: 13s;
        }
        .animate-float-up-15 {
          animation: floatUp 13s linear infinite;
          animation-delay: 14s;
        }
        .animate-float-up-16 {
          animation: floatUp 8s linear infinite;
          animation-delay: 15s;
        }
      `}</style>
    </div>
  );
}