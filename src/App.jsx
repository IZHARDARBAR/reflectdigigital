// App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import SupportModal from "./components/SupportModal";

export default function App() {
  const [supportOpen, setSupportOpen] = useState(false);

  const openSupport = () => setSupportOpen(true);
  const closeSupport = () => setSupportOpen(false);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar onSupportClick={openSupport} />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer onSupportClick={openSupport} />

      {/* Support Modal available globally */}
      <SupportModal isOpen={supportOpen} onClose={closeSupport} />
    </div>
  );
}
