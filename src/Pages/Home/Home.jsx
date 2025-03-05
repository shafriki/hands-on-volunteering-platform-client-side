import React from 'react';
import BannerCompo from '../../components/Banner/BannerCompo';
import Latest from '../../components/Latest Events/Latest';

const Home = () => {
    return (
        <div>
            <BannerCompo></BannerCompo>
            <Latest></Latest>
        </div>
    );
};

export default Home;