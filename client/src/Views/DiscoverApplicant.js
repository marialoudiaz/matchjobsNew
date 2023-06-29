import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import ViewApplicant from './ViewApplicant'

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
  debugger
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
    debugger
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
    <div className='allCards'>
      {myOffer.map((application, i)=>(
        <>
        <div key={i} className='jobApplication'>
        <p>{application.companyName}</p>
        <p>{application.jobTitle}</p>
        <div className='bigChip'>
        {/* {viewOfferID = application._id} */}
        <button className='chip' onClick= {()=> onChipClick(application._id)}>View</button>
        <div className='transparent'><ViewApplicant viewOfferID={viewOfferID} /></div> 
        
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

export default DiscoverApplicant