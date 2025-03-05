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
                Volunteer Recruitment by Volunteer for Bangladesh (VBD)</Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Festival of Youth 2025 – Creating A New Bangladesh</Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Volunteer Appreciation Day Activities</Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>International Volunteer Day Celebrations</Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Kundalini Inner Energy Awakening Meditation Sessions
                </Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>World Vision Singapore Volunteer Trip to Wazirpur
                </Link>

                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Volunteer Opportunities via Jora Bangladesh
                </Link>

            </Marquee>
        </div>
    );
};

export default Latest;