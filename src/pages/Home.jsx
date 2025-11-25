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

// Add these icon components at the top of your file, after imports
const LeftChevronIcon = ({ className }) => (
  <FaChevronLeft className={className} />
);

const UpChevronIcon = ({ className }) => <FaChevronUp className={className} />;

const ChevronPatternIcon = ({ className }) => (
  <div className={className}>
    <FaChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
    <FaChevronRight className="w-6 h-6 lg:w-8 lg:h-8 -ml-3 lg:-ml-4" />
    <FaChevronRight className="w-6 h-6 lg:w-8 lg:h-8 -ml-3 lg:-ml-4" />
  </div>
);

// Updated BlogCard Component with larger size for full image display


const BlogCard = ({ imageUrl, title, authorName, authorImageUrl, date }) => (
  <div className="bg-black overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group border border-gray-100 h-full flex flex-col rounded-xl">
    {/* Larger Image Container - Full width and taller */}
    <div className="relative overflow-hidden h-80 sm:h-96 lg:h-[400px] flex-shrink-0">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition: "center top" }}   // topi bhi safe rahegi
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70"></div>

      {/* Event Date Badge - Sirf pehle card pe (optional) */}
      {date && (
        <div className="absolute top-6 left-6 bg-white text-pink-600 px-5 py-2 rounded font-bold text-sm shadow-lg z-10">
          EVENT DATE: {date}
        </div>
      )}

      {/* Title on Image - Positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
          {title}
        </h3>
      </div>
    </div>

    {/* Author Section - Sirf jahan author hai tab dikhega */}
    {authorName && (
      <div className="p-6 sm:p-8 bg-white flex-grow flex items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
            <img
              src={authorImageUrl || "https://i.pravatar.cc/60"}
              alt={authorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base sm:text-lg font-bold text-gray-900 truncate">
              {authorName}
            </p>
            <p className="text-sm text-gray-600">Digital Marketing Specialist</p>
          </div>
          {/* Purple Arrow */}
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white transform group-hover:scale-110 group-hover:bg-purple-700 transition-all duration-300 flex-shrink-0">
            <FaChevronRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    )}
  </div>
);
// ChallengeCard Component
const ChallengeCard = ({ challenge }) => {
  const Icon = challenge.icon;
  return (
    <div className="group w-91 -ml-12 bg-white border  sm:p-6  sm:mb-10 pb-6 sm:pb-25 rounded-lg text-center hover:shadow-lg transition-transform duration-300">
      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-[#fc1974] transition-colors duration-300 -mt-10 sm:-mt-13">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white transition-colors duration-300" />
      </div>
      <p className="text-black font-semibold mt-4 text-sm sm:text-base">
        {challenge.text}
      </p>
    </div>
  );
};

// Challenge data
const challengesData = [
  {
    id: 1,
    icon: FaLightbulb,
    text: "I want a digital partner who understands my audience",
  },
  {
    id: 2,
    icon: FaLaptop,
    text: "I'm not getting the right traffic, leads or sales from my website",
  },
  { id: 3, icon: FaClock, text: "I need to deliver return on investment" },
  {
    id: 4,
    icon: FaChartLine,
    text: "I don't understand what marketing is working",
  },
  {
    id: 5,
    icon: FaUsers,
    text: "I don't know who my audience is or how to target them",
  },
  {
    id: 6,
    icon: FaLock,
    text: "I'm worried about how data and privacy impacts my marketing",
  },
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    imageUrl: "/sidebar1.png",
    title: "Search is Changing Fast: Get Ready to Lead ",
    eventDate: "31/07/2025",
    showAuthorImage: false
    
  },
  {
    id: 2,
    imageUrl: "/sidebar2.png",
    title: "How to Build Impactful Relationships...",
  },
  {
    id: 3,
    imageUrl: "/sidebar3.png",
    title: "My Work Experience Week: Rebecca",
    authorName: "Rebecca",
    authorImageUrl: "https://i.pravatar.cc/40?u=rebecca",
  },
  {
    id: 4,
    imageUrl: "/sidebar4.png",
    title: "The Future of SEO: Trends to Watch in 2024",
    authorName: "Alex",
    authorImageUrl: "https://i.pravatar.cc/40?u=alex",
  },
  {
    id: 5,
    imageUrl: "/sidebar5.png",
    title: "Crafting the Perfect Social Media Campaign",
    authorName: "Taylor",
    authorImageUrl: "https://i.pravatar.cc/40?u=taylor",
  },
  {
    id: 6,
    imageUrl: "/sidebar4.png",
    title: "Data-Driven Marketing: A Practical Guide",
    authorName: "Casey",
    authorImageUrl: "https://i.pravatar.cc/40?u=casey",
  },
  {
    id: 7,
    imageUrl: "/sidebar6.png",
    title: "Email Marketing that Converts",
    authorName: "Jordan",
    authorImageUrl: "https://i.pravatar.cc/40?u=jordan",
  },
];

