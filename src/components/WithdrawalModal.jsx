import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const WithdrawalModal = ({ isOpen, onClose, onVerified }) => {
  const [withdrawalPassword, setWithdrawalPassword] = useState("");

  // Helper to clear state and close modal
  const handleClose = () => {
    setWithdrawalPassword("");
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "withdrawal-modal-backdrop") {
      handleClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!withdrawalPassword) {
      return alert("Please enter withdrawal password");
    }

    // Retrieve User Data
    const storedUser = localStorage.getItem("currentUser");

    if (!storedUser) {
      return alert("User not logged in!");
    }

    try {
      const userData = JSON.parse(storedUser);

      // Verify Password Logic
      if (withdrawalPassword !== userData.withdrawalPassword) {
        return alert("Invalid withdrawal password");
      }

      // Success
      onVerified();
    } catch (error) {
      console.error("Error verifying password:", error);
      alert("Authentication error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="withdrawal-modal-backdrop"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-transparent flex justify-center z-50 h-60 mt-35"
    >
      <div className="bg-[#212529] rounded-2xl shadow-xl w-full max-w-md p-4 sm:p-8 text-white relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <IoMdClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4">Withdrawal</h2>
        <hr className="border-t border-gray-600 mb-6" />

        {/* Verification Form */}
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
              onClick={handleClose}
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