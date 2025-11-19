// src/pages/Contact.jsx

import React, { useState, useEffect } from 'react'; // <<-- useEffect ko import karein
import SupportModal from '../components/SupportModal'; // <<-- Path check kar lein

const Contact = () => {
  // Modal ki state by default false rakhein
  const [isModalOpen, setModalOpen] = useState(false);

  // useEffect ka istemal karein taki component load hone ke baad modal khul jaye
  useEffect(() => {
    // Component ke pehli baar render hone par, modal ko open kar dein
    setModalOpen(true);
  }, []); // <<-- Khali array ka matlab hai ki yeh effect sirf ek baar (component mount hone par) chalega

  return (
    <>
     

      {/* Modal component ko yahan render karein */}
      <SupportModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} // User abhi bhi modal ko band kar sakta hai
      />
    </>
  );
};

export default Contact;