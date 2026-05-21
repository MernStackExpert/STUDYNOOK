import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../components/RoomCard";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        let url = `${import.meta.env.VITE_BACKEND}/rooms`;
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filter) params.append("amenities", filter);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const { data } = await axios.get(url);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [search, filter]);

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        All Available Rooms
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by room name..."
          className="p-3 border rounded-md w-full md:w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded-md w-full md:w-1/4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Filter by Amenity (All)</option>
          <option value="Whiteboard">Whiteboard</option>
          <option value="Projector">Projector</option>
          <option value="Wi-Fi">Wi-Fi</option>
          <option value="Power Outlets">Power Outlets</option>
          <option value="Quiet Zone">Quiet Zone</option>
          <option value="Air Conditioning">Air Conditioning</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 mt-10">
          No rooms found.
        </div>
      )}
    </div>
  );
};

export default AllRooms;
