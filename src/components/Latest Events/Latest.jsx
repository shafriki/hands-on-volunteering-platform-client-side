import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { MdLabelImportant } from "react-icons/md";


const Latest = () => {
    return (
        <div className='flex mx-2 mb-5 items-center  gap-2 bg-base-200 p-2 text-xs md:text-base bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white'>
            <p className='bg-[#228B22] px-4 py-2 text-white whitespace-nowrap'>Upcoming Events</p>

            <Marquee autoFill='ture' pauseOnHover='ture'>
                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>
                Dhaka City Marathon 2024</Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Chattogram Coastal Run
                </Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Sylhet Tea Garden Trail
                </Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Rajshahi Heritage Marathon
                </Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Cox’s Bazar Beach Run
                </Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Khulna Eco Run
                </Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Barisal Riverfront Run
                </Link>

            </Marquee>
        </div>
    );
};

export default Latest;