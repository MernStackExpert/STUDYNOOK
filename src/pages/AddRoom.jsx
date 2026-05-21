import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);

  const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newRoom = {
      name: form.name.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: parseInt(form.capacity.value),
      hourlyRate: parseFloat(form.hourlyRate.value),
      amenities: amenities,
      ownerEmail: user.email,
      ownerName: user.displayName,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/rooms`, newRoom, {
        withCredentials: true,
      });
      toast.success("Room added successfully");
      navigate("/rooms");
    } catch (error) {
      console.error("Backend Error:", error.response); 
      toast.error("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Add a New Study Room
      </h2>
      <form onSubmit={handleAddRoom} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          rows="3"
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          required
          className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="floor"
            placeholder="Floor (e.g. 3rd Floor)"
            required
            className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity (e.g. 4)"
            required
            className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            name="hourlyRate"
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
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition mt-4 font-semibold"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
