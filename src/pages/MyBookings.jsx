import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelModalId, setCancelModalId] = useState(null);

    const today = new Date().toISOString().split('T')[0];

    const fetchBookings = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/bookings?email=${user?.email}`, {
                withCredentials: true
            });
            setBookings(data);
        } catch (error) {
            toast.error("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchBookings();
        }
    }, [user]);

    const handleCancelClick = (id) => {
        setCancelModalId(id);
    };

    const confirmCancel = async () => {
        if (!cancelModalId) return;

        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND}/bookings/${cancelModalId}/cancel`, {}, {
                withCredentials: true
            });
            toast.success("Booking cancelled successfully");
            setCancelModalId(null);
            fetchBookings();
        } catch (error) {
            toast.error("Failed to cancel booking");
            setCancelModalId(null);
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
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">You have no bookings yet.</p>
                    <Link to="/rooms" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Explore Rooms
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 overflow-hidden flex flex-col">
                            <img src={booking.roomImage} alt={booking.roomName} className="w-full h-40 object-cover" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{booking.roomName}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><span className="font-semibold">Date:</span> {booking.date}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><span className="font-semibold">Time:</span> {booking.startHour}:00 - {booking.endHour}:00</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4"><span className="font-semibold">Total Cost:</span> ${booking.totalCost}</p>
                                
                                <div className="mt-auto flex justify-between items-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                        {booking.status}
                                    </span>
                                    
                                    {booking.status === 'confirmed' && booking.date >= today && (
                                        <button 
                                            onClick={() => handleCancelClick(booking._id)}
                                            className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cancelModalId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cancel Booking?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => setCancelModalId(null)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition font-semibold"
                            >
                                No, Keep it
                            </button>
                            <button 
                                onClick={confirmCancel}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-semibold"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;