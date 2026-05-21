import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const fetchMyRooms = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/rooms`);
      const filteredRooms = data.filter(
        (room) => room.ownerEmail === user?.email,
      );
      setMyRooms(filteredRooms);
    } catch (error) {
      toast.error("Failed to load your listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyRooms();
    }
  }, [user]);

  const confirmDelete = async () => {
    if (!deleteModalId) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}/rooms/${deleteModalId}`,
        {
          withCredentials: true,
        },
      );
      toast.success("Room deleted successfully");
      setDeleteModalId(null);
      fetchMyRooms();
    } catch (error) {
      toast.error("Failed to delete room");
      setDeleteModalId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        My Room Listings
      </h2>

      {myRooms.length === 0 ? (
        <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            You have not listed any rooms yet.
          </p>
          <Link
            to="/add-room"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add a Room
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="p-4 border-b dark:border-gray-600">Room Name</th>
                <th className="p-4 border-b dark:border-gray-600">Floor</th>
                <th className="p-4 border-b dark:border-gray-600">Rate</th>
                <th className="p-4 border-b dark:border-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {myRooms.map((room) => (
                <tr
                  key={room._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition border-b dark:border-gray-600"
                >
                  <td className="p-4 text-gray-900 dark:text-white font-medium">
                    {room.name}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">
                    {room.floor}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">
                    ${room.hourlyRate}/hr
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <Link
                      to={`/update-room/${room._id}`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition text-sm font-semibold"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => setDeleteModalId(room._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteModalId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Delete Room?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to permanently delete this room? All
              associated bookings will be removed.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
