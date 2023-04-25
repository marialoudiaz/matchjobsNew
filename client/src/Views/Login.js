import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import App from '../App.css'
import * as jose from 'jose'

function Login(props) {
  let navigate = useNavigate();
  const {type, id, userId} = useParams();

  // State components - Login Informations
  const [userEmail, setUserEmail]=useState(null)
  const [userPass, setUserPass]=useState(null)
  const [userType, setUserType]=useState(null)
  const [msg, setMsg]=useState('');

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
const handleSubmit = async(e) => {
  // let {type,id,userid} = useParams();
  e.preventDefault();

  try{
    // call login controller for applicant
    // login for applicant
    if (userType==='applicant'){
      //j'envoie une requete post au server
      debugger
      const response = await axios.post(`${URL}/applicant/login`,{email: userEmail, password:userPass})
      // si l'user exist je decode le token, prend l'email et le met dans localStorage  
      if (response.data.ok){
          let decodedToken = jose.decodeJwt(response.data.token)
          setTimeout(()=>{
            props.login(response.data.token)
            navigate(`/applicant/${decodedToken._id}`)
          })
        } else {
          // IF RESPONSE FALSY
          setMsg(response.data.message)
        }
        // login for recruiter
    } else {
      //j'envoie une requete post au server
      const response = await axios.post(`${URL}/recruiter/login`,{email: userEmail, password:userPass})
      // si la reponse est truthy 
      if (response.data.ok){
          let decodedToken = jose.decodeJwt(response.data.token)
          localStorage.setItem('token', response.data.token)
          setTimeout(()=>{
            props.login(response.data.token)
            navigate(`/recruiter/${decodedToken._id}`)
          })
    }else{
    // IF RESPONSE FALSY
    setMsg(response.data.message)
    }}
  } catch (error) {
}
}

  return (
    <>
    
    <form className='form' onSubmit={handleSubmit}>

      <div>
    <h1>Welcome back !</h1>
      <h3>Please enter your personal informations</h3>
      <h4 className='links' onClick={() => navigate("/register")}>I want to register</h4>
      </div>
   
      
      <div className='input-container'>
        <label>email</label>
        <input className='inputs' name='email' type='email' onChange={userInfosChange}></input>
        <label>password</label>
        <input className='inputs' name='password' type='password' onChange={userInfosChange}></input>
        
        <div className='radiobtn-container'>
                <label>I am a</label>
                <input type='radio' name='user' value = 'recruiter' onClick = {usertypeChange} />
                <label htmlFor='recruiter'>Recruiter</label>
                <input type='radio' name='user' value = 'applicant' onClick = {usertypeChange} />
                <label htmlFor='applicant'>Applicant</label>
        </div>
      </div>
  <button className='btn' >login</button>
  <p>{msg}</p>
</form>

    </>
  )
  }
export default Login

