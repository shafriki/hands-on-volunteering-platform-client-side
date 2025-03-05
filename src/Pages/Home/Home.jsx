import React from 'react';
import BannerCompo from '../../components/Banner/BannerCompo';
import Latest from '../../components/Latest Events/Latest';
import AboutUs from '../../components/AboutUs/AboutUs';

const Home = () => {
    return (
        <div>
            <BannerCompo></BannerCompo>
            <Latest></Latest>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;