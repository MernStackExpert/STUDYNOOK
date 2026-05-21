import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaExclamationCircle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8 bg-gray-50/50 dark:bg-gray-900/40 transition-colors duration-300">
      <div className="max-w-md w-full text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="relative mb-8 flex justify-center text-blue-600 dark:text-blue-400"
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }}
            className="text-9xl"
          >
            <FaExclamationCircle />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-7xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-8 leading-relaxed font-medium px-4">
            The workspace configuration you are trying to reach does not exist, has been deleted, or shifted to an alternate routing network.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/20 dark:shadow-transparent transition-all cursor-pointer text-sm"
            >
              <FaHome className="text-base" />
              <span>Back to Home Dashboard</span>
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFound;