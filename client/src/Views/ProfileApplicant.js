import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function ProfileApplicant() {
  return (
    <>
    <div className='InitalPage'>
      {/* <h1>Hello {email}</h1> */}
      <h3>you don't have any application created yet</h3>
      <div className='create-app'></div>
      <p>all your app will be displayed here</p>
    </div>

    <div className='classicPage'>
    <h1>Hello John,</h1>
    <h3>select, modify or create your new job application</h3>
    {/* // applications created */}
    <div></div>
    <div className='create-app'></div>
    </div>
</>
  )
}

export default ProfileApplicant