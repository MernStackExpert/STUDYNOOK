import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RoomCard from "../components/RoomCard";
import {
  FaArrowRight,
  FaSearch,
  FaCalendarCheck,
  FaGraduationCap,
  FaShieldAlt,
  FaClock,
  FaLightbulb,
  FaQuoteLeft,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRooms = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}/rooms?limit=4`,
        );
        setFeaturedRooms(data);
      } catch (error) {
        console.error("Error fetching featured rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestRooms();
  }, []);

  const steps = [
    {
      icon: <FaSearch />,
      title: "Discover Spaces",
      desc: "Filter through premium listings, quiet pods, or collaborative conference environments seamlessly.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Configure Slots",
      desc: "Select matching target dates alongside exact duration lengths with built-in conflict protection.",
    },
    {
      icon: <FaGraduationCap />,
      title: "Maximize Focus",
      desc: "Unlock access codes instantly, walk straight into your zone, and elevate your core parameters.",
    },
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-blue-600 dark:text-blue-400" />,
      title: "Secure Encrypted Ecosystem",
      desc: "All scheduling matrix data structures are secured against overlapping time conflict parameters natively.",
    },
    {
      icon: <FaClock className="text-emerald-600 dark:text-emerald-400" />,
      title: "Real-Time Allocation Sync",
      desc: "Dashboard components pull live configuration records down instantaneously with full consistency.",
    },
    {
      icon: <FaLightbulb className="text-amber-500" />,
      title: "Optimized Productivity Layouts",
      desc: "Listed spaces prioritize optimal acoustic boundaries, ergonomics, and seamless power output grids.",
    },
  ];

  const reviews = [
    {
      name: "Alex Rivera",
      role: "Graduate Researcher",
      img: "https://i.pravatar.cc/100?img=12",
      text: "Securing the Silent Pod configuration during peak final weeks directly saved my research timeline. Absolute premium workflow execution.",
    },
    {
      name: "Sarah Jenkins",
      role: "Software Engineering Student",
      img: "https://i.pravatar.cc/100?img=47",
      text: "The integration of real-time time-conflict prevention gives me total confidence that my room won't be double-booked when I arrive.",
    },
    {
      name: "Marcus Chen",
      role: "Data Science Major",
      img: "https://i.pravatar.cc/100?img=33",
      text: "Monetizing my private team room during off-hours through the listing panel has been completely smooth. The interface is incredibly polished.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/20 transition-colors duration-300 pb-16 overflow-hidden">
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-950/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-xl border border-blue-100 dark:border-blue-900/30 mb-6">
              Next-Gen Academic Infrastructure
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-6">
              Reserve Your Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Focus Sanctuary
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-medium">
              Eliminate coordination friction. Instantly secure premium, private
              study spaces designed perfectly for distraction-free execution and
              high-output concentration workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/rooms">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Explore Available Nooks</span>
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
              <Link to="/add-room">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all cursor-pointer"
                >
                  List Your Space
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-4"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl transform rotate-3 scale-102 opacity-10 blur-xl"></div>
            <div className="relative border border-gray-100 dark:border-gray-700/60 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5 aspect-[4/3] bg-gray-100 dark:bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Premium Work Space"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Premium Spaces
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">
              Featured Study Nodes
            </h2>
          </div>
          <Link
            to="/rooms"
            className="flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline group shrink-0"
          >
            <span>View all listings</span>
            <FaChevronRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : featuredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3  gap-3 sm:gap-6 lg:gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-sm font-semibold text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            No active room specifications currently published.
          </div>
        )}
      </section>

      <section className="bg-white dark:bg-gray-800/40 border-y border-gray-100 dark:border-gray-800/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Operational Roadmap
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">
              How StudyNook Performs
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
              Three modular processing architecture tiers designed to secure
              your workspace pipeline within moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                key={idx}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-xl font-bold shadow-md border border-blue-100/30 dark:border-blue-900/20 group-hover:scale-105 transition-transform duration-300 mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1 mb-4">
              Engineered For High Concentration
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium mb-6">
              Our framework shifts administrative strain completely out of view,
              allowing system modules to handle schedule enforcement and
              concurrency optimization automatically.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-lg mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              User Telemetry
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">
              Validation From Researchers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-sm flex flex-col justify-between relative group"
              >
                <div className="absolute top-6 right-6 opacity-5 text-4xl text-gray-900 dark:text-white">
                  <FaQuoteLeft />
                </div>
                <div>
                  <div className="flex gap-1 text-amber-400 text-xs mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium mb-6">
                    "{rev.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50 dark:border-gray-700">
                  <img
                    src={rev.img}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-700"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">
            Secure Next Interval Target Slot Now
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-md mx-auto mb-8 font-medium leading-relaxed">
            Stop dealing with baseline resource conflicts inside local
            facilities. Provision authorized node access keys instantly.
          </p>
          <Link to="/rooms">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white text-blue-700 font-extrabold rounded-2xl shadow-md cursor-pointer inline-flex items-center gap-2 text-sm"
            >
              <span>Initialize Workspace Locator</span>
              <FaArrowRight className="text-xs" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
