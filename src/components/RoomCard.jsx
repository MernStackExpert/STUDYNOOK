import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const {
    _id,
    name,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities,
  } = room;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full border dark:border-gray-700 hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>
        <div className="text-sm text-gray-700 dark:text-gray-400 mb-4 grid grid-cols-2 gap-2">
          <p>
            <span className="font-semibold">Floor:</span> {floor}
          </p>
          <p>
            <span className="font-semibold">Capacity:</span> {capacity}
          </p>
          <p>
            <span className="font-semibold">Rate:</span> ${hourlyRate}/hr
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities?.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {amenities?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full">
              +{amenities.length - 3} more
            </span>
          )}
        </div>
        <Link
          to={`/rooms/${_id}`}
          className="mt-auto block text-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
