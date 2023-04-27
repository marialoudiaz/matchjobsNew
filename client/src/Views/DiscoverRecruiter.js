import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function DiscoverRecruiter() {

const [myApp, setmyApp]=useState([])
// stocker data.data (donc l'objet entier avec toutes les clefs)


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
    <div className='allCards'>
      {myApp.map((application, i)=>(
        <>
        <div className='jobApplication'>
        <p key={i} >{application.companyName}</p>
        <p key={i} >{application.jobTitle}</p>
        <div className='bigChip'>
        <button className='chip'>View</button>
        <button className='chip'>Like</button>
        </div>
        <p key={i} className='location'>{application.location}</p>
        {application.remote ?  <div className='chip'>remote</div> : <div></div> }
        {application.onSite ? <div className='chip'>onSite</div> : <p></p> }
        {application.flexible ? <div className='chip'>Flexible</div> : <p></p> }
        <p>{application.softSkills}</p><p>{application.hardSkills}</p>
      </div>
    </>   
      ))}
   </div> 
    </>
  )
}
export default DiscoverRecruiter
// get all job application
// button to render view 
// button like (add to likedBy array)