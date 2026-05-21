import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [room, setRoom] = useState(null);

  const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
        );
        setRoom(data);
        setAmenities(data.amenities || []);
      } catch (error) {
        toast.error("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedRoom = {
      name: form.name.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: parseInt(form.capacity.value),
      hourlyRate: parseFloat(form.hourlyRate.value),
      amenities: amenities,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/rooms/${id}`,
        updatedRoom,
        {
          withCredentials: true,
        },
      );
      toast.success("Room updated successfully");
      navigate("/my-listings");
    } catch (error) {
      toast.error("Failed to update room");
    }
  };

  if (loading || !room) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Update Room
      </h2>
      <form onSubmit={handleUpdateRoom} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          defaultValue={room.name}
          placeholder="Room Name"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          name="description"
          defaultValue={room.description}
          placeholder="Description"
          required
          rows="3"
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
        <input
          type="url"
          name="image"
          defaultValue={room.image}
          placeholder="Image URL"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="floor"
            defaultValue={room.floor}
            placeholder="Floor"
            required
            className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            name="capacity"
            defaultValue={room.capacity}
            placeholder="Capacity"
            required
            className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            name="hourlyRate"
            defaultValue={room.hourlyRate}
            placeholder="Hourly Rate ($)"
            required
            className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="mt-2">
          <p className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Amenities:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {amenitiesOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={amenities.includes(option)}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition mt-4 font-semibold"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
