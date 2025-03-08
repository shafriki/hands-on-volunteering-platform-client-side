import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMdMenu, IoMdLogIn } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import handson from '../../../assets/handson (1).png';
import avatarImg from '../../../assets/images.png';
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    const handleLogout = () => {
        logOut();
        setIsLoggedIn(false); 
        Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            text: 'You have successfully logged out!',
            showConfirmButton: false,
            timer: 2000
        });
    };

    const links = (
        <>
            <NavLink to='/' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>Home</NavLink>
            <NavLink to='/all-events' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>All Events</NavLink>
            
            
            {isLoggedIn && (
                <>
                <NavLink to='/all-help-post' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>All Help Posts</NavLink>
            
                <NavLink to='/create-event' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>Create Event</NavLink>
                
                <NavLink to='/create-help-request' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>Create Help Requests</NavLink>

                <NavLink to='/my-events' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>My Events</NavLink>

                <NavLink to='/my-join-events' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>My Joining Events</NavLink>

                <NavLink to='/create-team' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>Create Team</NavLink>

                </>
            )}
            
        </>
    );

    return (
        <div className="bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white sticky top-0 z-50 backdrop-blur opacity-85 md:py-1">
            <div className="navbar max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <IoMdMenu size={30} color="#2AB7B1" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <img src={handson} alt="logo" className="w-6 md:w-10" />
                    <Link to='/' className="text-sm px-1 md:text-xl btn btn-ghost text-white">HandsOn</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-1 items-center">
                    {isLoggedIn ? (
                        <>
                            <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="avatar">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#228B22] object-cover cursor-pointer">
                                        <img alt="User Avatar" src={user?.photoURL || avatarImg} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content space-y-2 z-10 menu shadow bg-base-100 rounded-box w-56">
                                    <li><button className="btn bg-[#2AB7B1] text-white">{user?.displayName}</button></li>
                                    <li><Link to='/profile' className="btn bg-[#2AB7B1] text-white">Profile</Link></li>
                                    <li><button onClick={handleLogout} className="btn bg-[#2AB7B1] text-white">Log Out</button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className="btn btn-ghost px-1 hover:bg-green-500 text-white border-none"><IoMdLogIn />Login</Link>
                            <Link to='/register' className="btn btn-ghost hover:bg-green-500 px-1 text-white border-none"><FaUserEdit />Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
