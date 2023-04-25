import App from '../App.css'
import React from 'react'
import { useNavigate } from "react-router-dom";

function Welcome() {
  let navigate = useNavigate();



  return (
    <>
<div className='WP-Container'>
    <div className='WP-text'>
      <h1>Welcome to the new era of recruitement</h1>
      <h3>matchjobs</h3>
      <p>are you looking for a job application or a job offer ?</p>
  </div>
<div className='WP-btn'> 
  <button className='btn' onClick={() => navigate("/login")}>Login</button>
  <button className='btn' onClick={() => navigate("/register")}>Register</button>
</div>     
</div>
 </>
  )
}

export default Welcome