
import React, { useState, useEffect } from 'react'; 
import SupportModal from '../components/SupportModal'; 

const Contact = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(true);
  }, []); 

  return (
    <>
     
      {/* Modal component render */}
      <SupportModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
};

export default Contact;