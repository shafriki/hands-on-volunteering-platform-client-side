import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const EventDetails = () => {
  const { id } = useParams();
  const hasViewCountUpdated = useRef(false);

  // Fetch event details using React Query and Axios
  const { data: event, isLoading, isError } = useQuery({
    queryKey: ['eventDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/event/${id}`);
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (id && !hasViewCountUpdated.current) {
      axios.put(`${import.meta.env.VITE_API_URL}/event/view/${id}`);
      hasViewCountUpdated.current = true;
    }
  }, [id]);

  // Loading and Error handling
  if (isLoading) {
    return (
      <div className="text-center my-10 md:my-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-10 md:my-20 text-red-500">
        <p>Error fetching event details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>

      {/* Event details card */}
      <div className="mx-auto flex flex-col md:flex-row justify-between w-full gap-12 p-6 cursor-pointer group my-10">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-md">
              <img
                className="object-cover w-full md:h-[35rem] group-hover:scale-110 transition"
                src={event.imageUrl}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Event Info */}
          <h2 className="text-3xl font-bold text-gray-800">{event.title}</h2>
          <hr className="my-6" />
          <div className="text-xs md:text-lg font-light text-justify text-neutral-500">
            {event.description}
          </div>
          <hr className="my-6" />
          <div className="text-lg text-neutral-900 font-light flex flex-row items-center gap-2">
            <div><span className='font-semibold'>Organizer Email:</span> {event.email}</div>

          </div>
          <hr className="my-6" />
          <div>
            <p className="gap-4 font-light text-neutral-500">
              <span className='font-semibold'>Location:</span> {event.location}
            </p>
            <p className="gap-4 font-light text-neutral-500">
              <span className='font-semibold'>Event Date:</span> {event.date}
            </p>
            <p className="gap-4 font-light text-neutral-500">
              <span className='font-semibold'>Time:</span> {event.time}
            </p>
          </div>
          <hr className="my-6" />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
