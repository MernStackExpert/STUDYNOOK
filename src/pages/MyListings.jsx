import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaEdit,
  FaLayerGroup,
  FaDollarSign,
  FaPlus,
  FaFolderOpen,
  FaExclamationTriangle,
} from "react-icons/fa";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const fetchMyRooms = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/rooms`);
      const filteredRooms = data.filter(
        (room) => room.ownerEmail === user?.email,
      );
      setMyRooms(filteredRooms);
    } catch (error) {
      toast.error("Failed to load your listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyRooms();
    }
  }, [user]);

  const confirmDelete = async () => {
    if (!deleteModalId) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}/rooms/${deleteModalId}`,
        {
          withCredentials: true,
        },
      );
      toast.success("Room deleted successfully");
      setDeleteModalId(null);
      fetchMyRooms();
    } catch (error) {
      toast.error("Failed to delete room");
      setDeleteModalId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider">
          Loading listings...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-gray-700/60 pb-6 mb-8 gap-4"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Room Listings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage, update, or remove the workspaces you have listed.
          </p>
        </div>
        {myRooms.length > 0 && (
          <Link to="/add-room">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl text-sm shadow-md shadow-blue-600/10 cursor-pointer"
            >
              <FaPlus className="text-xs" />
              Add Another Room
            </motion.button>
          </Link>
        )}
      </motion.div>

      {myRooms.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 p-12 rounded-3xl shadow-xl max-w-md mx-auto flex flex-col items-center"
        >
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-400 dark:text-gray-500 text-4xl mb-4">
            <FaFolderOpen />
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            No Listings Yet
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            You haven't listed any study slots. Monetize your available space by
            putting it on the map.
          </p>
          <Link to="/add-room">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2 text-sm"
            >
              <FaPlus className="text-xs" />
              Create First Listing
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/60 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                  <th className="p-5">Room Details</th>
                  <th className="p-5">Floor Location</th>
                  <th className="p-5">Hourly Rate</th>
                  <th className="p-5 text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm font-medium">
                {myRooms.map((room) => (
                  <tr
                    key={room._id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-14 h-14 rounded-xl object-cover border border-gray-100 dark:border-gray-700 bg-gray-50"
                        />
                        <span className="text-gray-900 dark:text-white font-bold text-base line-clamp-1">
                          {room.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaLayerGroup className="text-gray-400 dark:text-gray-500 text-xs" />
                        <span>{room.floor}</span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-900 dark:text-white font-bold">
                      <div className="flex items-center gap-0.5">
                        <FaDollarSign className="text-gray-400 dark:text-gray-500 text-xs font-normal" />
                        <span>{room.hourlyRate}</span>
                        <span className="text-gray-400 dark:text-gray-500 text-xs font-normal ml-0.5">
                          /hr
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-right pr-8">
                      <div className="flex justify-end gap-2.5">
                        <Link to={`/update-room/${room._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl transition-colors cursor-pointer border border-amber-100/40 dark:border-amber-900/20"
                            title="Update Listing"
                          >
                            <FaEdit className="text-sm" />
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDeleteModalId(room._id)}
                          className="p-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl transition-colors cursor-pointer border border-red-100/40 dark:border-red-900/20"
                          title="Delete Listing"
                        >
                          <FaTrash className="text-sm" />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {deleteModalId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModalId(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center relative z-10 border border-gray-100 dark:border-gray-700/60"
            >
              <div className="mx-auto w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 text-xl mb-4">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Room?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Are you sure you want to permanently delete this listing? All
                associated bookings and schedule parameters will be deleted
                permanently.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteModalId(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600/80 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md shadow-red-600/10 transition-colors cursor-pointer"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyListings;
