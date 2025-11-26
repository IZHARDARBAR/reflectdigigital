import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // --- SECURITY CHECK & LOAD DATA ---
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminLoggedIn");

    if (isAdmin !== "true") {
      alert("Access Denied! Sirf Admin hi yahan aa sakta hai.");
      navigate("/login");
    } else {
      
      const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      setUsers(storedUsers);
    }
  }, [navigate]);

  // --- Logout Function ---
  const handleLogout = () => {
    // Logout karne par security token delete karo
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login");
  };

  // --- Delete Function ---
  const handleDelete = (indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((_, index) => index !== indexToDelete);
      setUsers(updatedUsers);
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    }
  };

  // --- Search Filter ---
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#121212] text-gray-300 p-4 sm:p-8 font-sans">
      
      {/* --- Top Header / Stats --- */}
      <div className="flex justify-between items-center mb-8 mt-15 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard <span className="text-red-500 text-sm">(Secure)</span></h1>
        
        {/* Updated Logout Button */}
        <button 
          onClick={handleLogout} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold"
        >
          Logout
        </button>
      </div>

      {/* --- Search Bar --- */}
      <div className="flex flex-wrap gap-4 mb-6 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
        <input
          type="text"
          placeholder="Search by Username or Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#2c2c2c] text-white border border-gray-600 rounded px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:border-pink-500"
        />
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-semibold">Search</button>
          <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-semibold" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>

      {/* --- Users Table --- */}
      <div className="overflow-x-auto bg-[#1e1e1e] rounded-lg border border-gray-800 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#252526] text-gray-400 border-b border-gray-700 text-sm uppercase tracking-wider">
              <th className="p-4">Avatar</th>
              <th className="p-4">Member Information</th>
              <th className="p-4">Wallet Info (Demo)</th>
              <th className="p-4">Registration Info</th>
              <th className="p-4">Status</th>
              <th className="p-4">Operate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No users found. Go register some users first!
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-[#2a2a2a] transition-colors">
                  
                  {/* Avatar Column */}
                  <td className="p-4 align-top">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </td>

                  {/* Member Info Column */}
                  <td className="p-4 align-top space-y-1">
                    <div className="text-sm"><span className="text-gray-500 text-xs">Name:</span> <span className="text-white font-medium">{user.username}</span></div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">Phone:</span> <span className="text-blue-400">{user.phone}</span></div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">Email:</span> {user.email}</div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">UID:</span> <span className="text-yellow-500">{user.uid}</span></div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">Nation:</span> {user.nationality}</div>
                  </td>

                  {/* Wallet Info */}
                  <td className="p-4 align-top space-y-1">
                    <div className="text-sm"><span className="text-gray-500 text-xs">Balance:</span> <span className="text-green-400 font-bold">$0.00</span></div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">Frozen:</span> 0.00</div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">Tasks:</span> 0/20</div>
                  </td>

                  {/* Registration Info */}
                  <td className="p-4 align-top space-y-1">
                    <div className="text-sm"><span className="text-gray-500 text-xs">Date:</span> {new Date(user.registeredAt).toLocaleDateString()}</div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">Time:</span> {new Date(user.registeredAt).toLocaleTimeString()}</div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">Pass:</span> {user.password}</div>
                    <div className="text-sm"><span className="text-gray-500 text-xs">W-Pass:</span> {user.withdrawalPassword}</div>
                  </td>

                  {/* Status Toggles */}
                  <td className="p-4 align-top">
                    <div className="flex items-center justify-between bg-gray-800 p-2 rounded mb-2 w-32">
                      <span className="text-xs">Active</span>
                      <div className="w-8 h-4 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-2">
                       <div className="flex gap-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded w-full">Settings</button>
                          <button className="bg-yellow-600 hover:bg-yellow-700 text-black text-xs px-2 py-1 rounded w-full">Bonus</button>
                       </div>
                       <button 
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded w-full"
                       >
                         Delete User
                       </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}