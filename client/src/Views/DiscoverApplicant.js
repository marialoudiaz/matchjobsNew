import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import ViewApplicant from './ViewApplicant'
import { FaLocationArrow } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import backgroundVideo from '../img/bg.mp4'



function DiscoverApplicant(user, userID) {

  const params = useParams()
  console.log("id from params",params.id) // recruiterId
  let id = params.id
  let applicantId = id // celui qui like 


  const [viewOfferID, setviewOfferID]=useState('')
  let navigate = useNavigate();
  const [myOffer, setmyOffer]=useState([])
  // stocker data.data (donc l'objet entier avec toutes les clefs)


  // display the applications
  const handleOffer = async ()=>{
    try {
     let allMyOffer = await axios.get(`${URL}/applicant/getAllOffers`)
     console.log(allMyOffer);
     setmyOffer(allMyOffer.data.data) // [{},{}.....]
    } catch (error) {
     console.log(error);
    }}
 
  const onChipClick =(offerId) =>{
  setviewOfferID(offerId);
  navigate(`/applicant/${offerId}/view`)
  }

  const likeApp = async (offerId)=>{
    console.log(applicantId)
    console.log(offerId)
    try {
      let likeApp = await axios.post(`${URL}/applicant/likeOffer`, {offerId, applicantId})
      console.log('likeApp',likeApp)
    } catch (error) {
    }
  }

  const unlikeApp = async (offerId)=>{
    console.log(applicantId)
    console.log(offerId)
    try {
      let unlikeApp = await axios.post(`${URL}/applicant/unlikeOfer`,{offerId, applicantId} )
      console.log('unlikeApp',unlikeApp)
    } catch (error) {
    }
  }



  //at every render
  useEffect(()=>{
    handleOffer();
  },[]) 




  // OFFRES DANS LE MAIN (A VERIFIER)
  return (
    <>
    <video className='video' autoPlay loop muted id='video'><source src={backgroundVideo} type='video/mp4'/></video>
    <div className='page-wrapper'>
      <div className='allCards'>
      {myOffer.map((application, i)=>(
        <>
        <div key={i} className='jobApplication'>
        <h4>{application.companyName}</h4>
        <p>{application.jobTitle}</p>
        <div className='bigChip'>
        {/* {viewOfferID = application._id} */}
        <button className='chip' onClick= {()=> onChipClick(application._id)}><IoEyeOutline/></button>
        <div className='transparent'><ViewApplicant viewOfferID={viewOfferID} /></div> 
        <button onClick={()=>likeApp(application._id)} className='chip'><IoHeartOutline/></button>
        <button onClick={()=>unlikeApp(application._id)} className='chip'><IoHeartDislikeOutline/></button>
        <p className='location'> <FaLocationArrow />{application.location}</p>
        {application.remote ?  <div className='location'>remote</div> : <div></div> }
        {application.onSite ? <div className='location'>on site</div> : <p></p> }
        {application.flexible ? <div className='location'>flexible</div> : <p></p> }
        </div>
        

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
   </div>
    </>
  )
}

export default DiscoverApplicant