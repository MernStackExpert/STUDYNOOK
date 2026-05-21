import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaLayerGroup, FaUsers, FaDollarSign, FaCalendarAlt, FaClock, FaTimes, FaCheckCircle, FaBookmark } from "react-icons/fa";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
        );
        setRoom(data);
      } catch (error) {
        toast.error("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (startHour && endHour && room) {
      const start = parseInt(startHour);
      const end = parseInt(endHour);
      if (end > start) {
        setTotalCost((end - start) * room.hourlyRate);
      } else {
        setTotalCost(0);
      }
    }
  }, [startHour, endHour, room]);

  const handleBookNowClick = () => {
    if (!user) {
      toast.error("Please login to book a room");
      navigate("/login", { state: { from: location } });
      return;
    }
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const start = parseInt(startHour);
    const end = parseInt(endHour);

    if (end <= start) {
      return toast.error("End time must be after start time");
    }

    const bookingData = {
      roomId: room._id,
      roomName: room.name,
      roomImage: room.image,
      userEmail: user.email,
      userName: user.displayName,
      date,
      startHour: start,
      endHour: end,
      totalCost,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/bookings`,
        bookingData,
        { withCredentials: true },
      );
      toast.success("Room booked successfully!");
      setIsModalOpen(false);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
      );
      setRoom(data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to book room. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider">Syncing workspace specifications...</span>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center mt-20 text-xl font-bold text-gray-500 dark:text-gray-400">
        Workspace records not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/30 dark:bg-gray-900/20 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700/60"
      >
        <div className="relative h-[300px] sm:h-[420px] w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <span className="px-3 py-1.5 bg-blue-600/90 text-white text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md">
              Verified Space
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 dark:border-gray-700 pb-6 mb-6 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {room.name}
              </h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <FaLayerGroup className="text-blue-500" /> {room.floor}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaUsers className="text-blue-500" /> Up to {room.capacity} seats
                </span>
              </div>
            </div>
            <div className="sm:text-right bg-blue-50/50 dark:bg-blue-950/20 px-5 py-3 rounded-2xl border border-blue-100/30 dark:border-blue-900/20 shrink-0 w-full sm:w-auto">
              <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center sm:justify-end">
                <FaDollarSign className="text-lg mr-0.5" />
                {room.hourlyRate}
                <span className="text-xs text-gray-400 font-medium ml-1">/ hr</span>
              </p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                Reserved {room.bookingCount || 0} times live
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
              Description Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
              {room.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
              Included Premium Utilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {room.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3.5 py-2 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-semibold rounded-xl border border-gray-100 dark:border-gray-700"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleBookNowClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <FaBookmark className="text-sm" />
            Book This Workspace
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-full max-w-md relative z-10 border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>

              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white pr-8 truncate">
                Reserve Slot: {room.name}
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-1 mb-6">
                Configure your target parameters below to verify time-slot alignment.
              </p>

              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 pl-1">
                    Select Target Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                      <FaCalendarAlt />
                    </div>
                    <input
                      type="date"
                      min={today}
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-semibold cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 pl-1">
                      Start Hour
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <FaClock />
                      </div>
                      <select
                        required
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                        className="w-full p-3 pl-11 pr-8 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-semibold appearance-none cursor-pointer"
                      >
                        <option value="">Select</option>
                        {[...Array(13)].map((_, i) => {
                          const hour = i + 8;
                          return (
                            <option key={hour} value={hour}>
                              {hour}:00
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 pl-1">
                      End Hour
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <FaClock />
                      </div>
                      <select
                        required
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                        className="w-full p-3 pl-11 pr-8 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-semibold appearance-none cursor-pointer"
                      >
                        <option value="">Select</option>
                        {[...Array(13)].map((_, i) => {
                          const hour = i + 8;
                          return (
                            <option key={hour} value={hour}>
                              {hour}:00
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 p-4 rounded-xl mt-2 flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">
                    Calculated Subtotal:
                  </span>
                  <span className="font-extrabold text-2xl text-blue-600 dark:text-blue-400 flex items-center">
                    <FaDollarSign className="text-base font-normal mr-0.5" />
                    {totalCost}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-xl font-bold text-base shadow-lg shadow-emerald-600/10 transition-colors mt-2 cursor-pointer border-transparent flex items-center justify-center gap-2"
                >
                  <FaCheckCircle className="text-sm" />
                  Confirm Booking Securely
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomDetails;