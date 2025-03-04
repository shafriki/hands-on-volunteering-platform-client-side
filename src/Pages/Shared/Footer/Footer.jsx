import React from 'react';
import handson from '../../../assets/handson (1).png';
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
<footer className="footer bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white border-base-300 border-t px-10 py-4">
  <aside className="grid-flow-col items-center">
    <img src={handson} alt="logo" className='w-10' />
    <p>
      HandsOn
      <br />
      Empower. Volunteer. Connect. Impact. Grow.
    </p>
  </aside>
  <nav className="md:place-self-center md:justify-self-end">
    <div className="grid grid-flow-col gap-4">
    <a><FaSquareFacebook className='text-2xl cursor-pointer md:text-3xl text-white '/></a>

<a><FaSquareInstagram className='text-2xl cursor-pointer md:text-3xl text-white'/></a>

<a><IoLogoYoutube className='text-2xl cursor-pointer md:text-3xl text-white'/></a>

<a><IoLogoLinkedin className='text-2xl cursor-pointer md:text-3xl text-white'/></a>

<a><IoLogoTwitter className='text-2xl cursor-pointer md:text-3xl text-white'/></a>
    </div>
  </nav>
</footer>
        </div>
    );
};

export default Footer;