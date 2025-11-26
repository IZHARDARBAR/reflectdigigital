import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaLightbulb, FaLaptop, FaClock, FaChartLine, FaUsers, FaLock,
  FaChevronRight, FaChevronLeft, FaChevronUp,
} from "react-icons/fa";

// ==========================================
// 1. ICONS
// ==========================================

const LeftChevronIcon = ({ className }) => <FaChevronLeft className={className} />;
const UpChevronIcon = ({ className }) => <FaChevronUp className={className} />;

// ==========================================
// 2. DATA CONSTANTS
// ==========================================

const AWARDS_DATA = [
  [{ id: 1, src: "/1.png" }, { id: 2, src: "/9.png" }, { id: 3, src: "/4.png" }, { id: 4, src: "/4.png" }],
  [{ id: 5, src: "/5.png" }, { id: 6, src: "/6.png" }, { id: 7, src: "/10017.png" }, { id: 8, src: "/8.png" }],
  [{ id: 5, src: "/9.png" }, { id: 6, src: "/10025.png" }, { id: 7, src: "/10.png" }, { id: 8, src: "/12.png" }],
  [{ id: 5, src: "/10014.png" }, { id: 6, src: "/10015.png" }, { id: 7, src: "/10017.png" }, { id: 8, src: "/10018.png" }],
  [{ id: 5, src: "/10019.png" }, { id: 6, src: "/10020.png" }, { id: 7, src: "/10022.png" }, { id: 8, src: "/10023.png" }],
  [{ id: 5, src: "/10024.png" }, { id: 6, src: "/10025.png" }, { id: 7, src: "/10026.png" }, { id: 8, src: "/10028.png" }],
  [{ id: 5, src: "/1.png" }, { id: 6, src: "/10028.png" }, { id: 7, src: "/4.png" }, { id: 8, src: "/5.png" }],
  [{ id: 5, src: "/6.png" }, { id: 6, src: "/8.png" }, { id: 7, src: "/9.png" }, { id: 8, src: "/10.png" }],
  [{ id: 5, src: "/10014.png" }, { id: 6, src: "/12.png" }, { id: 7, src: "/10015.png" }, { id: 8, src: "/10017.png" }],
  [{ id: 5, src: "/10017.png" }, { id: 6, src: "/10018.png" }, { id: 7, src: "/10019.png" }, { id: 8, src: "/10020.png" }],
];

const NEXT_LEVEL_POSTS = [
  { id: 1, imageUrl: "/main1.png", bgImageUrl: "/mainbg1.png", title: "Becky Simms" },
  { id: 2, imageUrl: "/main2.png", bgImageUrl: "/mainbg2.png", title: "How to Build Impactful Relationships with Journalists" },
  { id: 3, imageUrl: "/main3.png", bgImageUrl: "/mainbg3.png", title: "My Work Experience Week: Rebecca" },
  { id: 4, imageUrl: "/main4.png", bgImageUrl: "/mainbg4.png", title: "The Future of SEO: Trends to Watch in 2024" },
  { id: 5, imageUrl: "/main5.png", bgImageUrl: "/mainbg5.png", title: "Crafting the Perfect Social Media Campaign" },
  { id: 6, imageUrl: "/main6.png", bgImageUrl: "/mainbg6.png", title: "Data-Driven Marketing: A Practical Guide" },
  { id: 7, imageUrl: "/main1.png", bgImageUrl: "/mainbg5.png", title: "Email Marketing that Converts" },
  { id: 8, imageUrl: "/main7.png", bgImageUrl: "/mainbg7.png", title: "Behind the Scenes of Our Latest Event" },
  { id: 9, imageUrl: "/main8.png", bgImageUrl: "/mainbg8.png", title: "Behind the Scenes of Our Latest Event" },
];

