import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

const OurPrograms = () => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        axios.get('/public/programs.json')
            .then(response => {
                setPrograms(response.data.programs);  
            })
            .catch(error => {
                console.error('Error fetching programs data:', error);
            });
    }, []);

    return (
        <div>
            <h1 className='text-center text-2xl md:text-4xl font-bold'>Our Programs</h1>
            <div className="max-w-screen-xl mx-5 md:mx-auto my-16">
                <Swiper
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 15 },
                        480: { slidesPerView: 2, spaceBetween: 15 },
                        768: { slidesPerView: 3, spaceBetween: 25 },
                        1024: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay, FreeMode]}
                    autoplay={{
                        delay: 1600,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                    {programs.map((program, index) => (
                        <SwiperSlide key={index} className="relative">
                            <div className="bg-white cursor-pointer group rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src={program.image}
                                    alt={program.name}
                                    className="w-full group-hover:scale-110 h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-sm md:text-lg uppercase text-center absolute bottom-0 left-0 right-0 flex items-center justify-center text-semibold text-white bg-opacity-60 bg-[#228B22] py-2">
                                        {program.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default OurPrograms;
