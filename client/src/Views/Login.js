import React, { useState } from 'react';
import { useNavigate, useParams, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import App from '../App.css'

function Login() {
  let navigate = useNavigate();

  // State components - Login Informations
  const [userEmail, setUserEmail]=useState(null)
  const [userPass, setUserPass]=useState(null)
  const [userType, setUserType]=useState(null)

 // Set values of input to what has been inputed
const userInfosChange = e=>{ 
  if (e.target.name=== 'email'){ 
    setUserEmail(e.target.value) 
  }else{
    setUserPass(e.target.value) }
  }
  const usertypeChange = e => {
    setUserType(e.target.value)
  }

// Récupérer les infos du formulaire pour login
const handleSubmit = e => {
  // let {type,id,userid} = useParams();

  e.preventDefault();

  if (userType ==='applicant'){
    let url = `${URL}/applicant/login`;
    axios.post(url, {email: userEmail, password:userPass})
    .then((res)=>{ console.log(res)
      //go to specific profile page
      //  return <Navigate replace to={`/profile/${id}`} />;
        // let { name } = res.data;
        // this.setState({name})
    }).catch((error)=>{debugger})
  }else{
    let url = `${URL}/recruiter/login`;
    axios.post(url, {email: userEmail, password:userPass})
    .then((res)=>{ console.log(res)
      //go to specific profile page
      // return <Navigate replace to={`/profile/${id}`} />;
    }).catch((error)=>{debugger})}
  }

// si user existe
// go to profile page


  return (
    <>
    <form className='form' onSubmit={handleSubmit}>
      <>
    <h1>Welcome back !</h1>
      <h3>Please enter your personal informations</h3>
      </>
      <><h3>I want to</h3> <h3 onClick={() => navigate("/register")}>register</h3></>
      
      <div className='input-container'>
        <label>email</label>
        <input className='inputs' name='email' type='email' onChange={userInfosChange}></input>
        <label>password</label>
        <input className='inputs' name='password' type='password' onChange={userInfosChange}></input>
        
        <div className='radiobtn-container'>
                <label>I am a</label>
                <input className='inputs' type='radio' name='user' value = 'recruiter' onClick = {usertypeChange} />
                <label htmlFor='recruiter'>Recruiter</label>
                <input className='inputs' type='radio' name='user' value = 'applicant' onClick = {usertypeChange} />
                <label htmlFor='applicant'>Applicant</label>
        </div>
      </div>
  <button className='btn' >login</button>
</form>
    </>
  )
}

export default Login

