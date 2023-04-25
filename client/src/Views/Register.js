import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import App from '../App.css'

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
    if (userType==='applicant'){
      let url = `${URL}/applicant/register`;
      axios.post(url, {email: userEmail, password:userPass, password2: userPass2})
      .then((res)=>{
        // return <Navigate replace to={`/profile/${id}`} />;
        console.log(res)
        // let { name } = res.data;
        // this.setState({name})
      }).catch((error)=>{
          debugger
      })
    }else{
      let url = `${URL}/recuiter/register`;
      axios.post(url, {email: userEmail, password:userPass, password2: userPass2})
      .then((res)=>{
        // return <Navigate replace to={`/profile/${id}`} />;
        console.log(res)
      }).catch((error)=>{debugger})
    }}

  // condition
  // if axios request is successfull go to profile page of id
  
  return (
    <>
<form className='form' onSubmit={handleSubmit}>
  <h1> Create a new account</h1>
  <h2>already a member? </h2>
  <p onClick={() => navigate("/login")}>Login</p>
  <label>email</label>
  <input className='inputs' name='email' type='email' onChange={userInfosChange}></input>
  <label>password</label>
  <input className='inputs' name='password' type='password' onChange={userInfosChange}></input>
  <label>password 2</label>
  <input className='inputs' name='password2' type='password' onChange={userInfosChange}></input>

  <label>please select the type of user you are </label>
          <input className='inputs' type='radio' name='user' value = 'recruiter' onClick = {usertypeChange} />
          <label htmlFor='recruiter'>Recruiter</label>
          <input className='inputs' type='radio' name='user' value = 'applicant' onClick = {usertypeChange} />
          <label htmlFor='applicant'>Applicant</label>
  <button className='btn' >create account</button>
</form>
    </>
  )
}

export default Register