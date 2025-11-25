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
    <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden font-sans">
      
      {/* ================= TOP SECTION ================= */}
      <div className="relative w-full h-[450px] flex flex-col items-center justify-center bg-gradient-to-b from-[#4A1D5A] via-[#2A0F35] to-black">
        
        {/* Bubbles */}
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full border border-white/20 bg-white/5 blur-[1px]"></div>
        <div className="absolute top-20 right-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 blur-[1px]"></div>
        <div className="absolute bottom-32 left-1/4 w-10 h-10 rounded-full border border-white/20 bg-white/5 blur-[1px]"></div>
        
        {/* START WORK BUTTON */}
        <button 
          onClick={handleStartWork}
          className="group relative w-[280px] h-[80px] bg-black/40 backdrop-blur-md border-[4px] border-[#3A3A3C] rounded-full cursor-pointer overflow-hidden transition-all duration-500 hover:border-gray-500 hover:shadow-[0_0_20px_rgba(232,58,120,0.3)] z-20"
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-2 h-[64px] w-[64px] bg-[#E83A78] rounded-full flex items-center justify-center z-20 shadow-[0_0_15px_#E83A78] transition-all duration-500 ease-in-out group-hover:w-[calc(100%-16px)]">
            <FaBookmark className="text-white text-2xl" />
          </div>
          <span className="absolute top-1/2 -translate-y-1/2 left-0 w-full text-center pl-16 text-2xl font-bold tracking-wide text-white z-10 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-10">
            Start Work
          </span>
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-10 w-full max-w-4xl px-6">
          <div className="relative w-full h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-[95%] bg-gradient-to-r from-[#E83A78] to-[#FF8BA7] rounded-full shadow-[0_0_10px_#E83A78]"></div>
             <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-white z-20 drop-shadow-md">19/20</span>
          </div>
        </div>
      </div>


      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1C1C1E] rounded-2xl p-8 flex justify-between items-start border border-gray-800">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Total Account Balance</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-[250px]">Includes our daily profits...</p>
              <div className="text-4xl font-bold text-white flex items-start gap-1"><span className="text-[#E83A78] text-2xl mt-1">$</span> 32,148.46</div>
            </div>
            <div className="text-[#FFB37C]"><FaCoins size={40} /></div>
          </div>
          <div className="bg-[#1C1C1E] rounded-2xl p-8 flex justify-between items-start border border-gray-800">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Insufficient Balance</h3>
              <p className="text-gray-500 text-sm mb-12">Amount required to deposit</p>
              <div className="text-4xl font-bold text-[#4ADE80] flex items-start gap-1"><span className="text-[#4ADE80] text-2xl mt-1">$</span> 16,961.83</div>
            </div>
            <div className="text-[#FFB37C]"><FaCoins size={40} /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#1C1C1E] rounded-2xl p-8 flex justify-between items-start border border-gray-800">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Today's Profit</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-[250px]">Your profits will be refreshed daily...</p>
              <div className="text-4xl font-bold text-white flex items-start gap-1"><span className="text-[#E83A78] text-2xl mt-1">$</span> 0.00</div>
            </div>
            <div className="text-[#A855F7]"><FaChartBar size={40} /></div>
          </div>
          <div className="hidden md:block"></div> 
        </div>

        {/* History */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">History</h2>
        </div>
        <div className="space-y-4">
          {historyData.map((item) => (
            <div key={item.id} className="bg-[#1C1C1E] rounded-xl p-6 border border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.logoColor} rounded-md border border-gray-600`}></div> 
                  <div><h3 className="text-lg font-bold text-white">{item.name}</h3><p className="text-gray-500 text-xs">{item.date}</p></div>
                </div>
                <div className="flex gap-3">
                  {item.action === "Upload" ? (
                    <>
                      <button className="px-6 py-2 rounded-md border border-red-900 text-red-500 text-xs bg-black/20">Pending</button>
                      <button className="px-8 py-2 rounded-md bg-[#E83A78] text-white text-sm font-medium hover:bg-pink-700 transition-colors shadow-[0_0_10px_#E83A78]">Upload</button>
                    </>
                  ) : item.action === "Completed" ? (
                    <button className="px-8 py-2 rounded-md bg-[#2C2C2E] text-white text-sm font-medium border border-gray-600">Completed</button>
                  ) : (
                    <button className="px-8 py-2 rounded-md border border-red-900 text-red-500 text-sm bg-black/20">Pending</button>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-800 my-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div><p className="text-gray-500 text-[10px] uppercase mb-1">BRAND VALUE</p><p className="text-white font-bold">{item.brandValue}</p></div>
                <div><p className="text-gray-500 text-[10px] uppercase mb-1">COMMISSIONS</p><p className="text-white font-bold">{item.commissions}</p></div>
                <div><p className="text-gray-500 text-[10px] uppercase mb-1">PROFITS</p><p className="text-white font-bold">{item.profits}</p></div>
                <div><p className="text-gray-500 text-[10px] uppercase mb-1">REBATE</p><p className="text-white font-bold">{item.rebate}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= INTERBRAND POPUP (MATCHING SCREENSHOT) ================= */}
      {showInterbrandPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1C1C1E] w-full max-w-lg rounded-xl p-6 relative border border-gray-700 shadow-2xl">
            
            {/* Close Icon */}
            <button 
              onClick={() => setShowInterbrandPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FiX size={20} />
            </button>

            <div className="flex gap-4">
              {/* Warning Icon */}
              <div className="shrink-0 mt-1">
                 <FiAlertCircle className="text-[#F59E0B] w-12 h-12" /> {/* Yellow/Orange Icon */}
              </div>

              {/* Text Content */}
              <div>
                <p className="text-white text-base leading-relaxed font-medium">
                  Congratulations! You've received an INTERBRAND! <br/>
                  Please contact our customer service and deposit the insufficient balance to continue with the upload process.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowInterbrandPopup(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                className="px-6 py-2 rounded-lg bg-[#E83A78] text-white font-semibold hover:bg-pink-700 transition-colors"
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

    </div>
  );
}