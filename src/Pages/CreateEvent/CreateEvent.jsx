import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import { imageUpload } from '../../Hooks/api/utils';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import { AuthContext } from '../../providers/AuthProvider';
import Select from 'react-select';

const CreateEvent = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const axiosSecure = useAxiosSecure();

    const categoryOptions = [
        { value: 'Health', label: 'Health' },
        { value: 'Education', label: 'Education' },
        { value: 'Environment', label: 'Environment' },
        { value: 'Community', label: 'Community' },
        { value: 'Charity', label: 'Charity' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedCategory || !image) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all required fields.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            setLoading(true);

            const imageUrl = await imageUpload(image);

            const response = await axiosSecure.post(
                '/create-event',
                {
                    title: event.target.title.value,
                    category: selectedCategory.value,
                    description: eventDescription,
                    date: eventDate,
                    time: eventTime,
                    location: eventLocation,
                    imageUrl,
                    email: user?.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );

            // console.log('Response:', response?.data);

            if (response?.data?.success) {
                event.target.reset();
                setSelectedCategory(null);
                setImage(null);
                setEventDate('');
                setEventTime('');
                setEventLocation('');
                setEventDescription('');

                Swal.fire({
                    title: 'Success!',
                    text: 'Event created successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response?.data?.message || 'Unknown error occurred.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (err) {
            console.error('Error creating event', err);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while creating the event.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-green-800" style={{ backgroundImage: 'url("https://i.ibb.co.com/ksVmHLdR/129040833-gettyimages-1386409598-jpg.webp")' }}>
                <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
                    <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">
                        Create a New Volunteer Event
                    </h1>
                </div>
            </div>

            <div className="p-5 md:p-10 rounded-md bg-gray-200 max-w-screen-lg mx-auto shadow my-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-2">Event Title</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Enter event title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">Event Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Event Category</label>
                        <Select
                            name="category"
                            options={categoryOptions}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            className="basic-select"
                            classNamePrefix="select"
                            placeholder="Select an event category"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Event Description</label>
                        <textarea
                            name="description"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter event description"
                            rows="5"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-2">Event Date</label>
                            <input
                                type="date"
                                name="date"
                                className="w-full border border-gray-300 p-2 rounded"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">Event Time</label>
                            <input
                                type="time"
                                name="time"
                                className="w-full border border-gray-300 p-2 rounded"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Event Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter event location"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full btn border-none bg-[#2fc4bd] text-white py-2 px-4 rounded hover:bg-[#1c7975] transition"
                        disabled={loading}
                    >
                        {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
