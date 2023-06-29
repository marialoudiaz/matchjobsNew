import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import ViewRecruiter from './ViewRecruiter'
// import { set } from 'mongoose';

function DiscoverRecruiter(user, userID) {

const params = useParams()
console.log("id from params- recruiter_id",params.id) // recruiterId
let id = params.id
let recruiterId = id // celui qui like 


const [viewAppID, setviewAppID]=useState('')
let navigate = useNavigate();
const [myApp, setmyApp]=useState([])

// display the applications
     const handleApp = async ()=>{
      debugger
      try {
          let allMyApp = await axios.get(`${URL}/recruiter/getAllApplications`)
          console.log(allMyApp);
          setmyApp(allMyApp.data.data) // [{},{}.....]
      } catch (error) {
          console.log(error);
      }}
 
      const onChipClick =(offerId) =>{
        setviewAppID(offerId);
        navigate(`/recruiter/${offerId}/view`)
      }

  const likeApp = async (applicationId)=>{
    debugger
    console.log(recruiterId)
    console.log(applicationId)
    try {
      let likeApp = await axios.post(`${URL}/recruiter/likeApplicant`, {applicationId, recruiterId})
      console.log('likeApp',likeApp)
    } catch (error) {
    }
  }

  const unlikeApp = async (applicationId)=>{
    debugger
    console.log(recruiterId)
    console.log(applicationId)
    try {
      let unlikeApp = await axios.post(`${URL}/recruiter/unlikeApplicant`,{applicationId, recruiterId} )
      console.log('unlikeApp',unlikeApp)
    } catch (error) {
    }
  }

// pour liker besoin de cliquer sur view (recupere id de loffre dans les params)

//at every render
useEffect(()=>{
  handleApp();
},[]) 


  return (
    <>
    <div className='allCards'>
      {myApp.map((application, i)=>(
        <>
        <div key={i} className='jobApplication'>
        <p>{application.jobTitle}</p>
        <div className='bigChip'>
        <button className='chip' onClick= {()=> onChipClick(application._id)}>View</button>
        <div className='transparent'><ViewRecruiter viewAppID={viewAppID} /></div> 
        <button onClick={()=>likeApp(application._id)} className='chip'>Like</button>
        <button onClick={()=>unlikeApp(application._id)} className='chip'>Unlike</button>
        </div>
        <p className='location'>{application.location}</p>
        {application.remote ?  <div className='chip'>remote</div> : <div></div> }
        {application.onSite ? <div className='chip'>on site</div> : <p></p> }
        {application.flexible ? <div className='chip'>flexible</div> : <p></p> }

        <div className="flex">
        {Object.keys(application.softSkills).map((key) => (
        <p  className="inputArray" key={key}> {application.softSkills[key]} </p>
        ))}
        </div>
        
        <div className="flex">
        {Object.keys(application.hardSkills).map((key) => (
        <p className="inputArray" key={key} >{application.hardSkills[key]}</p>
        ))}

        </div>
      </div>
    </>   
      ))}
   </div> 
    </>
  )
}
export default DiscoverRecruiter
