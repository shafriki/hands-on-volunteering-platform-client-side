import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { IoMdTimer } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';

const AllEvents = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch events data using react-query
    const { data: events = [], isLoading, isError } = useQuery({
        queryKey: ['events', searchTerm],  // Cache query based on searchTerm
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-events`, {
                params: { searchTerm },  // Pass search term as query parameter
            });
            return data;
        },
    });

    // Handle loading and error states
    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner /> {/* Show loading spinner */}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center my-10 md:my-20 text-red-500">
                <p>Error fetching events. Please try again later.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 justify-between my-12 gap-5">
                {/* Left Side Section for Search */}
                <aside className="col-span-3 mx-3 md:mt-10 md:mx-0">
                    <div className="p-4 bg-gray-200 shadow-lg rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Search Events</h3>
                        <input
                            type="text"
                            placeholder="Search by event title"
                            className="input input-bordered w-full mb-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm on input change
                        />
                    </div>
                </aside>

                {/* Events List Section */}
                <section className="col-span-9 mx-3 md:mx-0">
                    <div className="max-w-screen-xl mx-5 my-10 md:mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-[#f4f9f9] cursor-pointer group rounded-lg shadow-lg overflow-hidden"
                                >
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full group-hover:scale-110 transition h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

                                        {/* Event Details */}
                                        <p className="text-sm text-gray-500"><span className="font-bold">
                                        <FaLocationCrosshairs className="inline-block mr-1" />
                                        </span>{' '}{event.location}</p>
                                        <p className="text-sm text-gray-500"><span className="font-bold">
                                        <BiCategory className="inline-block mr-1" />
                                        </span>{' '}{event.category}</p>
                                        <p className="text-sm text-gray-500"><span className="font-bold">
                                        <IoMdTimer className="inline-block mr-1" />
                                        </span>{' '}{event.time}</p>
                                        <p className="text-sm text-gray-500"><span className="font-bold">
                                        <MdOutlineDateRange className="inline-block mr-1" />
                                        </span>{' '}{event.date}</p>
                                        
                                    </div>
                                    <Link to={`/event-details/${event._id}`} className='btn w-full bg-green-300 mb-2'>See Details</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AllEvents;
