import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLayerGroup,
  FaUsers,
  FaDollarSign,
  FaArrowRight,
} from "react-icons/fa";

const RoomCard = ({ room }) => {
  const {
    _id,
    name,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities,
  } = room;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700/60 group"
    >
      <div className="relative overflow-hidden h-52 aspect-[4/3] bg-gray-100 dark:bg-gray-700">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800 flex items-center gap-1">
          <FaDollarSign className="text-blue-600 dark:text-blue-400" />
          <span className="text-base font-extrabold">{hourlyRate}</span>/hr
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl mb-5 text-sm font-medium text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FaLayerGroup className="text-blue-500 dark:text-blue-400 text-base shrink-0" />
            <span className="truncate">{floor}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-blue-500 dark:text-blue-400 text-base shrink-0" />
            <span>{capacity} Seats</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6 content-start min-h-[28px]">
          {amenities?.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-lg border border-blue-100/50 dark:border-blue-900/30"
            >
              {amenity}
            </span>
          ))}
          {amenities?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg">
              +{amenities.length - 3}
            </span>
          )}
        </div>

        <Link to={`/rooms/${_id}`} className="mt-auto block">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-600/20 dark:hover:shadow-transparent transition-all cursor-pointer"
          >
            <span>View Details</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
