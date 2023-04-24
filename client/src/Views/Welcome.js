import React from 'react'
import { useNavigate } from "react-router-dom";

function Welcome() {
  let navigate = useNavigate();



  return (
    <>
   
<h1>Welcome to the new era of recruitement</h1>
<h3>matchjobs</h3>
<p>are you looking for a job application or a job offer ?</p>
<button onClick={() => navigate("/login")}>Login</button>
<button onClick={() => navigate("/register")}>Register</button>
 
 </>
  )
}

export default Welcome