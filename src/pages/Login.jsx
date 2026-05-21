import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaQuoteLeft,
} from "react-icons/fa";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/jwt`,
        { email: result.user.email },
        { withCredentials: true },
      );
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
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
      navigate(from, { replace: true });
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
        className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-700"
      >
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-10 flex flex-col justify-center text-white relative overflow-hidden">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 right-10 opacity-20 text-8xl"
          >
            <FaQuoteLeft />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Welcome Back to <br />{" "}
              <span className="text-blue-200">StudyNook</span>
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Log in to your account to discover perfect study spaces, manage
              your bookings, and boost your productivity. Your focus zone is
              just a click away.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-4">
                <img
                  className="w-12 h-12 rounded-full border-2 border-indigo-800"
                  src="https://i.pravatar.cc/100?img=1"
                  alt="User 1"
                />
                <img
                  className="w-12 h-12 rounded-full border-2 border-indigo-800"
                  src="https://i.pravatar.cc/100?img=2"
                  alt="User 2"
                />
                <img
                  className="w-12 h-12 rounded-full border-2 border-indigo-800"
                  src="https://i.pravatar.cc/100?img=3"
                  alt="User 3"
                />
              </div>
              <p className="text-sm font-medium">Join 5,000+ students</p>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white dark:bg-gray-800 relative">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Log In
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Access your account and resume your studies.
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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

              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all"
              >
                Log In
              </motion.button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
                or continue with
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
              Sign in with Google
            </motion.button>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:underline dark:text-blue-400"
              >
                Create one
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
