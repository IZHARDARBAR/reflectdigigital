// App.jsx
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import SupportModal from "./components/SupportModal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Start from "./pages/Start";
import TermsOfService from './pages/TermsOfService';
import Certificate from './pages/Certificate';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  const [supportOpen, setSupportOpen] = useState(false);
  const location = useLocation();

  const openSupport = () => setSupportOpen(true);
  const closeSupport = () => setSupportOpen(false);

  // Check if current route is login or register page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar only show if not on login or register page */}
      {!isAuthPage && <Navbar onSupportClick={openSupport} />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* New routes added */}
        <Route path="/events" element={<Events />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/start" element={<Start />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      {/* Footer only show if not on login or register page */}
      {!isAuthPage && <Footer onSupportClick={openSupport} />}

      {/* Support Modal available globally */}
      <SupportModal isOpen={supportOpen} onClose={closeSupport} />
    </div>
  );
}