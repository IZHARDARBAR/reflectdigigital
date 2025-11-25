import React from 'react';

const Rewards = () => {
  const rewards = [
    { brands: 120, amount: 200 },
    { brands: 240, amount: 450 },
    { brands: 600, amount: 900 },
    { brands: 1200, amount: 1800 },
    { brands: 1800, amount: 2100 },
    { brands: 3300, amount: 4200 },
  ];

  return (
    <div className="bg-black min-h-screen flex justify-center items-start pt-10">
      <div className="w-300  p-4">
        <h1 className="text-6xl font-bold text-center text-white mb-8">Reward</h1>
        
        <div className="bg-black border-white border rounded-4xl p-6 mb-6 text-center">
          <p className="text-7xl font-bold text-pink-500">1</p>
          <p className="text-lg text-white mt-2">Total Brands Completed</p>
          <p className="text-xs text-gray-400 mt-2">You'll need to complete a specific number of brands to claim all the rewards</p>
        </div>

        <div className="bg-[#242424] rounded-4xl p-6">
          {rewards.map((reward, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-700 py-4 last:border-b-0">
              <div className="flex items-center">
                <div className="bg-gray-800 rounded-full p-2 mr-4">
                  {/* Icon ko Star Icon se badal diya hai */}
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.95-.69L11.049 2.927z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">{reward.brands} Brands</p>
                  <p className="text-pink-500 font-bold">${reward.amount}</p>
                </div>
              </div>
              <button className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                Claim Reward
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[#242424] rounded-4xl p-6 mt-6">
          <h2 className="text-white font-bold text-lg mb-4">Reward Description</h2>
          <p className="text-gray-400 text-sm">
            The rewards claimed by users will be directly deposited into your account.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Users can claim rewards by contacting online customer service during the Working Hub operating hours, from 09:00AM-09:00PM Sydney Time Zone.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            After users have claimed all their rewards, the system will recalculate the total number of completed brands to enable users to claim relevant rewards again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;