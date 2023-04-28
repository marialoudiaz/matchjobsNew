import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function ProfileApplicant(user) {

  let navigate = useNavigate();

  // passer l'id
  const params = useParams()
  console.log("id from params",params.id)
  let id = params.id

  // the application to be displayed
  const [myApp, setmyApp]=useState(null)
console.log(myApp)

  // handleApp
     // const id = user._id;
     const handleApp = async ()=>{
      debugger
      try {
          let allMyApp
          allMyApp = await axios.get(`${URL}/applicant/getAllMyJobApplications/${id}`)
          console.log(allMyApp);
          setmyApp(allMyApp.data.data) 
      } catch (error) {
          console.log(error);
      }
  }
 

  // render the applications every render
    useEffect(()=>{
      handleApp();
    },[])


  return (


<div className='page-wrapper'>
<div className='InitalPage'>
    {/* <h1>Hello {email}</h1> */}
    
    
    {!myApp ? 
    <> <div className='card'>
    <div className='top-card'></div>
    <div className='inside-card'><p onClick= {<Navigate to={`/applicant/${user._id}/view`}/>}>Create a new offer</p></div>
  </div>
  <h3>you don't have any application created yet</h3><p>all your app will be displayed here</p></>
    :

// Version avec les offres affichées
      
      <div className='classicPage'>
          {/* <h1>Hello {userName},</h1> */}
          <h3>Your job application</h3>
          {/* // applications created */}
          <div className='jobApplication'>
          {myApp.map(c =>( 
        <>
        {/* <Link to = {`/${type}/view/${c._id}`}> */}
        <p>{c.jobTitle}</p>

        <p>Job field : {c.jobFields}</p>
        {c.remote ? <p>remote</p> : <p></p> }
        {c.onSite ? <p>onSite</p> : <p></p> }
        {c.flexible ? <p>Flexible</p> : <p></p> }
       
        <p>{c.location}</p>
        <h4>Skills</h4>
        <h4>Soft</h4>
        <p>{c.softSkills}</p>
        <h4>Hard</h4>
        <p>{c.hardSkills}</p>
     
        <button className='chip' onClick= {() => navigate(`/applicant/edit/${id}`)}>edit</button>
         <button  className='chip' onClick= {() => navigate(`/applicant/view/${id}`)}>view</button>
        </>
    ))}
    
    </div> 
    </div>
    }
    </div>
    </div>
  )
}

export default ProfileApplicant


// button view => render view
// button edit => render edit
// button delete => call controller delete