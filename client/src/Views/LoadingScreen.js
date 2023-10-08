import React from 'react';
import '../App.css'; // Create a CSS file for styling
import video from '../img/logo.mp4'
const LoadingScreen = () => {
    return (
        <div className="loading-screen">
              <video className='video-bg' autoPlay loop muted>
      <source src={video} type='video/mp4'/>
    </video>
        </div>
    );
};

export default LoadingScreen;