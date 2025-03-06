import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoMdTimer } from "react-icons/io";
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const RecentEvents = () => {
    const { data: recentEvents = [], isLoading, error } = useQuery({
        queryKey: ['recent-events'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/recent-events`);
            return data;
        }
    });

    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center my-10 md:my-20">
                <p className="text-red-500">There was an error fetching the data!</p>
            </div>
        );
    }

    return (
        <div className="my-10 bg-fixed py-10 relative bg-cover bg-center bg-no-repeat px-5">
            <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-Black">Recent Events</h2>
                <div className='max-w-screen-xl mx-auto'>
                    <Swiper
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 15 },
                            480: { slidesPerView: 2, spaceBetween: 15 },
                            768: { slidesPerView: 3, spaceBetween: 25 },
                            1024: { slidesPerView: 4, spaceBetween: 30 },
                        }}
                        spaceBetween={30}
                        loop={true}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay, FreeMode]}
                        autoplay={{ delay: 1600, disableOnInteraction: false }}
                        className="mySwiper"
                    >
                        {recentEvents.map((event) => (
                            <SwiperSlide key={event._id} className="relative">
                                <div className="card cursor-pointer group text-white bg-[#071a07] opacity-80 shadow-xl">
                                    <figure>
                                        <img src={event.imageUrl} alt="event" className='w-full h-[12rem] group-hover:scale-110 transition' />
                                    </figure>
                                    <div className="py-4 px-3">
                                        <h2 className="text-base font-bold mb-4">{event.title}</h2>
                                        <div className="divider divider-info"></div>
                                        <p className='text-base text-white mb-1'><BsFillCalendarDateFill className='inline-block mr-1' /> Date: {event.date}</p>
                                        <p className='text-base text-white mb-1'><IoMdTimer className='inline-block mr-1' /> Time: {event.time}</p>
                                        <div className="card-actions justify-end">
                                            <Link to={`/event-details/${event._id}`} className="btn bg-[#228B22] mt-3 hover:bg-[#2a5a2a] border-none text-white w-full">See More</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default RecentEvents;
