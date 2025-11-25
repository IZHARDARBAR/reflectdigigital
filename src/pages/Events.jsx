import React from 'react';

// Har event ke liye card, crown, aur text ka data
const eventsData = [
{
cardImage: 'event.svg', // Normal Card
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
return ( <div className="bg-black text-white min-h-screen p-8 sm:p-16 font-sans"> <div className="max-w-6xl mx-auto"> <h1 className="text-6xl font-bold text-center mb-16">Events</h1>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
      
      {eventsData.map((event, index) => (
        <div key={index} className="relative rounded-2xl overflow-hidden">
          
          {/* Card Image for all cards */}
          <img 
            src={event.cardImage} 
            alt={`Event Card ${index + 1}`} 
            className="w-full h-full object-cover rounded-2xl" 
          />
          
          {/* Crown ki Image (Overlay) */}
          <img
            src={event.crownImage}
            alt={`Crown ${index + 1}`}
            className="absolute -top-6 -right-4 w-40 -translate-x-10 translate-y-5 h-auto z-20" 
          />

          {/* ===== TEXT CONTENT ===== */}
          <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col z-10">
            <div className="text-2xl pt-10 h-16">
              {event.description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <hr className="border-t mt-25 border-white/20 my-4" />
            <div className="flex justify-between items-center text-center">
              <div>
                <span className="text-xs text-gray-400">Deposit</span>
                <p className="text-5xl font-bold mt-1">{event.deposit}</p>
              </div>
              <div>
                <span className="text-l text-gray-400">Bonus</span>
                <p className="text-5xl font-bold mt-1">{event.bonus}</p>
              </div>
              <div>
                <span className="text-l text-gray-400">Extra reward</span>
                <p className="text-5xl font-bold mt-1">{event.extraReward}</p>
              </div>
            </div>
          </div>
          {/* ===================== */}
        </div>
      ))}

    </div>
  </div>
</div>


);
}
