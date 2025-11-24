import { useState } from 'react';

export default function StartSection() {
  const [activeTab, setActiveTab] = useState('Start');

  const tabContent = {
    'Start': {
      title: 'How to Start?',
      content: 'The first stage starts with minimum balance of $100',
      type: 'text'
    },
    'Brands': {
      title: 'Brands Information',
      content: 'Learn about our brand partnerships and collaborations',
      type: 'text'
    },
    'Withdraw': {
      title: 'Withdrawal Process',
      content: 'Step-by-step guide to withdraw your earnings safely',
      type: 'text'
    },
    'Funds Security': {
      title: 'Funds Security',
      content: 'Your funds are protected with advanced security measures',
      type: 'text'
    },
    'Account Security': {
      title: 'Account Security',
      content: 'Tips to keep your account secure and protected',
      type: 'text'
    },
    'Working Hub': {
      title: 'Working Hub',
      content: 'Central workspace for all your projects and tasks',
      type: 'text'
    },
    'How to Start?': {
      title: 'How to Start?',
      content: 'The first stage starts with minimum balance of $100',
      type: 'text'
    },
    'Unlock and Stage': {
      title: 'Unlock and Stage',
      content: [
        'Users are required to complete 2 stage per day',
        'Users are able to unlock the second stage directly after completing the first stage but are restricted to unlock during the middle of the stage'
      ],
      type: 'list'
    },
    'Complete': {
      title: 'Complete Tasks',
      content: 'Finish your tasks and get rewarded for completed work',
      type: 'text'
    },
    'Extension': {
      title: 'Browser Extension',
      content: 'Install our extension for enhanced functionality',
      type: 'text'
    },
    'Important Notice': {
      title: 'Important Notice',
      content: 'Critical updates and announcements for all users',
      type: 'text'
    },
    'Credit Score': {
      title: 'Credit Score',
      content: 'Understand and improve your credit rating system',
      type: 'text'
    }
  };

  const renderContent = () => {
    const currentContent = tabContent[activeTab];
    
    if (!currentContent) return null;

    if (currentContent.type === 'list') {
      return (
        <ul className="text-gray-300 space-y-4">
          {currentContent.content.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-400 mr-3">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className="text-gray-300 text-lg leading-relaxed">
        {currentContent.content}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto pt-20">
        
        {/* Horizontal Navigation - Clickable Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-800 pb-4">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium pb-1 transition-colors ${
                activeTab === tab 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Main Content */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {tabContent[activeTab]?.title}
            </h2>
            <div className="bg-gray-900 rounded-lg p-6">
              {renderContent()}
            </div>
          </div>

          {/* Right Side - Additional Info (for some tabs) */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {activeTab === 'Unlock and Stage' ? 'Stage Rules' : 'Additional Information'}
            </h2>
            <div className="bg-gray-900 rounded-lg p-6">
              {activeTab === 'Unlock and Stage' ? (
                <ul className="text-gray-300 space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span>Maximum 2 stages allowed per 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span>Stage completion time: 4-6 hours each</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span>Rewards are credited after stage verification</span>
                  </li>
                </ul>
              ) : (
                <p className="text-gray-300 leading-relaxed">
                  Click on different tabs to explore more information about each section. Each tab contains specific details and guidelines.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}