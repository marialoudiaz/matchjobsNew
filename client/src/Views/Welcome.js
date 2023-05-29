import App from '../App.css'
import React from 'react'
import { useNavigate } from "react-router-dom";
import * as jose from 'jose'
import image from "/Users/mariadiaz/Documents/BCS/matchjobs/matchjobs/client/src/img/matchjobs_splash.jpg"

function Welcome() {
  let navigate = useNavigate();

  return (
    <>
  <div className='container'>
  <div className='WP-Header' style={{padding:'1em'}}>
    <h3>matchjobs</h3> {/*logo */}
      <p>log in</p>
      <p>get started</p>
  </div>
  <div className='WP-Container' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'}}>
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
</div>  
 </>
  )
}
export default Welcome