const TEAM_LEADERS = [
  { id: 1, imageUrl: "/aboutblog.jpg", authorName: "Founder & CEO", title: "Becky Simms" },
  { id: 2, imageUrl: "/aboutblog2.jpg", title: "Paul", authorName: "COO" },
  { id: 3, imageUrl: "/aboutblog3.jpg", authorName: "Head of SEO", title: "Andy Mollison" },
  { id: 4, imageUrl: "/aboutblog4.jpg", title: "Jonna Earle", authorName: "Head of Content and Digital PR" },
  { id: 5, imageUrl: "/aboutblog5.jpg", title: "Chantel Jordan", authorName: "Marketing Director" },
  { id: 6, imageUrl: "/aboutblog6.jpg", title: "Sarah McAreavey", authorName: "People Director" },
  { id: 7, imageUrl: "/aboutblog7.jpg", title: "Laura Harvey", authorName: "Client Service Director" },
  { id: 8, imageUrl: "/aboutblog8.jpg", title: "Luttie Namakando", authorName: "Director of Behavioural Science and Inovation" },
  { id: 9, imageUrl: "/aboutblog5.jpg", title: "Daniyal", authorName: "Director" },
];

const PARALLAX_ITEMS = [
  {
    src: "/aboutparallax1.png",
    title: "WE'RE A FAMILY.",
    subtitle: "We're a family, a unit, a place where individuals can give and receive honest, open feedback. Support comes as standard but so does the ability to challenge and it's encouraged. We care for each other, look out for each other but most importantly we push each other to be the best we can be. We're a modern family, anyone fits in provided they can live by this mantra.",
    buttonText: "JOIN OUR FAMILY",
  },
  {
    src: "/aboutparallax2.png",
    title: "LOVE OUR CRAFT.",
    subtitle: "We absolutely love our craft. If we could eat digital strategy on toast for breakfast, we would. We have experts at the top of their game leading teams full of digital mavens pushing to learn and develop at every turn. Our passion for digital spills into everything we do and leads us to put education at the forefront of our work ensuring no-one is ever left behind.",
    buttonText: "JOIN OUR TEAM",
  },
  {
    src: "/aboutparallax3.png",
    title: "GOING FOR GOLD.",
    subtitle: "Like Olympic athletes, we are always going for gold. Our ambition and drive shine through with every step we take, our eyes are always open looking for opportunity in places others miss and we remain curious at all times. Our love of our craft ensures we maintain match fitness consistently by soaking up the latest knowledge and remaining agile and strategic in our approach with data being our most critical currency.",
    buttonText: "JOIN OUR TEAM",
  },
];

const CHALLENGES_DATA = [
  { id: 1, icon: FaLightbulb, text: "I want a digital partner who understands my audience" },
  { id: 2, icon: FaLaptop, text: "I'm not getting the right traffic, leads or sales from my website" },
  { id: 3, icon: FaClock, text: "I need to deliver return on investment" },
  { id: 4, icon: FaChartLine, text: "I don't understand what marketing is working" },
  { id: 5, icon: FaUsers, text: "I don't know who my audience is or how to target them" },
  { id: 6, icon: FaLock, text: "I'm worried about how data and privacy impacts my marketing" },
];

// ==========================================
// 3. CARD COMPONENTS (RESTORED)
// ==========================================

// Used for Team Leaders
const BlogCard = ({ imageUrl, title, authorName, authorImageUrl }) => (
  <div className="bg-gray-200 h-130 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
    <div className="relative overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full sm:h-70 object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
        {title}
      </h3>
      {(authorName || authorImageUrl) && (
        <div className="flex items-center mt-4">
          {authorImageUrl && (
            <img
              src={authorImageUrl}
              alt={authorName}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3"
            />
          )}
          {authorName && (
            <span className="text-gray-600 text-xs sm:text-sm font-medium">
              {authorName}
            </span>
          )}
        </div>
      )}
    </div>
  </div>
);

