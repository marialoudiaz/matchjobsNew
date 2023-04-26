import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function ProfileApplicant(user) {

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
    
    <div className='card'>
      <div className='top-card'></div>
      <div className='inside-card'><p onClick= {<Navigate to={'/applicant/${user._id}/view'}/>}>Create a new offer</p></div>
    </div>
    {!myApp ? 
    <> <h3>you don't have any application created yet</h3><p>all your app will be displayed here</p></>
    :

// Version avec les offres affichées
      
      <div className='classicPage'>
          {/* <h1>Hello {userName},</h1> */}
          <h3>select, modify or create your new job application</h3>
          {/* // applications created */}
          <div className='jobApplication'>
          {myApp.map(c =>( 
        <>
        {/* <Link to = {`/${type}/view/${c._id}`}> */}
        <h1>{c.jobTitle}</h1>
        <p>{c.location}</p>
        <h2>Skills</h2>
        <p>{c.jobFields}</p>
        <h3>Soft</h3>
        <p>{c.softSkills}</p>
        <h3>Hard</h3>
        <p>{c.hardSkills}</p>
{/*         
        <button  onClick= {() => navigate(`/applicant/edit/${id}`)}>edit</button>
        <button onClick = {()=> c.active = !c.active}>activate</button> */}
        {/* </Link> */}
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