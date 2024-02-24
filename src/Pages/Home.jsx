import React from 'react';
import '../css/Home.css';

function HomePage() {
    const img = require('../assets/LibraryLogo.png');
    return (
        <div className='home-page'>
            <img
                className='background-image'
                src={img}
                alt='HomePage-Background'
            />

            <div className='text-container'>
                <h1 className='title text-black font-bold'>Library App</h1>
                <p className='subtitle text-black'> Découvrez nos collections </p>
            </div>
        </div>
    );
}


export default HomePage;
