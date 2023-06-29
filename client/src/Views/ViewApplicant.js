import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function ViewApplicant({user}) {

// passer applicant_id
const params = useParams()
console.log("id from params",params.id)
// id de l'offre
let id = params.id


// the state component in full size
const [myView, setmyView]=useState(null)

// display the application
// fetch data of this specific application
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
!myView && handleApp();
},[])


// map les elements de la card passé en props
// pr pouvoir passé ce quil n'y a pas dans preview

// voit l'offre d'emploi (get joboffer.js)
  return (
    <>
    {myView && <div className='jobApplication'>
       <p>{myView.companyName}</p>
       <p>{myView.jobTitle}</p>
        <div className='bigChip'>
        </div>
        
        <p className='location'>{myView.location}</p>
       
        {myView.remote ?  <div className='chip'>remote</div> : <div></div> }
        {myView.onSite ? <div className='chip'>onSite</div> : <p></p> }
        {myView.flexible ? <div className='chip'>Flexible</div> : <p></p> }
        
       <h4 className='jobDescription'>Job Description</h4>
       <p>{myView.jobDescription}</p>

       <h4 className='jobDescription'>Skills</h4>
       <h4 className='jobDescription'>Softs</h4> 
       <div className="flex">
       {myView.softSkills.map((skill, index) => (
       <p key={index} className='inputArray'>{skill}</p>
       ))}
       </div>
       <h4 className='jobDescription'>Hard</h4>

       <div className="flex">
       {myView.hardSkills.map((skill, index) => (
       <p key={index} className='inputArray'>{skill}</p>
       ))}
       </div>

       <h4 className='jobDescription'>Languages</h4>
       <div className="flex">
       {myView.languagesSpoken.map((skill, index) => (
       <p key={index} className='inputArray'>{skill}</p>
       ))}
       </div>
      </div>
       } 
    </>
  )
}
export default ViewApplicant