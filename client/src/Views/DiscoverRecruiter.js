import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function DiscoverRecruiter(user, userID) {

const params = useParams()
console.log("id from params",params.id) // recruiterId
let id = params.id

let navigate = useNavigate();
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
 

// const likeApp = async ()=>{
//   let applicationId = // l'offre liké (celui qui est liké)
//   let recruiterId = id // celui qui like 
//   console.log(id)
  
//   try {
//     let likeApp = await axios.post(`${URL}/recruiter/likeApplicant`, {applicationId, recruiterId})
//     console.log('likeApp',likeApp)
//   } catch (error) {
//   }
// }

// const unlikeApp = async ()=>{
  
//   let applicationId = // l'offre liké (celui qui est liké)
//   let recruiterId = id // celui qui like 
//   console.log(id)
//   try {
//     let unlikeApp = await axios.post(`${URL}/recruiter/unlikeApplicant`,{applicationId, recruiterId} )
//     console.log('unlikeApp',unlikeApp)
//   } catch (error) {
//   }
// }

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
        <div className='jobApplication'>
        <p key={i} >{application.companyName}</p>
        <p key={i} >{application.jobTitle}</p>
        <div className='bigChip'>
        <button className='chip' onClick= {()=>navigate(`/recruiter/${id}/view`)}>View</button>

        {/* <button onClick={likeApp} className='chip'>Like</button><button onClick={unlikeApp} className='chip'>Unlike</button> */}
        </div>
        <p key={i} className='location'>{application.location}</p>
        {application.remote ?  <div className='chip'>remote</div> : <div></div> }
        {application.onSite ? <div className='chip'>onSite</div> : <p></p> }
        {application.flexible ? <div className='chip'>Flexible</div> : <p></p> }

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

// like button
// add id of user to likedBy of offer