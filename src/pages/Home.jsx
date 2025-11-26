import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaLightbulb,
  FaLaptop,
  FaClock,
  FaChartLine,
  FaUsers,
  FaLock,
  FaChevronRight,
  FaChevronLeft,
  FaChevronUp,
} from "react-icons/fa";

// --- Data Constants ---
const CHALLENGES_DATA = [
  { id: 1, icon: FaLightbulb, text: "I want a digital partner who understands my audience" },
  { id: 2, icon: FaLaptop, text: "I'm not getting the right traffic, leads or sales from my website" },
  { id: 3, icon: FaClock, text: "I need to deliver return on investment" },
  { id: 4, icon: FaChartLine, text: "I don't understand what marketing is working" },
  { id: 5, icon: FaUsers, text: "I don't know who my audience is or how to target them" },
  { id: 6, icon: FaLock, text: "I'm worried about how data and privacy impacts my marketing" },
];

const BLOG_POSTS = [
  { id: 1, imageUrl: "/sidebar1.png", title: "Search is Changing Fast: Get Ready to Lead", eventDate: "31/07/2025" },
  { id: 2, imageUrl: "/sidebar2.png", title: "How to Build Impactful Relationships..." },
  { id: 3, imageUrl: "/sidebar3.png", title: "My Work Experience Week: Rebecca", authorName: "Rebecca", authorImageUrl: "https://i.pravatar.cc/40?u=rebecca" },
  { id: 4, imageUrl: "/sidebar4.png", title: "The Future of SEO: Trends to Watch in 2024", authorName: "Alex", authorImageUrl: "https://i.pravatar.cc/40?u=alex" },
  { id: 5, imageUrl: "/sidebar5.png", title: "Crafting the Perfect Social Media Campaign", authorName: "Taylor", authorImageUrl: "https://i.pravatar.cc/40?u=taylor" },
  { id: 6, imageUrl: "/sidebar4.png", title: "Data-Driven Marketing: A Practical Guide", authorName: "Casey", authorImageUrl: "https://i.pravatar.cc/40?u=casey" },
  { id: 7, imageUrl: "/sidebar6.png", title: "Email Marketing that Converts", authorName: "Jordan", authorImageUrl: "https://i.pravatar.cc/40?u=jordan" },
];

const PARALLAX_DATA = [
  {
    src: "/Parallax.png",
    title: "SUCCESS STORIES - OPAYO",
    subtitle: "COMBINING PAID MEDIA, SEO AND BEHAVIOURAL INSIGHTS TO DRIVE A 283% YOY INCREASE IN LEADS",
    buttonText: "VIEW CASE STUDY",
  },
  {
    src: "/Parallax1.png",
    title: "SUCCESS STORIES - BRAKES",
    subtitle: "DRIVING AN ADDITIONAL £60MIL+ IN REVENUE FOR ECOMMERCE BRAND, BRAKERS",
    buttonText: "VIEW CASE STUDY",
  },
  {
    src: "/Parallax2.png",
    title: "SUCCESS STORIES - HOPES GROVE NURSERIES",
    subtitle: "FULLY INTEGRATE STRATEGY DRIVES COMPANY-WIDE SELLOUT IN 6 MONTHS",
    buttonText: "VIEW CASE STUDY",
  },
];

const CLIENT_LOGOS = [
  "/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png", "/logo5.png",
];

// --- Sub-Components ---

