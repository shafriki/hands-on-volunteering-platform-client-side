import React from 'react';
import BannerCompo from '../../components/Banner/BannerCompo';
import Latest from '../../components/Latest Events/Latest';
import AboutUs from '../../components/AboutUs/AboutUs';
import OurPrograms from '../../components/OurPrograms/OurPrograms';
import Moto from '../../components/Moto/Moto';
import RecentEvents from '../../components/RecentEvents/RecentEvents';

const Home = () => {
    return (
        <div>
            <BannerCompo></BannerCompo>
            <Latest></Latest>
            <AboutUs></AboutUs>
            <OurPrograms></OurPrograms>
            <Moto></Moto>
            <RecentEvents></RecentEvents>
        </div>
    );
};

export default Home;