// Used for Clients Next Level
const NextLevelCard = ({ imageUrl, bgImageUrl, title }) => {
  return (
    <div className="relative bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-96">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center h-90 z-0"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Image Area - Top Section */}
        <div className="flex-1 relative p-6 flex items-center justify-center">
          <div className="relative w-32 lg:mt-10 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-30 ">
            <img
              src={imageUrl}
              alt={title}
              className="w-50 object-fill rounded-lg "
            />
          </div>
        </div>

        {/* Gray Area - Bottom Section with Title and Arrow */}
        <div className="bg-gray-100 h-30 p-6 relative group-hover:bg-gray-200 transition-colors duration-300">
          <div className="flex justify-between items-center">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 pr-4">
              {title}
            </h3>

            {/* Arrow in Right Corner */}
            <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Used for Challenges (Kept for reference if needed later)
const ChallengeCard = ({ challenge }) => {
  const Icon = challenge.icon;
  return (
    <div className="group bg-white border p-4 sm:p-6 mb-6 sm:mb-10 pb-6 sm:pb-25 rounded-lg text-center hover:shadow-lg transition-transform duration-300">
      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-[#fc1974] transition-colors duration-300 -mt-10 sm:-mt-13">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white transition-colors duration-300" />
      </div>
      <p className="text-black font-semibold mt-4 text-sm sm:text-base">
        {challenge.text}
      </p>
    </div>
  );
};

// ==========================================
// 4. PAGE SECTIONS
// ==========================================

const RecognizedSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Left Side: Image Grid and Dots */}
          <div className="w-full lg:w-1/2 xl:w-2/5">
            <div className="flex justify-center mb-6">
              {Array.from({ length: AWARDS_DATA.length }).map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to recognition slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className="p-2"
                >
                  <span
                    className={`block h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                      activeIndex === index
                        ? "bg-black"
                        : "bg-gray-300 hover:bg-gray-500"
                    }`}
                  ></span>
                </button>
              ))}
            </div>
            {AWARDS_DATA[activeIndex] ? (
              <div className="grid grid-cols-2 gap-4">
                {AWARDS_DATA[activeIndex].map((award) => (
                  <div
                    key={award.id}
                    className="bg-gray-100 p-4 flex items-center justify-center aspect-video sm:aspect-square"
                  >
                    <img
                      src={award.src}
                      alt="Award"
                      className="max-w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                More awards coming soon...
              </div>
            )}
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fc1974] mb-4 uppercase tracking-tighter">
              WE'RE RECOGNISED
            </h2>
            <div className="space-y-4 text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
              <p>
                We start each digital campaign with the aim of delivering
                world-class, industry-leading work centred around never-ending
                improvement.
              </p>
              <p>
                We are grateful to have worked with amazing clients and achieved
                meaningful impact for so many businesses along the way.
              </p>
              <p>
                Winning awards isn't everything but it is great when the hard work
                and effort of our teams and clients are recognised.
              </p>
            </div>
            <button className="border-2 border-black rounded-full px-8 py-3 text-black font-semibold hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white transition-colors duration-300 text-xs sm:text-sm tracking-widest">
              WORK WITH US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const NextLevelSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPostsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setPostsPerPage(2);
      } else {
        setPostsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(NEXT_LEVEL_POSTS.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white font-sans h-175 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight mb-4 md:mb-0">
            CLIENTS WE'VE TAKEN TO <br /> THE NEXT LEVEL
          </h2>

          {totalPages > 1 && (
            <div className="flex space-x-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? "bg-gray-900 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-1">
                  {NEXT_LEVEL_POSTS
                    .slice(
                      pageIndex * postsPerPage,
                      (pageIndex + 1) * postsPerPage
                    )
                    .map((post) => (
                      <NextLevelCard
                        key={post.id}
                        imageUrl={post.imageUrl}
                        bgImageUrl={post.bgImageUrl}
                        title={post.title}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JoinOurTeamSection = () => {
  return (
    <div className="font-sans py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
          FANCY JOINING OUR TEAM?
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-8">
          WE'RE HIRING!
        </h3>
        <p className="text-xl sm:text-2xl text-white leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
          We are always interested in hearing from talented individuals who love
          digital so if you are looking for a new challenge get in contact and
          send us your CV.
        </p>
        <button className="bg-[#fc1974] rounded-full hover:bg-white hover:text-[#fc1974] text-white font-bold py-5 px-12 sm:py-6 sm:px-16 text-xl sm:text-2xl uppercase tracking-widest transition-all duration-300 transform hover:scale-105  hover:shadow-xl">
          GET IN TOUCH
        </button>
      </div>
    </div>
  );
};

const HopesGroveSection = () => {
  return (
    <div
      className="relative overflow-hidden font-sans py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/grove.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-xl sm:text-lg text-white leading-relaxed mb-12 max-w-full mx-auto font-medium">
          "WE HAVE BEEN BLOWN AWAY WITH THE SUCCESS OF THIS CAMPAIGN,AND REFLECT
          DIGITAL'S DEDICATION TO MANAGING OUR DIGITAL. RESULTS HAVE BEEN
          INCREDIBLE,AND IT'S BEEN GREAT TO SEE THE COUNTINUED INCREASE IN
          TRAFFIC AND SALES FROM THE LATEST CAMPAIGN. SALE HAVE BEEN COMPLETELY
          TRANSFORMED, AND THE NURSERY IS EMBARKING ON THE BIGGEST EXPANSION WE
          HAVE SEEN IN OUR 29-YEARS HISTORY,JUST SO WE CAN FULFIL THE VOLUME OF
          ORDERS."
        </p>
        <p className="font-bold mb-10">
          Morris Hankison | Managing Director at Hope Grove Nurseries
        </p>
        <img
          src="/grovelogo.png"
          alt="Company Logo"
          className="mx-auto -mb-15  w-28 sm:w-36 lg:w-40 opacity-90"
        />
      </div>
    </div>
  );
};

// Insights Section (Team Leaders)
function InsightsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPostsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setPostsPerPage(2);
      } else {
        setPostsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(TEAM_LEADERS.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 font-sans py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <UpChevronIcon className="absolute top-6 right-4 sm:top-12 sm:right-10 lg:top-24 lg:right-40 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-purple-800 opacity-50 hidden sm:block" />
      <UpChevronIcon className="absolute bottom-8 left-4 sm:bottom-12 sm:left-10 lg:bottom-16 lg:left-24 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-teal-400 opacity-50 hidden sm:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-black text-gray-900 uppercase  leading-tight mb-4 md:mt-0">
            <span>MEET</span>
            <span className="text-[#fc1974]">
              {" "}
              <br /> OUR LEADERS
            </span>
            <h4 className="text-xl mt-10 -mb-10">
              We're a digital marketing agency with a team of friendly <br />{" "}
              and fun experts.
            </h4>
          </h2>
          <div className="flex items-center space-x-2 mt-50 self-center md:self-auto">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                aria-label={`Go to page ${index + 1}`}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
              >
                <span
                  className={`block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? "bg-gray-900 scale-125"
                      : "bg-gray-400 hover:bg-gray-600"
                  }`}
                ></span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-1">
                  {TEAM_LEADERS
                    .slice(
                      pageIndex * postsPerPage,
                      (pageIndex + 1) * postsPerPage
                    )
                    .map((post) => (
                      <BlogCard
                        key={post.id}
                        imageUrl={post.imageUrl}
                        title={post.title}
                        authorName={post.authorName}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. MAIN COMPONENT (HOME)
// ==========================================

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
      {/* Top Section with Parallax Background */}
      <section className="relative flex bg-white flex-col justify-center min-h-screen overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center lg:left-117 lg:w-[900px] lg:h-[580px]"
          style={{
            backgroundImage: "url('/About.png')",
          }}
        />
        <div className="absolute inset-0 bg-white/50 lg:bg-transparent"></div>
        <div className="relative z-10 max-w-2xl mx-4 lg:mx-auto lg:pl-9 -translate-x-0 lg:-translate-x-70">
          <p className="text-sm sm:text-base lg:text-lg text-black mb-4 lg:mb-5 mt-8 lg:mt-15 text-left lg:text-left">
            Home / About Us
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 lg:mb-6 text-black drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] text-left lg:text-left">
            THE PERFORMANCE MARKETING AGENCY YOUR CLIENTS WILL THANK WILL FOR
            HIRING.
          </h1>
        </div>
      </section>

      {/* Unleash Section */}
      <section className="bg-white py-8 sm:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-24 items-center">
            {/* Left Column: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white mb-20 sm:mb-75 rounded-xl sm:rounded-2xl p-2 sm:p-3 relative z-20">
                <img
                  src="/Unleash.png"
                  alt="A smiling woman working on a laptop in a bright office"
                  className="rounded-lg sm:rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-extrabold text-black tracking-wide leading-tight uppercase">
                Unleash
                <br />
                your digital
                <br />
                performance
              </h2>
              <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-6">
                <p className="text-black leading-relaxed text-sm sm:text-base">
                  Reflect Digital is a performance marketing agency specialising
                  in combining behavioural science with the art of marketing.
                </p>
                <p className="text-black leading-relaxed text-sm sm:text-base">
                  Putting our client's customers first, we work closely with
                  ambitious global brands and eCommerce businesses...
                </p>
                <p className="text-black leading-relaxed text-sm sm:text-base">
                  We believe end-customers do not care what channel they find
                  their solution(s) via...
                </p>
                <p className="text-black leading-relaxed text-sm sm:text-base">
                  Since we were founded in 2011, we've received many awards and
                  recognitions...
                </p>
                <p className="text-black leading-relaxed text-sm sm:text-base">
                  We're also a proud member of The Human First Collective
                  alongside Aspiration Digital and LAB.
                </p>
              </div>
              <button className="mt-4 sm:mt-8 lg:mt-10 px-6 sm:px-8 py-2 sm:py-3 border-2 hover:border-[#fc1974] border-black rounded-full text-black font-semibold hover:bg-[#fc1974] hover:text-white transition-colors duration-300 text-xs sm:text-sm tracking-wider">
                SEE THE CLIENTS WE'VE HELPED
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="bg-white font-sans py-8 sm:py-16 lg:py-24 overflow-hidden">
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <LeftChevronIcon className="absolute top-1/4 -left-2 sm:left-0 md:left-1/2 md:-ml-12 lg:left-1/2 lg:-ml-24 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-purple-800 transform -translate-y-1/2 z-0 hidden md:block" />
          <UpChevronIcon className="absolute bottom-0 left-1/2 -ml-8 sm:-ml-16 md:left-1/2 md:-ml-40 lg:left-1/3 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-fuchsia-500 transform translate-y-full sm:translate-y-1/2 z-0 hidden sm:block" />

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 sm:gap-8 lg:gap-16">
            {/* Text Column */}
            <div className="relative z-10 order-2 lg:order-1 text-center mb-12 lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                VISION
              </h1>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base lg:text-4xl font-bold text-black leading-relaxed max-w-xl mx-auto lg:mx-0">
                  WE WILL LEAVE A WAKE OF DIGITAL ENLIGHTENMENT.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed max-w-xl mx-auto lg:mx-0">
                  The digital world is ever-changing, this is one of the reasons
                  we love it so much...
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed max-w-xl mx-auto lg:mx-0">
                  We are digital trailblazers, ensuring we are chasing humans
                  not algorithms in our approach.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed max-w-xl mx-auto lg:mx-0">
                  With this comes a passion for sharing and for education...
                </p>
              </div>
              <button className="mt-4 sm:mt-8 px-6 sm:px-8 lg:px-10 py-2 sm:py-3 lg:py-4 border-2 border-black rounded-full font-semibold text-black text-xs sm:text-sm tracking-widest hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 transition-colors duration-300">
                GET IN TOUCH
              </button>
            </div>

            {/* Image Column */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/vison.png"
                  alt="A woman smiling while working on a laptop in a creative office space."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="bg-white py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            {/* Left Column: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3  relative z-10">
                <img
                  src="/mission.png"
                  alt="A smiling woman working on a laptop in a bright office"
                  className="rounded-lg sm:rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-extrabold  text-black tracking-wide  -translate-y-25 uppercase">
                MISSION
              </h2>
              <p className="text-black text-5xl font-extrabold">
                To help everyone take the next step.
              </p>
              <div className="mt-6 sm:mt-8 space-y-4">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  From our team to our clients our focus is to always be moving
                  forward.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  That next step could be a small delight in learning something
                  new or a strategic transformation, we're not fussy. As long as
                  we're progressing and helping those around us to achieve their
                  goals then we're succeeding with our mission.
                </p>
              </div>
              <button className="mt-6 sm:mt-8 lg:mt-10 px-6 sm:px-8 py-2 sm:py-3 border-2 border-black rounded-full text-black font-semibold hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white transition-colors duration-300 text-xs sm:text-sm tracking-wider">
                GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Scroll Image Section */}
      <section className="relative">
        {PARALLAX_ITEMS.map((item, index) => (
          <div
            key={index}
            className="h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-start lg:pr-80 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl sm:text-3xl md:text- lg:pr-120 lg:text-5xl xl:text-5xl  text-white font-bold drop-shadow-lg mb-4 sm:mb-6">
                {item.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl  drop-shadow-lg text-white mb-4 sm:mb-6 max-w-4xl">
                {item.subtitle}
              </p>
              <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border-2 lg:mr-180 border-white text-white rounded-full font-semibold text-xs sm:text-sm hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white transition-colors duration-300">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* WORKING WITH US SECTION */}
      <section className="bg-white py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            {/* Left Column: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg sm:shadow-2xl relative z-10">
                <img
                  src="/Unleash.png"
                  alt="A smiling woman working on a laptop in a bright office"
                  className="rounded-lg sm:rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-wide leading-tight uppercase">
                WORKING WITH US
              </h2>
              <div className="mt-6 sm:mt-8 space-y-4">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  We thrive on collaborating and feeling part of your team -
                  when we work together, great things can happen.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  We pride ourselves on having an educative approach, taking
                  time to ensure our rationale is understood. Our client
                  relationships always start with a discovery phase, ensuring we
                  take time to understand your business, goals, market, audience
                  and opportunity. By doing this we set you up for success
                  ensuring we have the right strategy to deliver what your
                  business needs and what your audience wants.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  One of our motto's at Reflect Digital is to 'love what you do'
                  - therefore we ensure our team are all passionate about their
                  roles and love coming to work each day. By having this at the
                  core of our culture it ensures we have fun at work and that
                  comes across in the way that we work. We look for likeminded
                  clients who also have a passion for their work and a desire to
                  build collaborative relationships with a shared goal.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Sounds fun, doesn't it? If you are searching for a new agency,
                  do not hesitate to get in touch.
                </p>
              </div>
              <button className="mt-6 sm:mt-8 lg:mt-10 px-6 sm:px-8 py-2 sm:py-3 border-2 border-black rounded-full text-black font-semibold hover:bg-[#fc1974] hover:border-[#fc1974] hover:text-white transition-colors duration-300 text-xs sm:text-sm tracking-wider">
                GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </section>

      <InsightsSection />

      <JoinOurTeamSection />

      <NextLevelSection />

      <HopesGroveSection />

      <RecognizedSection />
    </>
  );
}