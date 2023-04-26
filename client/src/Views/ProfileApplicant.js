import React, { useState} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
// import axios from 'axios';
// import {URL} from "../config"


function ProfileApplicant(user) {

  // the application to be displayed
  const [myApp, setmyApp]=useState(null)

  // // utiliser l'email de l'user
  // let userName = user


  return (
<>
<div className='page-wrapper'>
    {myApp===null 

    ? 
    (<div className='InitalPage'>
    {/* <h1>Hello {email}</h1> */}
    <h3>you don't have any application created yet</h3>

    <div className='card'>
      <div className='top-card'></div>
      <div className='inside-card'><p onClick= {<Navigate to={'/applicant/${user._id}/view'}/>}>Create a new offer</p></div>
    </div>


    <p>all your app will be displayed here</p>
  </div>)

    :
      <>
      <div className='classicPage'>
          {/* <h1>Hello {userName},</h1> */}
          <h3>select, modify or create your new job application</h3>
          {/* // applications created */}
          <div className='empty-card'>
            <div className='insideempty-card'></div>
          </div>
          </div>
      </>
    }


    </div> 
</>
  )
}

export default ProfileApplicant