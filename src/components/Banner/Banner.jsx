import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Banner = () => {
    return (
        <div className="w-full">
            <div className="w-full bg-gray-100">
                <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} spaceBetween={30} slidesPerView={1} navigation pagination={{ clickable: true }} scrollbar={{ draggable: true }}
                    autoplay={{ delay: 1800, disableOnInteraction: false }}
                    className="h-full">

                    <SwiperSlide className="relative h-[400px]">
                        <img src="https://i.ibb.co.com/fGVL9t8X/three.png"
                            alt="Slide 1" className="w-full h-full object-cover"/>
                    </SwiperSlide>

                    <SwiperSlide className="relative h-[400px]">
                        <img src="https://i.ibb.co.com/XxK2z0nM/one.png" alt="Slide 2"
                            className="w-full h-full object-cover"/>
                    </SwiperSlide>

                    <SwiperSlide className="relative h-[400px]">
                        <img src="https://i.ibb.co.com/VcGZkZjm/two.png"
                            alt="Slide 3" className="w-full h-full object-cover"/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;
