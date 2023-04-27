import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function DiscoverRecruiter() {

const [myApp, setmyApp]=useState()


// display the applications
// handleApp
     // const id = user._id;
     const handleApp = async ()=>{
      debugger
      try {
          let allMyApp = await axios.get(`${URL}/recruiter/getAllApplications`)
          console.log(allMyApp);
          setmyApp(allMyApp.data.data) // [{},{}.....]
      } catch (error) {
          console.log(error);
      }}
 
//at every render
useEffect(()=>{
  handleApp();
},[]) 


  return (
    <>
    <div>
      {myApp.map(application, i=>(
        <div key={i} className='jobApplication'>{application}</div>
      
      ))}
      
      
    </div> 
    </>
  )
}

export default DiscoverRecruiter
// get all job application
// button to render view 
// button like (add to likedBy array)