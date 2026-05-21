import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
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
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";

const AddRoom = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);

  const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newRoom = {
      name: form.name.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: parseInt(form.capacity.value),
      hourlyRate: parseFloat(form.hourlyRate.value),
      amenities: amenities,
      ownerEmail: user.email,
      ownerName: user.displayName,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/rooms`, newRoom, {
        withCredentials: true,
      });
      toast.success("Room added successfully");
      navigate("/rooms");
    } catch (error) {
      console.error("Backend Error:", error.response);
      toast.error("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/60 flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)] pointer-events-none"></div>
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Dashboard
            </span>
            <h2 className="text-3xl font-extrabold mt-4 mb-4 leading-tight">
              List Your Space
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed mb-6">
              Fill out the details to list your study room. Providing precise
              capacities, exact locations, and accurate rates helps students
              find their ideal match efficiently.
            </p>
          </div>
          <div className="hidden md:flex flex-col gap-3 relative z-10 text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" />
              <span>Visible to thousands instantly</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" />
              <span>Automated conflict control</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 sm:p-8 bg-white dark:bg-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg text-lg">
              <FaPlus />
            </span>
            Room Information
          </h3>

          <form onSubmit={handleAddRoom} className="flex flex-col gap-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaHeading />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Room Name (e.g. Premium Silent Pod)"
                required
                className="w-full p-3.5 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative group">
              <div className="absolute top-4 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaFileAlt />
              </div>
              <textarea
                name="description"
                placeholder="Detailed description of setup, ideal usage guidelines, or specifications..."
                required
                rows="3"
                className="w-full p-3.5 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaImage />
              </div>
              <input
                type="url"
                name="image"
                placeholder="Valid Image URL (Unsplash, Imgur, etc.)"
                required
                className="w-full p-3.5 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaLayerGroup />
                </div>
                <input
                  type="text"
                  name="floor"
                  placeholder="Floor / Level"
                  required
                  className="w-full p-3.5 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaUsers />
                </div>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Seats"
                  required
                  min="1"
                  className="w-full p-3.5 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaDollarSign />
                </div>
                <input
                  type="number"
                  step="0.01"
                  name="hourlyRate"
                  placeholder="Rate / hr"
                  required
                  min="0"
                  className="w-full p-3.5 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="mb-3 font-bold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Select Amenities:
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
                          ? "bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-950/40 dark:border-blue-500 dark:text-blue-400"
                          : "bg-white border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={option}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer hidden"
                      />
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${isChecked ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"}`}
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
              className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 dark:shadow-transparent transition-all mt-2 cursor-pointer"
            >
              Publish Listing
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddRoom;
