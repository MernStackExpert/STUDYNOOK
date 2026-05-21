import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaHeading,
  FaFileAlt,
  FaImage,
  FaLayerGroup,
  FaUsers,
  FaDollarSign,
  FaPen,
  FaCheckCircle,
} from "react-icons/fa";

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [room, setRoom] = useState(null);

  const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
        );
        setRoom(data);
        setAmenities(data.amenities || []);
      } catch (error) {
        toast.error("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedRoom = {
      name: form.name.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: parseInt(form.capacity.value),
      hourlyRate: parseFloat(form.hourlyRate.value),
      amenities: amenities,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
        updatedRoom,
        {
          withCredentials: true,
        },
      );
      toast.success("Room updated successfully");
      navigate("/my-listings");
    } catch (error) {
      toast.error("Failed to update room");
    }
  };

  if (loading || !room) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider">
          Fetching room records...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/60 flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/3 bg-gradient-to-br from-amber-500 to-orange-700 p-8 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)] pointer-events-none"></div>
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Editor
            </span>
            <h2 className="text-3xl font-extrabold mt-4 mb-4 leading-tight">
              Modify Workspace
            </h2>
            <p className="text-sm text-amber-500-100 leading-relaxed mb-6">
              Adjust configurations, change amenities, scale hourly pricing, or
              write an updated description summary seamlessly.
            </p>
          </div>
          <div className="hidden md:flex flex-col gap-3 relative z-10 text-xs text-amber-100">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" />
              <span>Instant update to live map</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" />
              <span>Maintains current bookings</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 sm:p-8 bg-white dark:bg-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg text-lg">
              <FaPen />
            </span>
            Update Details
          </h3>

          <form onSubmit={handleUpdateRoom} className="flex flex-col gap-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                <FaHeading />
              </div>
              <input
                type="text"
                name="name"
                defaultValue={room.name}
                placeholder="Room Name"
                required
                className="w-full p-3.5 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative group">
              <div className="absolute top-4 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                <FaFileAlt />
              </div>
              <textarea
                name="description"
                defaultValue={room.description}
                placeholder="Description"
                required
                rows="3"
                className="w-full p-3.5 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                <FaImage />
              </div>
              <input
                type="url"
                name="image"
                defaultValue={room.image}
                placeholder="Image URL"
                required
                className="w-full p-3.5 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <FaLayerGroup />
                </div>
                <input
                  type="text"
                  name="floor"
                  defaultValue={room.floor}
                  placeholder="Floor"
                  required
                  className="w-full p-3.5 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <FaUsers />
                </div>
                <input
                  type="number"
                  name="capacity"
                  defaultValue={room.capacity}
                  placeholder="Capacity"
                  required
                  min="1"
                  className="w-full p-3.5 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <FaDollarSign />
                </div>
                <input
                  type="number"
                  step="0.01"
                  name="hourlyRate"
                  defaultValue={room.hourlyRate}
                  placeholder="Hourly Rate ($)"
                  required
                  min="0"
                  className="w-full p-3.5 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="mb-3 font-bold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Amenities Selection:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenitiesOptions.map((option) => {
                  const isChecked = amenities.includes(option);
                  return (
                    <motion.label
                      whileTap={{ scale: 0.97 }}
                      key={option}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-sm font-semibold cursor-pointer select-none transition-all ${
                        isChecked
                          ? "bg-amber-50 border-amber-400 text-amber-700 dark:bg-amber-950/40 dark:border-amber-500 dark:text-amber-400"
                          : "bg-white border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-gray-300 cursor-pointer hidden"
                      />
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${isChecked ? "bg-amber-500 dark:bg-amber-400" : "bg-gray-300 dark:bg-gray-600"}`}
                      ></span>
                      {option}
                    </motion.label>
                  );
                })}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-amber-500/20 dark:shadow-transparent transition-all mt-2 cursor-pointer border-transparent"
            >
              Save Configuration
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateRoom;
