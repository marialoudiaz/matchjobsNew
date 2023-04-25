import App from '../App.css'
import React from 'react'
import { useNavigate } from "react-router-dom";
import * as jose from 'jose'

function Welcome() {
  let navigate = useNavigate();



  return (
    <>
  <div className='WP-Container'>
      <div className='WP-text'>
        <h1>Welcome to the new era of recruitement</h1>
        <h3>matchjobs</h3>
        <p>Find a job application or a job offer</p>
      </div>
  <div> 
  <button className='btnWP' onClick={() => navigate("/login")}>Login</button>
  <button className='btnWP' onClick={() => navigate("/register")}>Register</button>
</div>     
</div>
 </>
  )
}

export default Welcome