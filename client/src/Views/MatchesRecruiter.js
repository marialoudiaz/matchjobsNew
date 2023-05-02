import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
function MatchesRecruiter() {


/// PROPS TO PASS
// Likers (recruiters_id)
let likers =''

// Profiles of Likers (_id)
// let profileLikers =''
const params = useParams()
console.log("id from params",params.id) // recruiterId
let id = params.id



// THE APPS TO RENDER
// Je mets dans myMatchApp les infos des likers (applicants.id)
const [myMatchApp, setmyMatchApp]=useState([])

// HOW TO GET THE APP TO RENDER 
     const handleApp = async ()=>{
      debugger
      try {
          let allMyApp = await axios.get(`${URL}/recruiter/getAllMatch/${id}`)
          console.log(allMyApp);
          setmyMatchApp(allMyApp.data.data) // [{},{}.....]
      } catch (error) {
          console.log(error);
      }}


//AT EVERY RENDER
useEffect(()=>{
  handleApp();
},[]) 


  return (
// The match to display all keys
// avec map je display toutes les infos des profils (applicants._id)
<div className='allCards'>
{myMatchApp.map((application, i)=>(
  <>
  <div key={i} className='jobApplication'>
  <p >{application.companyName}</p>
  <p >{application.jobTitle}</p>
  <div className='bigChip'>
  {/* {viewOfferID = application._id} */}
  {/* <button className='chip' onClick= {()=> onChipClick(application._id)}>View</button>
  <div className='transparent'><ViewRecruiter viewOfferID={viewOfferID} /></div>  */}
  
  {/* <button onClick={()=>likeApp(application._id)} className='chip'>Like</button>
  <button onClick={()=>unlikeApp(application._id)} className='chip'>Unlike</button> */}

  </div>
  <p className='location'>{application.location}</p>
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
)
}
export default MatchesRecruiter

// send via props : 
//// recruiters_id (likers)
//// _id de ces likers (profileOfLikers)

// display (whole) offer

// <button pass> pull recruiters_id from likedBy
// <button like> display hidden div with mail icon (linking to email) // if time => do node email




















// un user est connecté (passer _id de l'user)
// clique sur le like(btn)
// ajoute l'id de l'user dans l'array (likedBy) de l'offre
// Dans matches de l'user
/// => prend chaque id (userID) qui sont dans l'array likedBy de son offre
///=> affiches les applications

// créer un bouton match (ds preview et view)
//// => on click : display messgae + bouton email (nodemailer)

// display match button seulement dans URL allant de matches a view et non de discover a view