import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaTimes,
  FaCalendarTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalId, setCancelModalId] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND}/bookings?email=${user?.email}`,
        {
          withCredentials: true,
        },
      );
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  const handleCancelClick = (id) => {
    setCancelModalId(id);
  };

  const confirmCancel = async () => {
    if (!cancelModalId) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND}/bookings/${cancelModalId}/cancel`,
        {},
        {
          withCredentials: true,
        },
      );
      toast.success("Booking cancelled successfully");
      setCancelModalId(null);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to cancel booking");
      setCancelModalId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider">
          Syncing schedule matrix...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-100 dark:border-gray-700/60 pb-6 mb-8"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          My Bookings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review, track status, or cancel active time-slots reserved under your
          account profile.
        </p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 p-12 rounded-3xl shadow-xl max-w-md mx-auto flex flex-col items-center"
        >
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-400 dark:text-gray-500 text-4xl mb-4">
            <FaCalendarTimes />
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            No Bookings Found
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            You haven't reserved any time-slots yet. Explore available study
            nodes to secure your next workspace.
          </p>
          <Link to="/rooms">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-sm"
            >
              Explore Rooms
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {bookings.map((booking) => (
              <motion.div
                layout
                key={booking._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700/60 transition-shadow duration-300 group"
              >
                <div className="relative h-44 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={booking.roomImage}
                    alt={booking.roomName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${
                        booking.status === "confirmed"
                          ? "bg-emerald-50/90 border-emerald-200 text-emerald-800 dark:bg-emerald-950/80 dark:border-emerald-900/40 dark:text-emerald-400"
                          : "bg-red-50/90 border-red-200 text-red-800 dark:bg-red-950/80 dark:border-red-900/40 dark:text-red-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-1">
                    {booking.roomName}
                  </h3>

                  <div className="flex flex-col gap-2.5 mb-6 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2.5">
                      <FaCalendarAlt className="text-blue-500 text-base" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FaClock className="text-blue-500 text-base" />
                      <span>
                        {booking.startHour}:00 - {booking.endHour}:00
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Total Spent
                      </p>
                      <p className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center">
                        <FaDollarSign className="text-xs font-normal text-gray-400" />
                        <span>{booking.totalCost}</span>
                      </p>
                    </div>

                    {booking.status === "confirmed" &&
                      booking.date >= today && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCancelClick(booking._id)}
                          className="px-4 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl border border-red-100/40 dark:border-red-900/20 transition-colors cursor-pointer"
                        >
                          Cancel Booking
                        </motion.button>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {cancelModalId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancelModalId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center relative z-10 border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => setCancelModalId(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>
              <div className="mx-auto w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 text-xl mb-4">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Cancel Booking?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Are you sure you want to terminate this reservation slot? This
                allocation configuration parameters cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCancelModalId(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600/80 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Keep Booking
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmCancel}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md shadow-red-600/10 transition-colors cursor-pointer"
                >
                  Yes, Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
