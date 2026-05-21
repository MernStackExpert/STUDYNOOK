import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLink,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaCheckCircle,
} from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter");
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);

      await axios.post(`${import.meta.env.VITE_BACKEND}/users`, {
        name: name,
        email: email,
        photo: photo,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      await axios.post(`${import.meta.env.VITE_BACKEND}/users`, {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      await axios.post(
        `${import.meta.env.VITE_BACKEND}/jwt`,
        { email: result.user.email },
        { withCredentials: true },
      );

      toast.success("Google Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse border border-gray-100 dark:border-gray-700"
      >
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-800 p-10 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Join the <br />
              <span className="text-blue-200">StudyNook</span> Community
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Create your account to unlock private spaces tailored for your
              productivity. Host your own listings, find quiet zones, and build
              a smarter workflow today.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-300 text-xl shrink-0" />
                <p className="text-sm font-medium text-blue-50">
                  Instantly browse & block premium slots
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-300 text-xl shrink-0" />
                <p className="text-sm font-medium text-blue-50">
                  Time-conflict protection safeguards bookings
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-300 text-xl shrink-0" />
                <p className="text-sm font-medium text-blue-50">
                  Manage listings through an intuitive dashboard
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white dark:bg-gray-800 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Sign up now to secure your perfect study spot.
            </p>

            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full p-4 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-4 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaLink />
                </div>
                <input
                  type="url"
                  name="photo"
                  placeholder="Profile Photo URL"
                  required
                  className="w-full p-4 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full p-4 pl-12 pr-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-semibold pl-1"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all mt-2"
              >
                Register
              </motion.button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
                or sign up with
              </span>
              <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 p-4 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
            >
              <FaGoogle className="text-red-500 text-xl" />
              Sign up with Google
            </motion.button>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline dark:text-blue-400"
              >
                Log In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
