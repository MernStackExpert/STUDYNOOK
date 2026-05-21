import { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaHome,
  FaDoorOpen,
  FaPlusCircle,
  FaClipboardList,
  FaCalendarCheck,
} from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogOut = async () => {
    try {
      await logOut();
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/logout`,
        {},
        { withCredentials: true },
      );
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome className="text-xl mb-1" />,
      isPrivate: false,
    },
    {
      name: "Rooms",
      path: "/rooms",
      icon: <FaDoorOpen className="text-xl mb-1" />,
      isPrivate: false,
    },
    {
      name: "Add Room",
      path: "/add-room",
      icon: <FaPlusCircle className="text-xl mb-1" />,
      isPrivate: true,
    },
    {
      name: "My Listings",
      path: "/my-listings",
      icon: <FaClipboardList className="text-xl mb-1" />,
      isPrivate: true,
    },
    {
      name: "My Bookings",
      path: "/my-bookings",
      icon: <FaCalendarCheck className="text-xl mb-1" />,
      isPrivate: true,
    },
  ];

  const visibleLinks = navLinks.filter((link) => !link.isPrivate || user);

  return (
    <>
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400"
          >
            <motion.div
              whileHover={{ rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaBookOpen />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              StudyNook
            </motion.span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {visibleLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400 pb-1 transition-colors"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex gap-3 md:gap-4 items-center relative">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full cursor-pointer border-2 border-blue-600 object-cover shadow-sm"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700"
                    >
                      <p className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 text-center font-bold break-words">
                        {user.displayName}
                      </p>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-center px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
        <div className="flex justify-around items-center py-2 px-1">
          {visibleLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full px-1 py-1 transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                }`
              }
            >
              <motion.div whileTap={{ scale: 0.8 }}>{link.icon}</motion.div>
              <span className="text-[10px] font-bold text-center w-full truncate leading-tight">
                {link.name}
              </span>
            </NavLink>
          ))}

          {!user && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full px-1 py-1 transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              <motion.div whileTap={{ scale: 0.8 }}>
                <FaPlusCircle className="text-xl mb-1" />
              </motion.div>
              <span className="text-[10px] font-bold text-center w-full truncate leading-tight">
                Login
              </span>
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
