import React from 'react';

// event  card, crown, and text  data
const eventsData = [
  {
    cardImage: 'event.jpg', 
    crownImage: 'goldcrown.png',
    description: ['Deposit $500-$999', 'eligible to enjoy 5% reward bonus'],
    deposit: '$500',
    bonus: '5%',
    extraReward: '$25',
  },
  {
    cardImage: 'event.svg',
    crownImage: 'bluecrown.png',
    description: ['Deposit $1,000-$2,999 to receive', 'an additional 12% bonus reward', 'and qualify for Elite rank'],
    deposit: '$1000',
    bonus: '12%',
    extraReward: '$120',
  },
  {
    cardImage: 'event.svg',
    crownImage: 'greencrown.png',
    description: ['Deposit $3,000-$4,999 to receive', 'an additional 15% bonus reward', 'and qualify for Premium rank'],
    deposit: '$3000',
    bonus: '15%',
    extraReward: '$450',
  },
  {
    cardImage: 'event.svg',
    crownImage: 'pinkcrown.png',
    description: ['Deposit $5,000 or above to receive', 'an additional 20% bonus reward', 'and qualify for Exclusive rank'],
    deposit: '$5000',
    bonus: '20%',
    extraReward: '$1000',
  },
];

export default function EventsLayout() {
  return ( 
    <div className="bg-black text-white min-h-screen p-4 sm:p-8 lg:p-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-center mb-20 mt-20 lg:mb-25 lg:mt-33">Events</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-12">
          
          {eventsData.map((event, index) => (
            <div key={index} className="relative rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-center">
              
              {/* ================= UPDATED BACKGROUND LOGIC ================= */}
              
              <img 
                src={event.cardImage} 
                alt={`Event Card ${index + 1}`} 
                className="absolute inset-0 w-full h-full object-cover z-0" 
              />
              {/* ========================================================== */}
              
              {/* Crown  Image (Overlay) */}
              <img
                src={event.crownImage}
                alt={`Crown ${index + 1}`}
                className="absolute -top-4 sm:-top-6 -right-2 sm:-right-4 w-24 sm:w-32 lg:w-40 -translate-x-6 sm:-translate-x-10 translate-y-3 sm:translate-y-5 h-auto z-20" 
              />

              {/* ===== TEXT CONTENT ===== */}
              <div className="relative p-6 sm:p-8 flex flex-col z-10 w-full h-full justify-between">
                
                {/* Description */}
                <div className="text-base sm:text-xl lg:text-2xl pt-4 sm:pt-6 font-medium">
                  {event.description.map((line, i) => (
                    <p key={i} className="leading-tight sm:leading-snug mb-1">{line}</p>
                  ))}
                </div>
                
                {/* Spacing for mobile layout */}
                <div className="mt-12 sm:mt-16 lg:mt-24">
                   {/* Horizontal Line */}
                  <hr className="border-t border-white/30 mb-4 sm:mb-6" />
                  
                  {/* Stats Row */}
                  <div className="flex justify-between items-center text-center space-x-2 sm:space-x-4">
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm lg:text-base text-gray-200 opacity-80 block mb-1">Deposit</span>
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-bold">{event.deposit}</p>
                    </div>
                    <div className="flex-1 border-l border-white/20 border-r">
                      <span className="text-xs sm:text-sm lg:text-base text-gray-200 opacity-80 block mb-1">Bonus</span>
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-bold">{event.bonus}</p>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm lg:text-base text-gray-200 opacity-80 block mb-1">Extra reward</span>
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-bold">{event.extraReward}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}