import App from '../App.css'
import { React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import * as jose from 'jose'
import video from '../img/welcome-fond.mp4'
import LoadingScreen from './LoadingScreen';

function Welcome() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
// show loading screen for a few second
const loadingTimeout = setTimeout(() => {
  setIsLoading(false); // Set isLoading to false after the specified duration
}, 6500); // Adjust the time according to your needs
// Cleanup the timeout to avoid memory leaks if the component unmounts
return () => {
  clearTimeout(loadingTimeout);
};
},[]);

  return (
    <>
     {isLoading ? (
        <LoadingScreen />
      ) : (
<div className='container'>
  <div className='WP-Header' style={{padding:'1em'}}>
    <h3>matchjobs</h3> {/*logo */}
      <button className='buttonNoStyle' onClick={() => navigate("/login")}>log in</button>
      <button className='buttonNoStyle' onClick={() => navigate("/register")}>get started</button>
  </div>
    <video className='video-bg' autoPlay loop muted>
      <source src={video} type='video/mp4'/>
    </video> 
    {/* <div className='WP-Container' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'}}> */}
        <div className='WP-text'>
          <h1 style={{fontSize:'1.6em'}}>Welcome to the new era of recruitement</h1>
          <h2 style={{fontSize:'1em', fontWeight:'300'}}>search for skills. <span style={{fontStyle:'italic'}}>find people</span></h2>
        <div className='WP-log'>
          <div className='WP-btn'> 
            <button className='btnWP' onClick={() => navigate("/login")}>Login</button>
            <button className='btnWP' onClick={() => navigate("/register")}>Register</button>
          </div>    
        </div>
    </div> 
</div>
 )
}   
    </>
  );
}
  
export default Welcome