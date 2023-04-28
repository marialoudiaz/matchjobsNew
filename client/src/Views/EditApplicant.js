import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function ViewApplicant({user}) {

// passer l'id
const params = useParams()
console.log("id from params",params.id)

//id of jobapplication
let id =params.id

// the state component in full size
const [myView, setmyView]=useState(null)
// stocker data.data (donc l'objet entier avec toutes les clefs)



// display the application

// fetch data of this specific application
// handleApp
     // const id = user._id;
     const handleApp = async ()=>{
      debugger
      try {
          let singleJob = await axios.get(`${URL}/applicant/getJobApplication/${id}`)
          console.log(singleJob);
          singleJob.data.ok && setmyView(singleJob.data.data) // {}
      } catch (error) {
          console.log(error);
      }}
 
//at every render
useEffect(()=>{
  handleApp();
},[]) 


// map les elements de la card passé en props
// pr pouvoir passé ce quil n'y a pas dans preview

  return (
    <>

      {myView && <div className='jobApplication'>
        <p>{myView.jobTitle}</p>
        <div className='bigChip'>
        <button className='chip'>Like</button>
        </div>
        
        <p className='location'>{myView.location}</p>
       
        {myView.remote ?  <div className='chip'>remote</div> : <div></div> }
        {myView.onSite ? <div className='chip'>onSite</div> : <p></p> }
        {myView.flexible ? <div className='chip'>Flexible</div> : <p></p> }
        
       <h4 className='jobDescription'>Job Description</h4>
       <p>{myView.bio}</p>

       <h4 className='jobDescription'>Skills</h4>
       <h4 className='jobDescription'>Softs</h4> <p>{myView.softSkills}</p>
       <h4 className='jobDescription'>Hard</h4>
       <p>{myView.hardSkills}</p>
       <h4 className='jobDescription'>Languages</h4>
       <p>{myView.languagesSpoken}</p>

      </div>
       }
      
      
    </>
  )
}

export default ViewApplicant
// get all job application
// button to render view 
// button like (add to likedBy array)