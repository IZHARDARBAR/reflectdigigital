import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = ({ onSupportClick }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    monthlyBudget: "",
    businessChallenge: "",
    agreeToPolicy: false,
    marketingOffers: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return ( 
    <section className="bg-black text-center flex flex-col justify-start items-center relative py-16 md:py-44">
      {/* Heading */} 
      <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-extrabold mb-8">
        HAVE A PROJECT YOU <br /> WOULD LIKE TO DISCUSS? 
      </h2>

      {/* Form toggle */}  
      {!showForm ? (  
        <button  
          onClick={() => setShowForm(true)}  
          className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-500 transition"  
        >  
          LET'S TALK  
        </button>  
      ) : (  
        <div className="max-w-2xl w-full px-4 mt-6">  
          <form className="space-y-4" onSubmit={handleSubmit}>  
            {/* Name fields */}  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full bg-black border border-white p-2 rounded font-bold text-white text-sm" />  
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full bg-black border border-white p-2 rounded font-bold text-white text-sm" />  
            </div>  

            {/* Email & Company */}  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full bg-black border border-white p-2 rounded font-bold text-white text-sm" />  
              <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company" className="w-full bg-black border border-white p-2 rounded font-bold text-white text-sm" />  
            </div>  

            {/* Phone & Monthly Budget */}  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full bg-black border border-white p-2 rounded font-bold text-white text-sm" />  
              <select name="monthlyBudget" value={formData.monthlyBudget} onChange={handleInputChange} className="w-full bg-black border border-white p-2 rounded font-bold text-white text-sm">  
                <option value="" disabled>Select Monthly Budget</option>  
                <option value="<1000">Less than PKR1,000</option>  
                <option value="1000-5000">PKR1,000 - PKR5,000</option>  
                <option value="5000-10000">PKR5,000 - PKR10,000</option>  
                <option value="10000+">PKR10,000+</option>  
              </select>  
            </div>  

            {/* File Upload */}  
            <div>  
              <div className="border border-white border-dashed p-3 rounded text-center bg-black font-bold text-sm">  
                <input type="file" className="hidden" id="file-upload" />  
                <label htmlFor="file-upload" className="cursor-pointer text-gray-400">  
                  Upload Your Brief (Click or Drag & Drop)  
                </label>  
              </div>  
            </div>  

            {/* Business Challenge */}  
            <textarea name="businessChallenge" value={formData.businessChallenge} onChange={handleInputChange} placeholder="What's your business challenge?" className="w-full bg-black border border-white p-2 rounded h-24 text-white font-bold text-sm" />  

            {/* Checkboxes */}  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">  
              <div className="flex items-start">  
                <input type="checkbox" id="agreeToPolicy" name="agreeToPolicy" checked={formData.agreeToPolicy} onChange={handleInputChange} className="mt-1 mr-2" />  
                <label htmlFor="agreeToPolicy" className="text-gray-300">  
                  I agree that my data will be used and stored as outlined in the privacy policy.  
                </label>  
              </div>  
              <div className="flex items-start">  
                <input type="checkbox" id="marketingOffers" name="marketingOffers" checked={formData.marketingOffers} onChange={handleInputChange} className="mt-1 mr-2" />  
                <label htmlFor="marketingOffers" className="text-gray-300">  
                  I want to receive marketing and promotional offers.  
                </label>  
              </div>  
            </div>  

            <button type="submit" className="bg-pink-600 w-full text-white hover:text-pink-600 py-3 rounded-full font-semibold hover:bg-white transition text-lg">  
              SEND ENQUIRY  
            </button>  
          </form>  
        </div>  
      )}  

      {/* Footer links */}  
      <div className="flex justify-center gap-6 mt-8 text-white text-sm flex-wrap">  
        <Link to="/terms-of-service" className="text-gray-400 cursor-pointer hover:text-white transition-colors">
          Terms of Service
        </Link>  
        <Link to="/certificate" className="text-gray-400 cursor-pointer hover:text-white transition-colors">
          Certificate
        </Link>  
        <Link to="/faqs" className="text-gray-400 cursor-pointer hover:text-white transition-colors">
          FAQs
        </Link>  
        {/* Contact link opens SupportModal */}  
        <span className="text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={onSupportClick}>
          Contact
        </span>  
        <Link to="/privacy-policy" className="text-gray-400 cursor-pointer hover:text-white transition-colors">
          Privacy Policy
        </Link>  
      </div>  

      {/* Copyright */}  
      <p className="mt-4 text-gray-500 text-xs">  
        ©{new Date().getFullYear()} Reflect Digital.  
      </p>  
    </section>  
  );
};

export default Footer;