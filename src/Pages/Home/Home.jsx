import React from 'react';
import BannerCompo from '../../components/Banner/BannerCompo';
import Latest from '../../components/Latest Events/Latest';
import AboutUs from '../../components/AboutUs/AboutUs';
import OurPrograms from '../../components/OurPrograms/OurPrograms';

const Home = () => {
    return (
        <div>
            <BannerCompo></BannerCompo>
            <Latest></Latest>
            <AboutUs></AboutUs>
            <OurPrograms></OurPrograms>
        </div>
    );
};

export default Home;