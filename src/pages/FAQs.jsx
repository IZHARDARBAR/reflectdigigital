import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiMenu,
} from "react-icons/fi";

export default function FAQSection() {
  // --- States ---
  const [activeTab, setActiveTab] = useState("Start"); // For Desktop
  const [openCategoryMobile, setOpenCategoryMobile] = useState(null); // For Mobile Category (Start, Brands...)
  const [openQuestion, setOpenQuestion] = useState(null); // For Questions inside categories

  const tabData = {
    Start: [
      {
        question: "How to Start?",
        answer: "The first stage starts with minimum balance of $100.",
      },
      {
        question: "Unlock and Stage",
        answer:
          "Users are required to complete 2 stages per day. Users are able to unlock the second stage directly after completing the first stage.",
      },
      {
        question: "Complete",
        answer:
          "Once the tasks are completed, the profit and principal will be returned to your account balance.",
      },
      {
        question: "Extension",
        answer:
          "Please download the official browser extension to ensure smooth operation of the tasks.",
      },
      {
        question: "Important Notice",
        answer:
          "Please do not trust any unofficial contacts. Only communicate through official customer service channels.",
      },
      {
        question: "Credit Score",
        answer:
          "Your credit score determines your daily withdrawal limits and task availability.",
      },
    ],
    Brands: [
      {
        question: "Brand Cooperation",
        answer:
          "We cooperate with major international brands to optimize their product data.",
      },
    ],
    Withdraw: [
      {
        question: "Withdrawal Time",
        answer: "Withdrawals are processed within 24 hours of the request.",
      },
      {
        question: "Minimum Withdrawal",
        answer: "The minimum withdrawal amount is $50.",
      },
    ],
    "Funds Security": [
      {
        question: "Is my money safe?",
        answer:
          "Yes, we use advanced encryption to ensure your funds are secure.",
      },
    ],
    "Account Security": [
      {
        question: "Change Password",
        answer:
          "You can change your password in the Profile > Security Settings section.",
      },
    ],
    "Working Hub": [
      {
        question: "Daily Tasks",
        answer: "Check here for your daily assigned tasks and progress.",
      },
    ],
  };

  // --- Functions ---

  // Desktop: Tab Change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setOpenQuestion(null);
  };

  // Mobile: Toggle Main Category (Start, Brands, etc.)
  const toggleMobileCategory = (category) => {
    if (openCategoryMobile === category) {
      setOpenCategoryMobile(null); // Close if already open
    } else {
      setOpenCategoryMobile(category); // Open new
      setOpenQuestion(null); // Reset inner questions
    }
  };

  // Both: Toggle Question (Inside the category)
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* ================= HEADER (Matches Screenshot) ================= */}
      <div className="flex items-center justify-between p-4 md:pt-10 md:px-10 max-w-6xl mx-auto">
        {/* Back Icon (Mobile only logic typically, strictly visual here) */}
        <button className="text-white md:hidden">
          <FiArrowLeft size={24} />
        </button>

        {/* Title */}
        <h1 className="text-xl md:text-5xl mt-10 font-serif font-bold text-white mx-auto text-center w-full">
          FAQ
        </h1>

        {/* Menu Icon (Mobile only) */}
      </div>

      {/* ================= MOBILE VIEW (Visible < md) ================= */}
      <div className="md:hidden px-4 mt-6">
        <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden">
          {Object.keys(tabData).map((category) => (
            <div
              key={category}
              className="border-b border-gray-800 last:border-none"
            >
              {/* Category Header (Start, Brands, etc.) */}
              <button
                onClick={() => toggleMobileCategory(category)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="text-gray-200 font-medium text-lg">
                  {category}
                </span>
                <span className="text-gray-400">
                  {openCategoryMobile === category ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              </button>

              {/* Inner Content (Questions List) - Opens when Category clicked */}
              <div
                className={`bg-black/30 transition-all duration-300 ease-in-out ${
                  openCategoryMobile === category
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="px-5 pb-4">
                  {tabData[category].map((item, index) => (
                    <div
                      key={index}
                      className="py-3 border-b border-gray-800/50 last:border-0"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full text-left text-sm font-bold text-gray-300 mb-1 flex justify-between"
                      >
                        {item.question}
                        {openCategoryMobile === category &&
                          openQuestion === index && (
                            <span className="text-[#E83A78] text-xs">●</span>
                          )}
                      </button>

                      {/* Answer */}
                      {openQuestion === index && (
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed animate-fadeIn">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP VIEW (Visible >= md) ================= */}
      <div className="hidden md:flex flex-col items-center w-full px-4">
        {/* Desktop Container */}
        <div className="w-full max-w-6xl bg-[#111111] rounded-[30px] p-10 mt-8">
          {/* Horizontal Tabs */}
          <div className="overflow-x-auto pb-4 mb-8   custom-scrollbar">
            <div className="flex gap-25 min-w-max">
              {Object.keys(tabData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`text-lg font-bold pb-2 transition-all duration-300 relative whitespace-nowrap ${
                    activeTab === tab
                      ? "text-[#E83A78]"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-8 h-1 bg-[#E83A78] rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full">
            {tabData[activeTab].map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-800 last:border-0"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left py-6 flex justify-between items-center group"
                >
                  <span className="text-xl font-bold text-white">
                    {item.question}
                  </span>
                  <span
                    className={`transform transition-transform duration-300 text-gray-400 ${
                      openQuestion === index ? "rotate-180" : ""
                    }`}
                  >
                    <FiChevronDown size={24} />
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQuestion === index
                      ? "max-h-40 opacity-100 mb-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#64748B] text-lg font-medium leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
