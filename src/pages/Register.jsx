import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const [error, setError] = useState("");
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

      await axios.post("http://localhost:5000/users", {
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
      await axios.post("http://localhost:5000/users", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      await axios.post(
        "http://localhost:5000/jwt",
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Register
      </h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="url"
          name="photo"
          placeholder="Photo URL"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
      <div className="mt-4 flex flex-col gap-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition"
        >
          Continue with Google
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
