import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
        );
        setRoom(data);
      } catch (error) {
        toast.error("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (startHour && endHour && room) {
      const start = parseInt(startHour);
      const end = parseInt(endHour);
      if (end > start) {
        setTotalCost((end - start) * room.hourlyRate);
      } else {
        setTotalCost(0);
      }
    }
  }, [startHour, endHour, room]);

  const handleBookNowClick = () => {
    if (!user) {
      toast.error("Please login to book a room");
      navigate("/login", { state: { from: location } });
      return;
    }
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const start = parseInt(startHour);
    const end = parseInt(endHour);

    if (end <= start) {
      return toast.error("End time must be after start time");
    }

    const bookingData = {
      roomId: room._id,
      roomName: room.name,
      roomImage: room.image,
      userEmail: user.email,
      userName: user.displayName,
      date,
      startHour: start,
      endHour: end,
      totalCost,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/bookings`,
        bookingData,
        { withCredentials: true },
      );
      toast.success("Room booked successfully!");
      setIsModalOpen(false);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
      );
      setRoom(data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to book room. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Room not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {room.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Floor: {room.floor} | Capacity: {room.capacity} people
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            ${room.hourlyRate}
            <span className="text-sm text-gray-500">/hr</span>
          </p>
          <p className="text-sm font-semibold text-green-600 mt-1">
            Booked: {room.bookingCount || 0} times
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Description
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {room.description}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Amenities
        </h3>
        <div className="flex flex-wrap gap-3">
          {room.amenities?.map((amenity, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleBookNowClick}
        className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition shadow-lg"
      >
        Book Now
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Book {room.name}
            </h3>

            <form
              onSubmit={handleBookingSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  min={today}
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Start Time
                  </label>
                  <select
                    required
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    {[...Array(13)].map((_, i) => {
                      const hour = i + 8;
                      return (
                        <option key={hour} value={hour}>
                          {hour}:00
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    End Time
                  </label>
                  <select
                    required
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    {[...Array(13)].map((_, i) => {
                      const hour = i + 8;
                      return (
                        <option key={hour} value={hour}>
                          {hour}:00
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-2 flex justify-between items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Total Cost:
                </span>
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
                  ${totalCost}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition font-bold text-lg mt-2"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
