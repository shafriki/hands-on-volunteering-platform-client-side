import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import { imageUpload } from '../../Hooks/api/utils';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import { AuthContext } from '../../providers/AuthProvider';
import Select from 'react-select';

const HelpRequest = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [selectedUrgency, setSelectedUrgency] = useState(null);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const axiosSecure = useAxiosSecure();

    const urgencyOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
        { value: 'Emergency', label: 'Emergency' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedUrgency || !image) {
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
                '/help-request',
                {
                    title: event.target.title.value,
                    urgency: selectedUrgency.value,
                    description,
                    location,
                    imageUrl,
                    email: user?.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );

            if (response?.data?.success) {
                event.target.reset();
                setSelectedUrgency(null);
                setImage(null);
                setLocation('');
                setDescription('');

                Swal.fire({
                    title: 'Success!',
                    text: 'Help request posted successfully.',
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
            console.error('Error creating help request', err);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while posting the request.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-green-800"
                style={{ backgroundImage: 'url("https://i.ibb.co.com/ksVmHLdR/129040833-gettyimages-1386409598-jpg.webp")' }}>
                <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
                    <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">
                        Request for Help
                    </h1>
                </div>
            </div>

            <div className="p-5 md:p-10 rounded-md bg-gray-200 max-w-screen-lg mx-auto shadow my-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-2">Request Title</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Enter help request title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">Image</label>
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
                        <label className="block font-medium mb-2">Urgency Level</label>
                        <Select
                            name="urgency"
                            options={urgencyOptions}
                            value={selectedUrgency}
                            onChange={setSelectedUrgency}
                            className="basic-select"
                            classNamePrefix="select"
                            placeholder="Select urgency level"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Describe the help needed"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter location details"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full btn border-none bg-[#2fc4bd] text-white py-2 px-4 rounded hover:bg-[#1c7975] transition"
                        disabled={loading}
                    >
                        {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Post Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HelpRequest;
