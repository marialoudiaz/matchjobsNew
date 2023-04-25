import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"

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
  e.preventDefault();
  if (userType ==='applicant'){
    let url = `${URL}/applicant/login`;
    axios.post(url, {email: userEmail, password:userPass})
    .then((res)=>{ console.log(res)
        // let { name } = res.data;
        // this.setState({name})
    }).catch((error)=>{debugger})
  }else{
    let url = `${URL}/recruiter/login`;
    axios.post(url, {email: userEmail, password:userPass})
    .then((res)=>{ console.log(res)
    }).catch((error)=>{debugger})}
  }

// si user existe
// go to profile page


  return (
    <>
    <form onSubmit={handleSubmit}>
    <h1>Welcome back !</h1>
    <p>I want to</p><p onClick={() => navigate("/register")}>register</p>
      <h2>Please enter your personal informations</h2>
  <label>email</label>
  <input name='email' type='email' onChange={userInfosChange}></input>
  <label>password</label>
  <input name='password' type='password' onChange={userInfosChange}></input>
  
  <label>I am a</label>
          <input type='radio' name='user' value = 'recruiter' onClick = {usertypeChange} />
          <label htmlFor='recruiter'>Recruiter</label>
          <input type='radio' name='user' value = 'applicant' onClick = {usertypeChange} />
          <label htmlFor='applicant'>Applicant</label>
  <button >login</button>
</form>
    </>
  )
}

export default Login

