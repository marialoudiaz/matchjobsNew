import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"

function Register() {
  let navigate = useNavigate();

  const [userEmail, setUserEmail]=useState(null)
  const [userPass, setUserPass]=useState(null)
  const [userPass2, setUserPass2]=useState(null)
  const [userType, setUserType]=useState(null)
  console.log(userEmail,userPass,userPass2, userType)

const userInfosChange = e=>{
  if (e.target.name=== 'email'){
    setUserEmail(e.target.value)
  }else if (e.target.name==='password'){
    setUserPass(e.target.value) 
  }else{
    setUserPass2(e.target.value) 
}}

  const usertypeChange = e => {
    setUserType(e.target.value)
  }

  

  
  const handleSubmit = e => {
    e.preventDefault();
    let url = `${URL}/applicant/register`;
    axios.post(url, {email: userEmail, password:userPass, password2: userPass2})
    .then((res)=>{
      console.log(res)
      
        // let { name } = res.data;
        // this.setState({name})
    }).catch((error)=>{
        debugger
    })

  }

  // condition
  // if axios request is successfull go to profile page of id
  
  return (
    <>
<form onSubmit={handleSubmit}>
  <h1> Create a new account</h1>
  <h2>already a member? </h2>
  <p onClick={() => navigate("/login")}>Login</p>
  <label>email</label>
  <input name='email' type='email' onChange={userInfosChange}></input>
  <label>password</label>
  <input name='password' type='password' onChange={userInfosChange}></input>
  <label>password 2</label>
  <input name='password2' type='password' onChange={userInfosChange}></input>

  <label>please select the type of user you are </label>
          <input type='radio' name='user' value = 'recruiter' onClick = {usertypeChange} />
          <label htmlFor='recruiter'>Recruiter</label>
          <input type='radio' name='user' value = 'applicant' onClick = {usertypeChange} />
          <label htmlFor='applicant'>Applicant</label>
  <button >create account</button>
</form>
    </>
  )
}

export default Register