import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const WithdrawalModal = ({ isOpen, onClose, onVerified }) => {
  const [withdrawalPassword, setWithdrawalPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!withdrawalPassword) {
      alert("Please enter withdrawal password");
      return;
    }

    // Get current withdraw password from localStorage
    const currentWithdrawPassword = localStorage.getItem("withdrawPassword");
    
    // Verify withdrawal password
    if (withdrawalPassword !== currentWithdrawPassword) {
      alert("Invalid withdrawal password");
      return;
    }

    // Password correct - direct withdrawal form open hoga
    onVerified();
    // Modal close nahi karenge, withdrawal form automatically open hoga
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'withdrawal-modal-backdrop') {
      setWithdrawalPassword(""); // Password clear ho jayega
      onClose();
    }
  };

  return (
    <div 
      id="withdrawal-modal-backdrop"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-transparent flex justify-center z-50 h-60  mt-35"
    >
      <div className="bg-[#212529] rounded-2xl shadow-xl w-full max-w-md p-4 sm:p-8 text-white relative">
        {/* Close Button */}
        <button
          onClick={() => {
            setWithdrawalPassword(""); // Password clear ho jayega
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <IoMdClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4">Withdrawal</h2>
        <hr className="border-t border-gray-600 mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={withdrawalPassword}
              onChange={(e) => setWithdrawalPassword(e.target.value)}
              className="w-full bg-[#2C2C2E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
              placeholder="Enter withdrawal password"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setWithdrawalPassword(""); // Password clear ho jayega
                onClose();
              }}
              className="flex-1 bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#E83A78] text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalModal;