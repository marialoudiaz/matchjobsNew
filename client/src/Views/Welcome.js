import App from '../App.css'
import React from 'react'
import { useNavigate } from "react-router-dom";
import * as jose from 'jose'

function Welcome() {
  let navigate = useNavigate();



  return (
    <>
  <div className='WP-Container'>
    <div className='WP-Header'>
      <div>logo</div>
      <div>log in</div>
      <div>get started</div>
    </div>
      <div className='WP-text'>
        <h1>Welcome to the new era of recruitement</h1>
        <h2>search for skills. find people</h2>
        <h3>matchjobs</h3> {/*logo */}
        <div className='WP-log'>
        <div> 
          <button className='btnWP' onClick={() => navigate("/login")}>Login</button>
          <button className='btnWP' onClick={() => navigate("/register")}>Register</button>
        </div>    
        </div>
      </div> 
</div>
 </>
  )
}

export default Welcome