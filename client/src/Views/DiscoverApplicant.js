import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function DiscoverApplicant(props) {
  console.log("props in discover applicqnt ",props)
// passer l'id
const params = useParams()
console.log("id from params",params.id)
let id = params.id

let navigate = useNavigate();
const [myOffer, setmyOffer]=useState([])
// stocker data.data (donc l'objet entier avec toutes les clefs)


// display the applications
// handleApp
     // const id = user._id;
     const handleOffer = async ()=>{
      debugger
      try {
          let allMyOffer = await axios.get(`${URL}/applicant/getAllOffers`)
          console.log(allMyOffer);
          setmyOffer(allMyOffer.data.data) // [{},{}.....]
      } catch (error) {
          console.log(error);
      }}
 
//at every render
useEffect(()=>{
  handleOffer();
},[]) 


  return (
    <>
    <div className='allCards'>
      {myOffer.map((application, i)=>(
        <>
        <div className='jobApplication'>
        <p key={i} >{application.jobTitle}</p>
        <div className='bigChip'>
        <button  className='chip' onClick= {() => navigate(`/applicant/${id}/view`)}>view</button>
        <button className='chip'>Like</button>
        </div>
        <p key={i} className='location'>{application.location}</p>
        {application.remote ?  <div className='chip'>remote</div> : <div></div> }
        {application.onSite ? <div className='chip'>onSite</div> : <p></p> }
        {application.flexible ? <div className='chip'>Flexible</div> : <p></p> }
        <p>{application.softSkills}</p>
        <p>{application.hardSkills}</p>
        
      </div>
      

        </>
      
      ))}
      
      
    </div> 
    </>
  )
}

export default DiscoverApplicant