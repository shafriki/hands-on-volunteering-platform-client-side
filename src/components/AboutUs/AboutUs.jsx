import React from "react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from 'react-simple-typewriter'; 

const AboutUs = () => {
  return (
    <div className="bg-amber-50">
        <div className="flex flex-col lg:flex-row justify-between gap-10 max-w-screen-xl md:mx-auto items-center p-6  rounded-xl lg:p-12  mx-3 my-32">

{/* img content */}
<div className="w-full lg:w-2/5">
  <Fade cascade damping={0.1}>
    <h2 className="text-base md:text-2xl font-bold text-[#228B22] mb-6">
      Let’s Talk About HandsOn Team Journey
    </h2>

    <div className="grid grid-cols-2 gap-1 md:gap-4">
      <img src="https://i.ibb.co.com/vCDHjYjw/edu.png" className="w-full h-32 md:h-48 object-cover rounded-lg"/>
      
      <img src="https://i.ibb.co.com/qMc69BcD/health.png" className="w-full h-32 md:h-48 object-cover rounded-lg" />

      <img src="https://i.ibb.co.com/35XRsQJX/climate.png" className="w-full h-32 md:h-48 object-cover rounded-lg" />
      
      <img src="https://i.ibb.co.com/pvL9b6Fm/youth.png" className="w-full h-32 md:h-48 object-cover rounded-lg" />
    </div>
  </Fade>
</div>

{/* text content */}
<div className="w-full lg:w-3/5 text-left">
  <Fade cascade damping={0.1}>
    <p className="text-sm text-[#228B22] mb-4">Join Us Today!</p>

    {/* react type writer text */}
    <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-1">
      <Typewriter
        words={[
          "About HandsOn Team",
          "About Our Mission",
          "About Our Vission"
        ]}
        loop={0} 
        cursor
        cursorStyle="_"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1500}/>
    </h1>

    <div className="flex items-start">
      <div>
        <p className="text-xs text-justify text-gray-600 mt-2 md:text-base">
            We are a community-driven initiative dedicated to connecting medical volunteers with those in need. Our mission is to provide essential healthcare support, emergency aid, and wellness programs to underserved communities. Through compassion, expertise, and teamwork, we strive to make a meaningful impact and create a healthier, more caring world.
        </p>
      </div>
    </div>
    
  </Fade>
</div>
</div>
    </div>
  );
};

export default AboutUs;