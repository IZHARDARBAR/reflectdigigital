import { useState } from "react";
import {
  FiUser,
  FiSettings,
  FiHeadphones,
  FiDollarSign,
  FiCreditCard,
} from "react-icons/fi";
import SupportModal from "../components/SupportModal";
import WithdrawalModal from "../components/WithdrawalModal";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [isWithdrawalVerified, setIsWithdrawalVerified] = useState(false);
  const [loginPasswords, setLoginPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [withdrawPasswords, setWithdrawPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [withdrawalData, setWithdrawalData] = useState({
    fullName: "",
    walletAddress: "",
    networkType: "TRC20",
    withdrawalAmount: "",
    withdrawalPassword: "",
  });

  const userInfo = {
    username: "PY",
    uid: "WKLQTY",
    totalProfits: "$36.98",
    totalBrandsUploaded: 1,
  };

  // Show message function
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  // Reset withdrawal form data
  const resetWithdrawalForm = () => {
    setWithdrawalData({
      fullName: "",
      walletAddress: "",
      networkType: "TRC20",
      withdrawalAmount: "",
      withdrawalPassword: "", // This clears the password field
    });
    setIsWithdrawalVerified(false); // Reset verification
  };

  const handleLoginPasswordChange = (field, value) => {
    setLoginPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWithdrawPasswordChange = (field, value) => {
    setWithdrawPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWithdrawalInputChange = (field, value) => {
    setWithdrawalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSetMaxAmount = () => {
    const maxAmount = "32148.46";
    setWithdrawalData((prev) => ({
      ...prev,
      withdrawalAmount: maxAmount,
    }));
  };

  // Change Login Password Function
  const handleSaveLoginPassword = (e) => {
    e.preventDefault();

    if (!loginPasswords.old || !loginPasswords.new || !loginPasswords.confirm) {
      showMessage("Please fill all fields", "error");
      return;
    }

    if (loginPasswords.new !== loginPasswords.confirm) {
      showMessage("New passwords do not match", "error");
      return;
    }

    if (loginPasswords.new.length < 6) {
      showMessage("Password must be at least 6 characters long", "error");
      return;
    }

    const currentPassword = localStorage.getItem("userPassword");

    if (loginPasswords.old !== currentPassword) {
      showMessage("Old password is incorrect", "error");
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const currentUsername = localStorage.getItem("username");

    const updatedUsers = registeredUsers.map((user) => {
      if (user.username === currentUsername) {
        return { ...user, password: loginPasswords.new };
      }
      return user;
    });

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("userPassword", loginPasswords.new);

    setLoginPasswords({ old: "", new: "", confirm: "" });

    showMessage("Login password updated successfully!");
  };

  // Change Withdraw Password Function
  const handleSaveWithdrawPassword = (e) => {
    e.preventDefault();

    if (
      !withdrawPasswords.old ||
      !withdrawPasswords.new ||
      !withdrawPasswords.confirm
    ) {
      showMessage("Please fill all fields", "error");
      return;
    }

    if (withdrawPasswords.new !== withdrawPasswords.confirm) {
      showMessage("New passwords do not match", "error");
      return;
    }

    if (withdrawPasswords.new.length < 6) {
      showMessage("Password must be at least 6 characters long", "error");
      return;
    }

    const currentWithdrawPassword = localStorage.getItem("withdrawPassword");

    if (withdrawPasswords.old !== currentWithdrawPassword) {
      showMessage("Old withdraw password is incorrect", "error");
      return;
    }

    const loginPassword = localStorage.getItem("userPassword");
    if (withdrawPasswords.new === loginPassword) {
      showMessage(
        "Withdraw password cannot be same as login password",
        "error"
      );
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const currentUsername = localStorage.getItem("username");

    const updatedUsers = registeredUsers.map((user) => {
      if (user.username === currentUsername) {
        return { ...user, withdrawPassword: withdrawPasswords.new };
      }
      return user;
    });

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("withdrawPassword", withdrawPasswords.new);

    setWithdrawPasswords({ old: "", new: "", confirm: "" });

    showMessage("Withdraw password updated successfully!");
  };

  // Handle withdrawal form submission
  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();

    if (
      !withdrawalData.fullName ||
      !withdrawalData.walletAddress ||
      !withdrawalData.withdrawalAmount ||
      !withdrawalData.withdrawalPassword
    ) {
      showMessage("Please fill all fields", "error");
      return;
    }

    // Verify withdrawal password
    const currentWithdrawPassword = localStorage.getItem("withdrawPassword");
    if (withdrawalData.withdrawalPassword !== currentWithdrawPassword) {
      showMessage("Invalid withdrawal password", "error");
      return;
    }

    // Process withdrawal
    showMessage(
      "Withdrawal request submitted successfully! Please contact customer service for confirmation."
    );

    // Reset form after successful submission
    resetWithdrawalForm();

    console.log("Withdrawal Data:", withdrawalData);
  };

  // Open Support Modal
  const openSupportModal = () => {
    setShowSupportModal(true);
  };

  // Close Support Modal
  const closeSupportModal = () => {
    setShowSupportModal(false);
  };

  // Handle Withdrawal icon click - UPDATED
  const handleWithdrawalClick = () => {
    // Reset form every time withdrawal icon is clicked
    resetWithdrawalForm();
    
    // Reset verification state har baar
    setIsWithdrawalVerified(false);

    if (!isWithdrawalVerified) {
      // First time - open password modal
      setShowWithdrawalModal(true);
    } else {
      // Already verified - show withdrawal form
      setActiveTab("withdrawal");
    }
  };

  // Close Withdrawal Modal and set verified - UPDATED
  const closeWithdrawalModal = (passwordVerified = false) => {
    setShowWithdrawalModal(false);
    if (passwordVerified) {
      setIsWithdrawalVerified(true);
      setActiveTab("withdrawal"); // Automatically show withdrawal form
    }
    // Har baar verification reset nahi karenge, sirf passwordVerified true hone par set karenge
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    if (tab !== "withdrawal") {
      resetWithdrawalForm(); // Reset form when leaving withdrawal tab
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <>
            <h1 className="text-2xl font-bold text-white">
              Personal information
            </h1>
            <p className="text-gray-400 mt-1">
              To ensure the security of your account, please fill in the
              relevant security information.
            </p>

            <div className="my-8 bg-[#E83A78] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {userInfo.username}
                </div>
                <span className="text-white font-semibold">
                  {userInfo.username}
                </span>
              </div>
              <button className="bg-white text-[#E83A78] font-bold py-2 px-6 rounded-lg">
                Change
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">User Info</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-300">
                <div className="flex justify-between">
                  <span>Username</span>
                  <span className="text-white">{userInfo.username}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Brands Uploaded</span>
                  <span className="text-white">
                    {userInfo.totalBrandsUploaded}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Profits Earned</span>
                  <span className="text-white">{userInfo.totalProfits}</span>
                </div>
                <div className="flex justify-between">
                  <span>UID</span>
                  <span className="text-white">{userInfo.uid}</span>
                </div>
              </div>
            </div>
          </>
        );

      case "security":
        return (
          <div className="space-y-8">
            {message.text && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === "error"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {message.text}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Account Settings
              </h1>
            </div>

            {/* Update Login Password Section */}
            <div className="bg-[#2C2C2E] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Update Login Password
              </h2>
              <p className="text-gray-400 mb-6">
                Complete the fields below to change your login password, you
                will need to enter your current password first. We recommend
                including both uppercase and lowercase characters, special
                characters and numbers.
              </p>

              <form onSubmit={handleSaveLoginPassword} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Old Login Password
                    </label>
                    <input
                      type="password"
                      value={loginPasswords.old}
                      onChange={(e) =>
                        handleLoginPasswordChange("old", e.target.value)
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Enter old password"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      New Login Password
                    </label>
                    <input
                      type="password"
                      value={loginPasswords.new}
                      onChange={(e) =>
                        handleLoginPasswordChange("new", e.target.value)
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={loginPasswords.confirm}
                      onChange={(e) =>
                        handleLoginPasswordChange("confirm", e.target.value)
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                <button
                  type="submit"
                  className="bg-[#E83A78] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Save update
                </button>
              </form>
            </div>

            {/* Update Withdraw Password Section */}
            <div className="bg-[#2C2C2E] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Update Withdraw Password
              </h2>
              <p className="text-gray-400 mb-6">
                Your Withdraw Password should not be the same as login password.
                It is two-layer verification while requesting the withdrawal
                from the portal.
              </p>

              <form onSubmit={handleSaveWithdrawPassword} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Old Withdraw Password
                    </label>
                    <input
                      type="password"
                      value={withdrawPasswords.old}
                      onChange={(e) =>
                        handleWithdrawPasswordChange("old", e.target.value)
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Enter old password"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      New Withdraw Password
                    </label>
                    <input
                      type="password"
                      value={withdrawPasswords.new}
                      onChange={(e) =>
                        handleWithdrawPasswordChange("new", e.target.value)
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={withdrawPasswords.confirm}
                      onChange={(e) =>
                        handleWithdrawPasswordChange("confirm", e.target.value)
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                <button
                  type="submit"
                  className="bg-[#E83A78] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Save update
                </button>
              </form>
            </div>
          </div>
        );

      case "withdrawal":
        return (
          <div className="space-y-6">
            {/* Success/Error Message */}
            {message.text && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === "error"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {message.text}
              </div>
            )}

            <h1 className="text-2xl font-bold text-white">Notice</h1>

            {/* Notice */}
            <div className=" bg-opacity-20  rounded-lg p-4">
              <p className="text-gray-500 text-sm text-center">
                Please contact customer service for confirmation after submitted
                withdrawal request.
              </p>
            </div>

            {/* Total Account Balance */}
            <div className="bg-[#2C2C2E] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-2 text-white">
                Total Account Balance
              </h2>
              <div className="text-3xl font-bold text-[#E83A78]">
                $ 32,148.46
              </div>
            </div>

            {/* Withdrawal Form */}
            <div className="bg-[#2C2C2E] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Withdraw</h2>

              <form onSubmit={handleWithdrawalSubmit} className="space-y-6">
                {/* Full Name & Wallet Address - 2 inputs in one line */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={withdrawalData.fullName}
                      onChange={(e) =>
                        handleWithdrawalInputChange("fullName", e.target.value)
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Please enter your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      value={withdrawalData.walletAddress}
                      onChange={(e) =>
                        handleWithdrawalInputChange(
                          "walletAddress",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="PY"
                    />
                  </div>
                </div>

                {/* Network Type */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Network Type
                    </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleWithdrawalInputChange("networkType", "TRC20")
                      }
                      className={`flex-1 py-3 rounded-lg border ${
                        withdrawalData.networkType === "TRC20"
                          ? "bg-[#E83A78] border-[#E83A78] text-white"
                          : "bg-[#1C1C1E] border-gray-600 text-gray-300"
                      }`}
                    >
                      TRC20
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleWithdrawalInputChange("networkType", "ERC20")
                      }
                      className={`flex-1 py-3 rounded-lg border ${
                        withdrawalData.networkType === "ERC20"
                          ? "bg-[#E83A78] border-[#E83A78] text-white"
                          : "bg-[#1C1C1E] border-gray-600 text-gray-300"
                      }`}
                    >
                      ERC20
                    </button>
                  </div>
                </div>

                {/* Withdrawal Amount & Password - 2 inputs in one line */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Withdrawal Amount
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={withdrawalData.withdrawalAmount}
                        onChange={(e) =>
                          handleWithdrawalInputChange(
                            "withdrawalAmount",
                            e.target.value
                          )
                        }
                        className="flex-1 bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                        placeholder="Please enter withdrawal amount"
                      />
                      <button
                        type="button"
                        onClick={handleSetMaxAmount}
                        className="bg-[#E83A78] text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors"
                      >
                        All
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Withdrawal Password
                    </label>
                    <input
                      type="password"
                      value={withdrawalData.withdrawalPassword}
                      onChange={(e) =>
                        handleWithdrawalInputChange(
                          "withdrawalPassword",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#1C1C1E] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E83A78]"
                      placeholder="Enter withdrawal password"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                <button
                  type="submit"
                  className="w-full bg-[#E83A78] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Submit Withdrawal
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-4">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Left Sidebar */}
        <aside className="w-1/4 bg-[#1C1C1E] rounded-xl p-6 flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-600 rounded-full mb-2"></div>
            <p className="text-sm text-gray-400">Unverified</p>
            <p className="text-xl font-bold mt-1">UID: {userInfo.uid}</p>
          </div>

          <div className="flex w-full justify-around my-8">
            {/* Withdrawal Record - Normal color always */}
            <button
              onClick={() => handleTabChange("withdrawal")}
              className="flex flex-col items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FiDollarSign size={24} />
              <span>Withdrawal Record</span>
            </button>

            {/* Withdrawal - Pink color ONLY when form is open */}
            <button
              onClick={handleWithdrawalClick}
              className={`flex flex-col items-center gap-2 transition-colors ${
                activeTab === "withdrawal"
                  ? "text-[#E83A78]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <FiCreditCard size={24} />
              <span>Withdrawal</span>
            </button>
          </div>

          <nav className="w-full flex flex-col gap-2">
            <button
              onClick={() => handleTabChange("personal")}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                activeTab === "personal"
                  ? "bg-[#E83A78] text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <FiUser size={20} />
              <span>Personal Information</span>
            </button>

            <button
              onClick={() => handleTabChange("security")}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                activeTab === "security"
                  ? "bg-[#E83A78] text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <FiSettings size={20} />
              <span>Security Settings</span>
            </button>

            <button
              onClick={openSupportModal}
              className="flex items-center gap-4 p-4 hover:bg-gray-700 text-gray-300 rounded-lg"
            >
              <FiHeadphones size={20} />
              <span>Customer Service</span>
            </button>
          </nav>
        </aside>

        {/* Right Content */}
        <main className="w-3/4 bg-[#1C1C1E] rounded-xl p-8">
          {renderContent()}
        </main>
      </div>

      {/* Support Modal */}
      <SupportModal isOpen={showSupportModal} onClose={closeSupportModal} />

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => closeWithdrawalModal(false)}
        onVerified={() => closeWithdrawalModal(true)}
      />
    </div>
  );
}