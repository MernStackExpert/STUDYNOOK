import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaThLarge, FaInbox } from "react-icons/fa";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        let url = `${import.meta.env.VITE_BACKEND}/rooms`;
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filter) params.append("amenities", filter);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const { data } = await axios.get(url);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchRooms();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, filter]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/40 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            Explore All{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Study Nooks
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm sm:text-base">
            Discover and instantly reserve premium, quiet work spaces tailored
            perfectly for your ultimate concentration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/60 flex flex-col md:flex-row gap-4 items-center mb-10"
        >
          <div className="relative w-full md:flex-1 group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search by workspace title..."
              value={search}
              className="w-full p-3.5 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-64 group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <FaFilter />
            </div>
            <select
              value={filter}
              className="w-full p-3.5 pl-12 pr-10 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold text-sm appearance-none cursor-pointer"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Standard Amenities</option>
              <option value="Whiteboard">Whiteboard Setup</option>
              <option value="Projector">Digital Projector</option>
              <option value="Wi-Fi">High-Speed Wi-Fi</option>
              <option value="Power Outlets">Dedicated Power Outlets</option>
              <option value="Quiet Zone">Strict Quiet Zone</option>
              <option value="Air Conditioning">Air Conditioning</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-72 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 dark:border-blue-400"></div>
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider">
              Syncing nooks...
            </span>
          </div>
        ) : rooms.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {rooms.map((room) => (
                <motion.div
                  layout
                  key={room._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 p-12 rounded-3xl shadow-xl max-w-md mx-auto mt-12 flex flex-col items-center"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-400 dark:text-gray-500 text-4xl mb-4">
              <FaInbox />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              No Workspaces Found
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              We couldn't locate matching listings. Try modifying your keyword
              search parameters or selecting alternate features.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilter("");
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <FaThLarge className="text-xs" />
              Reset Active Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllRooms;