function InsightsSection() {
  const [currentPage, setCurrentPage] = useState(0);

  const pageRanges = [
    [0, 3], 
    [3, 6], 
    [4, 7],
  ];

  return (
    <div className="bg-gray-100 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Icons (optional) */}
      <div className="absolute top-10 right-10 w-20 h-20 text-purple-600 opacity-30 hidden lg:block">
        ↑
      </div>
      <div className="absolute bottom-10 left-10 w-20 h-20 text-teal-500 opacity-30 hidden lg:block">
        ↑
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header + Dots */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
            Digital Marketing
            <br />
            Insights & Events
          </h2>

          <div className="flex gap-8 mt-6 mb-10 translate-y-12 md:mt-0 items-center">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className="relative"
              >
                {/* Active Circle Indicator */}
                <span
                  className={`absolute -inset-2 rounded-full border-4 border-black transition-all duration-500 ${
                    currentPage === i
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                />

                {/* Always Black Dot */}
                <span className="relative block  w-4 h-4 bg-black rounded-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {pageRanges.map((range, pageIdx) => (
              <div key={pageIdx} className="w-full flex-shrink-0">
                {/* Perfect Grid with Center Alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center px-4">
                  {blogPosts.slice(range[0], range[1]).map((post, idx) => {
                    const isOverlapCard = pageIdx === 2 && idx < 2; // cards 5 & 6 on last page
                    const isLastVisibleCard = idx === range[1] - range[0] - 1;

                    return (
                      <div
                        key={post.id}
                        className={`
                          bg-white  overflow-hidden shadow-lg
                          ${pageIdx === 2 && idx < 2 ? 'scale-100' : ''}
                        `}
                        style={{
                          width: "450px",
                          height: "510px",
                          maxWidth: "100%",
                          margin: "0 auto", // ← Perfect center in each grid cell
                        }}
                      >
                        {/* Image - Fixed 318px */}
                        <div
                          style={{ height: "286px" }}
                          className="overflow-hidden bg-black"
                        >
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content - Fixed 224px */}
                        <div
                          className="p-8 flex flex-col justify-between"
                          style={{ height: "224px" }}
                        >
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-3 mb-5">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-4">
                              <img
                                src={post.authorImageUrl}
                                alt={post.authorName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                              />
                              <span className="text-pink-600 font-medium text-lg">
                                by {post.authorName}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <span className="text-4xl font-light text-gray-800">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Read More Button */}
        <div className="text-center mt-16">
          <button className="px-12 py-5 border-2 text-black border-black rounded-full font-bold text-lg uppercase tracking-wider hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white transition-all duration-300">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Section with Parallax Background*/}
      <section className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/Home.png')",
          }}
        />
        <div className="absolute inset-0"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 pt-20 lg:pt-32">
          {/* WE ARE REFLECT DIGITAL - Updated positioning and styling */}
          <div className=" mb-30  lg:mb-8">
            <p className="text-sm sm:text-base  lg:text-lg font-bold lg:-translate-x-90 lg:-translate-y-20 text-white mb-2 -translate-x-10 lg:text-left">
              WE ARE REFLECT DIGITAL
            </p>
          </div>

          {/* Main Heading */}
          <div className=" lg:text-left mb-8 lg:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-black lg:-translate-x-90 lg:-translate-y-10 -translate-y-15 -translate-x-10 leading-none tracking-tight text-white uppercase">
              UNLEASH
              <br />
              YOUR DIGITAL
              <br />
              PERFORMANCE
            </h1>
          </div>

          {/* OUR WORK Button - Updated positioning */}
          <div className=" lg:text-left">
            <button className="border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 lg:-translate-x-90 lg:translate-y-14 rounded-full font-bold text-sm sm:text-base tracking-widest hover:bg-white -translate-x-10 hover:text-[#fc1974] transition-all duration-300 transform hover:scale-105">
              OUR WORK
            </button>
          </div>
        </div>
      </section>

      {/* White Section with Scroll Animations */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-6xl mx-auto px-4 sm:px-6">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold leading-tight mb-6 sm:mb-8 lg:mb-10 text-black"
            data-aos="fade-up"
            data-aos-once="false"
            data-aos-duration="600"
          >
            A BEHAVIOURAL SCIENCE-LED DIGITAL MARKETING AGENCY
          </h1>
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight mb-6 sm:mb-8 lg:mb-10 text-black"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-once="false"
            data-aos-duration="600"
          >
            CONNECTING YOUR AUDIENCE, AND THEIR MOTIVATIONS WITH YOUR BRAND TO
            DELIVER EXPONENTIAL GROWTH.
          </h2>
          <button
            className="border-2 border-black text-black bg-white rounded-full px-6 sm:px-8 lg:px-12 py-3 sm:py-4 text-xs sm:text-sm lg:text-base font-bold tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-[#fc1974] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="false"
            data-aos-duration="800"
          >
            Talk to us
          </button>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="w-full bg-[#f0f0f0] py-12   sm:py-16 lg:py-24">
        <div className="container mx-auto px-15 sm:px-6 max-w-6xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-center text-black mb-8 sm:mb-12 lg:mb-16 tracking-wide">
            WHAT ARE YOUR CHALLENGES?
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-x-[155px]">
            {challengesData.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
          <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-black rounded-full text-black font-semibold text-xs sm:text-sm hover:bg-[#fc1974] hover:text-white hover:border-[#fc1974] transition-colors duration-300 tracking-wider">
              I'D LIKE TO DISCUSS SOMETHING ELSE
            </button>
          </div>
        </div>
      </section>

      {/* Insight Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            {/* Left Column: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3  relative z-10">
                <img
                  src="/insights.png"
                  alt="A smiling woman working on a laptop in a bright office"
                  className="rounded-lg sm:rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-black tracking-wide leading-tight uppercase">
                Uniting human
                <br />
                insights with
                <br />
                digital strategy
              </h2>
              <div className="mt-6 sm:mt-8 space-y-4">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Whether you're looking to increase the performance of your
                  content, optimise your search marketing strategy or drive more
                  traffic and conversions to take your marketing to the next
                  level, the Reflect Digital team go further to help you reach
                  your goals.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  As a leading behavioural science Digital Agency, we believe in
                  uniting digital marketing with human behaviour insights,
                  creativity and technology to work smarter, not harder to
                  elevate your digital marketing efforts.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Our team leverage their expertise to tackle your business
                  challenges. Our strategic approach will ensure your business
                  and audience needs are met with the right combination of
                  channels and creativity.
                </p>
              </div>
              <button className="mt-6 sm:mt-8 lg:mt-10 px-6 sm:px-8 py-2 sm:py-3 border-2 border-black rounded-full text-black font-semibold hover:bg-[#fc1974] hover:text-white hover:border-[#fc1974] transition-colors duration-300 text-xs sm:text-sm tracking-wider">
                SEE OUR WORK
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE SECTION */}
      <section className="bg-white font-sans py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <LeftChevronIcon className="absolute top-1/4 -left-2 sm:left-0 md:left-1/2 md:-ml-12 lg:left-1/2 lg:-ml-24 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-purple-800 transform -translate-y-1/2 z-0 hidden md:block" />
          <UpChevronIcon className="absolute bottom-0 left-1/2 -ml-8 sm:-ml-16 md:left-1/2 md:-ml-40 lg:left-1/3 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-fuchsia-500 transform translate-y-full sm:translate-y-1/2 z-0 hidden sm:block" />

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-16">
            {/* Text Column */}
            <div className="relative z-10 mb-70 order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl  md:text-4xl lg:text-5xl xl:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                Get under the skin of your audience
              </h1>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base translate-y-15 lg:text-lg text-gray-700 font-bold leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Ensure your messaging resonates with users by leveraging human
                  insights to understand their motivators based on psychological
                  factors that influence purchase decisions. Our approach
                  delivers high return on investment by making sure your budget
                  is spent where maximum impact can be achieved.
                </p>
                <p className="text-sm sm:text-base lg:text-lg translate-y-16 text-gray-700 font-bold leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Strategic thinking allows us to see past channels as solutions
                  and instead delve deeper into your organisation's challenges
                  and how our experts can help you solve them.
                </p>
              </div>
              <button className="mt-6 sm:mt-8 px-6 sm:px-8 lg:px-10 py-2 translate-y-26 sm:py-3 lg:py-4 border-2 border-black rounded-full font-semibold text-black text-xs sm:text-sm tracking-widest hover:bg-[#fc1974] hover:text-white hover:border-[#fc1974] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 transition-colors duration-300">
                TALK TO US
              </button>
            </div>

            {/* Image Column */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[3/4]  sm:rounded-bl-[5rem] lg:rounded-bl-[5rem] overflow-hidden">
                <img
                  src="/audaince.png"
                  alt="A woman smiling while working on a laptop in a creative office space."
                  className="w-120 h-full  object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Scroll Image Section */}
      <section className="relative">
        {[
          {
            src: "/Parallax.png",
            title: "SUCCESS STORIES-OPAYO",
            subtitle:
              " COMBINING PAID MEDIA, SEO AND BEHAVIOURAL INSIGHTS TO DRIVE A  283% YOY INCREASE IN LEADS",
            buttonText: "VIEW CASE STUDY",
          },
          {
            src: "/Parallax1.png",
            title: "SUCCESS STORIES - BRAKES",
            subtitle:
              "DRIVING AN ADDITIONAL £60MIL+ IN REVENUE FOR ECOMMERCE BRAND, BRAKERS",
            buttonText: "VIEW CASE STUDY",
          },
          {
            src: "/Parallax2.png",
            title: "SUCCESS STORIES - HOPES GROVE NURSERIES",
            subtitle:
              "FULLY INTEGRATE  STRATEGY DRIVES COMPANY-WIDE SELLOUT IN 6 MONTHS",
            buttonText: "VIEW CASE STUDY",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-start lg:pr-80  px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-2xl lg:pr-140  text-white font-extrabold  mb-4 sm:mb-6">
                {item.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold leading-18 text-white mb-4 sm:mb-6 max-w-4xl">
                {item.subtitle}
              </p>
              <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border-2 lg:mr-175 border-white text-white rounded-full font-semibold text-xs sm:text-sm hover:bg-white hover:text-[#fc1974] transition-colors duration-300">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </section>

      <InsightsSection />

      {/* CLIENT LOGO SECTION */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12">
            {[
              "/logo1.png",
              "/logo2.png",
              "/logo3.png",
              "/logo4.png",
              "/logo5.png",
            ].map((logo, index) => (
              <div
                key={index}
                className="w-24 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-28 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`client-logo-${index}`}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
