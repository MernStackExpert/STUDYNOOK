import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            StudyNook
          </h2>
          <p className="text-sm">
            Find and book quiet, private study rooms in your library easily.
            List your own room and earn.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/rooms" className="hover:text-blue-600">
            Rooms
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About Us
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact & Social</h3>
          <p className="text-sm mb-1">Email: support@studynook.com</p>
          <p className="text-sm mb-4">Phone: +880 123 456 7890</p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-8 border-t border-gray-300 dark:border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} StudyNook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
