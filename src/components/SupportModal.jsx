import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// Configuration
const WHATSAPP_URL = "https://wa.me/+923554952450";

const SupportModal = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState("");

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  const handleServiceClick = () => {
    setSelectedService("whatsapp");
    window.open(WHATSAPP_URL, "_blank");
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-transparent flex justify-center items-center z-50 p-4"
    >
      <div className="bg-[#212529] rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 text-white relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <IoMdClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4">Please select support service</h2>
        <hr className="border-t border-gray-600 mb-6" />

        {/* Service Selection */}
        <div className="space-y-4">
          <div
            onClick={handleServiceClick}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
              selectedService === "whatsapp"
                ? "border-pink-500 bg-gray-800"
                : "border-gray-600 hover:border-gray-500"
            }`}
          >
            <div className="flex items-center">
              <FaWhatsapp className="text-green-500 mr-3" size={24} />
              <span className="font-semibold">WhatsApp Support Service</span>
            </div>

            {/* Custom Radio Button Indicator */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div
                className={`w-5 h-5 rounded-full transition-all duration-300 border flex items-center justify-center ${
                  selectedService === "whatsapp"
                    ? "bg-pink-500 border-pink-500"
                    : "bg-gray-600 border border-gray-500"
                }`}
              >
                {selectedService === "whatsapp" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;