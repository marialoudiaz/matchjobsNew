import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import App from '../App.css'
import * as jose from 'jose'
import image from "/Users/mariadiaz/Documents/BCS/matchjobs/matchjobs/client/src/img/matchjobs_splash.jpg"


function Register(props) {
  let navigate = useNavigate();

  const [userEmail, setUserEmail]=useState(null)
  const [userPass, setUserPass]=useState(null)
  const [userPass2, setUserPass2]=useState(null)
  const [userType, setUserType]=useState(null)
  const [msg, setMsg]=useState(null)
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


  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    
    try {
      if(userType==='applicant'){
      const response = await axios.post(`${URL}/applicant/register`, {email: userEmail, password:userPass, password2: userPass2});
      setMsg(response.data.message);
    
          if (response.data.ok) {
          let decodedToken = jose.decodeJwt(response.data.token)
          console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)
          localStorage.setItem('token', response.data.token)
          setTimeout(()=>{
          props.login(response.data.token)
          navigate(`/applicant/${decodedToken._id}`)
          }, 2000);
          }else {
          setMsg(response.data.message)
         }
      } else {
        debugger
      const response = await axios.post(`${URL}/recruiter/register`, {email: userEmail, password:userPass, password2: userPass2});
      setMsg(response.data.message);
    
          if (response.data.ok) {
          let decodedToken = jose.decodeJwt(response.data.token)
          console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)
          localStorage.setItem('token', response.data.token)
          setTimeout(()=>{
          props.login(response.data.token)
          navigate(`/recruiter/${decodedToken._id}`)
          }, 2000);
        }else {
        setMsg(response.data.message)
        }
      }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <div className='WP-Header' style={{padding:'1em'}}>
    <h3>matchjobs</h3> {/*logo */}
      <button className='buttonNoStyle' onClick={() => navigate("/login")}>log in</button>
      <button className='buttonNoStyle' onClick={() => navigate("/register")}>get started</button>
  </div>
  <form className='form' onSubmit={handleSubmit} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'}}>
  <div className='centered-block'>

    <div>
      <p>matchjobs logo</p>
    <h1> Create a new account</h1>
    <h4 className='links' onClick={() => navigate("/login")}>already a member? Login </h4>
    </div>

    <div className='input-container'>
    <label>email</label>
    <input className='inputs' name='email' type='email' onChange={userInfosChange}></input>
    <label>password</label>
    <input className='inputs' name='password' type='password' onChange={userInfosChange}></input>
    <label>password confirmation</label>
    <input className='inputs' name='password2' type='password' onChange={userInfosChange}></input>
    </div>

    
    <div className='radiobtn-container'>
          <label>Choose your user type</label>
            <input className='radio' type='radio' name='user' value = 'recruiter' onClick = {usertypeChange} />
            <label htmlFor='recruiter'>Recruiter</label>
            <input className='radio' type='radio' name='user' value = 'applicant' onClick = {usertypeChange} />
            <label htmlFor='applicant'>Applicant</label>
    </div>
    <button className='btn'>start my journey</button>
    <p className={msg !== null ? 'msg' : 'none'} >{msg}</p>
    </div>
  </form>
    </>
  )
}

export default Register