const ChallengeCard = ({ challenge }) => {
  const Icon = challenge.icon;
  return (
    <div className="group bg-white border p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300 relative mt-8">
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-[#fc1974] transition-colors duration-300 absolute -top-8 left-1/2 transform -translate-x-1/2">
        <Icon className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />
      </div>
      <p className="text-black font-semibold mt-8 text-sm sm:text-base leading-relaxed">
        {challenge.text}
      </p>
    </div>
  );
};

const InsightsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageRanges = [[0, 3], [3, 6], [4, 7]];

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header + Navigation Dots */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
            Digital Marketing
            <br />
            Insights & Events
          </h2>

          <div className="flex gap-4 mt-6 md:mt-0">
            {[0, 1, 2].map((i) => (
              <button key={i} onClick={() => setCurrentPage(i)} className="relative p-2">
                <span
                  className={`absolute inset-0 rounded-full border-2 border-black transition-all duration-300 ${
                    currentPage === i ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
                <span className="block w-3 h-3 bg-black rounded-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Slider Content */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {pageRanges.map((range, pageIdx) => (
              <div key={pageIdx} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                  {BLOG_POSTS.slice(range[0], range[1]).map((post) => (
                    <div
                      key={post.id}
                      className="bg-white overflow-hidden shadow-lg w-full max-w-sm flex flex-col hover:shadow-2xl transition-shadow duration-300"
                    >
                      {/* Image */}
                      <div className="h-64 overflow-hidden bg-black relative">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {post.eventDate && (
                           <span className="absolute top-4 left-4 bg-white text-pink-600 px-3 py-1 font-bold text-xs rounded">
                             EVENT: {post.eventDate}
                           </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col justify-between flex-grow h-64">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 leading-snug line-clamp-3 mb-4">
                            {post.title}
                          </h3>
                          {post.authorName && (
                            <div className="flex items-center gap-3">
                              <img
                                src={post.authorImageUrl}
                                alt={post.authorName}
                                className="w-10 h-10 rounded-full border border-gray-200"
                              />
                              <span className="text-pink-600 font-medium text-sm">
                                by {post.authorName}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-4">
                          <FaChevronRight className="text-2xl text-gray-800" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Read More Button */}
        <div className="text-center mt-12">
          <button className="px-10 py-4 border-2 text-black border-black rounded-full font-bold text-base uppercase tracking-wider hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white transition-all duration-300">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/Home.png')" }}
        />
        <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Optional Overlay for better text readability */}
        
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20">
          <div className="max-w-4xl">
            <p className="text-white font-bold text-sm sm:text-base lg:text-lg mb-4 tracking-widest uppercase">
              We are Reflect Digital
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-6xl font-black text-white leading-none mb-40 uppercase">
              Unleash<br />Your Digital<br />Performance
            </h1>
            <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-white hover:text-[#fc1974] transition-all duration-300 transform hover:scale-105">
              OUR WORK
            </button>
          </div>
        </div>
      </section>

      {/* 2. Intro Text Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-8 text-black uppercase"
            data-aos="fade-up"
          >
            A Behavioural Science-Led Digital Marketing Agency
          </h2>
          <h3
            className="text-xl md:text-3xl font-bold leading-tight mb-10 text-gray-800"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Connecting your audience, and their motivations with your brand to deliver exponential growth.
          </h3>
          <button
            className="border-2 border-black text-black bg-white rounded-full px-10 py-4 font-bold tracking-widest uppercase hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Talk to us
          </button>
        </div>
      </section>

      {/* 3. Challenges Section */}
      <section className="bg-[#f0f0f0] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-black mb-16 uppercase">
            What are your challenges?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {CHALLENGES_DATA.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button className="px-8 py-3 border-2 border-black rounded-full text-black font-semibold text-sm hover:bg-[#fc1974] hover:text-white hover:border-[#fc1974] transition-colors duration-300 tracking-wider uppercase">
              I'd like to discuss something else
            </button>
          </div>
        </div>
      </section>

      {/* 4. Strategy Section (Image Left, Text Right) */}
      <section className="bg-white py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/insights.png"
                  alt="Insights Strategy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight uppercase mb-8">
                Uniting human<br />insights with<br />digital strategy
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  Whether you're looking to increase the performance of your content, optimise your search marketing strategy or drive more traffic and conversions to take your marketing to the next level, the Reflect Digital team go further to help you reach your goals.
                </p>
                <p>
                  As a leading behavioural science Digital Agency, we believe in uniting digital marketing with human behaviour insights, creativity and technology to work smarter, not harder to elevate your digital marketing efforts.
                </p>
              </div>
              <button className="mt-10 px-8 py-3 border-2 border-black rounded-full text-black font-semibold hover:bg-[#fc1974] hover:text-white hover:border-[#fc1974] transition-colors duration-300 text-sm tracking-wider uppercase">
                See our work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Audience Section (Text Left, Image Right) */}
      <section className="bg-white py-20 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Background Decor Icons */}
          <FaChevronLeft className="hidden lg:block absolute top-0 left-0 text-purple-800 w-16 h-16 opacity-20 -translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight uppercase mb-8">
                Get under the skin of your audience
              </h2>
              <div className="space-y-6 text-gray-700 font-medium text-lg leading-relaxed">
                <p>
                  Ensure your messaging resonates with users by leveraging human insights to understand their motivators based on psychological factors that influence purchase decisions.
                </p>
                <p>
                  Strategic thinking allows us to see past channels as solutions and instead delve deeper into your organisation's challenges and how our experts can help you solve them.
                </p>
              </div>
              <button className="mt-10 px-10 py-3 border-2 border-black rounded-full font-semibold text-black text-sm tracking-widest hover:bg-[#fc1974] hover:text-white hover:border-[#fc1974] transition-colors duration-300 uppercase">
                Talk to us
              </button>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-bl-[80px] overflow-hidden shadow-xl">
                <img
                  src="/audaince.png"
                  alt="Audience Insights"
                  className="w-full h-auto object-cover"
                />
              </div>
              <FaChevronUp className="hidden lg:block absolute bottom-0 -left-8 text-fuchsia-500 w-12 h-12" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Parallax Section */}
      <section>
        {PARALLAX_DATA.map((item, index) => (
          <div
            key={index}
            className="h-screen bg-cover bg-center bg-fixed relative flex items-center"
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 container mx-auto px-6">
              <div className="max-w-3xl text-white">
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 uppercase tracking-wide">
                  {item.title}
                </h3>
                <h2 className="text-3xl md:text-5xl font-black leading-tight mb-8 uppercase">
                  {item.subtitle}
                </h2>
                <button className="px-8 py-3 border-2 border-white text-white rounded-full font-bold text-sm hover:bg-white hover:text-[#fc1974] transition-colors duration-300 tracking-wider">
                  {item.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 7. Insights Slider Section */}
      <InsightsSection />

      {/* 8. Client Logos */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {CLIENT_LOGOS.map((logo, index) => (
              <div key={index} className="w-32 md:w-40 flex items-center justify-center">
                <img
                  src={logo}
                  alt={`client-logo-${index}`}
                  className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}