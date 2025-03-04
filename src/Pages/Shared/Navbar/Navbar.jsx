import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu, IoMdLogIn } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import handson from '../../../assets/handson (1).png';
import avatarImg from '../../../assets/images.png';

const Navbar = () => {
    return (
        <div className="bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white fixed z-50 w-full backdrop-blur opacity-80 md:py-1">
            <div className="navbar max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <IoMdMenu size={30} color="#2AB7B1" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] rounded-box z-10 mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li><a>All Articles</a></li>
                            <li><a>Contact Us</a></li>
                        </ul>
                    </div>
                    <img src={handson} alt="logo" className="w-6 md:w-10" />
                    <Link to='/' className="text-sm px-1 md:text-xl btn btn-ghost text-white">HandsOn</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        <li><a>Home</a></li>
                        <li><a>All Articles</a></li>
                        <li><a>Contact Us</a></li>
                    </ul>
                </div>
                <div className="navbar-end flex gap-1 items-center">
                    <Link to='/login' className="btn btn-ghost px-1 text-white border-none"><IoMdLogIn />Login</Link>
                    <Link to='/register' className="btn btn-ghost px-1 text-white border-none"><FaUserEdit />Register</Link>
                    <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#2AB7B1] object-cover cursor-pointer">
                                <img alt="User Avatar" src={avatarImg} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content space-y-2 z-10 menu shadow bg-base-100 rounded-box w-56">
                            <li><button className="btn bg-[#2AB7B1] text-white">Profile</button></li>
                            <li><button className="btn bg-[#2AB7B1] text-white">Log Out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
